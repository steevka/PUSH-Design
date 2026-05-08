"use client";

import { useTexture, useVideoTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uIntensity;
  uniform float uHover;
  uniform float uFadeIn;
  uniform vec3 uBgColor;
  uniform vec2 uTexSize;
  uniform vec2 uViewSize;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                  + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                             dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  vec2 coverUv(vec2 uv, vec2 viewSize, vec2 texSize) {
    float viewRatio = viewSize.x / viewSize.y;
    float texRatio = texSize.x / texSize.y;
    vec2 result = uv;
    if (viewRatio > texRatio) {
      float scale = texRatio / viewRatio;
      result.y = (uv.y - 0.5) * scale + 0.5;
    } else {
      float scale = viewRatio / texRatio;
      result.x = (uv.x - 0.5) * scale + 0.5;
    }
    return result;
  }

  void main() {
    vec2 baseUv = coverUv(vUv, uViewSize, uTexSize);

    float n1 = snoise(baseUv * 2.0 + uTime * 0.06);
    float n2 = snoise(baseUv * 5.0 - uTime * 0.09);
    vec2 disp = vec2(n1, n2) * 0.012 * uIntensity;

    float md = distance(vUv, uMouse);
    vec2 ripple = (vUv - uMouse) * exp(-md * 5.0) * 0.05 * uHover;

    vec2 finalUv = baseUv + disp + ripple;

    float ca = 0.003 * uIntensity;
    vec3 color;
    color.r = texture2D(uTexture, finalUv + vec2(ca, 0.0)).r;
    color.g = texture2D(uTexture, finalUv).g;
    color.b = texture2D(uTexture, finalUv - vec2(ca, 0.0)).b;

    float grain = (fract(sin(dot(vUv * 1000.0 + uTime, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.08;
    color += grain;

    float vig = smoothstep(1.1, 0.35, distance(vUv, vec2(0.5)));
    color *= 0.55 + 0.45 * vig;

    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(lum), color, 0.92);

    color = mix(uBgColor, color, uFadeIn);

    gl_FragColor = vec4(color, 1.0);
  }
`;

interface DisplacedPlateProps {
  src: string;
  video?: boolean;
  intensity?: number;
  hover?: number;
}

const FADE_IN_SECONDS = 1.0;
const BG_COLOR = new THREE.Color("#0a0818");

function DisplacedMesh({
  texture,
  intensity,
  hover,
}: {
  texture: THREE.Texture;
  intensity: number;
  hover: number;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const mountTimeRef = useRef<number | null>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uIntensity: { value: intensity },
      uHover: { value: hover },
      uFadeIn: { value: 0 },
      uBgColor: { value: BG_COLOR },
      uTexSize: { value: new THREE.Vector2(1, 1) },
      uViewSize: { value: new THREE.Vector2(1, 1) },
    }),
    [texture, intensity, hover],
  );

  useFrame((state) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;

    if (mountTimeRef.current === null) {
      mountTimeRef.current = state.clock.elapsedTime;
    }
    const localTime = state.clock.elapsedTime - mountTimeRef.current;
    u.uTime.value = localTime;
    u.uFadeIn.value = Math.min(localTime / FADE_IN_SECONDS, 1);

    u.uViewSize.value.set(state.size.width, state.size.height);

    const img = texture.image as
      | {
          width?: number;
          height?: number;
          videoWidth?: number;
          videoHeight?: number;
          naturalWidth?: number;
          naturalHeight?: number;
        }
      | undefined;
    if (img) {
      const w = img.videoWidth || img.naturalWidth || img.width || 1;
      const h = img.videoHeight || img.naturalHeight || img.height || 1;
      u.uTexSize.value.set(w, h);
    }

    const ndc = u.uMouse.value as THREE.Vector2;
    const targetX = (state.pointer.x + 1) * 0.5;
    const targetY = (state.pointer.y + 1) * 0.5;
    ndc.x += (targetX - ndc.x) * 0.06;
    ndc.y += (targetY - ndc.y) * 0.06;
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

function DisplacedImage({
  src,
  intensity,
  hover,
}: {
  src: string;
  intensity: number;
  hover: number;
}) {
  const texture = useTexture(src);
  return <DisplacedMesh texture={texture} intensity={intensity} hover={hover} />;
}

function DisplacedVideo({
  src,
  intensity,
  hover,
}: {
  src: string;
  intensity: number;
  hover: number;
}) {
  const texture = useVideoTexture(src, {
    muted: true,
    loop: true,
    start: true,
    crossOrigin: "anonymous",
    playsInline: true,
  });
  return <DisplacedMesh texture={texture} intensity={intensity} hover={hover} />;
}

export function DisplacedPlate({
  src,
  video = false,
  intensity = 1,
  hover = 1,
}: DisplacedPlateProps) {
  return video ? (
    <DisplacedVideo src={src} intensity={intensity} hover={hover} />
  ) : (
    <DisplacedImage src={src} intensity={intensity} hover={hover} />
  );
}

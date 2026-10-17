"use client"

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/** Decorative, hero-sized version of the supplied RGB sine-wave shader. */
export function WebGLShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: false }); }
    catch { return; } // The CSS background remains visible without WebGL.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      resolution: { value: new THREE.Vector2() }, time: { value: 0 },
      xScale: { value: 1 }, yScale: { value: 0.5 }, distortion: { value: 0.05 },
    };
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.RawShaderMaterial({
      uniforms,
      vertexShader: `attribute vec3 position;
        void main() { gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `precision highp float;
        uniform vec2 resolution;
        uniform float time, xScale, yScale, distortion;
        void main() {
          vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
          float d = length(p) * distortion;
          float rx = p.x * (1.0 + d);
          float gx = p.x;
          float bx = p.x * (1.0 - d);
          float r = 0.05 / max(abs(p.y + sin((rx + time) * xScale) * yScale), 0.001);
          float g = 0.05 / max(abs(p.y + sin((gx + time) * xScale) * yScale), 0.001);
          float b = 0.05 / max(abs(p.y + sin((bx + time) * xScale) * yScale), 0.001);
          gl_FragColor = vec4(r, g, b, 1.0);
        }`,
    });
    scene.add(new THREE.Mesh(geometry, material));
    let animationId = 0;
    let previousTime = 0;
    let visible = true;
    let lost = false;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const render = () => { if (!lost) renderer.render(scene, camera); };
    const animate = (now: number) => {
      uniforms.time.value += previousTime ? Math.min((now - previousTime) / 1000, 0.05) * 0.6 : 0;
      previousTime = now;
      render();
      animationId = requestAnimationFrame(animate);
    };
    const sync = () => {
      cancelAnimationFrame(animationId);
      previousTime = 0;
      if (lost) return;
      if (motion.matches) { render(); return; }
      if (visible && !document.hidden) animationId = requestAnimationFrame(animate);
    };
    const resize = () => {
      renderer.setSize(Math.max(host.clientWidth, 1), Math.max(host.clientHeight, 1), false);
      renderer.getDrawingBufferSize(uniforms.resolution.value);
      render();
    };
    const onLost = (event: Event) => { event.preventDefault(); lost = true; canvas.style.opacity = '0'; sync(); };
    const onRestored = () => { lost = false; canvas.style.opacity = ''; resize(); sync(); };
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    intersection.observe(host);
    document.addEventListener('visibilitychange', sync);
    motion.addEventListener('change', sync);
    canvas.addEventListener('webglcontextlost', onLost);
    canvas.addEventListener('webglcontextrestored', onRestored);
    resize(); sync();
    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect(); intersection.disconnect();
      document.removeEventListener('visibilitychange', sync);
      motion.removeEventListener('change', sync);
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
      geometry.dispose(); material.dispose(); renderer.dispose();
    };
  }, []);
  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 block h-full w-full" />;
}

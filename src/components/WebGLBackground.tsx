"use client";

import { useEffect, useRef } from "react";

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
    });
    if (!gl) return;

    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2  u_resolution;
      uniform vec2  u_mouse;

      float orb(vec2 uv, vec2 center, float radius) {
        float d = length(uv - center);
        return 1.0 - smoothstep(0.0, radius, d);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 suv = vec2(uv.x * aspect, uv.y);
        float t = u_time * 0.25;

        vec3 bg     = vec3(0.980, 0.973, 0.957);
        vec3 sage   = vec3(0.686, 0.784, 0.627);
        vec3 forest = vec3(0.373, 0.478, 0.122);
        vec3 gold   = vec3(0.965, 0.851, 0.659);
        vec3 mint   = vec3(0.867, 0.922, 0.816);
        vec3 lemon  = vec3(0.965, 0.851, 0.300);

        vec2 p1 = vec2(0.15*aspect + 0.18*aspect*sin(t*0.7+0.0), 0.75+0.18*cos(t*0.5+1.0));
        vec2 p2 = vec2(0.80*aspect + 0.20*aspect*sin(t*0.6+2.1), 0.80+0.15*cos(t*0.8+0.5));
        vec2 p3 = vec2(0.25*aspect + 0.15*aspect*cos(t*0.9+1.5), 0.40+0.22*sin(t*0.6+3.0));
        vec2 p4 = vec2(0.75*aspect + 0.18*aspect*cos(t*0.7+4.2), 0.25+0.20*sin(t*0.5+2.0));
        vec2 p5 = vec2(0.10*aspect + 0.12*aspect*sin(t*1.1+0.8), 0.20+0.15*cos(t*0.7+1.2));
        vec2 p6 = vec2(0.88*aspect + 0.10*aspect*sin(t*0.8+3.5), 0.50+0.25*cos(t*0.6+0.3));

        float o1 = orb(suv, p1, 0.55*aspect);
        float o2 = orb(suv, p2, 0.50*aspect);
        float o3 = orb(suv, p3, 0.40*aspect);
        float o4 = orb(suv, p4, 0.45*aspect);
        float o5 = orb(suv, p5, 0.38*aspect);
        float o6 = orb(suv, p6, 0.42*aspect);

        vec2 mouseAspect = vec2(u_mouse.x * aspect, u_mouse.y);
        float o7 = orb(suv, mouseAspect, 0.30*aspect);

        vec3 color = bg;
        color = mix(color, sage,   o1 * 0.55);
        color = mix(color, gold,   o2 * 0.50);
        color = mix(color, forest, o3 * 0.30);
        color = mix(color, lemon,  o4 * 0.45);
        color = mix(color, mint,   o5 * 0.50);
        color = mix(color, sage,   o6 * 0.40);
        color = mix(color, gold,   o7 * 0.35);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const compileShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn("Shader error:", gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    // Fix: null-check createProgram — can return null on context loss
    const prog = gl.createProgram();
    if (!prog) return;

    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn("Link error:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);
    gl.detachShader(prog, vs);
    gl.detachShader(prog, fs);
    gl.deleteShader(vs);
    gl.deleteShader(fs);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime  = gl.getUniformLocation(prog, "u_time");
    const uRes   = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    // Fix: consistent resize — always use parentElement, fall back to window
    const getSize = () => {
      const parent = canvas.parentElement;
      return {
        w: parent ? parent.offsetWidth  : window.innerWidth,
        h: parent ? parent.offsetHeight : window.innerHeight,
      };
    };

    const resize = () => {
      const { w, h } = getSize();
      if (w === 0 || h === 0) return;
      canvas.width  = Math.floor(w / 2);
      canvas.height = Math.floor(h / 2);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    // ResizeObserver fires on mount — no need for extra setTimeout
    const observeTarget = canvas.parentElement ?? canvas;
    const ro = new ResizeObserver(resize);
    ro.observe(observeTarget);

    let mx = 0.5, my = 0.5, tx = 0.5, ty = 0.5;
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = 1.0 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("mousemove", onMove);

    // Fix: handle WebGL context loss — stop RAF, prevent error spam
    let raf = 0;
    const onContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    const start = performance.now();
    const render = () => {
      const t = (performance.now() - start) / 1000;
      mx += (tx - mx) * 0.04;
      my += (ty - my) * 0.04;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mx, my);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

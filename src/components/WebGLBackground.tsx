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

      // Soft radial orb with sharper falloff
      float orb(vec2 uv, vec2 center, float radius) {
        float d = length(uv - center);
        return 1.0 - smoothstep(0.0, radius, d);
      }

      // Simple hash for turbulence
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 suv = vec2(uv.x * aspect, uv.y);
        float t = u_time * 0.42; // faster — more alive

        // ── Slightly darker background so colors pop ──────────────────────
        vec3 bg     = vec3(0.945, 0.937, 0.922);
        vec3 sage   = vec3(0.550, 0.730, 0.480);
        vec3 forest = vec3(0.200, 0.400, 0.060);
        vec3 gold   = vec3(0.980, 0.820, 0.350);
        vec3 mint   = vec3(0.780, 0.930, 0.700);
        vec3 lemon  = vec3(0.970, 0.870, 0.200);

        // ── Smaller, tighter orbs with turbulence on paths ────────────────
        // Turbulence: secondary sine layered on top of primary path
        float tb = 0.06; // turbulence amplitude

        vec2 p1 = vec2(
          0.12*aspect + 0.14*aspect*sin(t*0.7+0.0) + tb*aspect*sin(t*2.1+0.5),
          0.78 + 0.16*cos(t*0.5+1.0) + tb*cos(t*1.8+0.3)
        );
        vec2 p2 = vec2(
          0.82*aspect + 0.16*aspect*sin(t*0.6+2.1) + tb*aspect*sin(t*2.4+1.2),
          0.82 + 0.13*cos(t*0.8+0.5) + tb*cos(t*2.0+0.8)
        );
        vec2 p3 = vec2(
          0.28*aspect + 0.13*aspect*cos(t*0.9+1.5) + tb*aspect*cos(t*1.9+2.1),
          0.42 + 0.20*sin(t*0.6+3.0) + tb*sin(t*2.3+1.5)
        );
        vec2 p4 = vec2(
          0.72*aspect + 0.15*aspect*cos(t*0.7+4.2) + tb*aspect*cos(t*2.2+0.7),
          0.22 + 0.18*sin(t*0.5+2.0) + tb*sin(t*1.7+2.4)
        );
        vec2 p5 = vec2(
          0.08*aspect + 0.10*aspect*sin(t*1.1+0.8) + tb*aspect*sin(t*2.5+1.8),
          0.18 + 0.14*cos(t*0.7+1.2) + tb*cos(t*2.1+0.6)
        );
        vec2 p6 = vec2(
          0.90*aspect + 0.09*aspect*sin(t*0.8+3.5) + tb*aspect*sin(t*1.6+2.9),
          0.52 + 0.22*cos(t*0.6+0.3) + tb*cos(t*2.3+1.1)
        );

        // Smaller radii — tighter, more defined color pools
        float o1 = orb(suv, p1, 0.28*aspect);
        float o2 = orb(suv, p2, 0.25*aspect);
        float o3 = orb(suv, p3, 0.22*aspect);
        float o4 = orb(suv, p4, 0.24*aspect);
        float o5 = orb(suv, p5, 0.20*aspect);
        float o6 = orb(suv, p6, 0.23*aspect);

        // Mouse orb — larger and brighter for strong interaction feel
        vec2 mouseAspect = vec2(u_mouse.x * aspect, u_mouse.y);
        float o7 = orb(suv, mouseAspect, 0.22*aspect);

        // ── Composite — stronger blend factors ────────────────────────────
        vec3 color = bg;
        color = mix(color, sage,   o1 * 0.72);
        color = mix(color, gold,   o2 * 0.68);
        color = mix(color, forest, o3 * 0.55); // forest now visible
        color = mix(color, lemon,  o4 * 0.62);
        color = mix(color, mint,   o5 * 0.65);
        color = mix(color, sage,   o6 * 0.58);
        color = mix(color, gold,   o7 * 0.70); // strong mouse reaction

        // ── Vignette — darken edges, focus center ─────────────────────────
        float vignette = 1.0 - 0.35 * length(uv - vec2(0.5, 0.5));
        color *= vignette;

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

    let raf = 0;
    const onContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    const start = performance.now();
    const render = () => {
      const t = (performance.now() - start) / 1000;
      mx += (tx - mx) * 0.05;
      my += (ty - my) * 0.05;
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

"use client";

import { useEffect, useRef } from "react";

const MAX_SPEED = 250;
const AVOID_RADIUS = 110;

/**
 * HoneyBee — a realistic, physically-animated bee that flies around the
 * viewport and reacts to the cursor.
 *
 * theme: "auto" (default) | "light" | "dark"
 *   - "auto" watches the OS color-scheme preference AND common in-app
 *     dark-mode conventions (a `dark` class or `data-theme="dark"` on
 *     <html>, e.g. next-themes / Tailwind `darkMode: "class"`), and
 *     re-checks every frame so it reacts instantly to a theme toggle —
 *     no reload needed.
 *   - "light" / "dark" force a mode regardless of the app's theme.
 */
export default function HoneyBee({ theme = "auto" } = {}) {
  const canvasRef = useRef(null);
  const themeModeRef = useRef(theme);

  useEffect(() => {
    themeModeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = null;
    let idleHandle = null;
    let running = true;
    let dpr = 1;
    let W = 0;
    let H = 0;
    const vv = window.visualViewport;
    const darkMQ = window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null;

    let currentIsDark = false;
    function computeIsDark() {
      const mode = themeModeRef.current;
      if (mode === "dark") return true;
      if (mode === "light") return false;

      const root = document.documentElement;
      if (root.classList.contains("dark")) return true;
      if (root.classList.contains("light")) return false;
      const dataTheme = root.getAttribute("data-theme");
      if (dataTheme === "dark") return true;
      if (dataTheme === "light") return false;

      return darkMQ ? darkMQ.matches : false;
    }

    const readViewport = () => {
      if (vv && typeof vv.width === "number" && typeof vv.height === "number") {
        W = vv.width;
        H = vv.height;
      } else {
        W = window.innerWidth;
        H = window.innerHeight;
      }
    };

    const rand = (min, max) => min + Math.random() * (max - min);
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    const mouse = { x: -9999, y: -9999, lastMove: 0 };

    const bee = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      angle: 0,
      bank: 0,
      wanderTheta: Math.random() * Math.PI * 2,
      wanderTimer: 0,
      flap: 0,
      flapSpeed: 46,
      scale: 1.25,
      goal: { x: 0, y: 0 },
    };

    function resize() {
      readViewport();
      dpr = 1;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bee.scale = Math.min(1.4, Math.max(0.9, Math.min(W, H) / 900));
    }

    function pickWanderGoal() {
      const margin = Math.max(40, Math.min(W, H) * 0.1);
      bee.goal = { x: rand(margin, W - margin), y: rand(margin, H - margin) };
    }

    function initBee() {
      bee.x = -120;
      bee.y = rand(60, H * 0.4);
      bee.vx = rand(140, 190);
      bee.vy = rand(-14, 14);
      bee.flap = rand(0, Math.PI * 2);
      bee.angle = Math.atan2(bee.vy, bee.vx);
      pickWanderGoal();
    }

    const speedOf = () => Math.hypot(bee.vx, bee.vy);

    function step(now, dt) {
      const idle = now - mouse.lastMove > 2200;
      const recentlyActive = now - mouse.lastMove < 260;
      const mouseVisible = mouse.x > -100;
      const beeMouseDist = Math.hypot(bee.x - mouse.x, bee.y - mouse.y);

      let hoverGoal = null;
      if (idle && mouseVisible && beeMouseDist < 260) {
        const rx = Math.sin(now * 0.0009) * 16;
        const ry = Math.cos(now * 0.0007) * 8 - 6;
        hoverGoal = { x: mouse.x + 26 + rx, y: mouse.y - 16 + ry };
      }

      if (bee.wanderTimer <= 0) {
        pickWanderGoal();
        bee.wanderTimer = rand(1.4, 3.4);
      }
      bee.wanderTimer -= dt;

      const targetX = hoverGoal ? hoverGoal.x : bee.goal.x;
      const targetY = hoverGoal ? hoverGoal.y : bee.goal.y;
      const dx = targetX - bee.x;
      const dy = targetY - bee.y;
      const dist = Math.hypot(dx, dy) || 1;

      if (!hoverGoal && dist < 70) pickWanderGoal();

      const maxSpd = hoverGoal ? Math.min(90, dist * 1.6) : MAX_SPEED;

      let desireX = dx / dist;
      let desireY = dy / dist;

      if (recentlyActive && beeMouseDist < AVOID_RADIUS) {
        const push = (AVOID_RADIUS - beeMouseDist) / AVOID_RADIUS;
        const awayX = (bee.x - mouse.x) / (beeMouseDist || 1);
        const awayY = (bee.y - mouse.y) / (beeMouseDist || 1);
        desireX = awayX * push * 2.6 + desireX * (1 - push * 0.5);
        desireY = awayY * push * 2.6 + desireY * (1 - push * 0.5);
        const norm = Math.hypot(desireX, desireY) || 1;
        desireX /= norm;
        desireY /= norm;
      }

      const wobX = Math.cos(now * 0.0007 + bee.wanderTheta) * 16;
      const wobY = Math.sin(now * 0.0005 + bee.wanderTheta) * 10;

      const prevVx = bee.vx;
      const prevVy = bee.vy;

      bee.vx += (desireX * maxSpd + (wobX - bee.vx) * 0.35) * 1.8 * dt;
      bee.vy += (desireY * maxSpd + (wobY - bee.vy) * 0.35) * 1.8 * dt;

      const spd = speedOf();
      if (spd > MAX_SPEED) {
        bee.vx = (bee.vx / spd) * MAX_SPEED;
        bee.vy = (bee.vy / spd) * MAX_SPEED;
      }

      bee.x += bee.vx * dt;
      bee.y += bee.vy * dt;

      const m = Math.max(30, Math.min(W, H) * 0.08);
      if (bee.x < m) bee.vx += 300 * dt;
      if (bee.x > W - m) bee.vx -= 300 * dt;
      if (bee.y < m) bee.vy += 300 * dt;
      if (bee.y > H - m) bee.vy -= 300 * dt;

      const hoverDrift = hoverGoal ? Math.sin(now * 0.006) * 0.18 : 0;
      bee.angle =
        Math.atan2(bee.vy, bee.vx) +
        Math.sin(now * 0.011) * 0.06 +
        hoverDrift;

      const turnRate = (bee.vx * prevVy - bee.vy * prevVx) / (spd * spd + 1);
      bee.bank += (clamp(turnRate * 5.5, -0.5, 0.5) - bee.bank) * Math.min(1, dt * 6);

      bee.flapSpeed = hoverGoal ? 58 : 40 + Math.min(18, spd * 0.05);
      bee.flap += dt * bee.flapSpeed;
    }

    // ---------- realistic wing rendering ----------
    function drawWing(g, len, wid, phase, alpha) {
      const sweep = phase * 0.95;
      const lift = -Math.abs(phase) * 0.12;

      g.save();
      g.rotate(sweep);

      const tipX = len;
      const tipY = -wid * 0.32 + lift * len;
      const cp1x = len * 0.32;
      const cp1y = -wid * 0.95;
      const cp2x = len * 0.82;
      const cp2y = -wid * 0.55;
      const cp3x = len * 0.5;
      const cp3y = wid * 0.4;

      // --- light / dark mode adjustments for wing visibility ---
      let filmBoost, veinAlpha, strokeColor, outlineColor, outlineWidth;
      if (currentIsDark) {
        filmBoost = 1.35;
        veinAlpha = 0.8;
        strokeColor = "rgba(210,224,245,0.75)";
        outlineColor = "rgba(160,190,230,0.6)";
        outlineWidth = 0.8;
      } else {
        // light mode: stronger contrast, darker veins and outline
        filmBoost = 1.0;
        veinAlpha = 0.95;
        strokeColor = "rgba(90,110,140,0.85)";
        outlineColor = "rgba(50,70,100,0.7)";
        outlineWidth = 1.0;
      }

      const grad = g.createLinearGradient(0, 0, tipX, tipY);
      grad.addColorStop(0, `rgba(235,244,252,${0.55 * filmBoost})`);
      grad.addColorStop(0.45, `rgba(213,230,247,${0.32 * filmBoost})`);
      grad.addColorStop(1, `rgba(225,238,250,${0.14 * filmBoost})`);

      g.beginPath();
      g.moveTo(0, 0);
      g.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, tipX, tipY);
      g.quadraticCurveTo(cp3x, cp3y, 0, 0);
      g.closePath();
      g.fillStyle = grad;
      g.fill();
      
      // main outline – dark enough in light mode
      g.lineWidth = outlineWidth;
      g.strokeStyle = outlineColor;
      g.stroke();

      // iridescent sheen sweep
      const sheen = g.createLinearGradient(0, -wid, len, wid * 0.4);
      sheen.addColorStop(0, "rgba(255,255,255,0)");
      sheen.addColorStop(0.5, `rgba(190,215,255,${0.18 * alpha * filmBoost})`);
      sheen.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = sheen;
      g.beginPath();
      g.moveTo(0, 0);
      g.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, tipX, tipY);
      g.quadraticCurveTo(cp3x, cp3y, 0, 0);
      g.closePath();
      g.fill();

      // wing veins (radiating + cross veins)
      g.strokeStyle = `rgba(120,138,168,${veinAlpha})`;
      g.lineWidth = 0.6;
      const veinCount = 4;
      for (let i = 1; i <= veinCount; i++) {
        const t = i / (veinCount + 1);
        const vx = cp1x * (1 - t) * (1 - t) + cp2x * 2 * t * (1 - t) + tipX * t * t;
        const vy = cp1y * (1 - t) * (1 - t) + cp2y * 2 * t * (1 - t) + tipY * t * t;
        g.beginPath();
        g.moveTo(len * 0.06, -wid * 0.05 * i * 0.3);
        g.quadraticCurveTo(vx * 0.55, vy * 0.55, vx, vy);
        g.stroke();
      }
      
      // pterostigma (small dark cell near the leading edge tip)
      g.fillStyle = currentIsDark ? "rgba(160,125,60,0.65)" : "rgba(100,80,40,0.8)";
      g.beginPath();
      g.ellipse(len * 0.78, -wid * 0.5, len * 0.07, wid * 0.13, sweep * 0.2, 0, Math.PI * 2);
      g.fill();

      g.restore();
    }

    function drawWingPair(g, flapVal, alpha, blur) {
      g.save();
      if (blur) {
        g.globalAlpha = alpha * 0.5;
      } else {
        g.globalAlpha = alpha;
      }
      g.save();
      g.translate(-1, -1.5);
      drawWing(g, 20, 8.5, flapVal, alpha);
      g.restore();
      g.save();
      g.translate(-3.5, 1.2);
      drawWing(g, 13, 5.5, flapVal * 0.85, alpha);
      g.restore();
      g.restore();
    }

    function drawLeg(g, hipX, hipY, dir, spread, kneeBend) {
      const femurLen = 8.5;
      const tibiaLen = 9;
      const tarsusLen = 6;

      const a1 = dir * (0.75 + spread * 0.3);
      const kneeX = hipX + Math.cos(a1) * femurLen;
      const kneeY = hipY + Math.sin(a1) * femurLen * (dir > 0 ? 1 : 1) + 2;

      const a2 = a1 + dir * (0.9 + kneeBend);
      const ankleX = kneeX + Math.cos(a2) * tibiaLen;
      const ankleY = kneeY + Math.sin(a2) * tibiaLen;

      const a3 = a2 + dir * 0.55;
      const footX = ankleX + Math.cos(a3) * tarsusLen;
      const footY = ankleY + Math.sin(a3) * tarsusLen;

      g.strokeStyle = "#2a1a08";
      g.lineCap = "round";

      g.lineWidth = 1.5;
      g.beginPath();
      g.moveTo(hipX, hipY);
      g.lineTo(kneeX, kneeY);
      g.stroke();

      g.lineWidth = 1.15;
      g.beginPath();
      g.moveTo(kneeX, kneeY);
      g.lineTo(ankleX, ankleY);
      g.stroke();

      g.lineWidth = 0.8;
      g.beginPath();
      g.moveTo(ankleX, ankleY);
      g.lineTo(footX, footY);
      g.stroke();

      g.fillStyle = "#4a2e10";
      g.beginPath();
      g.arc(kneeX, kneeY, 0.9, 0, Math.PI * 2);
      g.fill();
    }

    function drawFuzzTexture(g, x, y, r, hairColor, count, lenMin, lenMax, baseAngleOffset) {
      g.strokeStyle = hairColor;
      g.lineCap = "round";
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + baseAngleOffset;
        const jitter = ((i * 53) % 11) / 11 - 0.5;
        const rr0 = r * (0.78 + jitter * 0.06);
        const hairLen = lenMin + (((i * 37) % 10) / 10) * (lenMax - lenMin);
        const bendA = a + jitter * 0.35;
        const x0 = x + Math.cos(a) * rr0;
        const y0 = y + Math.sin(a) * rr0;
        const x1 = x + Math.cos(bendA) * (rr0 + hairLen);
        const y1 = y + Math.sin(bendA) * (rr0 + hairLen);
        g.lineWidth = 0.55 + (i % 3) * 0.15;
        g.beginPath();
        g.moveTo(x0, y0);
        g.lineTo(x1, y1);
        g.stroke();
      }
    }

    function drawGlow(g, b) {
      if (!currentIsDark) return;
      const r = 27 * b.scale;
      const grad = g.createRadialGradient(b.x, b.y, 2, b.x, b.y, r);
      grad.addColorStop(0, "rgba(255,205,110,0.24)");
      grad.addColorStop(0.55, "rgba(255,190,90,0.09)");
      grad.addColorStop(1, "rgba(255,190,90,0)");
      g.fillStyle = grad;
      g.beginPath();
      g.arc(b.x, b.y, r, 0, Math.PI * 2);
      g.fill();
    }

    function drawBee(g, b) {
      const s = b.scale;
      const t = performance.now() / 1000;
      const flapVal = Math.sin(b.flap);

      g.save();
      g.translate(b.x, b.y);
      g.rotate(b.angle);
      g.rotate(b.bank * 0.4);
      g.scale(s, s);

      drawWingPair(g, Math.sin(b.flap - 0.55), 0.16, true);
      drawWingPair(g, Math.sin(b.flap + 0.55), 0.12, true);

      g.save();
      g.translate(1, -1.5);
      g.globalAlpha = 0.55;
      drawWingPair(g, -flapVal, 0.5, false);
      g.restore();

      const legPhase = Math.sin(t * 14);
      const legPhase2 = Math.sin(t * 14 + Math.PI);
      drawLeg(g, -2, 4.2, 1, 0.5 + legPhase * 0.15, 0.3 + legPhase * 0.2);
      drawLeg(g, -2, -4.2, -1, 0.5 - legPhase * 0.15, 0.3 - legPhase * 0.2);
      g.save();
      drawLeg(g, -7.5, 3.6, 1.15, 0.6 + legPhase2 * 0.12, 0.5 + legPhase2 * 0.15);
      drawLeg(g, -7.5, -3.6, -1.15, 0.6 - legPhase2 * 0.12, 0.5 - legPhase2 * 0.15);
      g.restore();
      drawLeg(g, 6, 3, 0.85, 0.4 + legPhase * 0.2, 0.2 + legPhase * 0.25);
      drawLeg(g, 6, -3, -0.85, 0.4 - legPhase * 0.2, 0.2 - legPhase * 0.25);

      const abdGrad = g.createRadialGradient(-6, -3, 1, -9.5, 0.5, 15);
      abdGrad.addColorStop(0, "#ffe9a3");
      abdGrad.addColorStop(0.35, "#f9c454");
      abdGrad.addColorStop(0.65, "#e0932a");
      abdGrad.addColorStop(0.85, "#a86416");
      abdGrad.addColorStop(1, "#5e3608");
      g.fillStyle = abdGrad;
      g.beginPath();
      g.ellipse(-9.5, 0, 9.3, 6.7, 0.1, 0, Math.PI * 2);
      g.fill();

      g.save();
      g.beginPath();
      g.ellipse(-9.5, 0, 9.3, 6.7, 0.1, 0, Math.PI * 2);
      g.clip();
      const stripeGrad = g.createLinearGradient(-18, 0, -1, 0);
      stripeGrad.addColorStop(0, "#150c02");
      stripeGrad.addColorStop(1, "#2c1c06");
      g.fillStyle = stripeGrad;
      [-6.6, -1.8, 3.0, 7.6].forEach((y0, i) => {
        g.beginPath();
        g.ellipse(-8.6 - y0 * 0.55, y0, 6.6 - i * 0.15, 2.15, -0.12, 0, Math.PI * 2);
        g.fill();
      });
      const sheenGrad = g.createLinearGradient(-9.5, -6.7, -9.5, 6.7);
      sheenGrad.addColorStop(0, "rgba(255,255,255,0.28)");
      sheenGrad.addColorStop(0.4, "rgba(255,255,255,0.03)");
      sheenGrad.addColorStop(1, "rgba(0,0,0,0.12)");
      g.fillStyle = sheenGrad;
      g.beginPath();
      g.ellipse(-9.5, 0, 9.3, 6.7, 0.1, 0, Math.PI * 2);
      g.fill();
      g.strokeStyle = "rgba(0,0,0,0.18)";
      g.lineWidth = 0.5;
      [-4.2, 0.4, 5.0].forEach((y0) => {
        g.beginPath();
        g.moveTo(-17.5, y0 - 2.2);
        g.quadraticCurveTo(-9, y0, -2, y0 - 1.4);
        g.stroke();
      });
      g.restore();

      g.fillStyle = "#241405";
      g.beginPath();
      g.moveTo(-18.4, 0.5);
      g.lineTo(-22.5, -0.15);
      g.lineTo(-18.4, -1);
      g.closePath();
      g.fill();

      drawFuzzTexture(g, -15.5, 0, 3, "rgba(70,45,15,0.5)", 14, 0.6, 1.6, 0);

      drawFuzzTexture(g, 0.5, 0, 7.6, "rgba(90,55,15,0.55)", 30, 1, 2.4, 0.1);
      const thoraxGrad = g.createRadialGradient(-1.5, -2.5, 0.5, 0.5, 0, 7.6);
      thoraxGrad.addColorStop(0, "#f2c877");
      thoraxGrad.addColorStop(0.4, "#c9902f");
      thoraxGrad.addColorStop(0.75, "#8a5410");
      thoraxGrad.addColorStop(1, "#4a2c08");
      g.fillStyle = thoraxGrad;
      g.beginPath();
      g.ellipse(0.5, 0, 7.3, 6.6, 0, 0, Math.PI * 2);
      g.fill();
      drawFuzzTexture(g, 0.5, 0, 6.6, "#c9902f", 46, 1.4, 3.4, 0.3);

      g.save();
      g.translate(1, 1.5);
      drawWingPair(g, flapVal, 0.82, false);
      g.restore();

      g.fillStyle = "#1c1003";
      g.beginPath();
      g.moveTo(4.8, -5.2);
      g.quadraticCurveTo(8.2, -4.3, 8.7, -2.0);
      g.quadraticCurveTo(7.3, -3.9, 4.8, -5.2);
      g.fill();
      g.beginPath();
      g.moveTo(4.8, 5.2);
      g.quadraticCurveTo(8.2, 4.3, 8.7, 2.0);
      g.quadraticCurveTo(7.3, 3.9, 4.8, 5.2);
      g.fill();

      const headGrad = g.createRadialGradient(11.5, -1.2, 0.5, 9.6, 0, 6.4);
      headGrad.addColorStop(0, "#6a4018");
      headGrad.addColorStop(0.6, "#3a2008");
      headGrad.addColorStop(1, "#1c0f03");
      g.fillStyle = headGrad;
      g.beginPath();
      g.ellipse(9.8, 0, 5.7, 5, 0, 0, Math.PI * 2);
      g.fill();
      drawFuzzTexture(g, 8.5, 0, 4.6, "rgba(80,50,15,0.4)", 16, 0.5, 1.1, 0.2);

      [-1.9, 1.9].forEach((ey) => {
        const eyeGrad = g.createRadialGradient(11.6, ey, 0.2, 11.6, ey, 3.0);
        eyeGrad.addColorStop(0, "#3a2410");
        eyeGrad.addColorStop(0.55, "#160c04");
        eyeGrad.addColorStop(1, "#050301");
        g.save();
        g.fillStyle = eyeGrad;
        g.beginPath();
        g.ellipse(11.4, ey, 2.7, 2.1, ey < 0 ? -0.22 : 0.22, 0, Math.PI * 2);
        g.fill();
        g.clip();
        g.strokeStyle = "rgba(0,0,0,0.35)";
        g.lineWidth = 0.25;
        for (let fx = -3; fx <= 3; fx++) {
          for (let fy = -3; fy <= 3; fy++) {
            const px = 11.4 + fx * 0.85 + (fy % 2) * 0.42;
            const py = ey + fy * 0.75;
            g.beginPath();
            g.arc(px, py, 0.42, 0, Math.PI * 2);
            g.stroke();
          }
        }
        g.restore();
        g.fillStyle = "rgba(255,255,255,0.8)";
        g.beginPath();
        g.arc(12.3, ey - 0.7, 0.45, 0, Math.PI * 2);
        g.fill();
      });

      const antT = Math.sin(t * 3.2) * 0.22;
      const antT2 = Math.cos(t * 2.6) * 0.15;
      g.strokeStyle = "#241505";
      g.lineWidth = 1;
      g.lineCap = "round";
      [1, -1].forEach((side) => {
        g.beginPath();
        g.moveTo(11.2, side * 4.0);
        const elbowX = 14.6;
        const elbowY = side * (7.4 + antT2 * side);
        g.lineTo(elbowX, elbowY);
        g.stroke();
        g.beginPath();
        g.moveTo(elbowX, elbowY);
        const tipX = elbowX + 5.4 + antT * side;
        const tipY = elbowY + side * (3.6 - antT * 2);
        g.lineTo(tipX, tipY);
        g.stroke();
        g.fillStyle = "#241505";
        g.beginPath();
        g.arc(tipX, tipY, 0.55, 0, Math.PI * 2);
        g.fill();
      });

      g.restore();
    }

    function drawShadow(g, b) {
      const spread = (6 + speedOf() * 0.016) * b.scale;
      const grad = g.createRadialGradient(b.x, b.y + 16, 1, b.x, b.y + 16, spread);
      if (currentIsDark) {
        grad.addColorStop(0, "rgba(255,214,140,0.14)");
        grad.addColorStop(1, "rgba(255,214,140,0)");
      } else {
        grad.addColorStop(0, "rgba(0,0,0,0.16)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
      }
      g.fillStyle = grad;
      g.beginPath();
      g.arc(b.x, b.y + 16, spread, 0, Math.PI * 2);
      g.fill();
    }

    let lastTime = performance.now();

    function loop(now) {
      if (!running) return;
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      currentIsDark = computeIsDark();

      step(now, dt);

      ctx.clearRect(0, 0, W, H);
      drawShadow(ctx, bee);
      drawGlow(ctx, bee);
      drawBee(ctx, bee);

      rafId = requestAnimationFrame(loop);
    }

    function onPointerMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.lastMove = performance.now();
    }

    function onVisibility() {
      running = !document.hidden;
      if (running) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(loop);
      } else if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    function onBlur() {
      running = false;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }

    function onFocus() {
      if (document.hidden) return;
      running = true;
      lastTime = performance.now();
      if (!rafId) rafId = requestAnimationFrame(loop);
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", resize);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    if (vv) {
      vv.addEventListener("resize", resize);
      vv.addEventListener("scroll", resize);
    }

    resize();

    const start = () => {
      if (running) {
        initBee();
        currentIsDark = computeIsDark();
        rafId = requestAnimationFrame(loop);
      }
    };
    if ("requestIdleCallback" in window && window.requestIdleCallback) {
      idleHandle = window.requestIdleCallback(start, { timeout: 2500 });
    } else {
      idleHandle = window.setTimeout(start, 1600);
    }

    return () => {
      running = false;
      if (typeof idleHandle === "number") {
        if ("cancelIdleCallback" in window) window.cancelIdleCallback(idleHandle);
        else window.clearTimeout(idleHandle);
      }
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      if (vv) {
        vv.removeEventListener("resize", resize);
        vv.removeEventListener("scroll", resize);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-[45]"
    />
  );
}
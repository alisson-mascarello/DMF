(() => {
  const SVG_NS = "http://www.w3.org/2000/svg";

  const CANDLES = [
    { x: 15, wickY: 70, wickH: 40, bodyY: 82, bodyH: 18, bearish: false, duration: 5.2, delay: 0, amplitude: -9 },
    { x: 45, wickY: 60, wickH: 45, bodyY: 72, bodyH: 23, bearish: false, duration: 6.4, delay: -1.2, amplitude: -12 },
    { x: 75, wickY: 66, wickH: 34, bodyY: 80, bodyH: 12, bearish: true, duration: 4.8, delay: -2.4, amplitude: 8 },
    { x: 105, wickY: 45, wickH: 45, bodyY: 55, bodyH: 25, bearish: false, duration: 6, delay: -0.6, amplitude: -10 },
    { x: 135, wickY: 35, wickH: 45, bodyY: 45, bodyH: 25, bearish: false, duration: 5.6, delay: -3.1, amplitude: -12 },
    { x: 165, wickY: 38, wickH: 30, bodyY: 50, bodyH: 12, bearish: true, duration: 4.6, delay: -1.8, amplitude: 9 },
    { x: 195, wickY: 15, wickH: 45, bodyY: 22, bodyH: 28, bearish: false, duration: 6.8, delay: -4, amplitude: -10 }
  ];

  const SLICES = [
    { base: 35, amplitude: 0.3, period: 9, phase: 0, opacity: 0.14 },
    { base: 25, amplitude: 0.4, period: 11, phase: 1.7, opacity: 0.24 },
    { base: 22, amplitude: 0.35, period: 8, phase: 3.1, opacity: 0.34 },
    { base: 18, amplitude: 0.4, period: 10, phase: 4.6, opacity: 0.48 }
  ];

  const wave = (t, period, phase = 0) => Math.sin((2 * Math.PI * t) / period + phase);

  const createCandles = () => {
    const container = document.querySelector(".deco-candles");
    if (!container) return;

    CANDLES.forEach((c) => {
      const candle = document.createElement("span");
      candle.className = c.bearish ? "candle bearish" : "candle";
      Object.entries({
        "--x": `${c.x}px`,
        "--wick-y": `${c.wickY}px`,
        "--wick-h": `${c.wickH}px`,
        "--body-y": `${c.bodyY}px`,
        "--body-h": `${c.bodyH}px`,
        "--duration": `${c.duration}s`,
        "--delay": `${c.delay}s`,
        "--amplitude": `${c.amplitude}px`
      }).forEach(([name, value]) => candle.style.setProperty(name, value));
      container.append(candle);
    });
  };

  const createChart = () => {
    const line = document.querySelector(".chart-line");
    const area = document.querySelector(".chart-area");
    if (!line || !area) return null;

    const POINTS = 13;
    const WIDTH = 1200;
    const HEIGHT = 220;

    const trend = Array.from({ length: POINTS }, (_, i) => 180 - 140 * (i / (POINTS - 1)) ** 0.92);

    const heightsAt = (t) =>
      trend.map((base, i) => {
        const variation = 14 * wave(t, 28, -i * 0.7) + 9 * wave(t, 44, i * 1.3) + 5 * wave(t, 17, -i * 2.1);
        return Math.max(4, Math.min(HEIGHT - 4, base + variation));
      });

    const curve = (points) =>
      points.reduce((path, [x, y], i) => {
        if (i === 0) return `M${x} ${y.toFixed(1)}`;
        const [x0, y0] = points[i - 2] ?? points[i - 1];
        const [x1, y1] = points[i - 1];
        const [x3, y3] = points[i + 1] ?? [x, y];
        const c1 = [x1 + (x - x0) / 6, y1 + (y - y0) / 6];
        const c2 = [x - (x3 - x1) / 6, y - (y3 - y1) / 6];
        return `${path}C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
      }, "");

    return (t) => {
      const points = heightsAt(t).map((y, i) => [(WIDTH / (POINTS - 1)) * i, y]);
      const path = curve(points);
      line.setAttribute("d", path);
      area.setAttribute("d", `${path}L${WIDTH} ${HEIGHT}L0 ${HEIGHT}Z`);
    };
  };

  const createPie = () => {
    const svg = document.querySelector(".deco-pie");
    if (!svg) return null;

    const RADIUS = 34;
    const CENTER = 60;

    const elements = SLICES.map(({ opacity }) => {
      const slice = document.createElementNS(SVG_NS, "path");
      slice.setAttribute("class", "slice");
      slice.setAttribute("fill-opacity", opacity);
      svg.append(slice);
      return slice;
    });

    const pointAtAngle = (degrees) => {
      const radians = (degrees * Math.PI) / 180;
      return [CENTER + RADIUS * Math.cos(radians), CENTER + RADIUS * Math.sin(radians)];
    };

    return (t) => {
      const weights = SLICES.map((f) => f.base * (1 + f.amplitude * wave(t, f.period, f.phase)));
      const total = weights.reduce((sum, weight) => sum + weight, 0);

      let start = -90;
      elements.forEach((slice, i) => {
        const degrees = (weights[i] / total) * 360;
        const end = start + degrees;
        const [x0, y0] = pointAtAngle(start);
        const [x1, y1] = pointAtAngle(end);
        slice.setAttribute(
          "d",
          `M${CENTER} ${CENTER}L${x0.toFixed(2)} ${y0.toFixed(2)}A${RADIUS} ${RADIUS} 0 ${degrees > 180 ? 1 : 0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}Z`
        );
        start = end;
      });
    };
  };

  createCandles();

  const drawers = [createChart(), createPie()].filter(Boolean);
  const draw = (t) => drawers.forEach((drawer) => drawer(t));

  draw(0);

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const STORAGE_KEY = "dmf-motion";
  const root = document.documentElement;
  const toggle = document.getElementById("motion-toggle");
  const hero = document.querySelector(".hero");

  const readSaved = () => {
    try {
      return localStorage.getItem(STORAGE_KEY) === "paused";
    } catch {
      return false;
    }
  };

  let paused = readSaved();
  let visible = false;
  let frameId = 0;
  let elapsed = 0;
  let lastFrame = 0;

  const animate = (ms) => {
    elapsed += (ms - lastFrame) / 1000;
    lastFrame = ms;
    draw(elapsed);
    frameId = requestAnimationFrame(animate);
  };

  const stop = () => {
    cancelAnimationFrame(frameId);
    frameId = 0;
  };

  const sync = () => {
    root.dataset.motion = paused ? "paused" : "running";
    if (toggle) {
      const label = paused ? "Retomar animações" : "Pausar animações";
      toggle.setAttribute("aria-pressed", String(paused));
      toggle.setAttribute("aria-label", label);
      toggle.title = label;
    }
    if (paused || !visible) return stop();
    if (!frameId) {
      lastFrame = performance.now();
      frameId = requestAnimationFrame(animate);
    }
  };

  toggle?.addEventListener("click", () => {
    paused = !paused;
    try {
      localStorage.setItem(STORAGE_KEY, paused ? "paused" : "running");
    } catch {}
    sync();
  });

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  }).observe(hero);
})();

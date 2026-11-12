(() => {
  const SVG_NS = "http://www.w3.org/2000/svg";

  const CANDLES = [
    { x: 15, pavioY: 70, pavioH: 40, corpoY: 82, corpoH: 18, baixa: false, duracao: 5.2, atraso: 0, amplitude: -9 },
    { x: 45, pavioY: 60, pavioH: 45, corpoY: 72, corpoH: 23, baixa: false, duracao: 6.4, atraso: -1.2, amplitude: -12 },
    { x: 75, pavioY: 66, pavioH: 34, corpoY: 80, corpoH: 12, baixa: true, duracao: 4.8, atraso: -2.4, amplitude: 8 },
    { x: 105, pavioY: 45, pavioH: 45, corpoY: 55, corpoH: 25, baixa: false, duracao: 6, atraso: -0.6, amplitude: -10 },
    { x: 135, pavioY: 35, pavioH: 45, corpoY: 45, corpoH: 25, baixa: false, duracao: 5.6, atraso: -3.1, amplitude: -12 },
    { x: 165, pavioY: 38, pavioH: 30, corpoY: 50, corpoH: 12, baixa: true, duracao: 4.6, atraso: -1.8, amplitude: 9 },
    { x: 195, pavioY: 15, pavioH: 45, corpoY: 22, corpoH: 28, baixa: false, duracao: 6.8, atraso: -4, amplitude: -10 }
  ];

  const FATIAS = [
    { base: 35, amplitude: 0.3, periodo: 9, fase: 0, opacidade: 0.14 },
    { base: 25, amplitude: 0.4, periodo: 11, fase: 1.7, opacidade: 0.24 },
    { base: 22, amplitude: 0.35, periodo: 8, fase: 3.1, opacidade: 0.34 },
    { base: 18, amplitude: 0.4, periodo: 10, fase: 4.6, opacidade: 0.48 }
  ];

  const onda = (t, periodo, fase = 0) => Math.sin((2 * Math.PI * t) / periodo + fase);

  const criarCandles = () => {
    const container = document.querySelector(".deco-candles");
    if (!container) return;

    CANDLES.forEach((c) => {
      const candle = document.createElement("span");
      candle.className = c.baixa ? "candle baixa" : "candle";
      Object.entries({
        "--x": `${c.x}px`,
        "--pavio-y": `${c.pavioY}px`,
        "--pavio-h": `${c.pavioH}px`,
        "--corpo-y": `${c.corpoY}px`,
        "--corpo-h": `${c.corpoH}px`,
        "--duracao": `${c.duracao}s`,
        "--atraso": `${c.atraso}s`,
        "--amplitude": `${c.amplitude}px`
      }).forEach(([nome, valor]) => candle.style.setProperty(nome, valor));
      container.append(candle);
    });
  };

  const criarGrafico = () => {
    const linha = document.querySelector(".grafico-linha");
    const area = document.querySelector(".grafico-area");
    if (!linha || !area) return null;

    const PONTOS = 13;
    const LARGURA = 1200;
    const ALTURA = 220;

    const tendencia = Array.from({ length: PONTOS }, (_, i) => 180 - 140 * (i / (PONTOS - 1)) ** 0.92);

    const alturasEm = (t) =>
      tendencia.map((base, i) => {
        const variacao = 14 * onda(t, 28, -i * 0.7) + 9 * onda(t, 44, i * 1.3) + 5 * onda(t, 17, -i * 2.1);
        return Math.max(4, Math.min(ALTURA - 4, base + variacao));
      });

    const curva = (pontos) =>
      pontos.reduce((caminho, [x, y], i) => {
        if (i === 0) return `M${x} ${y.toFixed(1)}`;
        const [x0, y0] = pontos[i - 2] ?? pontos[i - 1];
        const [x1, y1] = pontos[i - 1];
        const [x3, y3] = pontos[i + 1] ?? [x, y];
        const c1 = [x1 + (x - x0) / 6, y1 + (y - y0) / 6];
        const c2 = [x - (x3 - x1) / 6, y - (y3 - y1) / 6];
        return `${caminho}C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
      }, "");

    return (t) => {
      const pontos = alturasEm(t).map((y, i) => [(LARGURA / (PONTOS - 1)) * i, y]);
      const caminho = curva(pontos);
      linha.setAttribute("d", caminho);
      area.setAttribute("d", `${caminho}L${LARGURA} ${ALTURA}L0 ${ALTURA}Z`);
    };
  };

  const criarPizza = () => {
    const svg = document.querySelector(".deco-pizza");
    if (!svg) return null;

    const RAIO = 34;
    const CENTRO = 60;

    const elementos = FATIAS.map(({ opacidade }) => {
      const fatia = document.createElementNS(SVG_NS, "path");
      fatia.setAttribute("class", "fatia");
      fatia.setAttribute("fill-opacity", opacidade);
      svg.append(fatia);
      return fatia;
    });

    const pontoNoAngulo = (graus) => {
      const radianos = (graus * Math.PI) / 180;
      return [CENTRO + RAIO * Math.cos(radianos), CENTRO + RAIO * Math.sin(radianos)];
    };

    return (t) => {
      const pesos = FATIAS.map((f) => f.base * (1 + f.amplitude * onda(t, f.periodo, f.fase)));
      const total = pesos.reduce((soma, peso) => soma + peso, 0);

      let inicio = -90;
      elementos.forEach((fatia, i) => {
        const graus = (pesos[i] / total) * 360;
        const fim = inicio + graus;
        const [x0, y0] = pontoNoAngulo(inicio);
        const [x1, y1] = pontoNoAngulo(fim);
        fatia.setAttribute(
          "d",
          `M${CENTRO} ${CENTRO}L${x0.toFixed(2)} ${y0.toFixed(2)}A${RAIO} ${RAIO} 0 ${graus > 180 ? 1 : 0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}Z`
        );
        inicio = fim;
      });
    };
  };

  criarCandles();

  const desenhos = [criarGrafico(), criarPizza()].filter(Boolean);
  const desenhar = (t) => desenhos.forEach((desenho) => desenho(t));

  desenhar(0);

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let quadroId = 0;

  const animar = (ms) => {
    desenhar(ms / 1000);
    quadroId = requestAnimationFrame(animar);
  };

  new IntersectionObserver(([entrada]) => {
    if (entrada.isIntersecting) {
      if (!quadroId) quadroId = requestAnimationFrame(animar);
    } else {
      cancelAnimationFrame(quadroId);
      quadroId = 0;
    }
  }).observe(document.querySelector(".hero"));
})();

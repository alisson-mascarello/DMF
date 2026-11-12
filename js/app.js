(() => {
  const $lista = document.getElementById("lista");
  const $busca = document.getElementById("busca");
  const $indice = document.getElementById("indice");
  const $contagem = document.getElementById("contagem");
  const $toggleTodas = document.getElementById("toggle-todas");

  const ALFABETO = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

  let expandirTodas = false;

  const normalizar = (texto = "") =>
    texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  const escapar = (texto = "") => texto.replace(/[&<>"']/g, (c) => ESCAPES[c]);

  const letraDe = ({ termo }) => {
    const letra = normalizar(termo).charAt(0).toUpperCase();
    return ALFABETO.includes(letra) ? letra : "#";
  };

  const ordenados = [...TERMOS].sort((a, b) =>
    normalizar(a.termo).localeCompare(normalizar(b.termo), "pt-BR")
  );

  const destacar = (texto = "", consulta) => {
    if (!consulta) return escapar(texto);
    const posicao = normalizar(texto).indexOf(consulta);
    if (posicao < 0 || normalizar(texto).length !== texto.length) return escapar(texto);
    const fim = posicao + consulta.length;
    return (
      escapar(texto.slice(0, posicao)) +
      `<mark>${escapar(texto.slice(posicao, fim))}</mark>` +
      escapar(texto.slice(fim))
    );
  };

  const cartao = (t, consulta) => {
    const d = (texto) => destacar(texto, consulta);
    return `
      <article class="termo">
        <h3>${d(t.termo)}${t.en ? ` <span class="en">(${d(t.en)})</span>` : ""}</h3>
        ${t.sigla ? `<p class="sigla"><span>Sigla</span> de ${d(t.sigla)}</p>` : ""}
        <p class="simples">${d(t.simples)}</p>
        ${t.detalhada ? `<details${expandirTodas ? " open" : ""}><summary>Explicação detalhada</summary><p>${d(t.detalhada)}</p></details>` : ""}
        ${t.exemplo ? `<div class="exemplo"><strong>Exemplo:</strong> ${d(t.exemplo)}</div>` : ""}
      </article>`;
  };

  const atualizarBotaoTodas = () => {
    const detalhes = [...$lista.querySelectorAll("details")];
    const todasAbertas = detalhes.length > 0 && detalhes.every((d) => d.open);
    if (detalhes.length > 0) expandirTodas = todasAbertas;
    $toggleTodas.disabled = detalhes.length === 0;
    $toggleTodas.setAttribute("aria-expanded", String(todasAbertas));
    $toggleTodas.querySelector("span").textContent = todasAbertas ? "Recolher todas" : "Expandir todas";
  };

  const renderizar = () => {
    const consulta = normalizar($busca.value.trim());
    const filtrados = ordenados.filter((t) =>
      normalizar([t.termo, t.sigla, t.en, t.simples, t.detalhada, t.exemplo].join(" ")).includes(consulta)
    );

    const grupos = {};
    filtrados.forEach((t) => (grupos[letraDe(t)] ??= []).push(t));

    const letras = [...ALFABETO, "#"].filter((letra) => grupos[letra]);

    $indice.innerHTML = [...ALFABETO, ...(grupos["#"] ? ["#"] : [])]
      .map((letra) => (grupos[letra] ? `<a href="#letra-${letra}">${letra}</a>` : `<span>${letra}</span>`))
      .join("");

    $lista.innerHTML = letras.length
      ? letras
          .map((letra) => `<h2 class="letra" id="letra-${letra}">${letra}</h2>${grupos[letra].map((t) => cartao(t, consulta)).join("")}`)
          .join("")
      : `<p class="vazio">Nenhum termo encontrado.</p>`;

    $contagem.textContent = `${filtrados.length} de ${TERMOS.length} termos`;
    atualizarBotaoTodas();
  };

  $toggleTodas.addEventListener("click", () => {
    const abrir = !expandirTodas;
    $lista.querySelectorAll("details").forEach((d) => (d.open = abrir));
    atualizarBotaoTodas();
  });

  $lista.addEventListener("toggle", atualizarBotaoTodas, true);
  $busca.addEventListener("input", renderizar);

  renderizar();
})();

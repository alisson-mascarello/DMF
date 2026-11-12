(() => {
  const $list = document.getElementById("list");
  const $search = document.getElementById("search");
  const $index = document.getElementById("index");
  const $count = document.getElementById("count");
  const $toggleAll = document.getElementById("toggle-all");

  const ALPHABET = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
  const HTML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

  let expandAll = false;

  const normalize = (text = "") =>
    text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  const escapeHtml = (text = "") => text.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);

  const letterOf = ({ term }) => {
    const letter = normalize(term).charAt(0).toUpperCase();
    return ALPHABET.includes(letter) ? letter : "#";
  };

  const sortedTerms = [...TERMS].sort((a, b) =>
    normalize(a.term).localeCompare(normalize(b.term), "pt-BR")
  );

  const highlight = (text = "", query) => {
    if (!query) return escapeHtml(text);
    const position = normalize(text).indexOf(query);
    if (position < 0 || normalize(text).length !== text.length) return escapeHtml(text);
    const end = position + query.length;
    return (
      escapeHtml(text.slice(0, position)) +
      `<mark>${escapeHtml(text.slice(position, end))}</mark>` +
      escapeHtml(text.slice(end))
    );
  };

  const renderCard = (t, query) => {
    const d = (text) => highlight(text, query);
    return `
      <article class="term">
        <h3>${d(t.term)}${t.en ? ` <span class="en">(${d(t.en)})</span>` : ""}</h3>
        ${t.acronym ? `<p class="acronym"><span>Sigla</span> de ${d(t.acronym)}</p>` : ""}
        <p class="simple">${d(t.simple)}</p>
        ${t.detailed ? `<details${expandAll ? " open" : ""}><summary>Explicação detalhada</summary><p>${d(t.detailed)}</p></details>` : ""}
        ${t.example ? `<div class="example"><strong>Exemplo:</strong> ${d(t.example)}</div>` : ""}
      </article>`;
  };

  const updateToggleAllButton = () => {
    const detailsList = [...$list.querySelectorAll("details")];
    const allOpen = detailsList.length > 0 && detailsList.every((d) => d.open);
    if (detailsList.length > 0) expandAll = allOpen;
    $toggleAll.disabled = detailsList.length === 0;
    $toggleAll.setAttribute("aria-expanded", String(allOpen));
    $toggleAll.querySelector("span").textContent = allOpen ? "Recolher todas" : "Expandir todas";
  };

  const render = () => {
    const query = normalize($search.value.trim());
    const filtered = sortedTerms.filter((t) =>
      normalize([t.term, t.acronym, t.en, t.simple, t.detailed, t.example].join(" ")).includes(query)
    );

    const groups = {};
    filtered.forEach((t) => (groups[letterOf(t)] ??= []).push(t));

    const letters = [...ALPHABET, "#"].filter((letter) => groups[letter]);

    $index.innerHTML = [...ALPHABET, ...(groups["#"] ? ["#"] : [])]
      .map((letter) => (groups[letter] ? `<a href="#letter-${letter}">${letter}</a>` : `<span>${letter}</span>`))
      .join("");

    $list.innerHTML = letters.length
      ? letters
          .map((letter) => `<h2 class="letter" id="letter-${letter}">${letter}</h2>${groups[letter].map((t) => renderCard(t, query)).join("")}`)
          .join("")
      : `<p class="empty">Nenhum termo encontrado.</p>`;

    $count.textContent = `${filtered.length} de ${TERMS.length} termos`;
    updateToggleAllButton();
  };

  $toggleAll.addEventListener("click", () => {
    const open = !expandAll;
    $list.querySelectorAll("details").forEach((d) => (d.open = open));
    updateToggleAllButton();
  });

  $list.addEventListener("toggle", updateToggleAllButton, true);
  $search.addEventListener("input", render);

  render();
})();

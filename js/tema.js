(() => {
  const CHAVE = "dmf-tema";
  const raiz = document.documentElement;
  const sistemaEscuro = matchMedia("(prefers-color-scheme: dark)");

  const lerSalvo = () => {
    try {
      const valor = localStorage.getItem(CHAVE);
      return valor === "light" || valor === "dark" ? valor : null;
    } catch {
      return null;
    }
  };

  const salvar = (tema) => {
    try {
      localStorage.setItem(CHAVE, tema);
    } catch {}
  };

  const temaInicial = () => lerSalvo() ?? (sistemaEscuro.matches ? "dark" : "light");

  const atualizarBotao = () => {
    const botao = document.getElementById("tema-toggle");
    if (!botao) return;
    const escuro = raiz.dataset.theme === "dark";
    botao.setAttribute("aria-label", escuro ? "Mudar para o modo claro" : "Mudar para o modo escuro");
    botao.title = escuro ? "Modo claro" : "Modo escuro";
  };

  const aplicar = (tema) => {
    raiz.dataset.theme = tema;
    atualizarBotao();
  };

  aplicar(temaInicial());

  document.addEventListener("DOMContentLoaded", () => {
    atualizarBotao();

    document.getElementById("tema-toggle")?.addEventListener("click", () => {
      const novo = raiz.dataset.theme === "dark" ? "light" : "dark";
      salvar(novo);
      aplicar(novo);
    });

    sistemaEscuro.addEventListener("change", () => {
      if (!lerSalvo()) aplicar(temaInicial());
    });
  });
})();

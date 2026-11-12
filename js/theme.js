(() => {
  const STORAGE_KEY = "dmf-theme";
  const root = document.documentElement;
  const systemDark = matchMedia("(prefers-color-scheme: dark)");

  const readSaved = () => {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value === "light" || value === "dark" ? value : null;
    } catch {
      return null;
    }
  };

  const save = (theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
  };

  const initialTheme = () => readSaved() ?? (systemDark.matches ? "dark" : "light");

  const updateButton = () => {
    const button = document.getElementById("theme-toggle");
    if (!button) return;
    const isDark = root.dataset.theme === "dark";
    button.setAttribute("aria-label", isDark ? "Mudar para o modo claro" : "Mudar para o modo escuro");
    button.title = isDark ? "Modo claro" : "Modo escuro";
  };

  const apply = (theme) => {
    root.dataset.theme = theme;
    updateButton();
  };

  apply(initialTheme());

  document.addEventListener("DOMContentLoaded", () => {
    updateButton();

    document.getElementById("theme-toggle")?.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      save(next);
      apply(next);
    });

    systemDark.addEventListener("change", () => {
      if (!readSaved()) apply(initialTheme());
    });
  });
})();

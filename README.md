# Dicionário do Mercado Financeiro

Dicionário de termos do mercado financeiro em português, com explicação **simples** e **detalhada** para cada termo, busca instantânea, índice alfabético e tema claro/escuro.

É um site estático (HTML, CSS e JavaScript puros), sem dependências nem etapa de build.

## Funcionalidades

- Explicação simples (sempre visível) e explicação detalhada (expansível), com exemplo prático
- Siglas com o significado por extenso (por exemplo, CDI: Certificado de Depósito Interbancário)
- Busca por termo, sigla, equivalente em inglês ou conteúdo das definições, ignorando acentos e maiúsculas, com destaque do trecho encontrado
- Ordem alfabética automática e índice por letra
- Botão para expandir ou recolher todas as explicações detalhadas de uma vez
- Modo claro e escuro: segue a preferência do sistema, pode ser alternado pelo botão e a escolha fica salva no navegador
- Cabeçalho animado com gráfico de linha, candles e gráfico de pizza, que pausa quando sai da tela e fica estático para quem prefere movimento reduzido
- Layout responsivo

## Como usar

Abra o `index.html` no navegador. Não precisa de servidor.

## Compatibilidade

Requer um navegador moderno, por causa de `light-dark()` e `color-mix()` no CSS:

- Chrome e Edge 123 ou superior
- Firefox 120 ou superior
- Safari 17.5 ou superior

## Estrutura

```
DMF/
├── index.html        # marcação da página
├── css/
│   └── style.css     # estilos e tema claro/escuro
├── js/
│   ├── termos.js     # dados: array TERMOS
│   ├── app.js        # busca, ordenação, índice e renderização
│   ├── tema.js       # alternância entre tema claro e escuro
│   └── hero.js       # animações do cabeçalho
├── README.md
└── LICENSE
```

## Como adicionar um termo

Os termos ficam no array `TERMOS`, em `js/termos.js`. Adicione um novo objeto ao array (a ordem não importa, a página ordena de A a Z):

```js
{
  termo: "CDI",
  sigla: "Certificado de Depósito Interbancário",
  en: "interbank deposit rate",
  simples: "Taxa de referência do mercado de renda fixa, muito próxima da taxa Selic.",
  detalhada: "Texto mais completo, com contexto, usos e cuidados.",
  exemplo: "Exemplo prático em uma ou duas frases."
},
```

| Campo       | Obrigatório | Descrição                                               |
|-------------|-------------|---------------------------------------------------------|
| `termo`     | sim         | Nome do termo                                           |
| `simples`   | sim         | Definição direta e objetiva (1 a 2 frases)              |
| `sigla`     | não         | Significado por extenso, quando o termo for uma sigla   |
| `en`        | não         | Equivalente em inglês                                   |
| `detalhada` | não         | Explicação aprofundada                                  |
| `exemplo`   | não         | Exemplo prático                                         |

Quando um texto citar uma sigla que ainda não tem verbete, vale criar o termo correspondente.

## Personalização

- **Cores:** ficam como variáveis no início de `css/style.css`. Cada cor é definida uma única vez, no formato `light-dark(claro, escuro)`.
- **Animações do cabeçalho:** as constantes `CANDLES` e `FATIAS`, no início de `js/hero.js`, controlam os candles e as fatias da pizza. O formato do gráfico de linha é ajustado em `criarGrafico`.

## Aviso

O conteúdo tem caráter educativo e informativo. Não constitui recomendação de investimento.

## Licença

Distribuído sob a licença [MIT](LICENSE).

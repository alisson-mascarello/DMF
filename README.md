# Dicionário do Mercado Financeiro

Dicionário de termos do mercado financeiro em português, com explicação **simples** e **detalhada** para cada termo, busca instantânea e índice alfabético.

É um site estático (HTML, CSS e JavaScript puros), sem dependências nem etapa de build.

## Funcionalidades

- Explicação simples (sempre visível) e explicação detalhada (expansível)
- Exemplo prático em cada termo
- Busca por termo, equivalente em inglês ou conteúdo das definições (ignora acentos)
- Ordem alfabética automática e índice por letra
- Layout responsivo

## Como usar

Abra o `index.html` no navegador. Não precisa de servidor.

## Como adicionar um termo

Os termos ficam no array `TERMOS`, dentro do `index.html`. Adicione um novo objeto ao array (a ordem não importa, a página ordena de A a Z):

```js
{
  termo: "Rebate",
  en: "rebate",
  simples: "Devolução de parte do que foi pago em taxas, corretagem ou comissões.",
  detalhada: "Texto mais completo, com contexto, usos e cuidados.",
  exemplo: "Exemplo prático em uma ou duas frases."
},
```

| Campo       | Obrigatório | Descrição                                   |
|-------------|-------------|---------------------------------------------|
| `termo`     | sim         | Nome do termo                               |
| `en`        | não         | Equivalente em inglês                       |
| `simples`   | sim         | Definição direta e objetiva (1 a 2 frases)  |
| `detalhada` | não         | Explicação aprofundada                      |
| `exemplo`   | não         | Exemplo prático                             |

## Publicação no GitHub Pages

1. Suba os arquivos para o repositório.
2. Vá em **Settings → Pages**.
3. Em **Source**, escolha a branch `main` e a pasta `/ (root)`.
4. Salve. O site ficará disponível em `https://seu-usuario.github.io/nome-do-repositorio/`.

## Aviso

O conteúdo tem caráter educativo e informativo. Não constitui recomendação de investimento.

## Licença

Distribuído sob a licença [MIT](LICENSE).

const TERMOS = [
  {
    termo: "Ação",
    en: "stock / share",
    simples: "Menor parte do capital de uma empresa. Quem compra uma ação se torna sócio da companhia.",
    detalhada: "Ações são negociadas em bolsa e podem render ganhos pela valorização do preço e pelo recebimento de dividendos. O investidor também assume o risco: se a empresa for mal, o preço pode cair.",
    exemplo: "Ao comprar 100 ações de uma empresa a R$ 10 cada, você investe R$ 1.000 e passa a ter uma pequena fatia dela."
  },
  {
    termo: "Copom",
    sigla: "Comitê de Política Monetária",
    en: "Monetary Policy Committee",
    simples: "Grupo do Banco Central que se reúne para definir a taxa básica de juros (Selic).",
    detalhada: "O Copom se reúne cerca de oito vezes por ano. Em cada reunião, decide se mantém, eleva ou reduz a meta da Selic, com o objetivo de manter a inflação dentro da meta estabelecida. Após cada encontro, divulga um comunicado e, dias depois, a ata, que ajudam o mercado a antecipar os próximos passos.",
    exemplo: "Se o Copom decide elevar a Selic de 10% para 10,5% ao ano, o crédito tende a encarecer e os títulos de renda fixa passam a pagar mais."
  },
  {
    termo: "FGC",
    sigla: "Fundo Garantidor de Créditos",
    en: "Deposit Guarantee Fund",
    simples: "Entidade privada que protege o dinheiro do investidor se um banco ou instituição financeira quebrar.",
    detalhada: "O FGC cobre determinados produtos, como CDB, LCI, LCA e poupança, até um limite por CPF e por instituição (hoje, R$ 250 mil). Ele é mantido por contribuições das próprias instituições financeiras. Ações e fundos de investimento não são cobertos.",
    exemplo: "Se um banco quebrar e você tiver R$ 100 mil em CDB nele, o FGC devolve o valor, pois está dentro do limite."
  },
  {
    termo: "Dividendo",
    en: "dividend",
    simples: "Parte do lucro de uma empresa distribuída aos acionistas.",
    detalhada: "A distribuição é decidida pela empresa, de acordo com seu lucro e sua política de proventos. Após o pagamento, o preço da ação costuma ser ajustado pelo valor distribuído.",
    exemplo: "Se a empresa paga R$ 0,50 por ação e você tem 200 ações, recebe R$ 100."
  },
  {
    termo: "CDI",
    sigla: "Certificado de Depósito Interbancário",
    en: "interbank deposit rate",
    simples: "Taxa de referência do mercado de renda fixa, muito próxima da taxa Selic.",
    detalhada: "O Certificado de Depósito Interbancário é a taxa usada em empréstimos de curtíssimo prazo entre bancos. Serve como parâmetro de rentabilidade de CDBs, fundos e outros investimentos.",
    exemplo: "Um CDB que rende 100% do CDI acompanha essa taxa; um que rende 110% do CDI rende 10% a mais que ela."
  },
  {
    termo: "CDB",
    sigla: "Certificado de Depósito Bancário",
    en: "bank certificate of deposit",
    simples: "Título em que você empresta dinheiro a um banco e recebe juros em troca.",
    detalhada: "Pode ser pós-fixado (atrelado ao CDI), prefixado ou híbrido (ligado à inflação). Conta com a cobertura do FGC até o limite vigente por CPF e instituição.",
    exemplo: "Você aplica R$ 5.000 em um CDB de 100% do CDI por 1 ano e resgata o valor com os juros, descontado o imposto de renda."
  },
  {
    termo: "Liquidez",
    en: "liquidity",
    simples: "Facilidade de transformar um ativo em dinheiro sem perder valor.",
    detalhada: "Ativos de alta liquidez podem ser vendidos rapidamente por um preço próximo ao de mercado. Ativos de baixa liquidez podem demorar a ser vendidos ou exigir desconto.",
    exemplo: "Ações de grandes empresas são vendidas em segundos; um imóvel pode levar meses."
  },
  {
    termo: "Renda fixa",
    en: "fixed income",
    simples: "Investimentos cuja forma de remuneração é definida no momento da aplicação.",
    detalhada: "A regra de rentabilidade pode ser prefixada (taxa fixa), pós-fixada (acompanha um indicador, como o CDI) ou híbrida (taxa mais inflação). Isso não significa que o retorno seja garantido em qualquer cenário.",
    exemplo: "Um título prefixado que paga 12% ao ano informa a taxa já na compra."
  },
  {
    termo: "Selic",
    sigla: "Sistema Especial de Liquidação e de Custódia",
    en: "Selic rate",
    simples: "Taxa básica de juros da economia brasileira, definida pelo Copom do Banco Central.",
    detalhada: "A Selic influencia juros de empréstimos, financiamentos e a rentabilidade de investimentos. Quando sobe, o crédito tende a ficar mais caro e a renda fixa mais atrativa.",
    exemplo: "Com a Selic em alta, o rendimento do Tesouro Selic também aumenta."
  },
  {
    termo: "Volatilidade",
    en: "volatility",
    simples: "Medida de quanto o preço de um ativo sobe e desce em um período.",
    detalhada: "Quanto maior a volatilidade, maiores as oscilações e, em geral, o risco percebido. Costuma ser calculada pelo desvio padrão dos retornos.",
    exemplo: "Uma ação que varia 5% ao dia é mais volátil que um título público que varia 0,05%."
  }
];

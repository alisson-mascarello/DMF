const TERMS = [
  {
    term: "Ação",
    en: "stock / share",
    simple: "Menor parte do capital de uma empresa. Quem compra uma ação se torna sócio da companhia.",
    detailed: "Ações são negociadas em bolsa e podem render ganhos pela valorização do preço e pelo recebimento de dividendos. O investidor também assume o risco: se a empresa for mal, o preço pode cair.",
    example: "Ao comprar 100 ações de uma empresa a R$ 10 cada, você investe R$ 1.000 e passa a ter uma pequena fatia dela."
  },
  {
    term: "Taxa de corretagem",
    en: "brokerage fee",
    simple: "Valor cobrado pela corretora para executar uma ordem de compra ou venda de um ativo.",
    detailed: "Pode ser um valor fixo por ordem, um percentual sobre o valor negociado ou, em muitas corretoras, ser zerada para certos produtos, como ações à vista. Além dela, o investidor pode pagar outros custos, como emolumentos e taxa de liquidação da bolsa e impostos. Vale comparar corretoras, pois a corretagem reduz o retorno, principalmente em operações pequenas e frequentes.",
    example: "Se a corretora cobra R$ 10 por ordem e você compra e vende uma ação, paga R$ 20 em corretagem, mesmo que a operação seja de apenas R$ 500."
  },
  {
    term: "Copom",
    acronym: "Comitê de Política Monetária",
    en: "Monetary Policy Committee",
    simple: "Grupo do Banco Central que se reúne para definir a taxa básica de juros (Selic).",
    detailed: "O Copom se reúne cerca de oito vezes por ano. Em cada reunião, decide se mantém, eleva ou reduz a meta da Selic, com o objetivo de manter a inflação dentro da meta estabelecida. Após cada encontro, divulga um comunicado e, dias depois, a ata, que ajudam o mercado a antecipar os próximos passos.",
    example: "Se o Copom decide elevar a Selic de 10% para 10,5% ao ano, o crédito tende a encarecer e os títulos de renda fixa passam a pagar mais."
  },
  {
    term: "FGC",
    acronym: "Fundo Garantidor de Créditos",
    en: "Deposit Guarantee Fund",
    simple: "Entidade privada que protege o dinheiro do investidor se um banco ou instituição financeira quebrar.",
    detailed: "O FGC cobre determinados produtos, como CDB, LCI, LCA e poupança, até um limite por CPF e por instituição (hoje, R$ 250 mil). Ele é mantido por contribuições das próprias instituições financeiras. Ações e fundos de investimento não são cobertos.",
    example: "Se um banco quebrar e você tiver R$ 100 mil em CDB nele, o FGC devolve o valor, pois está dentro do limite."
  },
  {
    term: "Dividendo",
    en: "dividend",
    simple: "Parte do lucro de uma empresa distribuída aos acionistas.",
    detailed: "A distribuição é decidida pela empresa, de acordo com seu lucro e sua política de proventos. Após o pagamento, o preço da ação costuma ser ajustado pelo valor distribuído.",
    example: "Se a empresa paga R$ 0,50 por ação e você tem 200 ações, recebe R$ 100."
  },
  {
    term: "CDI",
    acronym: "Certificado de Depósito Interbancário",
    en: "interbank deposit rate",
    simple: "Taxa de referência do mercado de renda fixa, muito próxima da taxa Selic.",
    detailed: "O Certificado de Depósito Interbancário é a taxa usada em empréstimos de curtíssimo prazo entre bancos. Serve como parâmetro de rentabilidade de CDBs, fundos e outros investimentos.",
    example: "Um CDB que rende 100% do CDI acompanha essa taxa; um que rende 110% do CDI rende 10% a mais que ela."
  },
  {
    term: "CDB",
    acronym: "Certificado de Depósito Bancário",
    en: "bank certificate of deposit",
    simple: "Título em que você empresta dinheiro a um banco e recebe juros em troca.",
    detailed: "Pode ser pós-fixado (atrelado ao CDI), prefixado ou híbrido (ligado à inflação). Conta com a cobertura do FGC até o limite vigente por CPF e instituição.",
    example: "Você aplica R$ 5.000 em um CDB de 100% do CDI por 1 ano e resgata o valor com os juros, descontado o imposto de renda."
  },
  {
    term: "Liquidez",
    en: "liquidity",
    simple: "Facilidade de transformar um ativo em dinheiro sem perder valor.",
    detailed: "Ativos de alta liquidez podem ser vendidos rapidamente por um preço próximo ao de mercado. Ativos de baixa liquidez podem demorar a ser vendidos ou exigir desconto.",
    example: "Ações de grandes empresas são vendidas em segundos; um imóvel pode levar meses."
  },
  {
    term: "Rentabilidade",
    en: "return / yield",
    simple: "Quanto um investimento rendeu em um período, geralmente expresso em porcentagem sobre o valor investido.",
    detailed: "Pode ser bruta (antes de taxas e impostos) ou líquida (depois de descontá-los). Também pode ser nominal ou real, quando se desconta a inflação. Rentabilidade passada não garante resultados futuros, e deve ser comparada a um benchmark, como o CDI, para saber se o investimento compensou o risco.",
    example: "Se você investiu R$ 1.000 e, após um ano, tem R$ 1.100, a rentabilidade bruta foi de 10%. Se a inflação no período foi de 4%, a rentabilidade real foi de cerca de 5,8%."
  },
  {
    term: "Renda fixa",
    en: "fixed income",
    simple: "Investimentos cuja forma de remuneração é definida no momento da aplicação.",
    detailed: "A regra de rentabilidade pode ser prefixada (taxa fixa), pós-fixada (acompanha um indicador, como o CDI) ou híbrida (taxa mais inflação). Isso não significa que o retorno seja garantido em qualquer cenário.",
    example: "Um título prefixado que paga 12% ao ano informa a taxa já na compra."
  },
  {
    term: "Selic",
    acronym: "Sistema Especial de Liquidação e de Custódia",
    en: "Selic rate",
    simple: "Taxa básica de juros da economia brasileira, definida pelo Copom do Banco Central.",
    detailed: "A Selic influencia juros de empréstimos, financiamentos e a rentabilidade de investimentos. Quando sobe, o crédito tende a ficar mais caro e a renda fixa mais atrativa.",
    example: "Com a Selic em alta, o rendimento do Tesouro Selic também aumenta."
  },
  {
    term: "Volatilidade",
    en: "volatility",
    simple: "Medida de quanto o preço de um ativo sobe e desce em um período.",
    detailed: "Quanto maior a volatilidade, maiores as oscilações e, em geral, o risco percebido. Costuma ser calculada pelo desvio padrão dos retornos.",
    example: "Uma ação que varia 5% ao dia é mais volátil que um título público que varia 0,05%."
  }
];

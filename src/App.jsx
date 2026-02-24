import { useState, useEffect } from "react";

// ============================================================
// ENGENHOCA: A OFICINA DO TEMPO
// Jogo educacional sobre Máquinas Simples - 7º ano Ciências
// ============================================================

// --- DATA: Question Banks, Teaching Content, Dialogues ---

const SIMPLE_MACHINES = {
  alavanca: { name: "Alavanca", icon: "⚖️", desc: "Barra rígida que gira em torno de um ponto de apoio (fulcro), multiplicando a força aplicada." },
  planoInclinado: { name: "Plano Inclinado", icon: "📐", desc: "Superfície inclinada (rampa) que reduz o esforço necessário para elevar objetos." },
  cunha: { name: "Cunha", icon: "🔺", desc: "Objeto em forma de triângulo que converte força em movimento lateral, usado para cortar ou separar." },
  parafuso: { name: "Parafuso", icon: "🔩", desc: "Plano inclinado enrolado em espiral, que converte movimento de rotação em fixação ou elevação." },
  roldana: { name: "Roldana", icon: "🔄", desc: "Roda com sulco por onde passa uma corda, usada para mudar a direção da força ou multiplicá-la." },
  rodaEixo: { name: "Roda com Eixo", icon: "☸️", desc: "Roda presa a um eixo central que facilita o movimento e reduz o atrito." },
};

const PHASE1_DATA = {
  intro: {
    title: "A Oficina Esquecida",
    narrative: [
      "Você empurra a porta rangente e entra em uma oficina coberta de poeira e engrenagens...",
      "De repente, um holograma se acende no centro da sala!",
      "\"Bem-vindo à minha oficina, jovem! Eu sou o Mestre Arquimedes. Tudo aqui parece bagunça, mas cada objeto esconde um segredo mecânico.\"",
      "\"Você sabia que muitas coisas que usamos todo dia são, na verdade, MÁQUINAS? Sim! Máquinas simples. Elas estão em toda parte!\"",
      "\"Antes de começarmos, deixe eu te mostrar as 6 máquinas simples que movem o mundo...\""
    ]
  },
  teaching: {
    title: "As 6 Máquinas Simples",
    text: "Máquinas simples são dispositivos mecânicos básicos que facilitam a realização de trabalho, modificando a intensidade, a direção ou a distância de aplicação de uma força. Existem 6 tipos fundamentais:",
  },
  questions: [
    { id: "p1q1", object: "Rampa de skate 🛹", answer: "planoInclinado", hint: "É uma superfície que vai do chão até uma altura maior..." },
    { id: "p1q2", object: "Varal com cordinha 🧺", answer: "roldana", hint: "O que acontece quando você puxa a corda de um lado?" },
    { id: "p1q3", object: "Carriola / carrinho de mão 🏗️", answer: "alavanca", hint: "Você empurra de um lado e o peso sobe do outro. Onde fica o ponto de apoio?" },
    { id: "p1q4", object: "Tampa de garrafa rosqueável 🍶", answer: "parafuso", hint: "Pense nas ranhuras em espiral da tampa..." },
    { id: "p1q5", object: "Machado 🪓", answer: "cunha", hint: "A lâmina tem forma triangular que separa a madeira..." },
    { id: "p1q6", object: "Maçaneta redonda da porta 🚪", answer: "rodaEixo", hint: "Ela gira em torno de um ponto central..." },
    { id: "p1q7", object: "Mastro de bandeira com corda 🚩", answer: "roldana", hint: "Pense na rodinha lá no topo por onde passa a corda para erguer a bandeira..." },
    { id: "p1q8", object: "Tesoura ✂️", answer: "alavanca", hint: "Observe o ponto onde as duas lâminas se cruzam... é um ponto de apoio!" },
    { id: "p1q9", object: "Escada 🪜", answer: "planoInclinado", hint: "Cada degrau é como um pequeno plano que te leva mais alto..." },
    { id: "p1q10", object: "Saca-rolha 🍷", answer: "parafuso", hint: "Observe a espiral metálica que penetra a rolha ao girar..." },
    { id: "p1q11", object: "Roda de bicicleta 🚲", answer: "rodaEixo", hint: "Uma roda girando ao redor de um eixo central!" },
    { id: "p1q12", object: "Faca de cozinha 🔪", answer: "cunha", hint: "Olhe a lâmina de lado... que formato ela tem?" },
  ],
  feedback: {
    correct: [
      "Isso mesmo! Você tem olho de inventor!",
      "Perfeito! Essa foi rápida!",
      "Excelente! Você está pegando o jeito!",
      "Correto! As máquinas simples estão por toda parte, não é?",
      "Mandou bem! Mestre Arquimedes está impressionado!",
    ],
    wrong: [
      "Hmm, não foi dessa vez. Pense em como esse objeto se move... ele gira? Desliza? Separa?",
      "Quase! Observe melhor o movimento principal desse objeto.",
      "Tente de novo! Lembre-se: cada máquina simples tem um jeito próprio de funcionar.",
    ],
  }
};

const PHASE2_DATA = {
  intro: {
    title: "O Diário do Mestre",
    narrative: [
      "Você encontra um caderno velho e empoeirado sobre a bancada...",
      "\"Meu diário! Que bom que você o encontrou. Mas o tempo não foi gentil com ele...\"",
      "\"Algumas páginas estão rasgadas e incompletas. Preciso que você me ajude a reconstruí-las!\"",
      "\"Para isso, vou te ensinar como cada máquina simples realmente funciona. Preste atenção!\""
    ]
  },
  teaching: {
    title: "Como Funcionam as Máquinas Simples",
    cards: [
      { machine: "Alavanca", icon: "⚖️", principle: "Usa um ponto de apoio (fulcro) para multiplicar a força. Quanto mais longe do fulcro você empurra, menos força precisa fazer. Ex.: gangorra, tesoura, alicate." },
      { machine: "Plano Inclinado", icon: "📐", principle: "Uma rampa permite subir uma carga usando menos força, mas percorrendo uma distância maior. Quanto mais suave a inclinação, menor o esforço. Ex.: rampa de garagem, escorregador." },
      { machine: "Cunha", icon: "🔺", principle: "Transforma uma força para frente em duas forças laterais, separando materiais. Quanto mais fina a cunha, mais fácil é cortar. Ex.: faca, machado, pregos." },
      { machine: "Parafuso", icon: "🔩", principle: "É um plano inclinado enrolado em espiral! Ao girar, transforma movimento circular em movimento linear (para frente/trás). Ex.: tampa de garrafa, saca-rolha, macaco de carro." },
      { machine: "Roldana", icon: "🔄", principle: "Uma roda com corda que muda a direção da força. Puxando para baixo, o objeto sobe! Várias roldanas juntas também multiplicam a força. Ex.: varal, mastro de bandeira, guindaste." },
      { machine: "Roda com Eixo", icon: "☸️", principle: "Uma roda grande presa a um eixo pequeno. A roda amplifica o movimento: pouca força na roda grande gera muita força no eixo. Ex.: volante do carro, maçaneta, chave de fenda." },
    ]
  },
  questions: [
    { id: "p2q1", type: "complete", text: "Uma rampa facilita carregar coisas pesadas porque permite usar ___ força ao percorrer uma ___ maior.", options: ["menos / distância", "mais / distância", "menos / altura", "mais / velocidade"], answer: 0, explanation: "O plano inclinado distribui o esforço por uma distância maior. Resultado: você usa MENOS FORÇA para subir a mesma altura!" },
    { id: "p2q2", type: "trueFalse", text: "Verdadeiro ou Falso: Um parafuso é, na verdade, um plano inclinado enrolado em espiral.", answer: true, explanation: "Exatamente! Se você 'desenrolar' a rosca de um parafuso, verá que é uma rampa em espiral. Genial, não?" },
    { id: "p2q3", type: "multiple", text: "Qual máquina simples muda a DIREÇÃO da força aplicada?", options: ["Cunha", "Roldana", "Plano inclinado", "Parafuso"], answer: 1, explanation: "A roldana permite que você puxe para BAIXO enquanto o objeto sobe. Ela muda a direção da força!" },
    { id: "p2q4", type: "complete", text: "Na alavanca, quanto mais ___ do ponto de apoio a força é aplicada, ___ esforço é necessário.", options: ["longe / menos", "perto / menos", "longe / mais", "perto / mais"], answer: 0, explanation: "É o princípio da alavanca! Maior distância do fulcro = maior vantagem mecânica = menos esforço. Pense na gangorra: o lado mais longo levanta o mais curto com facilidade." },
    { id: "p2q5", type: "trueFalse", text: "Verdadeiro ou Falso: A cunha transforma uma força para frente em duas forças laterais.", answer: true, explanation: "Correto! É por isso que uma faca corta: a força que você faz para baixo é convertida em forças que separam o material para os lados." },
    { id: "p2q6", type: "multiple", text: "Qual é o princípio da roda com eixo?", options: ["Muda a direção da força", "Transforma força em calor", "Amplifica o movimento: pouca força na roda gera muita força no eixo", "Corta materiais pela metade"], answer: 2, explanation: "A roda grande amplifica o efeito! Pense no volante do carro: um giro suave move rodas pesadas." },
    { id: "p2q7", type: "trueFalse", text: "Verdadeiro ou Falso: Uma roldana fixa (presa no teto) multiplica a força aplicada.", answer: false, explanation: "Uma roldana fixa sozinha NÃO multiplica a força — ela apenas muda a direção. Para multiplicar, é preciso um sistema com várias roldanas!" },
    { id: "p2q8", type: "multiple", text: "Qual objeto NÃO é um exemplo de cunha?", options: ["Machado", "Prego", "Gangorra", "Faca"], answer: 2, explanation: "A gangorra é uma ALAVANCA! Já machado, prego e faca são cunhas — todos têm formato que separa materiais." },
    { id: "p2q9", type: "complete", text: "Quanto mais ___ a inclinação de uma rampa, ___ o esforço necessário para subir.", options: ["suave / menor", "suave / maior", "íngreme / menor", "curta / menor"], answer: 0, explanation: "Quanto mais suave (menos íngreme) a rampa, maior a distância percorrida, mas MENOR a força necessária. É a troca do plano inclinado: mais caminho, menos esforço!" },
    { id: "p2q10", type: "multiple", text: "O saca-rolha é um exemplo de qual máquina simples?", options: ["Alavanca", "Cunha", "Parafuso", "Roldana"], answer: 2, explanation: "O saca-rolha tem formato de espiral — é um parafuso! Ao girar (movimento circular), ele penetra a rolha (movimento linear)." },
    { id: "p2q11", type: "trueFalse", text: "Verdadeiro ou Falso: A roda com eixo funciona porque uma força pequena aplicada na roda grande gera uma força maior no eixo pequeno.", answer: true, explanation: "Exatamente! É o mesmo princípio do volante do carro: você gira a roda grande com pouca força e as rodas pesadas respondem com força amplificada." },
    { id: "p2q12", type: "multiple", text: "Uma pessoa empurra uma caixa pesada por uma rampa em vez de levantá-la direto. Por que a rampa facilita?", options: ["Porque a caixa fica mais leve na rampa", "Porque a rampa elimina a gravidade", "Porque a distância maior permite usar menos força", "Porque a rampa empurra a caixa sozinha"], answer: 2, explanation: "A rampa (plano inclinado) distribui o esforço por uma distância maior. A caixa não fica mais leve — você é que precisa de MENOS FORÇA para movê-la, percorrendo um caminho mais longo." },
  ]
};

const PHASE3_DATA = {
  intro: {
    title: "Viagem no Tempo",
    narrative: [
      "A máquina do tempo começa a vibrar e emitir luzes!",
      "\"A máquina ligou! Mas ela está instável...\"",
      "\"Você vai saltar por quatro momentos da história humana. Em cada um, observe como a humanidade usou máquinas simples para resolver GRANDES problemas.\"",
      "\"Se entender bem o que viu, teremos energia suficiente para o próximo salto. Preparado?\""
    ]
  },
  periods: [
    {
      id: "egypt",
      title: "🏛️ Egito Antigo (~2500 a.C.)",
      subtitle: "A Construção das Pirâmides",
      narrative: "Você chega ao deserto egípcio sob um sol escaldante. Milhares de trabalhadores movem blocos de pedra que pesam mais de 2 toneladas cada! Como eles conseguem?",
      teaching: "Os egípcios usaram PLANOS INCLINADOS (rampas gigantes de terra e areia) para arrastar os blocos até o topo das pirâmides. Também usaram ALAVANCAS (troncos de madeira) para erguer e posicionar os blocos, e CUNHAS (ferramentas de cobre) para cortar as pedras nas pedreiras. Sem motores, sem eletricidade — apenas máquinas simples e engenhosidade humana!",
      questions: [
        { id: "p3q1", text: "Qual máquina simples foi essencial para mover blocos de pedra até o topo das pirâmides?", options: ["Roldana", "Parafuso", "Plano inclinado (rampa)", "Roda com eixo"], answer: 2 },
        { id: "p3q2", text: "Os egípcios cortavam pedras nas pedreiras usando ferramentas em forma de triângulo. Que máquina simples é essa?", options: ["Alavanca", "Cunha", "Parafuso", "Roldana"], answer: 1 },
      ]
    },
    {
      id: "greece",
      title: "🏺 Grécia Antiga (~250 a.C.)",
      subtitle: "Arquimedes e a Alavanca",
      narrative: "Você chega a Siracusa e encontra o próprio Arquimedes! Ele está empolgado demonstrando como uma única pessoa pode mover objetos enormes.",
      teaching: "Arquimedes descobriu os princípios matemáticos da ALAVANCA e disse a famosa frase: \"Dê-me um ponto de apoio e moverei o mundo!\" Ele também inventou a ROLDANA COMPOSTA — um sistema com várias roldanas que multiplica a força. Conta a lenda que Arquimedes, sozinho, conseguiu puxar um navio inteiro para fora da água usando esse sistema! Os gregos também usaram o PARAFUSO DE ARQUIMEDES para elevar água para irrigação.",
      questions: [
        { id: "p3q3", text: "Qual foi a grande contribuição de Arquimedes para as máquinas simples?", options: ["Inventou a roda", "Descobriu o fogo", "Desenvolveu os princípios da alavanca e inventou a roldana composta", "Construiu as pirâmides"], answer: 2 },
        { id: "p3q4", text: "O Parafuso de Arquimedes era usado para:", options: ["Cortar madeira", "Elevar água para irrigação", "Construir navios", "Fazer fogo"], answer: 1 },
      ]
    },
    {
      id: "industrial",
      title: "🏭 Revolução Industrial (~1800)",
      subtitle: "Quando Simples Virou Complexo",
      narrative: "O salto te leva a uma fábrica barulhenta na Inglaterra. Máquinas enormes funcionam com vapor, engrenagens giram e correias se movem sem parar!",
      teaching: "Na Revolução Industrial, as máquinas simples foram COMBINADAS para criar máquinas complexas! Engrenagens (rodas com eixo dentadas) transmitiam força de motores a vapor para teares e prensas. Sistemas de POLIAS (roldanas) moviam cargas em fábricas e minas. PARAFUSOS prendiam estruturas metálicas. A grande sacada? Toda máquina complexa é, no fundo, uma combinação inteligente de máquinas simples!",
      questions: [
        { id: "p3q5", text: "O que aconteceu com as máquinas simples durante a Revolução Industrial?", options: ["Deixaram de ser usadas", "Foram substituídas por magia", "Foram combinadas para criar máquinas complexas", "Foram proibidas nas fábricas"], answer: 2 },
        { id: "p3q6", text: "Engrenagens são, na verdade, um tipo de:", options: ["Cunha dentada", "Roda com eixo dentada", "Plano inclinado circular", "Roldana sólida"], answer: 1 },
      ]
    },
    {
      id: "modern",
      title: "🏫 Atualidade (~Anos 2000)",
      subtitle: "Máquinas Simples na Sala de Aula e no Dia a Dia",
      narrative: "Você retorna ao presente! A máquina do tempo te deixa bem no meio de uma escola. Olhe ao redor: mesmo aqui, cercado de tecnologia, as máquinas simples estão por toda parte. Vamos descobrir onde?",
      teaching: "Olhe para sua mesa na sala de aula: as máquinas simples estão bem aí! Quando você usa um APONTADOR para apontar o lápis, a lâmina dentro dele tem formato triangular — ela penetra a madeira e separa as aparas. Isso é uma CUNHA em ação! E a TESOURA que você usa para recortar trabalhos? Repare: as duas lâminas se cruzam em um ponto fixo (o parafusinho no meio). Quando você aperta as alças, a força se multiplica nas pontas. Isso é uma ALAVANCA! Você usa máquinas simples todos os dias na escola sem perceber!",
      questions: [
        { id: "p3q7", text: "Na sala de aula, você usa o apontador para apontar o lápis. A lâmina do apontador tem formato triangular e corta a madeira separando as aparas. Que máquina simples é essa?", options: ["Alavanca", "Roldana", "Cunha", "Roda com eixo"], answer: 2 },
        { id: "p3q8", text: "Para recortar uma atividade impressa, você usa a tesoura. As duas lâminas giram em torno de um ponto fixo no centro, multiplicando a força que você faz nas alças. Que máquina simples é a tesoura?", options: ["Cunha", "Plano inclinado", "Parafuso", "Alavanca"], answer: 3 },
      ]
    },
  ],
  timeline: {
    instruction: "Organize os eventos na ordem cronológica correta!",
    items: [
      { id: "t1", text: "Egípcios usam rampas para construir pirâmides", order: 1 },
      { id: "t2", text: "Arquimedes descobre os princípios da alavanca", order: 2 },
      { id: "t3", text: "Máquinas simples são combinadas em fábricas", order: 3 },
      { id: "t4", text: "Máquinas simples no cotidiano: bicicleta, apontador, tesoura", order: 4 },
    ]
  }
};

const PHASE4_DATA = {
  intro: {
    title: "A Máquina por Dentro",
    narrative: [
      "Você retorna à oficina. Mestre Arquimedes está animado!",
      "\"Agora você já sabe o que são máquinas simples e como foram usadas na história!\"",
      "\"Mas quer saber um segredo? Toda máquina complexa é apenas uma combinação inteligente de máquinas simples!\"",
      "\"Vamos DESMONTAR algumas máquinas para provar isso?\""
    ]
  },
  teaching: {
    title: "De Simples a Complexo",
    text: "Uma máquina complexa combina duas ou mais máquinas simples trabalhando juntas. Veja exemplos:",
    examples: [
      { name: "Bicicleta 🚲", machines: ["Roda com eixo (rodas)", "Alavanca (freios e pedais)", "Engrenagens (corrente e catracas)"] },
      { name: "Tesoura de jardinagem ✂️", machines: ["Alavanca (cabo)", "Cunha (lâminas)"] },
      { name: "Guindaste 🏗️", machines: ["Roldana (sistema de cabos)", "Alavanca (braço)", "Roda com eixo (base giratória)"] },
      { name: "Macaco de carro 🔧", machines: ["Parafuso (rosca central)", "Alavanca (manivela)"] },
      { name: "Abridor de latas 🥫", machines: ["Cunha (lâmina cortante)", "Roda com eixo (girador)"] },
    ]
  },
  questions: [
    { id: "p4q1", text: "Quais máquinas simples estão presentes em uma BICICLETA?", options: ["Apenas roldana", "Roda com eixo + alavanca + engrenagens", "Apenas plano inclinado", "Cunha + parafuso"], answer: 1, explanation: "As rodas são rodas com eixo, os freios e pedais são alavancas, e as catracas são engrenagens (rodas com eixo dentadas)!" },
    { id: "p4q2", text: "Um abridor de latas combina:", options: ["Cunha (lâmina cortante) + roda com eixo (girador)", "Apenas roldana", "Plano inclinado + parafuso", "Apenas alavanca"], answer: 0, explanation: "A lâmina que corta a lata é uma cunha, e a parte que gira é uma roda com eixo!" },
    { id: "p4q3", text: "Se retirarmos o sistema de ROLDANAS de um guindaste, o que acontece?", options: ["Nada muda", "Ele não consegue mais mudar a direção da força nem multiplicá-la para levantar cargas pesadas", "Ele fica mais forte", "Ele se transforma em uma alavanca"], answer: 1, explanation: "Sem as roldanas, o guindaste perde a capacidade de redirecionar e multiplicar a força. Cada peça é essencial!" },
    { id: "p4q4", text: "Qual máquina simples está ESCONDIDA dentro de um parafuso de uma estante?", options: ["Roldana", "Alavanca", "Plano inclinado (em espiral)", "Roda com eixo"], answer: 2, explanation: "Lembre-se: o parafuso É um plano inclinado enrolado! Cada volta da rosca é como subir uma rampa em espiral." },
    { id: "p4q5", text: "Uma tesoura de podar combina quais máquinas simples?", options: ["Roldana + plano inclinado", "Alavanca + cunha", "Parafuso + roda com eixo", "Apenas cunha"], answer: 1, explanation: "O cabo funciona como alavanca (multiplica a força) e as lâminas são cunhas (cortam separando o material)!" },
    { id: "p4q6", text: "Um carrinho de mão é uma máquina complexa que combina:", options: ["Roldana + cunha", "Alavanca + roda com eixo", "Apenas plano inclinado", "Parafuso + roldana"], answer: 1, explanation: "A caçamba e as alças formam uma alavanca, e a roda na frente é uma roda com eixo que reduz o atrito!" },
    { id: "p4q7", text: "Qual afirmação sobre máquinas complexas é VERDADEIRA?", options: ["São totalmente diferentes das máquinas simples", "São combinações inteligentes de máquinas simples", "Não usam princípios de física", "Surgiram antes das máquinas simples"], answer: 1 },
    { id: "p4q8", text: "Dadas as máquinas simples ROLDANA + ALAVANCA + RODA COM EIXO, qual dispositivo elas podem formar?", options: ["Uma faca", "Um guindaste", "Um prego", "Uma rampa"], answer: 1, explanation: "O guindaste usa roldanas para os cabos, alavanca no braço mecânico e roda com eixo na base giratória!" },
    { id: "p4q9", text: "Um macaco de carro é usado para levantar veículos pesados. Quais máquinas simples ele combina?", options: ["Roldana + cunha", "Plano inclinado + roda com eixo", "Parafuso + alavanca", "Apenas roldana"], answer: 2, explanation: "A rosca central é um parafuso (plano inclinado em espiral) e a manivela que você gira funciona como alavanca, multiplicando sua força para erguer o carro!" },
    { id: "p4q10", text: "Uma furadeira elétrica combina quais máquinas simples na sua broca?", options: ["Roldana + alavanca", "Cunha (ponta cortante) + parafuso (espiral da broca)", "Apenas roda com eixo", "Plano inclinado + roldana"], answer: 1, explanation: "A ponta da broca é uma cunha que penetra o material, e o corpo espiral da broca é um parafuso que expulsa os resíduos enquanto gira!" },
  ]
};

const PHASE5_DATA = {
  intro: {
    title: "O Inventor é Você!",
    narrative: [
      "Mestre Arquimedes aparece com um sorriso enorme!",
      "\"Chegou a hora da verdade, jovem inventor!\"",
      "\"Para consertar a máquina do tempo, preciso que VOCÊ crie algo original.\"",
      "\"Vou te apresentar problemas reais do cotidiano. Sua missão: inventar uma solução usando máquinas simples!\"",
      "\"Pense com cuidado: você vai escolher duas máquinas simples que, combinadas, resolvam o problema. Nem toda combinação funciona — use o que aprendeu!\""
    ]
  },
  challenges: [
    {
      id: "c1",
      icon: "🏠",
      title: "Compras no Sobrado",
      problem: "Dona Maria tem 72 anos e mora no 2º andar de um sobrado SEM elevador. Toda semana ela precisa subir sacolas pesadas de compras pela escada. Como ajudá-la?",
      validCombos: ["alavanca+planoInclinado", "planoInclinado+roldana", "alavanca+roldana", "roldana+rodaEixo", "planoInclinado+rodaEixo", "alavanca+rodaEixo", "alavanca+parafuso"],
      feedbacks: {
        "alavanca+planoInclinado": "Brilhante! Uma alavanca na base da escada combinada com um plano inclinado (tipo esteira ou trilho) permite que Dona Maria coloque as sacolas embaixo e elas subam pela rampa com menos esforço!",
        "planoInclinado+roldana": "Genial! Uma roldana no topo da escada com uma corda e um carrinho que sobe por um trilho inclinado! Dona Maria puxa a corda de cima e as compras sobem!",
        "alavanca+roldana": "Excelente! Um sistema com roldana no teto da escada e uma alavanca no andar de cima permite que ela erga as sacolas sem carregá-las! A roldana muda a direção da força e a alavanca multiplica!",
        "roldana+rodaEixo": "Muito criativo! Uma roldana com corda conectada a um carretel (roda com eixo) permite que Dona Maria gire uma manivela e as compras subam suavemente!",
        "planoInclinado+rodaEixo": "Inteligente! Uma rampa ao longo da escada com um carrinho de rodas (roda com eixo) permite que as sacolas deslizem para cima com muito menos esforço do que carregar no braço!",
        "alavanca+rodaEixo": "Engenhoso! Uma alavanca de elevação combinada com um guincho de manivela (roda com eixo) permite erguer as sacolas direto do térreo até o 2º andar girando a manivela!",
        "alavanca+parafuso": "Criativo! Um sistema tipo macaco de carro: o parafuso eleva uma plataforma com as sacolas enquanto a alavanca (manivela) aciona o mecanismo. Dona Maria gira a manivela e as compras sobem!",
      }
    },
    {
      id: "c2",
      icon: "🌳",
      title: "Colheita nas Alturas",
      problem: "Seu João tem um pomar com mangueiras altas. As melhores mangas ficam no topo, a 5 metros de altura. Ele já não consegue subir em escadas. Como colher as frutas sem subir na árvore?",
      validCombos: ["alavanca+cunha", "alavanca+roldana", "planoInclinado+roldana", "alavanca+rodaEixo", "cunha+roldana", "roldana+rodaEixo", "cunha+rodaEixo"],
      feedbacks: {
        "alavanca+cunha": "Inteligente! Uma vara longa funcionando como alavanca com uma cunha na ponta (tipo lâmina) que corta o talo da manga! A fruta cai em uma rede acoplada!",
        "alavanca+roldana": "Criativo! Um sistema de roldana preso ao galho com uma cesta, acionado por uma alavanca no chão! A cesta sobe, envolve a fruta e desce!",
        "planoInclinado+roldana": "Engenhoso! Uma roldana no galho com corda e um cesto que, ao puxar, sobe pelo ângulo certo e encaixa nas frutas. Ao soltar, o cesto desce por gravidade!",
        "alavanca+rodaEixo": "Legal! Uma vara extensível (alavanca) com um mecanismo de garra giratória (roda com eixo) na ponta que agarra e torce a fruta do galho!",
        "cunha+roldana": "Esperto! Uma roldana presa ao galho eleva uma lâmina em forma de cunha até o talo da manga. Ao puxar a corda, a cunha corta o talo e a fruta cai em uma rede embaixo!",
        "roldana+rodaEixo": "Muito bom! Uma roldana no galho conectada a uma manivela (roda com eixo) no chão. Seu João gira a manivela, a cesta sobe até a fruta e desce carregada!",
        "cunha+rodaEixo": "Inventivo! Uma lâmina cortante (cunha) acoplada a um mecanismo giratório (roda com eixo) na ponta de uma vara. Ao girar, a cunha corta o talo da manga!",
      }
    },
    {
      id: "c3",
      icon: "💧",
      title: "Água no Terreno",
      problem: "Uma comunidade rural precisa transportar água de um poço até uma horta que fica 50 metros adiante e 3 metros acima. Não há eletricidade no local. Como levar a água até lá?",
      validCombos: ["planoInclinado+roldana", "alavanca+roldana", "alavanca+parafuso", "roldana+rodaEixo", "parafuso+rodaEixo", "alavanca+rodaEixo", "alavanca+planoInclinado", "planoInclinado+rodaEixo"],
      feedbacks: {
        "planoInclinado+roldana": "Excelente! Uma roldana no poço para elevar os baldes, combinada com uma calha inclinada (plano inclinado invertido) que leva a água por gravidade até a horta se o percurso for bem planejado!",
        "alavanca+roldana": "Muito bom! Uma alavanca tipo \"cegonha\" (shaduf) para erguer a água do poço e um sistema de roldanas para transportá-la em baldes suspensos até a horta!",
        "alavanca+parafuso": "Engenhoso! Um parafuso de Arquimedes (aquele que vimos na Grécia!) acionado por uma manivela (alavanca) que eleva a água continuamente do poço até um canal que leva à horta!",
        "roldana+rodaEixo": "Criativo! Uma roda d'água (roda com eixo) acionada manualmente que eleva a água, combinada com roldanas que guiam o fluxo até a horta por um sistema de cordas e baldes!",
        "parafuso+rodaEixo": "Genial! Um parafuso de Arquimedes acionado por uma roda com manivela (roda com eixo). Ao girar a manivela, o parafuso espiral eleva a água continuamente do poço até a altura da horta!",
        "alavanca+rodaEixo": "Muito criativo! Uma alavanca tipo shaduf (cegonha) ergue a água do poço, e uma roda d'água com manivela (roda com eixo) impulsiona baldes em cadeia até a horta!",
        "alavanca+planoInclinado": "Inteligente! Uma alavanca (shaduf) ergue a água do poço e despeja em uma calha inclinada (plano inclinado) que conduz a água por gravidade ao longo dos 50 metros até a horta!",
        "planoInclinado+rodaEixo": "Esperto! Uma roda d'água com manivela (roda com eixo) eleva a água do poço, que então escorre por uma calha inclinada (plano inclinado) até chegar na horta!",
      }
    },
  ]
};

// --- STYLE CONSTANTS ---
const COLORS = {
  bg: "#1a1410",
  bgLight: "#2a2018",
  bgCard: "#352a1e",
  bgCardHover: "#3f3225",
  accent: "#d4a04a",
  accentLight: "#e8c36a",
  accentDim: "#a07830",
  text: "#e8dcc8",
  textDim: "#a89878",
  textBright: "#fff8ee",
  success: "#5cb85c",
  successBg: "#2a3a2a",
  error: "#d9534f",
  errorBg: "#3a2a2a",
  gear: "#5a4a38",
  border: "#4a3a28",
};

// --- COMPONENTS ---

const styles = {
  app: {
    minHeight: "100vh",
    background: `linear-gradient(170deg, ${COLORS.bg} 0%, #0f0d0a 50%, #1a1510 100%)`,
    color: COLORS.text,
    fontFamily: "'Georgia', 'Times New Roman', serif",
    position: "relative",
    overflow: "hidden",
  },
  container: {
    maxWidth: 800,
    margin: "0 auto",
    padding: "20px 16px 40px",
    position: "relative",
    zIndex: 1,
  },
  header: {
    textAlign: "center",
    padding: "30px 0 10px",
  },
  title: {
    fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
    fontWeight: "bold",
    color: COLORS.accent,
    textShadow: `0 0 30px ${COLORS.accentDim}44`,
    letterSpacing: 2,
    margin: 0,
  },
  subtitle: {
    fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
    color: COLORS.textDim,
    marginTop: 4,
    fontStyle: "italic",
  },
  phaseBar: {
    display: "flex",
    justifyContent: "center",
    gap: 6,
    margin: "20px 0",
    flexWrap: "wrap",
  },
  phaseDot: (active, completed) => ({
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: `2px solid ${active ? COLORS.accent : completed ? COLORS.success : COLORS.border}`,
    background: active ? COLORS.accent + "33" : completed ? COLORS.success + "33" : "transparent",
    color: active ? COLORS.accent : completed ? COLORS.success : COLORS.textDim,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontWeight: "bold",
    transition: "all 0.3s",
  }),
  card: {
    background: COLORS.bgCard,
    borderRadius: 16,
    padding: "24px",
    marginBottom: 16,
    border: `1px solid ${COLORS.border}`,
    boxShadow: `0 4px 20px rgba(0,0,0,0.3)`,
  },
  narrativeBox: {
    background: `linear-gradient(135deg, ${COLORS.bgCard}, ${COLORS.bgLight})`,
    borderRadius: 16,
    padding: "20px 24px",
    marginBottom: 16,
    border: `1px solid ${COLORS.accentDim}44`,
    position: "relative",
  },
  narrativeText: {
    fontSize: "clamp(0.95rem, 2.5vw, 1.05rem)",
    lineHeight: 1.7,
    color: COLORS.text,
    margin: 0,
  },
  speakerLabel: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 8,
  },
  button: (variant = "primary") => ({
    padding: "12px 28px",
    borderRadius: 10,
    border: variant === "primary" ? "none" : `1px solid ${COLORS.accent}`,
    background: variant === "primary" ? `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDim})` : "transparent",
    color: variant === "primary" ? COLORS.bg : COLORS.accent,
    fontSize: 16,
    fontWeight: "bold",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all 0.2s",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  }),
  optionBtn: (selected, correct, showResult) => {
    let bg = COLORS.bgCardHover;
    let border = COLORS.border;
    let color = COLORS.text;
    if (selected && !showResult) { bg = COLORS.accent + "22"; border = COLORS.accent; color = COLORS.accentLight; }
    if (showResult && correct) { bg = COLORS.successBg; border = COLORS.success; color = COLORS.success; }
    if (showResult && selected && !correct) { bg = COLORS.errorBg; border = COLORS.error; color = COLORS.error; }
    return {
      display: "block",
      width: "100%",
      padding: "14px 18px",
      marginBottom: 8,
      borderRadius: 10,
      border: `1.5px solid ${border}`,
      background: bg,
      color,
      fontSize: 15,
      textAlign: "left",
      cursor: showResult ? "default" : "pointer",
      fontFamily: "inherit",
      transition: "all 0.2s",
      lineHeight: 1.5,
    };
  },
  progressBar: {
    width: "100%",
    height: 6,
    borderRadius: 3,
    background: COLORS.bgLight,
    marginBottom: 16,
    overflow: "hidden",
  },
  progressFill: (pct) => ({
    width: `${pct}%`,
    height: "100%",
    borderRadius: 3,
    background: `linear-gradient(90deg, ${COLORS.accentDim}, ${COLORS.accent})`,
    transition: "width 0.5s ease",
  }),
  starRow: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    margin: "16px 0",
  },
  star: (filled) => ({
    fontSize: 32,
    color: filled ? COLORS.accent : COLORS.border,
    textShadow: filled ? `0 0 10px ${COLORS.accent}66` : "none",
    transition: "all 0.3s",
  }),
  machineCard: (selected) => ({
    padding: "12px 16px",
    borderRadius: 12,
    border: `1.5px solid ${selected ? COLORS.accent : COLORS.border}`,
    background: selected ? COLORS.accent + "18" : COLORS.bgCardHover,
    cursor: "pointer",
    transition: "all 0.2s",
    textAlign: "center",
    minWidth: 100,
  }),
  teachingCard: {
    background: `linear-gradient(135deg, ${COLORS.bgLight}, ${COLORS.bgCard})`,
    borderRadius: 12,
    padding: "16px",
    marginBottom: 10,
    border: `1px solid ${COLORS.border}`,
  },
  badge: (color) => ({
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: "bold",
    background: color + "22",
    color: color,
    border: `1px solid ${color}44`,
  }),
  textarea: {
    width: "100%",
    minHeight: 100,
    padding: 14,
    borderRadius: 10,
    border: `1px solid ${COLORS.border}`,
    background: COLORS.bgLight,
    color: COLORS.text,
    fontSize: 15,
    fontFamily: "inherit",
    resize: "vertical",
    lineHeight: 1.6,
    boxSizing: "border-box",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 10,
    border: `1px solid ${COLORS.border}`,
    background: COLORS.bgLight,
    color: COLORS.text,
    fontSize: 15,
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  gear: {
    position: "fixed",
    color: COLORS.gear + "22",
    fontSize: 200,
    zIndex: 0,
    pointerEvents: "none",
    userSelect: "none",
  },
};

function GearBg() {
  return (
    <>
      <div style={{ ...styles.gear, top: -60, right: -60, transform: "rotate(15deg)" }}>⚙️</div>
      <div style={{ ...styles.gear, bottom: -40, left: -80, fontSize: 160, transform: "rotate(-25deg)" }}>⚙️</div>
    </>
  );
}

function PhaseBar({ currentPhase, completedPhases }) {
  const labels = ["1", "2", "3", "4", "★"];
  return (
    <div style={styles.phaseBar}>
      {labels.map((l, i) => (
        <div key={i} style={styles.phaseDot(currentPhase === i, completedPhases.includes(i))}>
          {completedPhases.includes(i) ? "✓" : l}
        </div>
      ))}
    </div>
  );
}

function NarrativeScreen({ lines, speakerName, onContinue, buttonText = "Continuar ➜" }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    setDisplayed("");
    setTyping(true);
    const line = lines[currentLine];
    let idx = 0;
    const timer = setInterval(() => {
      idx++;
      setDisplayed(line.slice(0, idx));
      if (idx >= line.length) { clearInterval(timer); setTyping(false); }
    }, 18);
    return () => clearInterval(timer);
  }, [currentLine, lines]);

  const handleNext = () => {
    if (typing) { setDisplayed(lines[currentLine]); setTyping(false); return; }
    if (currentLine < lines.length - 1) setCurrentLine(c => c + 1);
    else onContinue();
  };

  return (
    <div style={styles.narrativeBox}>
      <div style={styles.speakerLabel}>{speakerName || "Mestre Arquimedes"}</div>
      <p style={styles.narrativeText}>{displayed}{typing ? "▌" : ""}</p>
      <div style={{ marginTop: 16, textAlign: "right" }}>
        <button style={styles.button("primary")} onClick={handleNext}>
          {typing ? "Pular ⏩" : currentLine < lines.length - 1 ? "Continuar ➜" : buttonText}
        </button>
      </div>
    </div>
  );
}

function TeachingPanel({ title, children, onContinue }) {
  return (
    <div style={styles.card}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <span style={{ fontSize: 24 }}>📖</span>
        <h3 style={{ margin: 0, color: COLORS.accentLight, fontSize: "clamp(1.1rem, 3vw, 1.3rem)" }}>{title}</h3>
      </div>
      {children}
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <button style={styles.button("primary")} onClick={onContinue}>Entendi! Vamos ao desafio! 🎯</button>
      </div>
    </div>
  );
}

function Stars({ count }) {
  return (
    <div style={styles.starRow}>
      {[1, 2, 3].map(i => <span key={i} style={styles.star(i <= count)}>★</span>)}
    </div>
  );
}

function PhaseComplete({ stars, totalCorrect, totalQuestions, onNext, phaseName }) {
  const msgs = [
    "Hmm, você pode melhorar! Tente de novo para ganhar mais estrelas.",
    "Bom trabalho! Mas sei que você pode fazer ainda melhor!",
    "Excelente! Você dominou esta fase!",
    "PERFEITO! Mestre Arquimedes está impressionado!",
  ];
  return (
    <div style={{ ...styles.card, textAlign: "center" }}>
      <h3 style={{ color: COLORS.accentLight, fontSize: "1.3rem", marginBottom: 4 }}>✅ {phaseName} Completa!</h3>
      <Stars count={stars} />
      <p style={{ color: COLORS.textDim, marginBottom: 4 }}>Acertos: {totalCorrect} de {totalQuestions}</p>
      <p style={{ color: COLORS.text, fontStyle: "italic", margin: "12px 0 20px" }}>"{msgs[stars]}"</p>
      <button style={styles.button("primary")} onClick={onNext}>Próxima Fase ➜</button>
    </div>
  );
}

// ---- PHASE 1 ----
function Phase1({ onComplete }) {
  const [step, setStep] = useState("intro"); // intro, teaching, quiz, result
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const questions = PHASE1_DATA.questions;
  const q = questions[qIndex];
  const machineKeys = Object.keys(SIMPLE_MACHINES);

  const handleSelect = (key) => {
    if (showResult) return;
    setSelected(key);
  };

  const handleConfirm = () => {
    if (!selected) return;
    setShowResult(true);
    if (selected === q.answer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (qIndex < questions.length - 1) {
      setQIndex(i => i + 1);
      setSelected(null);
      setShowResult(false);
      setShowHint(false);
    } else {
      setStep("result");
    }
  };

  const isCorrect = selected === q?.answer;
  const getFeedback = () => {
    const fb = PHASE1_DATA.feedback;
    if (isCorrect) return fb.correct[Math.floor(Math.random() * fb.correct.length)];
    return fb.wrong[Math.floor(Math.random() * fb.wrong.length)];
  };

  const getStars = () => {
    const pct = score / questions.length;
    if (pct >= 0.9) return 3;
    if (pct >= 0.7) return 2;
    if (pct >= 0.5) return 1;
    return 0;
  };

  if (step === "intro") {
    return <NarrativeScreen lines={PHASE1_DATA.intro.narrative} onContinue={() => setStep("teaching")} buttonText="Ver as Máquinas Simples 📖" />;
  }

  if (step === "teaching") {
    return (
      <TeachingPanel title={PHASE1_DATA.teaching.title} onContinue={() => setStep("quiz")}>
        <p style={{ color: COLORS.textDim, lineHeight: 1.6, marginBottom: 16 }}>{PHASE1_DATA.teaching.text}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
          {Object.entries(SIMPLE_MACHINES).map(([key, m]) => (
            <div key={key} style={styles.teachingCard}>
              <div style={{ fontSize: 28, marginBottom: 4 }}>{m.icon}</div>
              <div style={{ fontWeight: "bold", color: COLORS.accentLight, marginBottom: 4 }}>{m.name}</div>
              <div style={{ fontSize: 13, color: COLORS.textDim, lineHeight: 1.5 }}>{m.desc}</div>
            </div>
          ))}
        </div>
      </TeachingPanel>
    );
  }

  if (step === "result") {
    return <PhaseComplete stars={getStars()} totalCorrect={score} totalQuestions={questions.length} onNext={() => onComplete(getStars())} phaseName="Fase 1 — A Oficina Esquecida" />;
  }

  return (
    <div>
      <div style={styles.progressBar}><div style={styles.progressFill((qIndex / questions.length) * 100)} /></div>
      <div style={{ ...styles.card }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={styles.badge(COLORS.accent)}>Questão {qIndex + 1}/{questions.length}</span>
          <span style={{ color: COLORS.textDim, fontSize: 14 }}>⭐ {score} acertos</span>
        </div>

        <p style={{ fontSize: "1.1rem", color: COLORS.textBright, marginBottom: 4 }}>A qual máquina simples pertence este objeto?</p>
        <p style={{ fontSize: "1.3rem", margin: "12px 0 20px", color: COLORS.accentLight, fontWeight: "bold" }}>{q.object}</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 8, marginBottom: 16 }}>
          {machineKeys.map(key => {
            const m = SIMPLE_MACHINES[key];
            let borderColor = COLORS.border;
            let bg = COLORS.bgCardHover;
            if (selected === key && !showResult) { borderColor = COLORS.accent; bg = COLORS.accent + "18"; }
            if (showResult && key === q.answer) { borderColor = COLORS.success; bg = COLORS.successBg; }
            if (showResult && selected === key && key !== q.answer) { borderColor = COLORS.error; bg = COLORS.errorBg; }
            return (
              <div key={key} onClick={() => handleSelect(key)} style={{ ...styles.machineCard(false), borderColor, background: bg, cursor: showResult ? "default" : "pointer" }}>
                <div style={{ fontSize: 24 }}>{m.icon}</div>
                <div style={{ fontSize: 13, fontWeight: "bold", color: selected === key ? COLORS.accentLight : COLORS.text }}>{m.name}</div>
              </div>
            );
          })}
        </div>

        {!showResult && !showHint && (
          <div style={{ marginBottom: 12, textAlign: "center" }}>
            <button onClick={() => setShowHint(true)} style={{ background: "none", border: `1px solid ${COLORS.accentDim}44`, borderRadius: 8, padding: "8px 16px", color: COLORS.accentLight, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              💡 Preciso de uma dica!
            </button>
          </div>
        )}

        {!showResult && showHint && (
          <div style={{ background: COLORS.accent + "11", border: `1px solid ${COLORS.accentDim}44`, borderRadius: 10, padding: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: COLORS.accentLight }}>💡 Dica do Mestre: {q.hint}</span>
          </div>
        )}

        {showResult && (
          <div style={{ background: isCorrect ? COLORS.successBg : COLORS.errorBg, border: `1px solid ${isCorrect ? COLORS.success : COLORS.error}44`, borderRadius: 10, padding: 14, marginBottom: 12 }}>
            <p style={{ margin: 0, color: isCorrect ? COLORS.success : COLORS.error, fontWeight: "bold", marginBottom: 4 }}>
              {isCorrect ? "✅ Correto!" : `❌ Não foi dessa vez! Era: ${SIMPLE_MACHINES[q.answer].name}`}
            </p>
            <p style={{ margin: 0, fontSize: 14, color: COLORS.textDim, fontStyle: "italic" }}>{getFeedback()}</p>
          </div>
        )}

        <div style={{ textAlign: "right" }}>
          {!showResult ? (
            <button style={{ ...styles.button("primary"), opacity: selected ? 1 : 0.5 }} onClick={handleConfirm} disabled={!selected}>
              Confirmar ✓
            </button>
          ) : (
            <button style={styles.button("primary")} onClick={handleNext}>
              {qIndex < questions.length - 1 ? "Próxima ➜" : "Ver Resultado ★"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- PHASE 2 ----
function Phase2({ onComplete }) {
  const [step, setStep] = useState("intro");
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);

  const questions = PHASE2_DATA.questions;
  const q = questions[qIndex];

  const handleAnswer = (val) => {
    if (showResult) return;
    setSelected(val);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    setShowResult(true);
    const correct = q.type === "trueFalse" ? selected === q.answer : selected === q.answer;
    if (correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (qIndex < questions.length - 1) {
      setQIndex(i => i + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setStep("result");
    }
  };

  const isCorrect = q ? (q.type === "trueFalse" ? selected === q.answer : selected === q.answer) : false;

  const getStars = () => {
    const pct = score / questions.length;
    if (pct >= 0.9) return 3;
    if (pct >= 0.7) return 2;
    if (pct >= 0.5) return 1;
    return 0;
  };

  if (step === "intro") {
    return <NarrativeScreen lines={PHASE2_DATA.intro.narrative} onContinue={() => setStep("teaching")} buttonText="Estudar o Diário 📖" />;
  }

  if (step === "teaching") {
    const cards = PHASE2_DATA.teaching.cards;
    const card = cards[cardIndex];
    return (
      <div style={styles.card}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 24 }}>📖</span>
          <h3 style={{ margin: 0, color: COLORS.accentLight }}>Como Funcionam as Máquinas Simples</h3>
        </div>
        <div style={{ textAlign: "center", marginBottom: 4 }}>
          <span style={{ fontSize: 40 }}>{card.icon}</span>
          <h4 style={{ color: COLORS.accent, margin: "8px 0 4px" }}>{card.machine}</h4>
        </div>
        <p style={{ color: COLORS.text, lineHeight: 1.7, textAlign: "center", marginBottom: 16 }}>{card.principle}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 16 }}>
          {cards.map((_, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: i === cardIndex ? COLORS.accent : COLORS.border, transition: "all 0.2s" }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button style={styles.button("secondary")} onClick={() => setCardIndex(i => Math.max(0, i - 1))} disabled={cardIndex === 0}>
            ← Anterior
          </button>
          {cardIndex < cards.length - 1 ? (
            <button style={styles.button("primary")} onClick={() => setCardIndex(i => i + 1)}>Próxima →</button>
          ) : (
            <button style={styles.button("primary")} onClick={() => setStep("quiz")}>Vamos ao Desafio! 🎯</button>
          )}
        </div>
      </div>
    );
  }

  if (step === "result") {
    return <PhaseComplete stars={getStars()} totalCorrect={score} totalQuestions={questions.length} onNext={() => onComplete(getStars())} phaseName="Fase 2 — O Diário do Mestre" />;
  }

  return (
    <div>
      <div style={styles.progressBar}><div style={styles.progressFill((qIndex / questions.length) * 100)} /></div>
      <div style={styles.card}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={styles.badge(q.type === "trueFalse" ? "#5bc0de" : q.type === "complete" ? "#f0ad4e" : COLORS.accent)}>
            {q.type === "trueFalse" ? "V ou F" : q.type === "complete" ? "Complete" : "Múltipla Escolha"}
          </span>
          <span style={{ color: COLORS.textDim, fontSize: 14 }}>⭐ {score} | {qIndex + 1}/{questions.length}</span>
        </div>

        <p style={{ fontSize: "1.05rem", color: COLORS.textBright, lineHeight: 1.6, marginBottom: 16 }}>{q.text}</p>

        {q.type === "trueFalse" ? (
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            {[true, false].map(val => {
              let bg = COLORS.bgCardHover; let border = COLORS.border; let color = COLORS.text;
              if (selected === val && !showResult) { bg = COLORS.accent + "22"; border = COLORS.accent; color = COLORS.accentLight; }
              if (showResult && val === q.answer) { bg = COLORS.successBg; border = COLORS.success; color = COLORS.success; }
              if (showResult && selected === val && val !== q.answer) { bg = COLORS.errorBg; border = COLORS.error; color = COLORS.error; }
              return (
                <button key={String(val)} onClick={() => handleAnswer(val)} style={{ flex: 1, padding: 14, borderRadius: 10, border: `1.5px solid ${border}`, background: bg, color, fontSize: 16, fontWeight: "bold", cursor: showResult ? "default" : "pointer", fontFamily: "inherit" }}>
                  {val ? "✅ Verdadeiro" : "❌ Falso"}
                </button>
              );
            })}
          </div>
        ) : (
          <div style={{ marginBottom: 16 }}>
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(i)} style={styles.optionBtn(selected === i, i === q.answer, showResult)}>
                {String.fromCharCode(65 + i)}) {opt}
              </button>
            ))}
          </div>
        )}

        {showResult && (
          <div style={{ background: isCorrect ? COLORS.successBg : COLORS.errorBg, border: `1px solid ${isCorrect ? COLORS.success : COLORS.error}44`, borderRadius: 10, padding: 14, marginBottom: 12 }}>
            <p style={{ margin: 0, color: isCorrect ? COLORS.success : COLORS.error, fontWeight: "bold", marginBottom: 4 }}>
              {isCorrect ? "✅ Correto!" : "❌ Não foi dessa vez!"}
            </p>
            {q.explanation && <p style={{ margin: 0, fontSize: 14, color: COLORS.textDim, fontStyle: "italic" }}>{q.explanation}</p>}
          </div>
        )}

        <div style={{ textAlign: "right" }}>
          {!showResult ? (
            <button style={{ ...styles.button("primary"), opacity: selected !== null ? 1 : 0.5 }} onClick={handleConfirm} disabled={selected === null}>Confirmar ✓</button>
          ) : (
            <button style={styles.button("primary")} onClick={handleNext}>{qIndex < questions.length - 1 ? "Próxima ➜" : "Ver Resultado ★"}</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- PHASE 3 ----
function Phase3({ onComplete }) {
  const [step, setStep] = useState("intro");
  const [periodIdx, setPeriodIdx] = useState(0);
  const [subStep, setSubStep] = useState("narrative"); // narrative, teaching, questions
  const [qLocalIdx, setQLocalIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timelineOrder, setTimelineOrder] = useState([3, 1, 0, 2]); // shuffled
  const [timelineSubmitted, setTimelineSubmitted] = useState(false);

  const periods = PHASE3_DATA.periods;
  const period = periods[periodIdx];
  const totalQuestions = periods.reduce((s, p) => s + p.questions.length, 0) + 1; // +1 for timeline

  const handleAnswer = (val) => { if (!showResult) setSelected(val); };
  const handleConfirm = () => {
    if (selected === null) return;
    setShowResult(true);
    const q = period.questions[qLocalIdx];
    if (selected === q.answer) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (qLocalIdx < period.questions.length - 1) {
      setQLocalIdx(i => i + 1); setSelected(null); setShowResult(false);
    } else if (periodIdx < periods.length - 1) {
      setPeriodIdx(i => i + 1); setQLocalIdx(0); setSelected(null); setShowResult(false); setSubStep("narrative");
    } else {
      setStep("timeline");
    }
  };

  const getStars = () => {
    const pct = score / totalQuestions;
    if (pct >= 0.9) return 3;
    if (pct >= 0.7) return 2;
    if (pct >= 0.5) return 1;
    return 0;
  };

  const moveTimeline = (idx, dir) => {
    const arr = [...timelineOrder];
    const target = idx + dir;
    if (target < 0 || target >= arr.length) return;
    [arr[idx], arr[target]] = [arr[target], arr[idx]];
    setTimelineOrder(arr);
  };

  const checkTimeline = () => {
    setTimelineSubmitted(true);
    const items = PHASE3_DATA.timeline.items;
    const correct = timelineOrder.every((tIdx, pos) => items[tIdx].order === pos + 1);
    if (correct) setScore(s => s + 1);
  };

  if (step === "intro") {
    return <NarrativeScreen lines={PHASE3_DATA.intro.narrative} onContinue={() => { setStep("periods"); setSubStep("narrative"); }} buttonText="Iniciar Viagem! 🚀" />;
  }

  if (step === "timeline") {
    const items = PHASE3_DATA.timeline.items;
    const isCorrect = timelineOrder.every((tIdx, pos) => items[tIdx].order === pos + 1);
    return (
      <div style={styles.card}>
        <h3 style={{ color: COLORS.accentLight, marginBottom: 4 }}>🕐 Linha do Tempo</h3>
        <p style={{ color: COLORS.textDim, marginBottom: 16 }}>{PHASE3_DATA.timeline.instruction}</p>
        {timelineOrder.map((tIdx, pos) => (
          <div key={tIdx} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, padding: "10px 14px", borderRadius: 10, background: timelineSubmitted ? (items[tIdx].order === pos + 1 ? COLORS.successBg : COLORS.errorBg) : COLORS.bgCardHover, border: `1px solid ${timelineSubmitted ? (items[tIdx].order === pos + 1 ? COLORS.success : COLORS.error) : COLORS.border}44` }}>
            <span style={{ fontWeight: "bold", color: COLORS.accent, minWidth: 20 }}>{pos + 1}.</span>
            <span style={{ flex: 1, color: COLORS.text }}>{items[tIdx].text}</span>
            {!timelineSubmitted && (
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <button onClick={() => moveTimeline(pos, -1)} style={{ background: "none", border: "none", color: COLORS.accent, cursor: "pointer", fontSize: 16, padding: 2 }}>▲</button>
                <button onClick={() => moveTimeline(pos, 1)} style={{ background: "none", border: "none", color: COLORS.accent, cursor: "pointer", fontSize: 16, padding: 2 }}>▼</button>
              </div>
            )}
          </div>
        ))}
        {timelineSubmitted && (
          <div style={{ background: isCorrect ? COLORS.successBg : COLORS.errorBg, borderRadius: 10, padding: 12, marginTop: 12, border: `1px solid ${isCorrect ? COLORS.success : COLORS.error}44` }}>
            <p style={{ margin: 0, color: isCorrect ? COLORS.success : COLORS.error, fontWeight: "bold" }}>
              {isCorrect ? "✅ Ordem perfeita! Você dominou a linha do tempo!" : "❌ A ordem correta é: Egito → Grécia → Revolução Industrial → Atualidade"}
            </p>
          </div>
        )}
        <div style={{ textAlign: "right", marginTop: 16 }}>
          {!timelineSubmitted ? (
            <button style={styles.button("primary")} onClick={checkTimeline}>Confirmar Ordem ✓</button>
          ) : (
            <button style={styles.button("primary")} onClick={() => setStep("result")}>Ver Resultado ★</button>
          )}
        </div>
      </div>
    );
  }

  if (step === "result") {
    return <PhaseComplete stars={getStars()} totalCorrect={score} totalQuestions={totalQuestions} onNext={() => onComplete(getStars())} phaseName="Fase 3 — Viagem no Tempo" />;
  }

  // Periods
  if (subStep === "narrative") {
    return (
      <div>
        <div style={{ ...styles.card, borderLeft: `4px solid ${COLORS.accent}` }}>
          <h3 style={{ color: COLORS.accentLight, margin: "0 0 2px" }}>{period.title}</h3>
          <p style={{ color: COLORS.textDim, fontStyle: "italic", margin: "0 0 12px" }}>{period.subtitle}</p>
          <p style={{ color: COLORS.text, lineHeight: 1.7 }}>{period.narrative}</p>
          <div style={{ textAlign: "right", marginTop: 16 }}>
            <button style={styles.button("primary")} onClick={() => setSubStep("teaching")}>Explorar esta época 🔍</button>
          </div>
        </div>
      </div>
    );
  }

  if (subStep === "teaching") {
    return (
      <div style={styles.card}>
        <p style={{ color: COLORS.text, lineHeight: 1.7, marginBottom: 16 }}>{period.teaching}</p>
        <div style={{ textAlign: "center" }}>
          <button style={styles.button("primary")} onClick={() => setSubStep("questions")}>Responder Questões 🎯</button>
        </div>
      </div>
    );
  }

  // Questions
  const q = period.questions[qLocalIdx];
  const isCorrect = selected === q.answer;
  const answeredSoFar = periods.slice(0, periodIdx).reduce((s, p) => s + p.questions.length, 0) + qLocalIdx;

  return (
    <div>
      <div style={styles.progressBar}><div style={styles.progressFill((answeredSoFar / (totalQuestions - 1)) * 100)} /></div>
      <div style={styles.card}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={styles.badge(COLORS.accent)}>{period.title.split(" ")[0]} — Q{qLocalIdx + 1}</span>
          <span style={{ color: COLORS.textDim, fontSize: 14 }}>⭐ {score}</span>
        </div>
        <p style={{ fontSize: "1.05rem", color: COLORS.textBright, lineHeight: 1.6, marginBottom: 16 }}>{q.text}</p>
        {q.options.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(i)} style={styles.optionBtn(selected === i, i === q.answer, showResult)}>
            {String.fromCharCode(65 + i)}) {opt}
          </button>
        ))}
        {showResult && (
          <div style={{ background: isCorrect ? COLORS.successBg : COLORS.errorBg, borderRadius: 10, padding: 12, marginTop: 8, border: `1px solid ${isCorrect ? COLORS.success : COLORS.error}44` }}>
            <p style={{ margin: 0, color: isCorrect ? COLORS.success : COLORS.error, fontWeight: "bold" }}>
              {isCorrect ? "✅ Correto!" : `❌ Resposta: ${q.options[q.answer]}`}
            </p>
          </div>
        )}
        <div style={{ textAlign: "right", marginTop: 12 }}>
          {!showResult ? (
            <button style={{ ...styles.button("primary"), opacity: selected !== null ? 1 : 0.5 }} onClick={handleConfirm} disabled={selected === null}>Confirmar ✓</button>
          ) : (
            <button style={styles.button("primary")} onClick={handleNext}>
              {qLocalIdx < period.questions.length - 1 ? "Próxima ➜" : periodIdx < periods.length - 1 ? "Próximo Período ➜" : "Linha do Tempo 🕐"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- PHASE 4 ----
function Phase4({ onComplete }) {
  const [step, setStep] = useState("intro");
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const questions = PHASE4_DATA.questions;
  const q = questions[qIndex];

  const handleAnswer = (val) => { if (!showResult) setSelected(val); };
  const handleConfirm = () => {
    if (selected === null) return;
    setShowResult(true);
    if (selected === q.answer) setScore(s => s + 1);
  };
  const handleNext = () => {
    if (qIndex < questions.length - 1) { setQIndex(i => i + 1); setSelected(null); setShowResult(false); }
    else setStep("result");
  };

  const isCorrect = selected === q?.answer;
  const getStars = () => { const p = score / questions.length; return p >= 0.9 ? 3 : p >= 0.7 ? 2 : p >= 0.5 ? 1 : 0; };

  if (step === "intro") return <NarrativeScreen lines={PHASE4_DATA.intro.narrative} onContinue={() => setStep("teaching")} buttonText="Desmontar Máquinas! 🔧" />;

  if (step === "teaching") {
    return (
      <TeachingPanel title={PHASE4_DATA.teaching.title} onContinue={() => setStep("quiz")}>
        <p style={{ color: COLORS.textDim, lineHeight: 1.6, marginBottom: 16 }}>{PHASE4_DATA.teaching.text}</p>
        {PHASE4_DATA.teaching.examples.map((ex, i) => (
          <div key={i} style={{ ...styles.teachingCard, marginBottom: 8 }}>
            <div style={{ fontWeight: "bold", color: COLORS.accentLight, marginBottom: 6 }}>{ex.name}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {ex.machines.map((m, j) => <span key={j} style={styles.badge(COLORS.accent)}>{m}</span>)}
            </div>
          </div>
        ))}
      </TeachingPanel>
    );
  }

  if (step === "result") return <PhaseComplete stars={getStars()} totalCorrect={score} totalQuestions={questions.length} onNext={() => onComplete(getStars())} phaseName="Fase 4 — A Máquina por Dentro" />;

  return (
    <div>
      <div style={styles.progressBar}><div style={styles.progressFill((qIndex / questions.length) * 100)} /></div>
      <div style={styles.card}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={styles.badge(COLORS.accent)}>Questão {qIndex + 1}/{questions.length}</span>
          <span style={{ color: COLORS.textDim, fontSize: 14 }}>⭐ {score}</span>
        </div>
        <p style={{ fontSize: "1.05rem", color: COLORS.textBright, lineHeight: 1.6, marginBottom: 16 }}>{q.text}</p>
        {q.options.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(i)} style={styles.optionBtn(selected === i, i === q.answer, showResult)}>
            {String.fromCharCode(65 + i)}) {opt}
          </button>
        ))}
        {showResult && (
          <div style={{ background: isCorrect ? COLORS.successBg : COLORS.errorBg, borderRadius: 10, padding: 14, marginTop: 8, border: `1px solid ${isCorrect ? COLORS.success : COLORS.error}44` }}>
            <p style={{ margin: 0, color: isCorrect ? COLORS.success : COLORS.error, fontWeight: "bold", marginBottom: 4 }}>
              {isCorrect ? "✅ Correto!" : `❌ Resposta: ${q.options[q.answer]}`}
            </p>
            {q.explanation && <p style={{ margin: 0, fontSize: 14, color: COLORS.textDim, fontStyle: "italic" }}>{q.explanation}</p>}
          </div>
        )}
        <div style={{ textAlign: "right", marginTop: 12 }}>
          {!showResult ? (
            <button style={{ ...styles.button("primary"), opacity: selected !== null ? 1 : 0.5 }} onClick={handleConfirm} disabled={selected === null}>Confirmar ✓</button>
          ) : (
            <button style={styles.button("primary")} onClick={handleNext}>{qIndex < questions.length - 1 ? "Próxima ➜" : "Ver Resultado ★"}</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- PHASE 5 ----
function Phase5({ onComplete }) {
  const [step, setStep] = useState("intro");
  const [challengeIdx, setChallengeIdx] = useState(null);
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [inventionName, setInventionName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [invalidCombo, setInvalidCombo] = useState(false);

  const challenge = challengeIdx !== null ? PHASE5_DATA.challenges[challengeIdx] : null;
  const machineKeys = Object.keys(SIMPLE_MACHINES);

  const toggleMachine = (key) => {
    if (submitted) return;
    setInvalidCombo(false);
    setSelectedMachines(prev => {
      if (prev.includes(key)) return prev.filter(k => k !== key);
      if (prev.length >= 2) return [prev[1], key];
      return [...prev, key];
    });
  };

  const getComboKey = () => [...selectedMachines].sort().join("+");

  const isValidCombo = () => {
    if (!challenge || selectedMachines.length !== 2) return false;
    return challenge.validCombos.includes(getComboKey());
  };

  const getFeedback = () => {
    if (!challenge) return "";
    return challenge.feedbacks[getComboKey()] || "";
  };

  const handleSubmit = () => {
    if (selectedMachines.length !== 2 || !inventionName.trim()) return;
    if (!isValidCombo()) {
      setInvalidCombo(true);
      return;
    }
    setInvalidCombo(false);
    setSubmitted(true);
  };

  if (step === "intro") {
    return <NarrativeScreen lines={PHASE5_DATA.intro.narrative} onContinue={() => setStep("choose")} buttonText="Aceitar o Desafio! 🛠️" />;
  }

  if (step === "choose") {
    return (
      <div style={styles.card}>
        <h3 style={{ color: COLORS.accentLight, marginBottom: 4 }}>Escolha seu Desafio</h3>
        <p style={{ color: COLORS.textDim, marginBottom: 16 }}>Selecione um dos problemas abaixo para resolver com sua invenção:</p>
        {PHASE5_DATA.challenges.map((ch, i) => (
          <button key={ch.id} onClick={() => { setChallengeIdx(i); setStep("invent"); }} style={{ display: "block", width: "100%", padding: "16px 18px", marginBottom: 10, borderRadius: 12, border: `1.5px solid ${COLORS.border}`, background: COLORS.bgCardHover, color: COLORS.text, cursor: "pointer", textAlign: "left", fontFamily: "inherit", fontSize: 15, lineHeight: 1.6, transition: "all 0.2s" }}>
            <span style={{ fontSize: 24, marginRight: 10 }}>{ch.icon}</span>
            <strong style={{ color: COLORS.accentLight }}>{ch.title}</strong>
            <br />
            <span style={{ color: COLORS.textDim, fontSize: 14 }}>{ch.problem.slice(0, 80)}...</span>
          </button>
        ))}
      </div>
    );
  }

  if (step === "invent") {
    return (
      <div>
        <div style={{ ...styles.card, borderLeft: `4px solid ${COLORS.accent}` }}>
          <h3 style={{ color: COLORS.accentLight, marginBottom: 4 }}>{challenge.icon} {challenge.title}</h3>
          <p style={{ color: COLORS.text, lineHeight: 1.7 }}>{challenge.problem}</p>
        </div>

        <div style={styles.card}>
          <h4 style={{ color: COLORS.accentLight, marginBottom: 8 }}>1. Selecione exatamente 2 máquinas simples que resolvem o problema:</h4>
          <p style={{ color: COLORS.textDim, fontSize: 13, marginBottom: 12 }}>Pense bem! Nem todas as combinações funcionam para este desafio. Escolha as que fazem sentido juntas.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 8, marginBottom: 20 }}>
            {machineKeys.map(key => {
              const m = SIMPLE_MACHINES[key];
              const sel = selectedMachines.includes(key);
              return (
                <div key={key} onClick={() => toggleMachine(key)} style={{ ...styles.machineCard(sel), border: `1.5px solid ${sel ? COLORS.accent : COLORS.border}`, background: sel ? COLORS.accent + "22" : COLORS.bgCardHover, cursor: submitted ? "default" : "pointer" }}>
                  <div style={{ fontSize: 22 }}>{m.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: "bold", color: sel ? COLORS.accentLight : COLORS.textDim }}>{m.name}</div>
                  {sel && <div style={{ color: COLORS.accent, fontSize: 14, marginTop: 2 }}>✓</div>}
                </div>
              );
            })}
          </div>

          <h4 style={{ color: COLORS.accentLight, marginBottom: 8 }}>2. Dê um nome à sua engenhoca:</h4>
          <input style={styles.input} value={inventionName} onChange={e => setInventionName(e.target.value)} placeholder="Ex.: ElevaFrutas 3000, RampaExpress..." maxLength={60} disabled={submitted} />

          {invalidCombo && (
            <div style={{ background: COLORS.errorBg, border: `1px solid ${COLORS.error}44`, borderRadius: 10, padding: 14, marginTop: 16 }}>
              <p style={{ margin: 0, color: COLORS.error, fontWeight: "bold", marginBottom: 4 }}>🤔 Hmm, essa combinação não resolve bem este problema...</p>
              <p style={{ margin: 0, fontSize: 14, color: COLORS.textDim }}>Pense de novo: quais máquinas simples fariam sentido juntas para "{challenge.title}"? Releia o problema e tente outra combinação!</p>
            </div>
          )}

          {!submitted ? (
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <button style={{ ...styles.button("primary"), opacity: (selectedMachines.length === 2 && inventionName.trim()) ? 1 : 0.5 }} onClick={handleSubmit} disabled={selectedMachines.length !== 2 || !inventionName.trim()}>
                Apresentar Invenção ao Mestre! 🎉
              </button>
            </div>
          ) : (
            <div style={{ background: COLORS.successBg, border: `1px solid ${COLORS.success}44`, borderRadius: 12, padding: 18, marginTop: 16 }}>
              <div style={styles.speakerLabel}>Mestre Arquimedes</div>
              <p style={{ color: COLORS.success, fontWeight: "bold", fontSize: "1.1rem", marginBottom: 8 }}>
                🎉 Apresentando: "{inventionName}"!
              </p>
              <p style={{ color: COLORS.text, lineHeight: 1.7, fontStyle: "italic", marginBottom: 16 }}>
                {getFeedback()}
              </p>
              <p style={{ color: COLORS.accentLight, lineHeight: 1.7 }}>
                "A máquina do tempo está consertada! Mas a verdade é... o maior invento aqui foi o seu raciocínio, jovem mestre!"
              </p>
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <button style={styles.button("primary")} onClick={() => onComplete(3, inventionName)}>
                  Receber Certificado! 🏆
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}

// ---- CERTIFICATE ----
function Certificate({ studentName, inventionName, totalStars, onRestart }) {
  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <div style={{ ...styles.card, background: `linear-gradient(135deg, #2a2018, #1a1410)`, border: `2px solid ${COLORS.accent}`, padding: "32px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${COLORS.accentDim}, ${COLORS.accent}, ${COLORS.accentDim})` }} />
        <p style={{ color: COLORS.accent, fontSize: 14, letterSpacing: 4, textTransform: "uppercase", marginBottom: 4 }}>Certificado</p>
        <h2 style={{ color: COLORS.accentLight, fontSize: "clamp(1.5rem, 4vw, 2rem)", margin: "8px 0" }}>🏆 Jovem Inventor 🏆</h2>
        <p style={{ color: COLORS.textDim, fontSize: 14, marginBottom: 16 }}>Concedido pela Oficina do Mestre Arquimedes</p>

        <div style={{ background: COLORS.bgLight, borderRadius: 12, padding: 16, margin: "16px 0" }}>
          <p style={{ color: COLORS.textDim, fontSize: 13, margin: "0 0 4px" }}>Inventor(a):</p>
          <p style={{ color: COLORS.accentLight, fontSize: "1.3rem", fontWeight: "bold", margin: 0 }}>{studentName || "Jovem Inventor(a)"}</p>
        </div>

        {inventionName && (
          <div style={{ background: COLORS.bgLight, borderRadius: 12, padding: 16, margin: "0 0 16px" }}>
            <p style={{ color: COLORS.textDim, fontSize: 13, margin: "0 0 4px" }}>Engenhoca criada:</p>
            <p style={{ color: COLORS.accent, fontSize: "1.1rem", fontWeight: "bold", margin: 0 }}>"{inventionName}"</p>
          </div>
        )}

        <Stars count={totalStars >= 12 ? 3 : totalStars >= 8 ? 2 : 1} />
        <p style={{ color: COLORS.textDim, fontSize: 14 }}>Estrelas totais: {totalStars}/15</p>

        <p style={{ color: COLORS.text, fontStyle: "italic", lineHeight: 1.6, margin: "16px 0" }}>
          "Dê-me um ponto de apoio e moverei o mundo." — Arquimedes
        </p>
        <p style={{ color: COLORS.textDim, fontSize: 12 }}>EF07CI01/ES — Máquinas Simples</p>
      </div>

      <button style={{ ...styles.button("secondary"), marginTop: 16 }} onClick={onRestart}>
        🔄 Jogar Novamente
      </button>
    </div>
  );
}

// ---- WELCOME ----
function WelcomeScreen({ onStart }) {
  const [name, setName] = useState("");

  return (
    <div style={{ textAlign: "center", padding: "40px 0 20px" }}>
      <div style={{ fontSize: 64, marginBottom: 8 }}>⚙️</div>
      <h1 style={{ ...styles.title, marginBottom: 8 }}>ENGENHOCA</h1>
      <p style={{ ...styles.subtitle, marginBottom: 30 }}>A Oficina do Tempo</p>

      <div style={{ ...styles.card, maxWidth: 480, margin: "0 auto" }}>
        <p style={{ color: COLORS.text, lineHeight: 1.7, marginBottom: 16 }}>
          Uma oficina misteriosa. Uma máquina do tempo quebrada. Seis máquinas simples que movem o mundo.
          Sua missão: desvendar os segredos da mecânica, viajar pela história e inventar uma engenhoca original!
        </p>

        <div style={{ background: COLORS.bgLight, borderRadius: 10, padding: 14, marginBottom: 16, textAlign: "left" }}>
          <p style={{ color: COLORS.textDim, fontSize: 13, marginBottom: 8 }}>📋 Você vai aprender:</p>
          {[
            "O que são máquinas simples e onde encontrá-las",
            "Como cada uma funciona",
            "Como foram usadas ao longo da história",
            "Como máquinas complexas combinam as simples",
            "Como INVENTAR soluções para problemas reais",
          ].map((item, i) => (
            <p key={i} style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.6, margin: "6px 0" }}>
              ✦ {item}
            </p>
          ))}
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", color: COLORS.textDim, fontSize: 13, marginBottom: 6, textAlign: "left" }}>Seu nome (para o certificado):</label>
          <input style={styles.input} value={name} onChange={e => setName(e.target.value)} placeholder="Digite seu nome aqui..." maxLength={40} />
        </div>

        <button style={{ ...styles.button("primary"), width: "100%", justifyContent: "center", fontSize: 18, padding: "14px 28px" }} onClick={() => onStart(name)}>
          Entrar na Oficina ⚙️
        </button>
      </div>
    </div>
  );
}

// ---- MAIN APP ----
export default function App() {
  const [gameState, setGameState] = useState("welcome"); // welcome, playing, certificate
  const [currentPhase, setCurrentPhase] = useState(0);
  const [completedPhases, setCompletedPhases] = useState([]);
  const [phaseStars, setPhaseStars] = useState({});
  const [playerName, setPlayerName] = useState("");
  const [inventionName, setInventionName] = useState("");

  const handleStart = (name) => {
    setPlayerName(name || "Inventor(a)");
    setGameState("playing");
    setCurrentPhase(0);
  };

  const handlePhaseComplete = (phase, stars) => {
    setPhaseStars(prev => ({ ...prev, [phase]: stars }));
    setCompletedPhases(prev => [...prev, phase]);
    if (phase < 4) {
      setCurrentPhase(phase + 1);
    } else {
      setGameState("certificate");
    }
  };

  const handleRestart = () => {
    setGameState("welcome");
    setCurrentPhase(0);
    setCompletedPhases([]);
    setPhaseStars({});
    setInventionName("");
  };

  const totalStars = Object.values(phaseStars).reduce((s, v) => s + v, 0);

  const phaseNames = ["A Oficina Esquecida", "O Diário do Mestre", "Viagem no Tempo", "A Máquina por Dentro", "O Inventor é Você!"];

  return (
    <div style={styles.app}>
      <GearBg />
      <div style={styles.container}>
        {gameState === "welcome" && <WelcomeScreen onStart={handleStart} />}

        {gameState === "playing" && (
          <>
            <div style={styles.header}>
              <h1 style={{ ...styles.title, fontSize: "clamp(1.4rem, 4vw, 1.8rem)" }}>⚙️ ENGENHOCA</h1>
              <p style={{ color: COLORS.textDim, fontSize: 13, margin: "2px 0 0" }}>{phaseNames[currentPhase]}</p>
            </div>
            <PhaseBar currentPhase={currentPhase} completedPhases={completedPhases} />

            {currentPhase === 0 && <Phase1 onComplete={(s) => handlePhaseComplete(0, s)} />}
            {currentPhase === 1 && <Phase2 onComplete={(s) => handlePhaseComplete(1, s)} />}
            {currentPhase === 2 && <Phase3 onComplete={(s) => handlePhaseComplete(2, s)} />}
            {currentPhase === 3 && <Phase4 onComplete={(s) => handlePhaseComplete(3, s)} />}
            {currentPhase === 4 && <Phase5 onComplete={(s, name) => { setInventionName(name || "Engenhoca"); handlePhaseComplete(4, s); }} />}
          </>
        )}

        {gameState === "certificate" && (
          <Certificate
            studentName={playerName}
            inventionName={inventionName}
            totalStars={totalStars}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}

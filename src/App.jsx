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
  transition: "Impressionante! Você já consegue reconhecer máquinas simples escondidas nos objetos do dia a dia. A máquina do tempo ganhou sua primeira carga de energia! Mas identificar é só o começo... agora você precisa entender COMO cada máquina funciona. Encontrei meu velho diário de anotações, mas ele está danificado. Vai me ajudar a reconstruí-lo?",
  teaching: {
    title: "As 6 Máquinas Simples",
    text: "Máquinas simples são dispositivos mecânicos básicos que facilitam a realização de trabalho, modificando a intensidade, a direção ou a distância de aplicação de uma força. Existem 6 tipos fundamentais:",
  },
  questions: [
    { id: "p1q1", object: "Rampa de skate 🛹", answer: "planoInclinado", hint: "É uma superfície que vai do chão até uma altura maior...",
      feedbacks: {
        planoInclinado: "Isso mesmo! A rampa de skate é um plano inclinado clássico: uma superfície que permite subir ou descer usando menos esforço do que um salto direto!",
        alavanca: "Não é essa! A alavanca precisa de um ponto de apoio fixo e uma barra que gire. A rampa de skate não gira em torno de nada — ela é uma superfície contínua que liga dois níveis de altura. Isso é um plano inclinado!",
        cunha: "Quase, mas a cunha serve para cortar ou separar materiais, como a lâmina de uma faca. A rampa de skate não corta nada — ela facilita subir ou descer. Isso é um plano inclinado!",
        parafuso: "Não é essa! O parafuso é um plano inclinado enrolado em espiral. A rampa de skate é reta, não espiral. Ela é um plano inclinado na sua forma mais simples!",
        roldana: "Não é essa! A roldana é uma roda com corda que muda a direção da força. A rampa de skate não usa rodas nem cordas — é uma superfície inclinada. Isso é um plano inclinado!",
        rodaEixo: "Não é essa! A roda com eixo gira em torno de um centro, como uma maçaneta. A rampa de skate não gira — ela é uma superfície fixa que conecta dois níveis. Isso é um plano inclinado!",
      }
    },
    { id: "p1q2", object: "Varal com cordinha 🧺", answer: "roldana", hint: "O que acontece quando você puxa a corda de um lado?",
      feedbacks: {
        roldana: "Perfeito! No varal, a cordinha passa por uma rodinha (roldana) que permite mover as roupas puxando de um lado só. A roldana muda a direção do movimento!",
        alavanca: "Não é essa! A alavanca é uma barra que gira em torno de um ponto fixo. No varal, o que move as roupas é a corda passando por uma rodinha — e rodinha com corda é uma roldana!",
        planoInclinado: "Não é essa! O plano inclinado é uma rampa. O varal funciona com uma corda que desliza por uma rodinha para mover as roupas. Essa rodinha é uma roldana!",
        cunha: "Não é essa! A cunha serve para cortar ou separar. No varal, o mecanismo é uma corda passando por uma rodinha que muda a direção do movimento. Isso é uma roldana!",
        parafuso: "Não é essa! O parafuso tem formato espiral. No varal, o que faz o sistema funcionar é a corda passando por uma rodinha — e isso é uma roldana!",
        rodaEixo: "Quase! A roldana é parecida com a roda com eixo, mas a diferença é que na roldana a corda passa pelo sulco da roda para mover algo. No varal, a corda desliza pela rodinha — isso é uma roldana!",
      }
    },
    { id: "p1q3", object: "Carriola / carrinho de mão 🏗️", answer: "alavanca", hint: "Você empurra de um lado e o peso sobe do outro. Onde fica o ponto de apoio?",
      feedbacks: {
        alavanca: "Excelente! A carriola é uma alavanca: a roda na frente é o ponto de apoio (fulcro), a carga fica no meio e você aplica força nas alças. Sua força se multiplica!",
        planoInclinado: "Não é essa! O plano inclinado é uma rampa. A carriola funciona com um princípio diferente: você faz força nas alças, a roda serve de ponto de apoio e a carga no meio é erguida. Isso é uma alavanca!",
        cunha: "Não é essa! A cunha serve para cortar ou separar. A carriola funciona porque a roda (ponto de apoio) permite que a força nas alças levante a carga. Isso é o princípio da alavanca!",
        parafuso: "Não é essa! O parafuso é uma espiral que fixa ou eleva. Na carriola, a roda funciona como ponto de apoio e as alças como braço de força — isso é uma alavanca!",
        roldana: "Não é essa! A roldana usa corda e roda para mudar a direção da força. Na carriola, não há corda — a roda é o ponto de apoio e as alças são o braço. Isso é uma alavanca!",
        rodaEixo: "Quase! A carriola tem roda, mas o princípio principal não é a roda com eixo. O que importa é que a roda funciona como ponto de apoio (fulcro): você faz força nas alças e a carga é erguida. Esse é o princípio da alavanca!",
      }
    },
    { id: "p1q4", object: "Tampa de garrafa rosqueável 🍶", answer: "parafuso", hint: "Pense nas ranhuras em espiral da tampa...",
      feedbacks: {
        parafuso: "Isso mesmo! As ranhuras em espiral da tampa funcionam como um parafuso: ao girar (movimento circular), a tampa sobe ou desce (movimento linear). Um plano inclinado enrolado!",
        alavanca: "Não é essa! A alavanca usa um ponto de apoio e uma barra. A tampa rosqueável funciona por causa das ranhuras em espiral — ao girar, ela sobe ou desce. Espiral é a marca do parafuso!",
        planoInclinado: "Quase! Você pensou bem, porque o parafuso é, na verdade, um plano inclinado enrolado em espiral. Mas como a tampa usa o formato espiral para converter giro em movimento linear, chamamos de parafuso!",
        cunha: "Não é essa! A cunha corta ou separa com formato triangular. A tampa rosqueável funciona com ranhuras em espiral — ao girar, ela sobe ou desce. Isso é um parafuso!",
        roldana: "Não é essa! A roldana é uma roda com corda. A tampa funciona pelas ranhuras em espiral que convertem o giro em movimento de subir/descer. Isso é um parafuso!",
        rodaEixo: "Não é essa! Embora a tampa gire, ela não funciona como roda com eixo. O segredo está nas ranhuras em espiral: o giro se converte em movimento de subir ou descer. Isso é um parafuso!",
      }
    },
    { id: "p1q5", object: "Machado 🪓", answer: "cunha", hint: "A lâmina tem forma triangular que separa a madeira...",
      feedbacks: {
        cunha: "Isso mesmo! A lâmina do machado tem formato triangular — ao atingir a madeira, a força do golpe é convertida em duas forças laterais que separam as fibras. Cunha pura!",
        alavanca: "Não é essa! O cabo do machado até ajuda a amplificar a força, mas o princípio da ferramenta está na lâmina: ela tem formato triangular que separa a madeira. Esse formato é uma cunha!",
        planoInclinado: "Quase! A cunha é, na verdade, dois planos inclinados unidos. Mas como a lâmina do machado usa esse formato para separar materiais, chamamos de cunha!",
        parafuso: "Não é essa! O parafuso é uma espiral que fixa ou eleva. A lâmina do machado não tem espiral — ela tem formato triangular que corta separando o material para os lados. Isso é uma cunha!",
        roldana: "Não é essa! A roldana é uma roda com corda. O machado funciona pela sua lâmina triangular, que converte a força do golpe em duas forças que separam a madeira. Isso é uma cunha!",
        rodaEixo: "Não é essa! A roda com eixo facilita o movimento giratório. O machado não gira — ele corta, usando uma lâmina triangular que separa o material. Esse princípio é o da cunha!",
      }
    },
    { id: "p1q6", object: "Maçaneta redonda da porta 🚪", answer: "rodaEixo", hint: "Ela gira em torno de um ponto central...",
      feedbacks: {
        rodaEixo: "Perfeito! A maçaneta é uma roda grande (a parte que você gira) presa a um eixo pequeno (o mecanismo interno). Pouca força na maçaneta gera força suficiente para acionar a tranca!",
        alavanca: "Não é essa! A alavanca é uma barra que gira em torno de um ponto fixo. A maçaneta gira inteira ao redor de um eixo central — essa é a marca da roda com eixo!",
        planoInclinado: "Não é essa! O plano inclinado é uma rampa. A maçaneta funciona como uma roda presa a um eixo: ao girar a parte externa (roda grande), o mecanismo interno (eixo pequeno) aciona a tranca. Isso é roda com eixo!",
        cunha: "Não é essa! A cunha corta ou separa com formato triangular. A maçaneta funciona girando ao redor de um eixo central, amplificando sua força para abrir a porta. Isso é roda com eixo!",
        parafuso: "Não é essa! O parafuso tem ranhuras em espiral. A maçaneta redonda não tem espiral — ela é uma roda que gira ao redor de um eixo central para acionar a tranca. Isso é roda com eixo!",
        roldana: "Não é essa! A roldana usa corda passando por uma roda. A maçaneta não tem corda — ela funciona como roda grande presa a um eixo pequeno, amplificando sua força para abrir a porta. Isso é roda com eixo!",
      }
    },
    { id: "p1q7", object: "Mastro de bandeira com corda 🚩", answer: "roldana", hint: "Pense na rodinha lá no topo por onde passa a corda para erguer a bandeira...",
      feedbacks: {
        roldana: "Isso mesmo! No topo do mastro há uma rodinha (roldana) por onde passa a corda. Você puxa a corda para baixo e a bandeira sobe. A roldana muda a direção da força!",
        alavanca: "Não é essa! A alavanca é uma barra com ponto de apoio. No mastro de bandeira, o que ergue a bandeira é a corda passando por uma rodinha no topo — e rodinha com corda é uma roldana!",
        planoInclinado: "Não é essa! O plano inclinado é uma rampa. No mastro, a bandeira sobe porque a corda passa por uma rodinha no topo — você puxa para baixo e ela sobe. Isso é uma roldana!",
        cunha: "Não é essa! A cunha corta ou separa materiais. No mastro de bandeira, o princípio é outro: uma corda passa por uma rodinha no topo, mudando a direção da força. Isso é uma roldana!",
        parafuso: "Não é essa! O parafuso usa espiral. No mastro de bandeira, a bandeira sobe graças à corda que passa por uma rodinha no topo. Essa rodinha é uma roldana!",
        rodaEixo: "Quase! A roldana é parecida com a roda com eixo, mas a diferença é que na roldana a corda passa pelo sulco da roda. No mastro, a corda desliza pela rodinha no topo para erguer a bandeira — isso é uma roldana!",
      }
    },
    { id: "p1q8", object: "Tesoura ✂️", answer: "alavanca", hint: "Observe o ponto onde as duas lâminas se cruzam... é um ponto de apoio!",
      feedbacks: {
        alavanca: "Excelente! A tesoura é uma alavanca dupla: o parafusinho no centro é o ponto de apoio (fulcro), suas mãos aplicam força nas alças e a força se multiplica nas pontas das lâminas!",
        planoInclinado: "Não é essa! O plano inclinado é uma rampa. A tesoura funciona porque duas lâminas giram em torno de um ponto fixo no centro — esse ponto é o fulcro, e o princípio é o da alavanca!",
        cunha: "Quase! As lâminas da tesoura até têm formato de cunha para cortar, mas o princípio principal da tesoura é outro: as duas lâminas giram em torno de um ponto de apoio central, multiplicando a força. Isso é uma alavanca!",
        parafuso: "Não é essa! A tesoura tem um parafusinho no centro, mas ele não funciona como parafuso — ele serve como ponto de apoio (fulcro) para as duas lâminas girarem. O princípio é o da alavanca!",
        roldana: "Não é essa! A roldana é uma roda com corda. A tesoura funciona de forma diferente: duas lâminas giram em torno de um ponto fixo central, multiplicando a força que você faz nas alças. Isso é uma alavanca!",
        rodaEixo: "Não é essa! Embora a tesoura gire em torno de um ponto, ela não é roda com eixo. O que importa é que as duas lâminas funcionam como braços de alavanca: o ponto central é o fulcro e sua força nas alças se multiplica nas pontas. Isso é uma alavanca!",
      }
    },
    { id: "p1q9", object: "Escada 🪜", answer: "planoInclinado", hint: "Cada degrau é como um pequeno plano que te leva mais alto...",
      feedbacks: {
        planoInclinado: "Isso mesmo! A escada é uma sequência de pequenos planos inclinados: cada degrau permite subir uma altura usando menos esforço do que um salto vertical direto!",
        alavanca: "Não é essa! A alavanca precisa de um ponto de apoio e uma barra que gire. A escada funciona de outro jeito: cada degrau é como um pequeno plano que te eleva gradualmente. Isso é plano inclinado!",
        cunha: "Não é essa! A cunha serve para cortar ou separar. A escada facilita subir porque cada degrau funciona como um pequeno plano que reduz o esforço de subir. Isso é plano inclinado!",
        parafuso: "Não é essa! O parafuso é uma espiral. A escada reta não tem espiral — ela é uma sequência de degraus que funcionam como pequenos planos, facilitando a subida. Isso é plano inclinado!",
        roldana: "Não é essa! A roldana é uma roda com corda. A escada não usa cordas nem rodas — ela facilita subir usando degraus, que são pequenos planos inclinados em sequência!",
        rodaEixo: "Não é essa! A roda com eixo gira em torno de um centro. A escada não gira — ela te eleva degrau a degrau, e cada degrau funciona como um pequeno plano inclinado!",
      }
    },
    { id: "p1q10", object: "Saca-rolha 🍷", answer: "parafuso", hint: "Observe a espiral metálica que penetra a rolha ao girar...",
      feedbacks: {
        parafuso: "Perfeito! A espiral metálica do saca-rolha é um parafuso: ao girar (movimento circular), ela penetra a rolha (movimento linear). Um plano inclinado enrolado em espiral!",
        alavanca: "Não é essa! Alguns saca-rolhas têm alavancas nas laterais para ajudar a puxar, mas o princípio central é a espiral que penetra a rolha ao girar. Essa espiral é um parafuso!",
        planoInclinado: "Quase! Você pensou bem, porque o parafuso é um plano inclinado enrolado em espiral. A espiral do saca-rolha converte o giro em penetração linear — por isso chamamos de parafuso!",
        cunha: "Não é essa! A cunha tem formato triangular e separa materiais. O saca-rolha funciona pela espiral metálica que penetra a rolha ao girar. Essa espiral é um parafuso!",
        roldana: "Não é essa! A roldana é uma roda com corda. O saca-rolha funciona de forma diferente: sua espiral metálica converte o movimento de girar em penetração na rolha. Isso é um parafuso!",
        rodaEixo: "Não é essa! Embora você gire o saca-rolha, o princípio não é o da roda com eixo. O segredo está na espiral metálica que converte rotação em movimento linear para dentro da rolha. Isso é um parafuso!",
      }
    },
    { id: "p1q11", object: "Roda de bicicleta 🚲", answer: "rodaEixo", hint: "Uma roda girando ao redor de um eixo central!",
      feedbacks: {
        rodaEixo: "Isso mesmo! A roda da bicicleta gira ao redor de um eixo central (o cubo). A roda grande percorre uma distância maior com menos esforço, reduzindo o atrito e facilitando o deslocamento!",
        alavanca: "Não é essa! A alavanca usa um ponto de apoio e uma barra. A roda de bicicleta funciona girando ao redor de um eixo central — a roda grande facilita o deslocamento. Isso é roda com eixo!",
        planoInclinado: "Não é essa! O plano inclinado é uma rampa. A roda de bicicleta funciona girando ao redor de um eixo central, reduzindo o atrito e facilitando o movimento. Isso é roda com eixo!",
        cunha: "Não é essa! A cunha corta ou separa materiais. A roda de bicicleta não corta nada — ela gira ao redor de um eixo, facilitando o deslocamento. Isso é roda com eixo!",
        parafuso: "Não é essa! O parafuso é uma espiral que converte giro em fixação. A roda de bicicleta não tem espiral — ela gira livremente ao redor de um eixo central. Isso é roda com eixo!",
        roldana: "Quase! A roldana e a roda com eixo são parecidas, mas a diferença é que a roldana usa corda passando pelo sulco da roda. A roda de bicicleta não tem corda — ela gira no eixo para facilitar o movimento. Isso é roda com eixo!",
      }
    },
    { id: "p1q12", object: "Faca de cozinha 🔪", answer: "cunha", hint: "Olhe a lâmina de lado... que formato ela tem?",
      feedbacks: {
        cunha: "Perfeito! Vista de lado, a lâmina da faca tem formato triangular. Ao pressionar para baixo, essa forma converte a força em duas forças laterais que separam o alimento. Cunha clássica!",
        alavanca: "Não é essa! A alavanca usa ponto de apoio e barra. A faca funciona de outro jeito: a lâmina tem formato triangular que, ao pressionar, separa o material para os lados. Isso é uma cunha!",
        planoInclinado: "Quase! A cunha é formada por dois planos inclinados unidos. A lâmina da faca usa esse formato triangular para converter sua força em corte lateral. Por isso chamamos de cunha!",
        parafuso: "Não é essa! O parafuso é uma espiral. A lâmina da faca não tem espiral — ela tem formato triangular que separa o material ao ser pressionada. Isso é uma cunha!",
        roldana: "Não é essa! A roldana é uma roda com corda. A faca funciona de forma completamente diferente: sua lâmina triangular converte a força para baixo em forças laterais que separam o alimento. Isso é uma cunha!",
        rodaEixo: "Não é essa! A roda com eixo gira em torno de um centro. A faca não gira — ela corta usando uma lâmina com formato triangular que separa o material. Isso é uma cunha!",
      }
    },
  ],
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
  transition: "Fantástico! Você reconstruiu meu diário e agora entende como cada máquina simples funciona. A máquina do tempo está ganhando mais energia! Mas saber como funcionam não é tudo... você precisa ver como a humanidade usou essas máquinas para mudar o mundo. Prepare-se: vamos fazer uma viagem no tempo!",
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
    { id: "p2q1", type: "complete", text: "Uma rampa facilita carregar coisas pesadas porque permite usar ___ força ao percorrer uma ___ maior.", options: ["menos / distância", "mais / distância", "menos / altura", "mais / velocidade"], answer: 0, hint: "Pense assim: a rampa é mais longa que uma subida direta. O que você ganha percorrendo esse caminho maior?",
      feedbacks: [
        "Exatamente! Esse é o segredo do plano inclinado: percorrendo uma distância maior (a rampa), você usa MENOS força para subir a mesma altura. É uma troca inteligente!",
        "Quase! Você acertou que a distância é maior, mas errou o efeito. A rampa existe justamente para REDUZIR a força, não aumentá-la. Se usasse mais força, não haveria vantagem em usar rampa!",
        "Você acertou que usa menos força, mas a altura não muda — o objeto precisa chegar ao mesmo ponto alto. O que aumenta é a DISTÂNCIA percorrida. A rampa é mais longa que uma subida vertical, e é isso que reduz o esforço!",
        "Não é essa! A rampa não tem a ver com velocidade. Seu princípio é outro: ao percorrer uma DISTÂNCIA maior (o caminho da rampa), você usa MENOS força para elevar o objeto à mesma altura!",
      ]
    },
    { id: "p2q2", type: "trueFalse", text: "Verdadeiro ou Falso: Um parafuso é, na verdade, um plano inclinado enrolado em espiral.", answer: true, hint: "Imagine que você 'desenrola' a rosca de um parafuso, esticando-a sobre a mesa. Que forma aparece?",
      feedbacks: {
        true: "Exatamente! Se você 'desenrolar' a rosca de um parafuso, verá que é uma rampa em espiral. Genial, não? Por isso o parafuso converte giro em movimento linear!",
        false: "Na verdade, é verdadeiro! Faça o teste mental: imagine desenrolar a rosca de um parafuso. Você verá um plano inclinado (rampa) esticado. O parafuso é essa rampa enrolada em espiral, e é por isso que ao girar ele avança em linha reta!",
      }
    },
    { id: "p2q3", type: "multiple", text: "Qual máquina simples muda a DIREÇÃO da força aplicada?", options: ["Cunha", "Roldana", "Plano inclinado", "Parafuso"], answer: 1, hint: "Pense no mastro de bandeira: você puxa a corda para baixo, mas a bandeira sobe. Que máquina faz isso?",
      feedbacks: [
        "Não é essa! A cunha transforma uma força para frente em forças laterais — ela DIVIDE a força, não muda a direção. Quem muda a direção é a roldana: você puxa para baixo e o objeto sobe!",
        "Correto! A roldana muda a direção da força: você puxa para BAIXO enquanto o objeto sobe. É por isso que funciona tão bem em mastros de bandeira e guindastes!",
        "Não é essa! O plano inclinado reduz o esforço distribuindo-o por uma distância maior, mas a força continua na mesma direção (ao longo da rampa). Quem muda a direção da força é a roldana!",
        "Não é essa! O parafuso converte movimento circular em linear, mas isso é mudança de tipo de movimento, não de direção da força. Quem muda a direção é a roldana: puxando para baixo, o objeto sobe!",
      ]
    },
    { id: "p2q4", type: "complete", text: "Na alavanca, quanto mais ___ do ponto de apoio a força é aplicada, ___ esforço é necessário.", options: ["longe / menos", "perto / menos", "longe / mais", "perto / mais"], answer: 0, hint: "Pense na gangorra: se você se sentar bem na ponta, fica mais fácil ou mais difícil levantar quem está do outro lado?",
      feedbacks: [
        "Isso mesmo! É o princípio da alavanca: maior distância do fulcro = maior vantagem mecânica = menos esforço. Pense na gangorra: o lado mais longo levanta o mais curto com facilidade!",
        "É o contrário! Quanto mais PERTO do ponto de apoio, MAIS difícil fica. Pense na gangorra: se você sentar pertinho do centro, não consegue levantar ninguém. A vantagem da alavanca vem da DISTÂNCIA!",
        "Você acertou que longe é importante, mas o efeito é o oposto! Quanto mais longe do fulcro, MENOS esforço você precisa, não mais. Esse é justamente o benefício da alavanca!",
        "Você acertou que perto exige mais esforço, mas a frase pede a relação correta. O princípio da alavanca é: quanto mais LONGE do ponto de apoio, MENOS força é necessária. A distância é sua aliada!",
      ]
    },
    { id: "p2q5", type: "trueFalse", text: "Verdadeiro ou Falso: A cunha transforma uma força para frente em duas forças laterais.", answer: true, hint: "Imagine um machado atingindo um tronco. A força vai para baixo, mas a madeira se separa para os lados. Como isso acontece?",
      feedbacks: {
        true: "Correto! É por isso que uma faca corta: a força que você faz para baixo é convertida em forças que separam o material para os lados. Essa é a essência da cunha!",
        false: "Na verdade, é verdadeiro! Pense na faca cortando um alimento: você pressiona para baixo, mas o alimento se abre para os lados. Essa conversão de uma força direcional em duas laterais é exatamente o que a cunha faz!",
      }
    },
    { id: "p2q6", type: "multiple", text: "Qual é o princípio da roda com eixo?", options: ["Muda a direção da força", "Transforma força em calor", "Amplifica o movimento: pouca força na roda gera muita força no eixo", "Corta materiais pela metade"], answer: 2, hint: "Pense no volante de um carro: você gira o volante com pouca força, mas as rodas pesadas respondem. Como isso é possível?",
      feedbacks: [
        "Essa é a função da roldana, não da roda com eixo! A roda com eixo faz outra coisa: a roda grande amplifica o efeito — pouca força na roda se transforma em muita força no eixo.",
        "Não é essa! Nenhuma máquina simples tem como função transformar força em calor. A roda com eixo amplifica o movimento: pouca força aplicada na roda grande gera muita força no eixo pequeno!",
        "Exatamente! A roda grande amplifica o efeito. Pense no volante do carro: um giro suave nas suas mãos move rodas pesadas. Essa é a vantagem mecânica da roda com eixo!",
        "Não é essa! Quem corta e separa materiais é a cunha. A roda com eixo tem outro princípio: a roda grande amplifica o movimento, fazendo com que pouca força na roda gere muita força no eixo!",
      ]
    },
    { id: "p2q7", type: "trueFalse", text: "Verdadeiro ou Falso: Uma roldana fixa (presa no teto) multiplica a força aplicada.", answer: false, hint: "A roldana fixa facilita o trabalho, sim, mas será que ela realmente multiplica sua força, ou faz outra coisa?",
      feedbacks: {
        true: "Essa é uma confusão muito comum! A roldana fixa sozinha NÃO multiplica a força — ela apenas muda a DIREÇÃO. Você puxa para baixo e o objeto sobe, mas a força necessária continua a mesma. Para multiplicar, é preciso um sistema com várias roldanas!",
        false: "Correto! Uma roldana fixa sozinha NÃO multiplica a força — ela apenas muda a direção. Para multiplicar a força, é preciso um sistema com várias roldanas! Essa é uma pegadinha que confunde muita gente.",
      }
    },
    { id: "p2q8", type: "multiple", text: "Qual objeto NÃO é um exemplo de cunha?", options: ["Machado", "Prego", "Gangorra", "Faca"], answer: 2, hint: "A cunha tem formato triangular e serve para cortar ou separar. Qual desses objetos não faz isso?",
      feedbacks: [
        "O machado É uma cunha! Sua lâmina tem formato triangular que separa a madeira ao converter a força do golpe em duas forças laterais. O objeto que não é cunha nesta lista é a gangorra — ela é uma alavanca!",
        "O prego É uma cunha! Sua ponta tem formato triangular que penetra e separa as fibras da madeira. O objeto que não é cunha nesta lista é a gangorra — ela é uma alavanca!",
        "Exatamente! A gangorra é uma ALAVANCA — uma barra que gira em torno de um ponto de apoio central. Já o machado, o prego e a faca são todos cunhas: têm formato triangular que corta ou separa materiais.",
        "A faca É uma cunha! Sua lâmina tem formato triangular que separa o alimento ao converter a força para baixo em forças laterais. O objeto que não é cunha nesta lista é a gangorra — ela é uma alavanca!",
      ]
    },
    { id: "p2q9", type: "complete", text: "Quanto mais ___ a inclinação de uma rampa, ___ o esforço necessário para subir.", options: ["suave / menor", "suave / maior", "íngreme / menor", "curta / menor"], answer: 0, hint: "Compare duas rampas: uma bem íngreme e outra bem suave. Qual delas você preferiria para empurrar uma caixa pesada?",
      feedbacks: [
        "Isso mesmo! Quanto mais suave (menos íngreme) a rampa, maior a distância percorrida, mas MENOR a força necessária. É a troca do plano inclinado: mais caminho, menos esforço!",
        "Você acertou o 'suave', mas inverteu o efeito! Rampa suave significa caminho mais longo, e caminho mais longo significa MENOS esforço, não mais. Essa é a vantagem do plano inclinado!",
        "É o contrário! Quanto mais íngreme a rampa, MAIS esforço é necessário, porque a distância é curta e a subida é brusca. A rampa SUAVE é que reduz o esforço, distribuindo-o por um caminho mais longo!",
        "Não é essa! Rampa curta geralmente significa rampa íngreme, o que exige MAIS esforço. O que reduz o esforço é a inclinação SUAVE: um caminho mais longo que distribui a força necessária por uma distância maior!",
      ]
    },
    { id: "p2q10", type: "multiple", text: "O saca-rolha é um exemplo de qual máquina simples?", options: ["Alavanca", "Cunha", "Parafuso", "Roldana"], answer: 2, hint: "Observe o formato da parte metálica do saca-rolha. Ela é reta ou tem algum padrão diferente?",
      feedbacks: [
        "Não é essa! Alguns saca-rolhas têm alavancas laterais para ajudar a puxar a rolha, mas a máquina simples principal é a espiral metálica que penetra a rolha ao girar. Espiral que converte giro em avanço linear é um parafuso!",
        "Não é essa! A cunha tem formato triangular e separa materiais. O saca-rolha funciona por outro princípio: sua espiral metálica converte o movimento de girar em penetração na rolha. Isso é um parafuso!",
        "Correto! O saca-rolha tem formato de espiral — é um parafuso! Ao girar (movimento circular), ele penetra a rolha (movimento linear). Movimento circular virando linear é a marca do parafuso!",
        "Não é essa! A roldana é uma roda com corda que muda a direção da força. O saca-rolha funciona de forma diferente: sua espiral metálica converte o giro em avanço linear dentro da rolha. Isso é um parafuso!",
      ]
    },
    { id: "p2q11", type: "trueFalse", text: "Verdadeiro ou Falso: A roda com eixo funciona porque uma força pequena aplicada na roda grande gera uma força maior no eixo pequeno.", answer: true, hint: "Pense na chave de fenda: o cabo é a roda grande e a ponta é o eixo. Onde você faz força e onde o efeito aparece?",
      feedbacks: {
        true: "Exatamente! É o mesmo princípio do volante do carro: você gira a roda grande com pouca força e as rodas pesadas respondem com força amplificada. A roda grande é sua aliada!",
        false: "Na verdade, é verdadeiro! Esse é exatamente o princípio da roda com eixo. Pense na chave de fenda: você gira o cabo (roda grande) com pouca força e a ponta (eixo pequeno) aplica uma força muito maior no parafuso. A diferença de tamanho entre roda e eixo é o que cria a vantagem mecânica!",
      }
    },
    { id: "p2q12", type: "multiple", text: "Uma pessoa empurra uma caixa pesada por uma rampa em vez de levantá-la direto. Por que a rampa facilita?", options: ["Porque a caixa fica mais leve na rampa", "Porque a rampa elimina a gravidade", "Porque a distância maior permite usar menos força", "Porque a rampa empurra a caixa sozinha"], answer: 2, hint: "A caixa precisa chegar à mesma altura nos dois casos. O que muda entre subir direto e usar a rampa?",
      feedbacks: [
        "Não é isso! A caixa continua com o mesmo peso — a gravidade não muda. O que muda é a forma como você aplica a força: a rampa distribui o esforço por uma distância maior, permitindo usar menos força!",
        "Não é isso! A gravidade continua agindo normalmente. A rampa não elimina nenhuma força — ela distribui o esforço por um caminho mais longo. Resultado: você percorre mais distância, mas usa menos força a cada momento!",
        "Correto! A rampa distribui o esforço por uma distância maior. A caixa não fica mais leve — você é que precisa de MENOS FORÇA para movê-la, percorrendo um caminho mais longo. Essa é a troca inteligente do plano inclinado!",
        "Não é isso! A rampa não tem motor nem empurra nada. É você quem faz a força! A vantagem é que a rampa distribui o esforço por uma distância maior, permitindo que você use menos força a cada momento para elevar a caixa à mesma altura!",
      ]
    },
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
  transition: "Que viagem incrível! Você viu com os próprios olhos como as máquinas simples transformaram o mundo ao longo de milhares de anos. A máquina do tempo está quase com energia total! Agora vem o próximo desafio: você aprendeu que máquinas complexas são combinações de simples. Mas será que consegue DESMONTAR uma máquina complexa e identificar as simples escondidas dentro dela?",
  periods: [
    {
      id: "egypt",
      title: "🏛️ Egito Antigo (~2500 a.C.)",
      subtitle: "A Construção das Pirâmides",
      narrative: "Você chega ao deserto egípcio sob um sol escaldante. Milhares de trabalhadores movem blocos de pedra que pesam mais de 2 toneladas cada! Como eles conseguem?",
      teaching: "Os egípcios usaram PLANOS INCLINADOS (rampas gigantes de terra e areia) para arrastar os blocos até o topo das pirâmides. Também usaram ALAVANCAS (troncos de madeira) para erguer e posicionar os blocos, e CUNHAS (ferramentas de cobre) para cortar as pedras nas pedreiras. Sem motores, sem eletricidade — apenas máquinas simples e engenhosidade humana!",
      questions: [
        { id: "p3q1", text: "Qual máquina simples foi essencial para mover blocos de pedra até o topo das pirâmides?", options: ["Roldana", "Parafuso", "Plano inclinado (rampa)", "Roda com eixo"], answer: 2, hint: "Os blocos precisavam subir a pirâmide. Os egípcios construíam enormes estruturas de terra ao lado da pirâmide para arrastar as pedras. Que formato tinham essas estruturas?",
          feedbacks: [
            "Não é essa! Embora roldanas existissem na antiguidade, os egípcios da época das pirâmides não utilizavam sistemas de roldanas para essa tarefa. Eles construíam imensas rampas de terra e areia ao lado das pirâmides para arrastar os blocos até o topo. Essas rampas são planos inclinados!",
            "Não é essa! O parafuso ainda não era usado dessa forma no Egito Antigo. A solução dos egípcios era mais simples e grandiosa: rampas enormes de terra e areia construídas ao lado das pirâmides, por onde os blocos eram arrastados. Essas rampas são planos inclinados!",
            "Correto! Os egípcios construíram gigantescas rampas de terra e areia ao lado das pirâmides. Arrastando os blocos por essas rampas, usavam menos força do que se tentassem erguê-los direto. Engenhosidade pura com planos inclinados!",
            "Não é essa! Curiosamente, os egípcios da época das pirâmides ainda não usavam rodas para transporte de pedras. Sua solução foi construir imensas rampas de terra e areia para arrastar os blocos até o topo. Essas rampas são planos inclinados!",
          ]
        },
        { id: "p3q2", text: "Os egípcios cortavam pedras nas pedreiras usando ferramentas em forma de triângulo. Que máquina simples é essa?", options: ["Alavanca", "Cunha", "Parafuso", "Roldana"], answer: 1, hint: "Ferramentas com ponta triangular que penetram e separam a pedra... que máquina simples tem esse formato e essa função?",
          feedbacks: [
            "Não é essa! A alavanca usa ponto de apoio para multiplicar força, mas não tem formato triangular para cortar. As ferramentas triangulares dos egípcios penetravam a pedra e separavam blocos — esse formato que corta e separa é a cunha!",
            "Isso mesmo! As ferramentas de cobre dos egípcios tinham formato triangular: ao serem marteladas na rocha, convertiam a força do golpe em forças laterais que rachavam e separavam os blocos. Cunhas em ação há 4.500 anos!",
            "Não é essa! O parafuso é uma espiral que converte giro em avanço linear. As ferramentas dos egípcios não tinham espiral — tinham formato triangular que, ao ser martelado na rocha, separava os blocos. Esse formato é a cunha!",
            "Não é essa! A roldana é uma roda com corda que muda a direção da força. As ferramentas de corte dos egípcios funcionavam de outro modo: tinham ponta triangular que penetrava e separava a rocha. Isso é uma cunha!",
          ]
        },
      ]
    },
    {
      id: "greece",
      title: "🏺 Grécia Antiga (~250 a.C.)",
      subtitle: "Arquimedes e a Alavanca",
      narrative: "Você chega a Siracusa e encontra o próprio Arquimedes! Ele está empolgado demonstrando como uma única pessoa pode mover objetos enormes.",
      teaching: "Arquimedes descobriu os princípios matemáticos da ALAVANCA e disse a famosa frase: \"Dê-me um ponto de apoio e moverei o mundo!\" Ele também inventou a ROLDANA COMPOSTA — um sistema com várias roldanas que multiplica a força. Conta a lenda que Arquimedes, sozinho, conseguiu puxar um navio inteiro para fora da água usando esse sistema! Os gregos também usaram o PARAFUSO DE ARQUIMEDES para elevar água para irrigação.",
      questions: [
        { id: "p3q3", text: "Qual foi a grande contribuição de Arquimedes para as máquinas simples?", options: ["Inventou a roda", "Descobriu o fogo", "Desenvolveu os princípios da alavanca e inventou a roldana composta", "Construiu as pirâmides"], answer: 2, hint: "Arquimedes ficou famoso por duas grandes contribuições à mecânica. Uma envolve o ponto de apoio, a outra envolve várias rodas com corda trabalhando juntas...",
          feedbacks: [
            "Não é essa! A roda já existia milhares de anos antes de Arquimedes. A contribuição dele foi outra: ele descobriu os princípios matemáticos da alavanca e inventou a roldana composta, um sistema com várias roldanas que multiplica a força!",
            "Não é essa! O domínio do fogo é muito mais antigo que Arquimedes. Ele contribuiu para a mecânica: descobriu os princípios da alavanca (por isso a frase 'Dê-me um ponto de apoio e moverei o mundo!') e inventou a roldana composta!",
            "Correto! Arquimedes calculou matematicamente como a alavanca multiplica a força e inventou a roldana composta — um sistema com várias roldanas que, conta a lenda, permitiu que ele sozinho puxasse um navio para fora da água!",
            "Não é essa! As pirâmides foram construídas no Egito, mais de 2.000 anos antes de Arquimedes. Ele viveu na Grécia e sua contribuição foi outra: descobrir os princípios da alavanca e inventar a roldana composta, que multiplica a força!",
          ]
        },
        { id: "p3q4", text: "O Parafuso de Arquimedes era usado para:", options: ["Cortar madeira", "Elevar água para irrigação", "Construir navios", "Fazer fogo"], answer: 1, hint: "Pense nas necessidades da agricultura antiga. A água dos rios ficava num nível mais baixo que as plantações. O que o parafuso espiral poderia fazer com a água?",
          feedbacks: [
            "Não é essa! Quem corta é a cunha, não o parafuso. O Parafuso de Arquimedes tinha outra função vital: ao girar sua espiral dentro de um tubo, ele elevava água de rios e canais até as plantações. Era uma ferramenta de irrigação!",
            "Correto! O Parafuso de Arquimedes é um tubo com espiral interna: ao girar, a água sobe pela espiral e chega a um nível mais alto. Os gregos usavam isso para levar água dos rios até as plantações. Essa invenção ainda é usada hoje!",
            "Não é essa! Embora Arquimedes tenha estudado navios (conta a lenda que puxou um usando roldanas), o Parafuso de Arquimedes tinha outra função: elevar água para irrigação, girando sua espiral para fazer a água subir até as plantações!",
            "Não é essa! O Parafuso de Arquimedes não tinha relação com fogo. Sua função era elevar água: ao girar a espiral dentro de um tubo, a água subia de um nível baixo (rio) até um nível alto (plantação). Era essencial para a irrigação!",
          ]
        },
      ]
    },
    {
      id: "industrial",
      title: "🏭 Revolução Industrial (~1800)",
      subtitle: "Quando Simples Virou Complexo",
      narrative: "O salto te leva a uma fábrica barulhenta na Inglaterra. Máquinas enormes funcionam com vapor, engrenagens giram e correias se movem sem parar!",
      teaching: "Na Revolução Industrial, as máquinas simples foram COMBINADAS para criar máquinas complexas! Engrenagens (rodas com eixo dentadas) transmitiam força de motores a vapor para teares e prensas. Sistemas de POLIAS (roldanas) moviam cargas em fábricas e minas. PARAFUSOS prendiam estruturas metálicas. A grande sacada? Toda máquina complexa é, no fundo, uma combinação inteligente de máquinas simples!",
      questions: [
        { id: "p3q5", text: "O que aconteceu com as máquinas simples durante a Revolução Industrial?", options: ["Deixaram de ser usadas", "Foram substituídas por magia", "Foram combinadas para criar máquinas complexas", "Foram proibidas nas fábricas"], answer: 2, hint: "As fábricas tinham engrenagens, polias, parafusos... tudo junto. As máquinas simples desapareceram ou ganharam um novo papel?",
          feedbacks: [
            "Pelo contrário! As máquinas simples nunca deixaram de ser usadas. Na Revolução Industrial, elas ganharam ainda mais importância porque foram COMBINADAS para criar máquinas complexas como teares, prensas e locomotivas!",
            "Não é isso! Não existe magia na engenharia — existe engenhosidade! As máquinas simples foram COMBINADAS de formas inteligentes para criar máquinas complexas. Engrenagens, polias e parafusos trabalhando juntos dentro de uma mesma máquina!",
            "Exatamente! Essa é a grande sacada da Revolução Industrial: engrenagens (rodas com eixo dentadas), polias (roldanas) e parafusos foram combinados para criar máquinas poderosas como teares e locomotivas. Toda máquina complexa é uma combinação de simples!",
            "Não é isso! As máquinas simples eram a BASE de tudo nas fábricas. Longe de serem proibidas, elas foram COMBINADAS para criar máquinas complexas. Engrenagens, polias e parafusos trabalhando juntos é o que movia a Revolução Industrial!",
          ]
        },
        { id: "p3q6", text: "Engrenagens são, na verdade, um tipo de:", options: ["Cunha dentada", "Roda com eixo dentada", "Plano inclinado circular", "Roldana sólida"], answer: 1, hint: "A engrenagem é uma roda com dentes que gira em torno de um eixo. Que máquina simples também é uma roda que gira em torno de um eixo?",
          feedbacks: [
            "Não é essa! A cunha tem formato triangular e serve para cortar ou separar. A engrenagem é uma roda com dentes que gira em torno de um eixo, transmitindo força para outras engrenagens. Roda que gira no eixo é roda com eixo — neste caso, dentada!",
            "Correto! A engrenagem é uma roda com eixo que ganhou dentes! Esses dentes permitem que uma roda transmita movimento e força para outra, criando sistemas mecânicos complexos. É a roda com eixo evoluída!",
            "Não é essa! O plano inclinado é uma rampa, mesmo se imaginado em forma circular (isso seria um parafuso). A engrenagem funciona como uma roda com dentes girando em torno de um eixo, transmitindo força. É uma roda com eixo dentada!",
            "Não é essa! A roldana usa corda passando por um sulco para mudar a direção da força. A engrenagem não tem corda nem sulco — ela tem dentes que se encaixam em outras engrenagens, transmitindo força. É uma roda com eixo dentada!",
          ]
        },
      ]
    },
    {
      id: "modern",
      title: "🏫 Atualidade (~Anos 2000)",
      subtitle: "Máquinas Simples na Sala de Aula e no Dia a Dia",
      narrative: "Você retorna ao presente! A máquina do tempo te deixa bem no meio de uma escola. Olhe ao redor: mesmo aqui, cercado de tecnologia, as máquinas simples estão por toda parte. Vamos descobrir onde?",
      teaching: "Olhe para sua mesa na sala de aula: as máquinas simples estão bem aí! Quando você usa um APONTADOR para apontar o lápis, a lâmina dentro dele tem formato triangular — ela penetra a madeira e separa as aparas. Isso é uma CUNHA em ação! E a TESOURA que você usa para recortar trabalhos? Repare: as duas lâminas se cruzam em um ponto fixo (o parafusinho no meio). Quando você aperta as alças, a força se multiplica nas pontas. Isso é uma ALAVANCA! Você usa máquinas simples todos os dias na escola sem perceber!",
      questions: [
        { id: "p3q7", text: "Na sala de aula, você usa o apontador para apontar o lápis. A lâmina do apontador tem formato triangular e corta a madeira separando as aparas. Que máquina simples é essa?", options: ["Alavanca", "Roldana", "Cunha", "Roda com eixo"], answer: 2, hint: "A lâmina penetra a madeira e separa as aparas para os lados. Que máquina simples tem formato triangular e separa materiais?",
          feedbacks: [
            "Não é essa! A alavanca usa ponto de apoio e barra para multiplicar força. A lâmina do apontador funciona de outro modo: seu formato triangular penetra a madeira e separa as aparas para os lados. Formato triangular que separa é cunha!",
            "Não é essa! A roldana é uma roda com corda. A lâmina do apontador funciona de forma completamente diferente: ela tem formato triangular que penetra a madeira e separa as aparas. Isso é uma cunha!",
            "Correto! A lâmina do apontador é uma cunha: tem formato triangular que, ao pressionar contra o lápis, penetra a madeira e separa as aparas para os lados. Você usa uma cunha toda vez que aponta o lápis!",
            "Não é essa! A roda com eixo gira para amplificar movimento. A lâmina do apontador não funciona assim — ela tem formato triangular que penetra e separa a madeira. Isso é uma cunha!",
          ]
        },
        { id: "p3q8", text: "Para recortar uma atividade impressa, você usa a tesoura. As duas lâminas giram em torno de um ponto fixo no centro, multiplicando a força que você faz nas alças. Que máquina simples é a tesoura?", options: ["Cunha", "Plano inclinado", "Parafuso", "Alavanca"], answer: 3, hint: "Duas barras girando em torno de um ponto fixo, multiplicando a força... que máquina simples funciona assim?",
          feedbacks: [
            "Quase! As lâminas da tesoura até têm formato de cunha para cortar, mas o princípio principal é outro: duas lâminas giram em torno de um ponto fixo central (fulcro), multiplicando a força das alças nas pontas. Isso é uma alavanca!",
            "Não é essa! O plano inclinado é uma rampa. A tesoura funciona com duas lâminas que giram em torno de um ponto fixo no centro, multiplicando a força. Barras girando em torno de um ponto de apoio é o princípio da alavanca!",
            "Não é essa! A tesoura tem um parafusinho no centro, mas ele não funciona como um parafuso — ele serve como ponto de apoio fixo (fulcro) para as duas lâminas girarem e multiplicarem a força. Esse princípio é o da alavanca!",
            "Isso mesmo! A tesoura é uma alavanca dupla: o parafusinho no centro é o ponto de apoio (fulcro), suas mãos fazem força nas alças e essa força se multiplica nas pontas das lâminas. Alavanca que você usa quase todo dia!",
          ]
        },
      ]
    },
  ],
  timeline: {
    instruction: "Organize os eventos na ordem cronológica correta!",
    hint: "Pense na sua viagem: qual civilização você visitou primeiro? E por último?",
    feedbackCorrect: "✅ Ordem perfeita! Você dominou a linha do tempo: das pirâmides egípcias à Grécia de Arquimedes, das fábricas da Revolução Industrial até o seu dia a dia na escola!",
    feedbackWrong: "❌ A ordem correta é: Egito Antigo → Grécia Antiga → Revolução Industrial → Atualidade. Lembre-se da sequência da viagem: primeiro as pirâmides (2500 a.C.), depois Arquimedes (250 a.C.), depois as fábricas (1800) e finalmente a escola de hoje!",
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
  transition: "Brilhante! Você desmontou máquinas complexas e encontrou as simples escondidas dentro delas. Agora sabe que por trás de toda engenharia existe uma combinação inteligente de princípios básicos. A máquina do tempo está quase pronta! Falta apenas uma peça: uma engenhoca ORIGINAL, criada por VOCÊ. Chegou a hora de se tornar inventor!",
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
    { id: "p4q1", text: "Quais máquinas simples estão presentes em uma BICICLETA?", options: ["Apenas roldana", "Roda com eixo + alavanca + engrenagens", "Apenas plano inclinado", "Cunha + parafuso"], answer: 1, hint: "Pense nas três partes principais: as rodas, os freios/pedais e a corrente com catracas. Que máquinas simples se escondem em cada uma?",
      feedbacks: [
        "Não é essa! A bicicleta não usa roldanas. Ela combina TRÊS máquinas simples: as rodas são rodas com eixo, os freios e pedais são alavancas, e as catracas são engrenagens (rodas com eixo dentadas). É uma máquina complexa completa!",
        "Perfeito! As rodas são rodas com eixo, os freios e pedais são alavancas, e as catracas são engrenagens (rodas com eixo dentadas). A bicicleta é um ótimo exemplo de máquina complexa: três máquinas simples trabalhando juntas!",
        "Não é essa! A bicicleta não funciona por plano inclinado. Ela combina três máquinas simples diferentes: roda com eixo (nas rodas), alavanca (nos freios e pedais) e engrenagens (na corrente e catracas)!",
        "Não é essa! Cunha serve para cortar e parafuso para fixar — nenhum dos dois é o princípio principal da bicicleta. Ela combina roda com eixo (rodas), alavanca (freios e pedais) e engrenagens (corrente e catracas)!",
      ]
    },
    { id: "p4q2", text: "Um abridor de latas combina:", options: ["Cunha (lâmina cortante) + roda com eixo (girador)", "Apenas roldana", "Plano inclinado + parafuso", "Apenas alavanca"], answer: 0, hint: "O abridor tem duas partes que fazem coisas diferentes: uma parte corta a lata e outra parte você gira. Que máquinas simples fazem essas funções?",
      feedbacks: [
        "Correto! A lâmina que corta a lata é uma cunha (formato triangular que separa o metal) e a parte que gira é uma roda com eixo (sua força no girador se amplifica na lâmina). Duas máquinas simples em um objeto pequeno!",
        "Não é essa! O abridor de latas não usa roldana (não tem corda). Ele combina duas máquinas simples: a lâmina cortante é uma cunha que separa o metal, e o girador é uma roda com eixo que amplifica sua força!",
        "Não é essa! O abridor não funciona por rampa nem por espiral. Suas duas máquinas simples são: a cunha (lâmina triangular que corta o metal) e a roda com eixo (girador que amplifica a força da sua mão)!",
        "Não é essa! Embora alguns abridores tenham um cabo que funciona como alavanca, o princípio central combina duas máquinas: a cunha (lâmina cortante que separa o metal) e a roda com eixo (girador que você roda para avançar a lâmina)!",
      ]
    },
    { id: "p4q3", text: "Se retirarmos o sistema de ROLDANAS de um guindaste, o que acontece?", options: ["Nada muda", "Ele não consegue mais mudar a direção da força nem multiplicá-la para levantar cargas pesadas", "Ele fica mais forte", "Ele se transforma em uma alavanca"], answer: 1, hint: "As roldanas do guindaste têm duas funções: mudar a direção da força e multiplicá-la. Sem elas, o que o guindaste perde?",
      feedbacks: [
        "Não é isso! As roldanas são essenciais para o guindaste. Sem elas, o guindaste perde a capacidade de mudar a direção da força e de multiplicá-la. Seria impossível levantar cargas pesadas. Cada peça de uma máquina complexa tem função!",
        "Exatamente! As roldanas são o coração do sistema de elevação do guindaste: mudam a direção da força (puxar para baixo = carga sobe) e a multiplicam. Sem elas, o guindaste não consegue erguer cargas pesadas. Cada peça é essencial!",
        "Pelo contrário! Sem as roldanas, o guindaste fica mais FRACO. As roldanas são justamente o que permite mudar a direção da força e multiplicá-la para erguer cargas pesadas. Remover uma máquina simples enfraquece a máquina complexa!",
        "Não é isso! O braço do guindaste já funciona como alavanca, com ou sem roldanas. Mas sem as roldanas, ele perde a capacidade de mudar a direção da força e multiplicá-la nos cabos. O guindaste precisa das DUAS máquinas simples trabalhando juntas!",
      ]
    },
    { id: "p4q4", text: "Qual máquina simples está ESCONDIDA dentro de um parafuso de uma estante?", options: ["Roldana", "Alavanca", "Plano inclinado (em espiral)", "Roda com eixo"], answer: 2, hint: "Lembre-se do que aprendemos na Fase 2: se você 'desenrolasse' a rosca do parafuso, que forma apareceria?",
      feedbacks: [
        "Não é essa! A roldana é uma roda com corda. O parafuso não tem corda — ele tem uma rosca em espiral. E se você desenrolar essa espiral, verá um plano inclinado! O parafuso é um plano inclinado enrolado!",
        "Não é essa! A alavanca usa ponto de apoio e barra. O parafuso funciona por outro princípio: sua rosca é uma espiral, e se você a desenrolar mentalmente, verá que é um plano inclinado enrolado!",
        "Correto! Lembre-se: o parafuso É um plano inclinado enrolado! Cada volta da rosca é como subir uma rampa em espiral. É por isso que, ao girar, o parafuso avança em linha reta e se fixa na madeira!",
        "Não é essa! Embora você gire o parafuso, o princípio não é o da roda com eixo. O segredo está na rosca: ela é um plano inclinado enrolado em espiral. Cada volta da rosca é como uma rampa que converte giro em avanço linear!",
      ]
    },
    { id: "p4q5", text: "Uma tesoura de podar combina quais máquinas simples?", options: ["Roldana + plano inclinado", "Alavanca + cunha", "Parafuso + roda com eixo", "Apenas cunha"], answer: 1, hint: "A tesoura de podar tem duas partes funcionais: o cabo que multiplica sua força e as lâminas que cortam. Que máquinas simples correspondem a cada parte?",
      feedbacks: [
        "Não é essa! A tesoura de podar não usa corda (roldana) nem rampa (plano inclinado). Suas duas máquinas simples são: o cabo funciona como alavanca (multiplica a força a partir do ponto de apoio) e as lâminas são cunhas (formato triangular que corta separando o material)!",
        "Perfeito! O cabo funciona como alavanca: o ponto de apoio no centro multiplica a força que você faz nas alças. E as lâminas são cunhas: formato triangular que separa o galho ao cortar. Duas máquinas simples, um corte poderoso!",
        "Não é essa! O parafusinho central da tesoura é apenas o ponto de apoio, não funciona como parafuso. O princípio é outro: o cabo é uma alavanca que multiplica força, e as lâminas são cunhas que cortam. Alavanca + cunha!",
        "Quase! As lâminas realmente são cunhas, mas a tesoura de podar não é SÓ cunha. O cabo funciona como alavanca: o ponto de apoio no centro multiplica a força que você faz nas alças, e essa força ampliada chega às lâminas (cunhas). São DUAS máquinas simples!",
      ]
    },
    { id: "p4q6", text: "Um carrinho de mão é uma máquina complexa que combina:", options: ["Roldana + cunha", "Alavanca + roda com eixo", "Apenas plano inclinado", "Parafuso + roldana"], answer: 1, hint: "O carrinho de mão tem duas partes que facilitam o trabalho: as alças que você levanta e a roda na frente. Que máquinas simples são essas?",
      feedbacks: [
        "Não é essa! O carrinho de mão não usa corda (roldana) nem corta nada (cunha). Ele combina: alavanca (a caçamba e as alças formam uma barra que gira em torno da roda como ponto de apoio) + roda com eixo (a roda na frente reduz o atrito e facilita o deslocamento)!",
        "Correto! A caçamba e as alças formam uma alavanca: a roda na frente é o ponto de apoio (fulcro), a carga fica no meio e você aplica força nas alças. E a roda é uma roda com eixo que reduz o atrito. Duas máquinas simples facilitando o trabalho pesado!",
        "Não é essa! O carrinho de mão não funciona como rampa. Ele combina duas máquinas simples: a caçamba com alças é uma alavanca (a roda serve de ponto de apoio) e a roda na frente é uma roda com eixo que reduz o atrito!",
        "Não é essa! O carrinho de mão não usa espiral (parafuso) nem corda (roldana). Suas máquinas simples são: alavanca (alças + caçamba girando em torno da roda como fulcro) e roda com eixo (a roda que facilita o deslocamento reduzindo o atrito)!",
      ]
    },
    { id: "p4q7", text: "Qual afirmação sobre máquinas complexas é VERDADEIRA?", options: ["São totalmente diferentes das máquinas simples", "São combinações inteligentes de máquinas simples", "Não usam princípios de física", "Surgiram antes das máquinas simples"], answer: 1, hint: "Pense em tudo que você viu nesta fase: bicicleta, guindaste, tesoura de podar... o que todas essas máquinas complexas têm em comum?",
      feedbacks: [
        "Pelo contrário! As máquinas complexas são FEITAS de máquinas simples. Toda máquina complexa, por mais sofisticada que pareça, é uma combinação inteligente de alavancas, planos inclinados, cunhas, parafusos, roldanas e rodas com eixo!",
        "Exatamente! Essa é a grande lição desta fase: toda máquina complexa — de uma tesoura de podar a um guindaste — é uma combinação inteligente de máquinas simples trabalhando juntas. A genialidade está em como combiná-las!",
        "Não é isso! As máquinas complexas usam TODOS os princípios de física das máquinas simples. Elas são justamente combinações inteligentes de alavancas, cunhas, roldanas e outras máquinas simples, cada uma aplicando seus princípios!",
        "É o contrário! As máquinas simples vieram primeiro — o ser humano as usa há milhares de anos. As máquinas complexas surgiram depois, quando aprendemos a COMBINAR as simples para resolver problemas maiores!",
      ]
    },
    { id: "p4q8", text: "Dadas as máquinas simples ROLDANA + ALAVANCA + RODA COM EIXO, qual dispositivo elas podem formar?", options: ["Uma faca", "Um guindaste", "Um prego", "Uma rampa"], answer: 1, hint: "Pense em um dispositivo grande usado na construção civil. Ele tem cabos com rodas (roldana), um braço mecânico (alavanca) e uma base que gira (roda com eixo).",
      feedbacks: [
        "Não é essa! A faca é uma cunha simples — não usa roldana, alavanca nem roda com eixo. O dispositivo que combina essas três máquinas é o guindaste: roldanas nos cabos, alavanca no braço e roda com eixo na base giratória!",
        "Correto! O guindaste combina exatamente essas três: roldanas no sistema de cabos (mudam direção e multiplicam força), alavanca no braço mecânico (alcança longe) e roda com eixo na base giratória (permite girar). Máquina complexa perfeita!",
        "Não é essa! O prego é apenas uma cunha simples. O dispositivo que combina roldana + alavanca + roda com eixo é o guindaste: roldanas nos cabos, alavanca no braço e roda com eixo na base giratória!",
        "Não é essa! A rampa é apenas um plano inclinado simples. O dispositivo que combina roldana + alavanca + roda com eixo é o guindaste: roldanas nos cabos para erguer cargas, alavanca no braço e roda com eixo na base giratória!",
      ]
    },
    { id: "p4q9", text: "Um macaco de carro é usado para levantar veículos pesados. Quais máquinas simples ele combina?", options: ["Roldana + cunha", "Plano inclinado + roda com eixo", "Parafuso + alavanca", "Apenas roldana"], answer: 2, hint: "O macaco tem duas partes: uma rosca central que você gira e uma manivela que aciona o mecanismo. Que máquinas simples são essas?",
      feedbacks: [
        "Não é essa! O macaco de carro não usa corda (roldana) nem corta nada (cunha). Ele combina: parafuso (a rosca central é um plano inclinado em espiral que converte giro em elevação) + alavanca (a manivela multiplica a força que você faz para girar)!",
        "Quase! Você pensou no caminho certo, porque o parafuso é um plano inclinado em espiral. Mas a forma como ele aparece no macaco é como parafuso (rosca), e a outra máquina simples é a alavanca (manivela que multiplica sua força). Parafuso + alavanca!",
        "Perfeito! A rosca central do macaco é um parafuso: plano inclinado em espiral que converte seu giro em elevação. E a manivela é uma alavanca que multiplica a força da sua mão. Resultado: você gira com pouca força e o carro sobe!",
        "Não é essa! O macaco de carro não usa roldana (não tem corda). Ele combina duas máquinas simples: o parafuso (rosca central que converte giro em elevação) e a alavanca (manivela que multiplica a força). Juntas, permitem erguer um carro inteiro!",
      ]
    },
    { id: "p4q10", text: "Uma furadeira elétrica combina quais máquinas simples na sua broca?", options: ["Roldana + alavanca", "Cunha (ponta cortante) + parafuso (espiral da broca)", "Apenas roda com eixo", "Plano inclinado + roldana"], answer: 1, hint: "Observe a broca de perto: a ponta tem um formato que penetra o material, e o corpo tem um padrão em espiral que expulsa os resíduos. Que máquinas simples são essas?",
      feedbacks: [
        "Não é essa! A broca não usa corda (roldana) nem barra com ponto de apoio (alavanca). Olhe para a broca: a ponta cortante tem formato triangular (cunha) que penetra o material, e o corpo tem espiral (parafuso) que expulsa os resíduos enquanto gira!",
        "Correto! A ponta da broca é uma cunha: formato triangular que penetra o material. E o corpo espiral é um parafuso: expulsa os resíduos enquanto gira, avançando no material. Duas máquinas simples girando juntas!",
        "Não é essa! O motor da furadeira usa roda com eixo, mas a pergunta é sobre a BROCA. Nela, as máquinas simples são: cunha (ponta cortante que penetra o material) + parafuso (corpo em espiral que expulsa os resíduos enquanto avança)!",
        "Não é essa! A broca não funciona como rampa nem usa corda. Suas máquinas simples são: a ponta cortante é uma cunha (formato triangular que penetra) e o corpo em espiral é um parafuso (expulsa resíduos enquanto gira e avança no material)!",
      ]
    },
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
    fontFamily: "'Cinzel', 'Georgia', 'Times New Roman', serif",
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

// --- HELPERS ---
const REDUNDANT_PREFIXES = [
  "Não é essa! ", "Não é isso! ", "Pelo contrário! ", "É o contrário! ",
  "Isso mesmo! ", "Perfeito! ", "Correto! ", "Exatamente! ", "Excelente! ",
];
function stripPrefix(text) {
  if (!text) return "";
  for (const p of REDUNDANT_PREFIXES) {
    if (text.startsWith(p)) return text.slice(p.length);
  }
  return text;
}

// --- COMPONENTS ---

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
      setStep("transition");
    }
  };

  const isCorrect = selected === q?.answer;
  const getFeedback = () => {
    if (!selected || !q?.feedbacks) return "";
    return stripPrefix(q.feedbacks[selected] || "");
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

  if (step === "transition") {
    return <NarrativeScreen lines={[PHASE1_DATA.transition]} onContinue={() => setStep("result")} buttonText="Ver Resultado ★" />;
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
              <button key={key} onClick={() => handleSelect(key)} disabled={showResult} aria-label={`Selecionar ${m.name}`} aria-pressed={selected === key} style={{ ...styles.machineCard(false), borderColor, background: bg, cursor: showResult ? "default" : "pointer", fontFamily: "inherit" }}>
                <div style={{ fontSize: 24 }}>{m.icon}</div>
                <div style={{ fontSize: 13, fontWeight: "bold", color: selected === key ? COLORS.accentLight : COLORS.text }}>{m.name}</div>
              </button>
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
          <div role="alert" style={{ background: isCorrect ? COLORS.successBg : COLORS.errorBg, border: `1px solid ${isCorrect ? COLORS.success : COLORS.error}44`, borderRadius: 10, padding: 14, marginBottom: 12 }}>
            <p style={{ margin: 0, color: isCorrect ? COLORS.success : COLORS.error, fontWeight: "bold", marginBottom: 4 }}>
              {isCorrect ? "✅ Correto!" : `❌ Não foi dessa vez! Era: ${SIMPLE_MACHINES[q.answer].name}`}
            </p>
            <p style={{ margin: 0, fontSize: 14, color: COLORS.textDim, lineHeight: 1.6 }}>{getFeedback()}</p>
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
  const [showHint, setShowHint] = useState(false);

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
      setShowHint(false);
    } else {
      setStep("transition");
    }
  };

  const isCorrect = q ? (q.type === "trueFalse" ? selected === q.answer : selected === q.answer) : false;

  const getFeedback = () => {
    if (!q || selected === null || !q.feedbacks) return "";
    if (q.type === "trueFalse") return stripPrefix(q.feedbacks[String(selected)] || "");
    return stripPrefix(q.feedbacks[selected] || "");
  };

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

  if (step === "transition") {
    return <NarrativeScreen lines={[PHASE2_DATA.transition]} onContinue={() => setStep("result")} buttonText="Ver Resultado ★" />;
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

        {!showResult && !showHint && q.hint && (
          <div style={{ marginBottom: 12, textAlign: "center" }}>
            <button onClick={() => setShowHint(true)} style={{ background: "none", border: `1px solid ${COLORS.accentDim}44`, borderRadius: 8, padding: "8px 16px", color: COLORS.accentLight, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              💡 Preciso de uma dica!
            </button>
          </div>
        )}

        {!showResult && showHint && q.hint && (
          <div style={{ background: COLORS.accent + "11", border: `1px solid ${COLORS.accentDim}44`, borderRadius: 10, padding: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: COLORS.accentLight }}>💡 Dica do Mestre: {q.hint}</span>
          </div>
        )}

        {showResult && (
          <div role="alert" style={{ background: isCorrect ? COLORS.successBg : COLORS.errorBg, border: `1px solid ${isCorrect ? COLORS.success : COLORS.error}44`, borderRadius: 10, padding: 14, marginBottom: 12 }}>
            <p style={{ margin: 0, color: isCorrect ? COLORS.success : COLORS.error, fontWeight: "bold", marginBottom: 4 }}>
              {isCorrect ? "✅ Correto!" : "❌ Não foi dessa vez!"}
            </p>
            <p style={{ margin: 0, fontSize: 14, color: COLORS.textDim, lineHeight: 1.6 }}>{getFeedback()}</p>
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
  const [showHint, setShowHint] = useState(false);
  const [showTimelineHint, setShowTimelineHint] = useState(false);

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
      setQLocalIdx(i => i + 1); setSelected(null); setShowResult(false); setShowHint(false);
    } else if (periodIdx < periods.length - 1) {
      setPeriodIdx(i => i + 1); setQLocalIdx(0); setSelected(null); setShowResult(false); setShowHint(false); setSubStep("narrative");
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
                <button onClick={() => moveTimeline(pos, -1)} aria-label={`Mover "${items[tIdx].text}" para cima`} style={{ background: "none", border: "none", color: COLORS.accent, cursor: "pointer", fontSize: 16, padding: 2 }}>▲</button>
                <button onClick={() => moveTimeline(pos, 1)} aria-label={`Mover "${items[tIdx].text}" para baixo`} style={{ background: "none", border: "none", color: COLORS.accent, cursor: "pointer", fontSize: 16, padding: 2 }}>▼</button>
              </div>
            )}
          </div>
        ))}

        {!timelineSubmitted && !showTimelineHint && PHASE3_DATA.timeline.hint && (
          <div style={{ marginTop: 12, marginBottom: 4, textAlign: "center" }}>
            <button onClick={() => setShowTimelineHint(true)} style={{ background: "none", border: `1px solid ${COLORS.accentDim}44`, borderRadius: 8, padding: "8px 16px", color: COLORS.accentLight, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              💡 Preciso de uma dica!
            </button>
          </div>
        )}

        {!timelineSubmitted && showTimelineHint && PHASE3_DATA.timeline.hint && (
          <div style={{ background: COLORS.accent + "11", border: `1px solid ${COLORS.accentDim}44`, borderRadius: 10, padding: 12, marginTop: 12, marginBottom: 4 }}>
            <span style={{ fontSize: 13, color: COLORS.accentLight }}>💡 Dica do Mestre: {PHASE3_DATA.timeline.hint}</span>
          </div>
        )}

        {timelineSubmitted && (
          <div role="alert" style={{ background: isCorrect ? COLORS.successBg : COLORS.errorBg, borderRadius: 10, padding: 14, marginTop: 12, border: `1px solid ${isCorrect ? COLORS.success : COLORS.error}44` }}>
            <p style={{ margin: 0, color: isCorrect ? COLORS.success : COLORS.error, fontWeight: "bold" }}>
              {isCorrect ? PHASE3_DATA.timeline.feedbackCorrect : PHASE3_DATA.timeline.feedbackWrong}
            </p>
          </div>
        )}
        <div style={{ textAlign: "right", marginTop: 16 }}>
          {!timelineSubmitted ? (
            <button style={styles.button("primary")} onClick={checkTimeline}>Confirmar Ordem ✓</button>
          ) : (
            <button style={styles.button("primary")} onClick={() => setStep("transition")}>Ver Resultado ★</button>
          )}
        </div>
      </div>
    );
  }

  if (step === "transition") {
    return <NarrativeScreen lines={[PHASE3_DATA.transition]} onContinue={() => setStep("result")} buttonText="Ver Resultado ★" />;
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

        {!showResult && !showHint && q.hint && (
          <div style={{ marginBottom: 12, marginTop: 8, textAlign: "center" }}>
            <button onClick={() => setShowHint(true)} style={{ background: "none", border: `1px solid ${COLORS.accentDim}44`, borderRadius: 8, padding: "8px 16px", color: COLORS.accentLight, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              💡 Preciso de uma dica!
            </button>
          </div>
        )}

        {!showResult && showHint && q.hint && (
          <div style={{ background: COLORS.accent + "11", border: `1px solid ${COLORS.accentDim}44`, borderRadius: 10, padding: 12, marginBottom: 12, marginTop: 8 }}>
            <span style={{ fontSize: 13, color: COLORS.accentLight }}>💡 Dica do Mestre: {q.hint}</span>
          </div>
        )}

        {showResult && (
          <div role="alert" style={{ background: isCorrect ? COLORS.successBg : COLORS.errorBg, borderRadius: 10, padding: 14, marginTop: 8, border: `1px solid ${isCorrect ? COLORS.success : COLORS.error}44` }}>
            <p style={{ margin: 0, color: isCorrect ? COLORS.success : COLORS.error, fontWeight: "bold", marginBottom: 4 }}>
              {isCorrect ? "✅ Correto!" : "❌ Não foi dessa vez!"}
            </p>
            {q.feedbacks && selected !== null && <p style={{ margin: 0, fontSize: 14, color: COLORS.textDim, lineHeight: 1.6 }}>{stripPrefix(q.feedbacks[selected])}</p>}
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
  const [showHint, setShowHint] = useState(false);

  const questions = PHASE4_DATA.questions;
  const q = questions[qIndex];

  const handleAnswer = (val) => { if (!showResult) setSelected(val); };
  const handleConfirm = () => {
    if (selected === null) return;
    setShowResult(true);
    if (selected === q.answer) setScore(s => s + 1);
  };
  const handleNext = () => {
    if (qIndex < questions.length - 1) { setQIndex(i => i + 1); setSelected(null); setShowResult(false); setShowHint(false); }
    else setStep("transition");
  };

  const isCorrect = selected === q?.answer;
  const getStars = () => { const p = score / questions.length; return p >= 0.9 ? 3 : p >= 0.7 ? 2 : p >= 0.5 ? 1 : 0; };

  if (step === "intro") return <NarrativeScreen lines={PHASE4_DATA.intro.narrative} onContinue={() => setStep("teaching")} buttonText="Desmontar Máquinas! 🔧" />;

  if (step === "transition") {
    return <NarrativeScreen lines={[PHASE4_DATA.transition]} onContinue={() => setStep("result")} buttonText="Ver Resultado ★" />;
  }

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

        {!showResult && !showHint && q.hint && (
          <div style={{ marginBottom: 12, marginTop: 8, textAlign: "center" }}>
            <button onClick={() => setShowHint(true)} style={{ background: "none", border: `1px solid ${COLORS.accentDim}44`, borderRadius: 8, padding: "8px 16px", color: COLORS.accentLight, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              💡 Preciso de uma dica!
            </button>
          </div>
        )}

        {!showResult && showHint && q.hint && (
          <div style={{ background: COLORS.accent + "11", border: `1px solid ${COLORS.accentDim}44`, borderRadius: 10, padding: 12, marginBottom: 12, marginTop: 8 }}>
            <span style={{ fontSize: 13, color: COLORS.accentLight }}>💡 Dica do Mestre: {q.hint}</span>
          </div>
        )}

        {showResult && (
          <div role="alert" style={{ background: isCorrect ? COLORS.successBg : COLORS.errorBg, borderRadius: 10, padding: 14, marginTop: 8, border: `1px solid ${isCorrect ? COLORS.success : COLORS.error}44` }}>
            <p style={{ margin: 0, color: isCorrect ? COLORS.success : COLORS.error, fontWeight: "bold", marginBottom: 4 }}>
              {isCorrect ? "✅ Correto!" : "❌ Não foi dessa vez!"}
            </p>
            {q.feedbacks && selected !== null && <p style={{ margin: 0, fontSize: 14, color: COLORS.textDim, lineHeight: 1.6 }}>{stripPrefix(q.feedbacks[selected])}</p>}
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
                <button key={key} onClick={() => toggleMachine(key)} disabled={submitted} aria-label={`${sel ? "Remover" : "Selecionar"} ${m.name}`} aria-pressed={sel} style={{ ...styles.machineCard(sel), border: `1.5px solid ${sel ? COLORS.accent : COLORS.border}`, background: sel ? COLORS.accent + "22" : COLORS.bgCardHover, cursor: submitted ? "default" : "pointer", fontFamily: "inherit" }}>
                  <div style={{ fontSize: 22 }}>{m.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: "bold", color: sel ? COLORS.accentLight : COLORS.textDim }}>{m.name}</div>
                  {sel && <div style={{ color: COLORS.accent, fontSize: 14, marginTop: 2 }}>✓</div>}
                </button>
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
  const [showCert, setShowCert] = useState(false);

  const closingNarrative = "Você começou como um visitante curioso em uma oficina empoeirada e agora sai como inventor! Aprendeu a reconhecer máquinas simples no cotidiano, entendeu como funcionam, viajou pela história para ver como transformaram o mundo, desmontou máquinas complexas e, no final, criou sua própria engenhoca. Dê-me um ponto de apoio e moverei o mundo — mas você nem precisou de ponto de apoio. Precisou apenas de curiosidade e raciocínio!";

  const getPerformance = () => {
    if (totalStars >= 12) return { title: "Mestre Inventor", stars: 3, message: "Impressionante! Você dominou as máquinas simples como um verdadeiro mestre da mecânica. Sabia que Leonardo da Vinci também começou estudando alavancas e roldanas? Quem sabe qual será sua próxima invenção!" };
    if (totalStars >= 8) return { title: "Inventor Habilidoso", stars: 2, message: "Muito bem! Você mostrou que entende os princípios das máquinas simples e sabe aplicá-los. Que tal jogar novamente para conquistar ainda mais estrelas? Cada tentativa é uma chance de aprender algo novo!" };
    if (totalStars >= 4) return { title: "Aprendiz de Inventor", stars: 1, message: "Bom trabalho! Você já deu os primeiros passos no mundo das máquinas simples. Revise os cards de cada fase e tente novamente — com mais prática, você vai dominar cada conceito!" };
    return { title: "Inventor em Treinamento", stars: 0, message: "Toda grande invenção começa com tentativa e erro! O importante é que você explorou, tentou e aprendeu algo novo. Jogue novamente com calma, leia as dicas do Mestre Arquimedes e você vai ver a diferença!" };
  };

  const perf = getPerformance();

  if (!showCert) {
    return <NarrativeScreen lines={[closingNarrative]} onContinue={() => setShowCert(true)} buttonText="Ver Certificado 🏆" />;
  }

  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <div style={{ ...styles.card, background: `linear-gradient(135deg, #2a2018, #1a1410)`, border: `2px solid ${COLORS.accent}`, padding: "32px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${COLORS.accentDim}, ${COLORS.accent}, ${COLORS.accentDim})` }} />

        <p style={{ color: COLORS.textDim, fontSize: 12, letterSpacing: 1, marginBottom: 4 }}>ENGENHOCA: A Oficina do Tempo</p>
        <p style={{ color: COLORS.accent, fontSize: 14, letterSpacing: 4, textTransform: "uppercase", marginBottom: 4 }}>Certificado</p>
        <h2 style={{ color: COLORS.accentLight, fontSize: "clamp(1.5rem, 4vw, 2rem)", margin: "8px 0" }}>🏆 Certificado de Jovem Inventor 🏆</h2>
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

        <Stars count={perf.stars} />
        <p style={{ color: COLORS.textDim, fontSize: 14, margin: "0 0 4px" }}>Estrelas totais: {totalStars}/15</p>

        <div style={{ background: COLORS.accent + "11", borderRadius: 12, padding: 16, margin: "16px 0", border: `1px solid ${COLORS.accent}33` }}>
          <p style={{ color: COLORS.accent, fontWeight: "bold", fontSize: "1.1rem", margin: "0 0 8px" }}>
            {perf.stars > 0 ? "⭐".repeat(perf.stars) : "—"} {perf.title}
          </p>
          <p style={{ color: COLORS.text, fontSize: 14, lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
            "{perf.message}"
          </p>
        </div>

        <div style={{ background: COLORS.bgLight, borderRadius: 12, padding: 16, margin: "16px 0", textAlign: "left" }}>
          <p style={{ color: COLORS.textDim, fontSize: 13, marginBottom: 8, textAlign: "center" }}>📋 O que você aprendeu:</p>
          {[
            "O que são máquinas simples e onde encontrá-las no cotidiano",
            "Como cada uma das 6 máquinas simples funciona",
            "Como a humanidade usou máquinas simples ao longo da história",
            "Como máquinas complexas são combinações de máquinas simples",
            "Como inventar soluções para problemas reais usando máquinas simples",
          ].map((item, i) => (
            <p key={i} style={{ color: COLORS.text, fontSize: 13, lineHeight: 1.6, margin: "5px 0" }}>
              ✦ {item}
            </p>
          ))}
        </div>

        <p style={{ color: COLORS.text, fontStyle: "italic", lineHeight: 1.6, margin: "16px 0" }}>
          "Dê-me um ponto de apoio e moverei o mundo." — Arquimedes
        </p>

        <p style={{ color: COLORS.textDim, fontSize: 12, margin: "12px 0 4px" }}>BNCC EF07CI01 | SAEB E1A5 · E1B7 | Máquinas simples · 7º ano — Ensino Fundamental</p>
        <p style={{ color: COLORS.textDim, fontSize: 12, margin: 0 }}>Ciência Plural — cienciaplural.com.br</p>
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
      <p style={{ ...styles.subtitle, marginBottom: 12 }}>A Oficina do Tempo</p>
      <div style={{ marginBottom: 30 }}>
        <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: "bold", background: COLORS.accent + "18", color: COLORS.accentLight, border: `1px solid ${COLORS.accent}33`, letterSpacing: 0.5 }}>
          BNCC EF07CI01 · SAEB E1A5 · SAEB E1B7
        </span>
      </div>

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
            "Como inventar soluções para problemas reais",
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
          ⚙️ Entrar na Oficina
        </button>
      </div>

      <p style={{ color: COLORS.textDim, fontSize: 12, marginTop: 20, lineHeight: 1.6 }}>
        Jogo educativo — BNCC EF07CI01 | Máquinas simples · 7º ano — Ensino Fundamental
      </p>
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

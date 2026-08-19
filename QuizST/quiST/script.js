const questions = [
    {
      question: "Como você reage em situações de perigo?",
      options: [
        "Enfrento de frente, sem medo",
        "Uso minha inteligência para resolver",
        "Protejo meus amigos primeiro",
        "Procuro ajuda de outros"
      ]
    },
    {
      question: "Qual é seu passatempo favorito?",
      options: [
        "Jogar D&D com amigos",
        "Estudar e ler livros",
        "Ouvir música e patinar",
        "Passar tempo com a família"
      ]
    },
    {
      question: "Como você lida com segredos?",
      options: [
        "Guardo a todo custo",
        "Compartilho apenas com quem confio",
        "Tenho dificuldade em manter",
        "Depende da situação"
      ]
    },
    {
      question: "Qual sua maior qualidade?",
      options: [
        "Lealdade",
        "Inteligência",
        "Coragem",
        "Determinação"
      ]
    },
    {
      question: "Como você age em um grupo?",
      options: [
        "Líder natural",
        "Cérebro do grupo",
        "Apoio emocional",
        "Seguidor leal"
      ]
    },
    {
      question: "O que te assusta mais?",
      options: [
        "Perder pessoas que amo",
        "Fracassar",
        "O desconhecido",
        "Ficar sozinho"
      ]
    },
    {
      question: "Qual sua música favorita dos anos 80?",
      options: [
        "Should I Stay or Should I Go - The Clash",
        "Every Breath You Take - The Police",
        "Material Girl - Madonna",
        "Running Up That Hill - Kate Bush"
      ]
    },
    {
      question: "Como você lida com mudanças?",
      options: [
        "Adapto-me facilmente",
        "Analiso todos os aspectos primeiro",
        "Resisto inicialmente",
        "Aceito com o tempo"
      ]
    },
    {
      question: "Qual sua comida favorita?",
      options: [
        "Waffles",
        "Sorvete",
        "Pizza",
        "Chocolate"
      ]
    },
    {
      question: "O que você faria se descobrisse algo sobrenatural?",
      options: [
        "Investigaria até o fim",
        "Pesquisaria em livros e documentos",
        "Contaria para autoridades",
        "Manteria em segredo"
      ]
    },
    {
      question: "Como você prefere passar seu tempo livre?",
      options: [
        "Com um pequeno grupo de amigos próximos",
        "Sozinho, estudando ou lendo",
        "Em festas ou eventos sociais",
        "Com a família"
      ]
    },
    {
      question: "Qual sua maior fraqueza?",
      options: [
        "Teimosia",
        "Perfeccionismo",
        "Impulsividade",
        "Insegurança"
      ]
    },
    {
      question: "Como você reage a injustiças?",
      options: [
        "Luto contra elas",
        "Procuro formas legais de resolver",
        "Protesto",
        "Busco ajuda de outros"
      ]
    },
    {
      question: "O que você mais valoriza em uma amizade?",
      options: [
        "Lealdade",
        "Honestidade",
        "Diversão",
        "Compreensão"
      ]
    }
  ];
  
  const characters = {
    eleven: {
      name: "Eleven",
      description: "Você é especial, poderoso e leal. Como Eleven, você tem uma força interior incrível e faria qualquer coisa para proteger aqueles que ama.",
      image:"https://upload.wikimedia.org/wikipedia/pt/thumb/a/af/Eleven-Stranger-Things-3.png/330px-Eleven-Stranger-Things-3.png"
    },
    mike: {
      name: "Mike Wheeler",
      description: "Você é um líder nato, leal aos seus amigos e sempre pronto para uma aventura. Como Mike, você tem um forte senso de justiça e determinação.",
      image: "data:image/webp;base64,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"
    },
    dustin: {
      name: "Dustin Henderson",
      description: "Você é inteligente, engraçado e um amigo leal. Como Dustin, você usa seu conhecimento para ajudar os outros e sempre mantém o otimismo.",
      image: "data:image/webp;base64,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"
    },
    lucas: {
      name: "Lucas Sinclair",
      description: "Você é cauteloso, prático e protetor. Como Lucas, você é realista e fará qualquer coisa para proteger seus amigos e família.",
      image: "data:image/webp;base64,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"
    },
    max: {
      name: "Max Mayfield",
      description: "Você é independente, forte e corajoso. Como Max, você não tem medo de ser você mesmo e defender o que acredita.",
      image: "https://static.wikia.nocookie.net/strangerthings8338/images/c/c4/Max_-_Season_4.jpg/revision/latest?cb=20221105204147"
    },
    steve: {
      name: "Steve Harrington",
      description: "Você é protetor, carismático e teve um grande desenvolvimento pessoal. Como Steve, você sempre coloca os outros em primeiro lugar.",
      image: "data:image/webp;base64,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"
    },
    nancy: {
      name: "Nancy Wheeler",
      description: "Você é determinada, inteligente e corajosa. Como Nancy, você não descansa até descobrir a verdade e fazer justiça.",
      image: "https://static.wikia.nocookie.net/strangerthings8338/images/0/02/Nancy_Wheeler_S4.jpg/revision/latest?cb=20220323164653"
    },
    joyce: {
      name: "Joyce Byers",
      description: "Você é determinado, protetor e nunca desiste. Como Joyce, você tem um instinto maternal/paternal forte e faria qualquer coisa por quem ama.",
      image: "https://static.wikia.nocookie.net/strangerthings/images/9/9b/Joyce_004.png/revision/latest?cb=20220804004026&path-prefix=pt-br"
    },
    hopper: {
      name: "Jim Hopper",
      description: "Você é durão por fora, mas tem um coração de ouro. Como Hopper, você é protetor, determinado e faria qualquer coisa para manter seus entes queridos seguros.",
      image: "data:image/webp;base64,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"
    },
    billy: {
      name: "Billy Hargrove",
      description: "Você é intenso, complexo e tem uma personalidade forte. Como Billy, você pode parecer durão, mas esconde camadas mais profundas de emoção.",
      image: "data:image/webp;base64,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"
    }
  };
  const images = {
      image: "https://static.wikia.nocookie.net/strangerthings8338/images/8/8f/Billy_Hargrove_S3_Promo.jpg",
      image: "https://static.wikia.nocookie.net/strangerthings8338/images/7/7b/Dustin_Henderson_S4_Promo.jpg",
      image: "https://static.wikia.nocookie.net/strangerthings8338/images/8/8f/Billy_Hargrove_S3_Promo.jpg",
      image: "https://static.wikia.nocookie.net/strangerthings8338/images/8/8f/Billy_Hargrove_S3_Promo.jpg",
      image: "https://static.wikia.nocookie.net/strangerthings8338/images/8/8f/Billy_Hargrove_S3_Promo.jpg",
      image: "https://static.wikia.nocookie.net/strangerthings8338/images/8/8f/Billy_Hargrove_S3_Promo.jpg"
      
  
  }
  let currentQuestion = 0;
  let scores = {
    eleven: 0,
    mike: 0,
    dustin: 0,
    lucas: 0,
    max: 0,
    steve: 0,
    nancy: 0,
    joyce: 0,
    hopper: 0,
    billy: 0
  };
  
  let userAnswers = [];
  
  function showQuestion() {
    const quizDiv = document.getElementById('quiz');
    const question = questions[currentQuestion];
    
    let html = `
      <div class="question active">
        <h3>Questão ${currentQuestion + 1}: ${question.question}</h3>
        <div class="options">
    `;
    
    question.options.forEach((option, index) => {
      html += `<div class="option" onclick="selectOption(${index})">${option}</div>`;
    });
    
    html += `
      </div>
      <div class="button-container">
        <button class="nav-button" onclick="previousQuestion()" ${currentQuestion === 0 ? 'disabled' : ''}>Voltar</button>
      </div>
      </div>`;
    
    quizDiv.innerHTML = html;
    
    updateProgress();
  }
  
  function updateProgress() {
    const progress = document.querySelector('.progress');
    const percentage = ((currentQuestion) / questions.length) * 100;
    progress.style.width = `${percentage}%`;
  }
  
  function selectOption(optionIndex) {
    userAnswers.push(optionIndex);
    
    switch(optionIndex) {
      case 0:
        scores.eleven += 2;
        scores.mike += 1;
        scores.hopper += 1;
        break;
      case 1:
        scores.dustin += 2;
        scores.nancy += 1;
        scores.billy += 1;
        break;
      case 2:
        scores.max += 2;
        scores.steve += 1;
        scores.billy += 2;
        break;
      case 3:
        scores.joyce += 2;
        scores.lucas += 1;
        scores.hopper += 2;
        break;
    }
    
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }
  
  function previousQuestion() {
    if (currentQuestion > 0) {
      currentQuestion--;
      const lastAnswer = userAnswers.pop();
      if (lastAnswer !== undefined) {
        switch(lastAnswer) {
          case 0:
            scores.eleven -= 2;
            scores.mike -= 1;
            scores.hopper -= 1;
            break;
          case 1:
            scores.dustin -= 2;
            scores.nancy -= 1;
            scores.billy -= 1;
            break;
          case 2:
            scores.max -= 2;
            scores.steve -= 1;
            scores.billy -= 2;
            break;
          case 3:
            scores.joyce -= 2;
            scores.lucas -= 1;
            scores.hopper -= 2;
            break;
        }
      }
      showQuestion();
    }
  }
  
  function showResult() {
    const resultDiv = document.getElementById('result');
    const quizDiv = document.getElementById('quiz');
    const progressBar = document.querySelector('.progress-bar');
    
    const winner = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    const character = characters[winner];
    
    quizDiv.style.display = 'none';
    progressBar.style.display = 'none';
    resultDiv.style.display = 'block';
    
    resultDiv.innerHTML = `
      <h2>Você é ${character.name}!</h2>
      <img src="${character.image}" alt="${character.name}" />
      <p>${character.description}</p>
      <button onclick="location.reload()" style="
        background-color: #e50914;
        border: none;
        color: white;
        padding: 15px 30px;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 20px;
        font-size: 16px;
      ">Fazer o teste novamente</button>
    `;
  }
  
  // Iniciar o quiz
  showQuestion();   
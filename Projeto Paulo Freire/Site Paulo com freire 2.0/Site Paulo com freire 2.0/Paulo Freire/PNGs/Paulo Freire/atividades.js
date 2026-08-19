document.addEventListener("DOMContentLoaded", ( ) => {
    
    const cards = [
        {
            name:'dvd',
            img:'imgs_atividades/Carta DVD.png'
        },
        {
            name:'pc',
            img:'imgs_atividades/Carta PC.png'
        },
        {
            name:'mouse',
            img:'imgs_atividades/Carta Mouse.png'
        },
        {
            name:'infoneto',
            img:'imgs_atividades/Carta Infoneto.png'
        },
        {
            name:'disquete',
            img:'imgs_atividades/Carta Disquete.png'
        },
        {
            name:'pendrive',
            img:'imgs_atividades/Carta Pendrive.png'
        },
        {
            name:'dvd',
            img:'imgs_atividades/Carta DVD.png'
        },
        {
            name:'pc',
            img:'imgs_atividades/Carta PC.png'
        },
        {
            name:'mouse',
            img:'imgs_atividades/Carta Mouse.png'
        },
        {
            name:'infoneto',
            img:'imgs_atividades/Carta Infoneto.png'
        },
        {
            name:'disquete',
            img:'imgs_atividades/Carta Disquete.png'
        },
        {
            name:'pendrive',
            img:'imgs_atividades/Carta Pendrive.png'
        }
    ]

    //Embaralhar as Cartas
    cards.sort(() => 0.5 - Math.random())

    //Carregar elementos HTML no Script
    const board = document.querySelector('.board')
    const resultView = document.querySelector('#result')

    let cardsChosen = []; //Cartas escolhidas
    let cardsChosenId = []; //Id das cartas escolhidas
    let cardsWon = [] //Cartas combinadas

    //Checagem de Combinações
    function checkForMatch(){
        const cards = document.querySelectorAll('.board img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        //Verificar clique na mesma imagem
        if(optionOneId == optionTwoId){
            cards[optionOneId].setAttribute('src', 'imgs_atividades/Verso Cartas.png');
            cards[optionTwoId].setAttribute('src', 'imgs_atividades/Verso Cartas.png');
            alert('Você clicou na mesma imagem!');
        }
        //Verificar combinação se click em imagens diferentes
        else if(cardsChosen[0] == cardsChosen[1]){
            cards[optionOneId].setAttribute('src', 'imgs_atividades/Certo Pixel.png');
            cards[optionTwoId].setAttribute('src', 'imgs_atividades/Certo Pixel.png');
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
            alert('Você encontrou uma combinação! Parábens!!');
        }else{
            cards[optionOneId].setAttribute('src', 'imgs_atividades/Verso Cartas.png');
            cards[optionTwoId].setAttribute('src', 'imgs_atividades/Verso Cartas.png');
            alert('Você errou! Tente novamente.');
        }
        cardsChosen = [];
        cardsChosenId = [];

        //Mostrar placar
        resultView.textContent = 'Pares encontrados: '+cardsWon.length
        if(cardsWon.length === cards.length/2){
            resultView.textContent = 'Parábens! Você encontrou todas as combinações!!'
        }
    }

    //Criar o quadro de cartas
    function createBoard(){
        for(let i = 0; i < cards.length; i++){
            const card = document.createElement('img');
            card.setAttribute('src', 'imgs_atividades/Verso Cartas.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            board.appendChild(card);
        }
    }

    //Função para virar as cartas
    function flipCard(){
        let cardId = this.getAttribute('data-id');
        cardsChosen.push(cards[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cards[cardId].img);
        if(cardsChosen.length == 2){
            setTimeout(checkForMatch, 100);
        }
    }
    createBoard();
})
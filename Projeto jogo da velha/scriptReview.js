// Inicializa o estado do tabuleiro com valores vazios
let square = {
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

// Inicializa variáveis de controle do jogo
let player = ''; // Armazena o jogador atual ('x' ou 'o')
let warning = ''; // Armazena mensagens de aviso
let playing = false; // Indica se o jogo está em andamento

// Chama a função reset para iniciar o jogo
reset();

// Eventos
// Adiciona um evento de clique ao botão de reset para reiniciar o jogo
document.querySelector('.reset').addEventListener('click', reset);

// Adiciona eventos de clique a cada item do tabuleiro
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

// Funções
// Função chamada quando um item do tabuleiro é clicado
function itemClick(event) {
    let item = event.target.getAttribute('data-item'); // Obtém o item clicado
    if(playing && square[item] === '') { // Verifica se o jogo está em andamento e o item está vazio
        square[item] = player; // Marca o item com o jogador atual
        renderSquare(); // Atualiza a interface do tabuleiro
        togglePlayer(); // Alterna para o próximo jogador
    }
}

// Função para reiniciar o jogo
function reset() {
    warning = ''; // Limpa a mensagem de aviso

    // Define aleatoriamente o jogador inicial
    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'x' : 'o';

    // Limpa o tabuleiro
    for(let i in square) {
        square[i] = '';
    }

    playing = true; // Define que o jogo está em andamento
}
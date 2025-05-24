// Dados iniciais
let quadro = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let playing = false;
let vez = 'x';
let warning = '';

reset();

// Eventos
document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach((item) => {
    item.addEventListener('click', (e) => {
        let loc = e.target.getAttribute('data-item');

        if (playing && quadro[loc] === '') {
            quadro[loc] = vez;
            renderQuadro();
            togglePlayer();
        }
    });
});

// Funções
function reset() {
    warning = '';

    // definir a vez
    let random = Math.floor(Math.random() * 2);
    vez = random === 0 ? 'x' : 'o';

    // resetar os quadros
    for (let i in quadro) {
        quadro[i] = '';
    }

    // renderizar tudo
    renderQuadro();
    renderInfo();

    playing = true;
}

function renderQuadro() {
    for (let i in quadro) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = quadro[i];
        item.classList.remove('x', 'o');
        if (quadro[i] !== '') {
            item.classList.add(quadro[i]);
        }
    }

    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = vez.toUpperCase();
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {
    vez = vez === 'x' ? 'o' : 'x';
    renderInfo();
}

function checkGame() {
    if (checkWinnerFor('x')) {
        warning = 'O "X" venceu! 🎉';
        playing = false;
    } else if (checkWinnerFor('o')) {
        warning = 'O "O" venceu! 🎉';
        playing = false;
    } else if (isFull()) {
        warning = 'Deu empate! 🤝';
        playing = false;
    }
    renderInfo();
}

function checkWinnerFor(player) {
    let winPatterns = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',
        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for (let pattern of winPatterns) {
        let positions = pattern.split(',');
        let hasWon = positions.every(pos => quadro[pos] === player);
        if (hasWon) return true;
    }
    return false;
}

function isFull() {
    return Object.values(quadro).every(value => value !== '');
}
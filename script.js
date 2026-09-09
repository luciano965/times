/* =========================================
   CONFIGURAÇÃO
========================================= */

const TOTAL_JOGADORES = 20;

const TOTAL_TIMES = 4;

const JOGADORES_POR_TIME = 5;


/* =========================================
   NOMES DOS TIMES E JOGADORES
========================================= */

const nomesTimes = [
    "Real Madrid",
    "Barcelona",
    "Manchester City",
    "Bayern de Munique",
    "Liverpool",
    "Paris Saint-Germain",
    "Juventus",
    "Milan"
];

const nomes = [
    "João", "Pedro", "Lucas", "Gabriel", "Rafael",
    "Bruno", "Carlos", "Matheus", "Diego", "André",
    "Felipe", "Gustavo", "Henrique", "Vitor", "Marcelo",
    "Daniel", "Eduardo", "Caio", "Rodrigo", "Leonardo",
    "Arthur", "Miguel", "Davi", "Heitor", "Bernardo",
    "Samuel", "Enzo", "Nicolas", "Thiago", "Vinicius",
    "Igor", "Renan", "Wesley", "Murilo", "Luan",
    "Alex", "Fernando", "Ricardo", "Guilherme"
];


/* =========================================
   VARIÁVEIS
========================================= */

let jogadores = [];


/* =========================================
   ELEMENTOS
========================================= */

const playerInput = document.getElementById("playerInput");
const addButton = document.getElementById("addButton");
const randomNamesButton = document.getElementById("randomNamesButton");
const clearButton = document.getElementById("clearButton");
const drawButton = document.getElementById("drawButton");
const playerList = document.getElementById("playerList");
const playerCount = document.getElementById("playerCount");
const teamsContainer = document.getElementById("teamsContainer");


/* =========================================
   CORES DOS TIMES
========================================= */

const cores = [
    { principal: "#e53935", escura: "#b71c1c" },
    { principal: "#1e88e5", escura: "#0d47a1" },
    { principal: "#43a047", escura: "#1b5e20" },
    { principal: "#8e24aa", escura: "#4a148c" }
];


/* =========================================
   EMBARALHAR
========================================= */

function embaralhar(array) {
    const novoArray = [...array];

    for (let i = novoArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [novoArray[i], novoArray[j]] = [novoArray[j], novoArray[i]];
    }

    return novoArray;
}


/* =========================================
   ADICIONAR JOGADOR
========================================= */

function adicionarJogador() {
    const nome = playerInput.value.trim();

    if (nome === "") {
        alert("Digite o nome do jogador!");
        return;
    }

    if (jogadores.length >= TOTAL_JOGADORES) {
        alert("Já existem 20 jogadores!");
        return;
    }

    const existe = jogadores.some(
        jogador => jogador.toLowerCase() === nome.toLowerCase()
    );

    if (existe) {
        alert("Esse jogador já está na lista!");
        return;
    }

    jogadores.push(nome);
    playerInput.value = "";
    atualizarLista();
}


/* =========================================
   GERAR 20 NOMES ALEATÓRIOS
========================================= */

function adicionarNomesAleatorios() {
    jogadores = [];

    const nomesSorteados = embaralhar(nomes).slice(0, TOTAL_JOGADORES);
    jogadores = nomesSorteados;

    atualizarLista();
    limparResultado();
}


/* =========================================
   ATUALIZAR LISTA
========================================= */

function atualizarLista() {
    playerCount.textContent = jogadores.length;
    playerList.innerHTML = "";

    if (jogadores.length === 0) {
        playerList.innerHTML = `
            <p class="vazio">
                Nenhum jogador adicionado.
            </p>
        `;
    }

    jogadores.forEach((jogador, index) => {
        const div = document.createElement("div");
        div.className = "jogador";
        div.innerHTML = `
            <span>
                ⚽ ${index + 1}. ${jogador}
            </span>
            <button class="remover" onclick="removerJogador(${index})">
                ✕
            </button>
        `;
        playerList.appendChild(div);
    });

    drawButton.disabled = jogadores.length !== TOTAL_JOGADORES;

    if (jogadores.length < TOTAL_JOGADORES) {
        drawButton.textContent = `🎲 SORTEAR TIMES (${jogadores.length}/20)`;
    } else {
        drawButton.textContent = "🎲 SORTEAR TIMES";
    }
}


/* =========================================
   REMOVER JOGADOR
========================================= */

function removerJogador(index) {
    jogadores.splice(index, 1);
    atualizarLista();
    limparResultado();
}


/* =========================================
   LIMPAR TUDO
========================================= */

function limparTudo() {
    jogadores = [];
    atualizarLista();
    limparResultado();
}


/* =========================================
   LIMPAR RESULTADO
========================================= */

function limparResultado() {
    teamsContainer.innerHTML = `
        <div class="resultado-vazio">
            <span>⚽</span>
            <p>Os times aparecerão aqui.</p>
        </div>
    `;
}


/* =========================================
   SORTEAR TIMES
========================================= */

function sortearTimes() {
    if (jogadores.length !== TOTAL_JOGADORES) {
        alert("Você precisa ter exatamente 20 jogadores!");
        return;
    }

    const sorteados = embaralhar(jogadores);
    
    // Embaralha também a lista de nomes de times para que eles venham aleatórios a cada sorteio
    const timesDisponiveis = embaralhar(nomesTimes);

    const times = [];

    for (let i = 0; i < TOTAL_TIMES; i++) {
        const inicio = i * JOGADORES_POR_TIME;
        const fim = inicio + JOGADORES_POR_TIME;
        const membros = sorteados.slice(inicio, fim);
        
        // Pega um nome aleatório da lista para este time
        const nomeTime = timesDisponiveis[i];

        times.push({
            nome: nomeTime,
            membros: membros
        });
    }

    teamsContainer.innerHTML = "";
    
    times.forEach((timeObj, index) => {
        const corTime = cores[index % cores.length];
        let htmlTime = `
            <div class="time-card" style="border-color: ${corTime.principal}">
                <h3 style="background: ${corTime.principal}">⭐ ${timeObj.nome}</h3>
                <ul>
        `;
        
        timeObj.membros.forEach(jogador => {
            htmlTime += `<li>⚽ ${jogador}</li>`;
        });

        htmlTime += `
                </ul>
            </div>
        `;
        
        teamsContainer.innerHTML += htmlTime;
    });
}
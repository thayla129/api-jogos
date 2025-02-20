'use strict';

// Mapeamento de categorias em português para inglês
const categoriasTraduzidas = {
    'tiro': 'shooter',
    'mmorpg': 'mmorpg',
    'estratégia': 'strategy',
    'moba': 'moba',
    'corrida': 'racing',
    'esportes': 'sports',
    'social': 'social',
    'sandbox': 'sandbox',
    'mundo aberto': 'open-world',
    'sobrevivência': 'survival',
    'pvp': 'pvp',
    'pve': 'pve',
    'pixel': 'pixel',
    'zumbi': 'zombie',
    'turno': 'turn-based',
    'fantasia': 'fantasy',
    'ficção científica': 'sci-fi',
    'luta': 'fighting',
    'ação-rpg': 'action-rpg',
    'battle royale': 'battle-royale'
};

async function pesquisarJogos(categoria) {
    const categoriaIngles = categoriasTraduzidas[categoria.toLowerCase()] || categoria.toLowerCase();
    const url = `https://www.freetogame.com/api/games?category=${categoriaIngles}`;
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;

    try {
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error('Erro ao carregar os jogos');
        return await response.json();
    } catch (error) {
        console.error('Erro:', error);
        return [];
    }
}

function criarCardJogo(jogo) {
    const galeria = document.getElementById('galeria');
    const card = document.createElement('div');
    card.classList.add('jogo');

    const imagem = document.createElement('img');
    imagem.src = jogo.thumbnail;
    imagem.alt = jogo.title;

    const titulo = document.createElement('h2');
    titulo.textContent = jogo.title;

    const descricao = document.createElement('p');
    descricao.textContent = jogo.short_description;

    card.append(imagem, titulo, descricao);
    galeria.appendChild(card);
}

async function preencherJogos() {
    const galeria = document.getElementById('galeria');
    galeria.innerHTML = '';

    const categoria = document.getElementById('categoria').value;
    const jogos = await pesquisarJogos(categoria);

    if (jogos.length === 0) {
        galeria.textContent = 'Nenhum jogo encontrado para esta categoria.';
    } else {
        jogos.forEach(criarCardJogo);
    }
}

document.getElementById('pesquisar').addEventListener('click', preencherJogos);

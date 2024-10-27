// Usuários e senhas
const usuarios = {
    "admin": "admin123",
    "usuario1": "senha1",
    "usuario2": "senha2"
};

// Carregar estoque do Local Storage, ou iniciar com valores padrão
let produtos = JSON.parse(localStorage.getItem("produtos")) || [
    { nome: "Arroz", preco: 20.5, quantidade: 100 },
    { nome: "Feijão", preco: 8.9, quantidade: 50 },
    { nome: "Macarrão", preco: 4.5, quantidade: 200 }
];
let saidas = JSON.parse(localStorage.getItem("saidas")) || [];

// Salvar dados no Local Storage
function salvarDados() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
    localStorage.setItem("saidas", JSON.stringify(saidas));
}

// Função de login
function validarLogin() {
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem");

    if (usuarios[usuario] && usuarios[usuario] === senha) {
        mensagem.textContent = "Login bem-sucedido!";
        setTimeout(() => { window.location.href = "estoque.html"; }, 1000);
    } else {
        mensagem.textContent = "Usuário ou senha incorretos.";
    }
}

// Atualizar lista de produtos
function atualizarListaProdutos() {
    const lista = document.getElementById("listaProdutos");
    lista.innerHTML = "";
    produtos.forEach(produto => {
        lista.innerHTML += `<li>${produto.nome} - ${produto.quantidade} unidades</li>`;
    });
}

// Adicionar produto
function adicionarProduto() {
    const nome = document.getElementById("nomeProduto").value;
    const quantidade = parseInt(document.getElementById("quantidadeProduto").value);

    if (nome && quantidade > 0) {
        produtos.push({ nome, preco: 0.0, quantidade });
        atualizarListaProdutos();
        salvarDados();
    } else {
        alert("Preencha o nome do produto e uma quantidade válida.");
    }
}

// Remover produto
function removerProduto() {
    const nome = document.getElementById("nomeProduto").value;
    const quantidade = parseInt(document.getElementById("quantidadeProduto").value);

    const produto = produtos.find(p => p.nome === nome);
    if (produto && quantidade > 0 && produto.quantidade >= quantidade) {
        produto.quantidade -= quantidade;
        atualizarListaProdutos();
        salvarDados();
    } else {
        alert("Produto não encontrado ou quantidade inválida.");
    }
}

// Registrar saída
function registrarSaida() {
    const nome = document.getElementById("nomeProduto").value;
    const quantidade = parseInt(document.getElementById("quantidadeProduto").value);

    const produto = produtos.find(p => p.nome === nome);
    if (produto && produto.quantidade >= quantidade) {
        produto.quantidade -= quantidade;
        const data = new Date().toLocaleString();
        saidas.push({ nome, quantidade, data });
        atualizarListaProdutos();
        salvarDados();
    } else {
        alert("Quantidade inválida ou produto não encontrado.");
    }
}

// Abrir consulta de saídas em nova janela
function abrirConsultaSaidas() {
    const novaJanela = window.open("", "Saídas", "width=400,height=500");
    novaJanela.document.write("<h2>Histórico de Saídas</h2><ul>");
    saidas.forEach(s => {
        novaJanela.document.write(`<li>${s.data}: ${s.nome} - ${s.quantidade} unidades</li>`);
    });
    novaJanela.document.write("</ul>");
}

// Função para abrir "Ver Estoque" em nova janela
function abrirEstoque() {
    const novaJanela = window.open("", "Estoque", "width=400,height=500");
    novaJanela.document.write("<h2>Produtos no Estoque</h2><ul>");
    produtos.forEach(p => {
        novaJanela.document.write(`<li>${p.nome} - ${p.quantidade} unidades</li>`);
    });
    novaJanela.document.write("</ul>");
}

// Atualizar lista de produtos ao carregar
window.onload = atualizarListaProdutos;

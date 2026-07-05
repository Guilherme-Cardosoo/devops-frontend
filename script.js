const API_URL = "http://localhost:8000/produtos";
const formulario = document.getElementById("produto-form");

let produtoEditando = null;

console.log("Script carregado!");

async function carregarProdutos() {
    const resposta = await fetch(API_URL);

    const produtos = await resposta.json();

    const tabela = document.getElementById("lista-produtos");

    tabela.innerHTML = "";

    produtos.forEach(produto => {
        tabela.innerHTML += `
            <tr>
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>${produto.categoria}</td>
                <td>R$ ${produto.preco}</td>
                <td class="acoes">
                    <button
                        class="btn-editar"
                        onclick="editarProduto(${produto.id})"
                    >
                        Editar
                    </button>
                    <button
                        class="btn-excluir"
                        onclick="excluirProduto(${produto.id})"
                    >
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}

async function excluirProduto(id) {

    const confirmar = confirm("Deseja realmente excluir este produto?");

    if (!confirmar) {
        return;
    }

    const resposta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (resposta.ok) {
        carregarProdutos();
    } else {
        alert("Erro ao excluir produto.");
    }

}

async function editarProduto(id) {

    const resposta = await fetch(API_URL);

    const produtos = await resposta.json();

    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return;
    }

    produtoEditando = id;

    document.getElementById("nome").value = produto.nome;
    document.getElementById("preco").value = produto.preco;
    document.getElementById("categoria").value = produto.categoria;

    formulario.querySelector("button").textContent = "Salvar";

}

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const produto = {
        nome: document.getElementById("nome").value,
        preco: parseFloat(document.getElementById("preco").value),
        categoria: document.getElementById("categoria").value
    };

    let resposta;

    if (produtoEditando === null) {

        resposta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produto)
        });

    } else {

        resposta = await fetch(`${API_URL}/${produtoEditando}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produto)
        });

    }

    if (resposta.ok) {

        formulario.reset();

        produtoEditando = null;

        formulario.querySelector("button").textContent = "Cadastrar";

        carregarProdutos();

    } else {

        alert("Erro ao salvar produto.");

    }

});

carregarProdutos();
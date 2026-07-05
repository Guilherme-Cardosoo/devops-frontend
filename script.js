const API_URL = "http://localhost:8000/produtos";
const formulario = document.getElementById("produto-form");

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
                    <button class="btn-editar">Editar</button>
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

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const produto = {
        nome: document.getElementById("nome").value,
        preco: parseFloat(document.getElementById("preco").value),
        categoria: document.getElementById("categoria").value
    };

    const resposta = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
    });

    if (resposta.ok) {
        formulario.reset();
        carregarProdutos();
    } else {
        alert("Erro ao cadastrar produto.");
    }
});

carregarProdutos();
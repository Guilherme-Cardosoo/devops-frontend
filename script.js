const API_URL = "http://localhost:8000/produtos";

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
                    <button class="btn-excluir">Excluir</button>
                </td>
            </tr>
        `;
    });
}

carregarProdutos();
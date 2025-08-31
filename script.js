// Dados de exemplo para diferentes tabelas
const tabelas = {
  pessoas: {
    titulo: "Tabela de Pessoas",
    colunas: ["Nome", "Idade", "Cidade"],
    dados: [
      ["Maria", "22", "São Paulo"],
      ["João", "28", "Rio de Janeiro"],
      ["Lucas", "31", "Curitiba"]
    ]
  },
  produtos: {
    titulo: "Tabela de Produtos",
    colunas: ["Produto", "Preço", "Estoque"],
    dados: [
      ["Notebook", "R$ 3.000", "15"],
      ["Mouse", "R$ 80", "200"],
      ["Teclado", "R$ 150", "120"]
    ]
  },
  notas: {
    titulo: "Tabela de Notas",
    colunas: ["Aluno", "Matéria", "Nota"],
    dados: [
      ["Maria", "Matemática", "9.0"],
      ["João", "Português", "7.5"],
      ["Lucas", "História", "8.2"]
    ]
  }
};

// Seletores
const menuLinks = document.querySelectorAll(".sidebar ul li a");
const tabelaContainer = document.getElementById("tabela-container");
const tituloTabela = document.getElementById("titulo-tabela");

function renderTabela(tipo) {
  const tabelaInfo = tabelas[tipo];
  if (!tabelaInfo) return;

  // Atualiza título
  tituloTabela.textContent = tabelaInfo.titulo;

  // Monta HTML da tabela
  let html = "<table><thead><tr>";
  tabelaInfo.colunas.forEach(col => {
    html += `<th>${col}</th>`;
  });
  html += "</tr></thead><tbody>";

  tabelaInfo.dados.forEach(linha => {
    html += "<tr>";
    linha.forEach((cel, index) => {
      html += `<td data-label="${tabelaInfo.colunas[index]}">${cel}</td>`;
    });
    html += "</tr>";
  });

  html += "</tbody></table>";

  // Injeta no container
  tabelaContainer.innerHTML = html;
}


// Ativa troca de tabela ao clicar no menu
menuLinks.forEach(link => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const tipoTabela = link.getAttribute("data-table");
    renderTabela(tipoTabela);
  });
});

// Renderiza a tabela inicial
renderTabela("pessoas");

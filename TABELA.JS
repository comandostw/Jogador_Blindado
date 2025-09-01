// ==== Dados das tabelas ====
const tabelas = {
    stream: {
        titulo: "Comandos - StreamElements ",
        colunas: ["Comando", "Ação", "Critério"],
        dados: [
            ["!{Letra}", "tal letra será teclado no meu computador(automaticamente", "Alguem deve resgatar ele na loja StreamElements, OU cair na roleta (!redeem controleteclado)"],
            ["!{número}", "tal número será teclado no meu computador(automaticamente)"],
            ["!ctrl+z", "O atalho ctrl+z (reverter ação) será teclado no meu computador(automaticamente)"],
            ["!space", "A tecla de espaço será teclado no meu computador(automaticamente)"]
        ]
    },
    teclado: {
        titulo: "Interação com meu",
        colunas: ["Comando", "Ação", "Critério"],
        dados: [
            ["!{Letra}", "tal letra será teclado no meu computador(automaticamente", "Alguem deve resgatar ele na loja StreamElements, OU cair na roleta (!redeem controleteclado)"],
            ["!{número}", "tal número será teclado no meu computador(automaticamente)"],
            ["!ctrl+z", "O atalho ctrl+z (reverter ação) será teclado no meu computador(automaticamente)"],
            ["!space", "A tecla de espaço será teclado no meu computador(automaticamente)"]
        ]
    },
    wplace: {
        titulo: "Tabela de Notas",
        colunas: ["Aluno", "Matéria", "Nota"],
        dados: [
            ["Maria", "Matemática", "9.0"],
            ["João", "Português", "7.5"],
            ["Lucas", "História", "8.2"]
        ]
    },
    grid: {
        titulo: "Pixel Grid - Use para servir como modelo e atalho para pintar na Stream",
        tipo: "pixel"
    },
    roleta: {
        titulo: "Roleta - Roda da sorte",
        tabelas: [
            {
                colunas: ["Como funciona"],
                dados: [
                    ["É uma espécie de Roda da Sorte, onde pode ter cair consequencias boas ou ruins tanto para mim quanto para vocês que me assistem, ela custa 150 pontos, para resgatar você pode tanto ir para a loja do Canal (!loja), quanto dar !redeem roleta no chat da live. Ao resgatar, eu sou obrigado a girar e fazer a consequencia, você tambem pode se lascar com a roleta :D "]
                ]
            },
            {
                titulo: "Possiveis Consequências",
                colunas: ["Consequência", "Descrição", "P/ quem"],
                dados: [
                    ["Surpresa", "Você recebe uma recompensa aleatória", "Seguidor"],
                    ["Desastre", "Você perde pontos ou não recebe nada", "Seguidor"]
                ]
            }
        ]
    }

};



// ==== Seletores principais ====
const tabelaContainer = document.getElementById("tabela-container");
const tituloTabela = document.getElementById("titulo-tabela");

// ==== Renderizar várias tabela ====

function renderTabelasMultipla(info) {
    let html = "";
    info.tabelas.forEach(tab => {
        html += "<table><thead><tr>";
        tab.colunas.forEach(col => html += `<th>${col}</th>`);
        html += "</tr></thead><tbody>";
        tab.dados.forEach(linha => {
            html += "<tr>";
            linha.forEach((cel, idx) => html += `<td data-label="${tab.colunas[idx]}">${cel}</td>`);
            html += "</tr>";
        });
        html += "</tbody></table><br>"; // separa as tabelas com um espaço
    });
    tabelaContainer.innerHTML = html;
}


// ==== Função: renderizar tabela normal ====
function renderTabelaNormal(info) {
    let html = "<table><thead><tr>";
    info.colunas.forEach(col => {
        html += `<th>${col}</th>`;
    });
    html += "</tr></thead><tbody>";
    info.dados.forEach(linha => {
        html += "<tr>";
        linha.forEach((cel, index) => {
            html += `<td data-label="${info.colunas[index]}">${cel}</td>`;
        });
        html += "</tr>";
    });
    html += "</tbody></table>";
    tabelaContainer.innerHTML = html;
}

document.querySelectorAll(".sidebar a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const tableKey = link.dataset.table;
        const info = tabelas[tableKey];

        tituloTabela.textContent = info.titulo;

        if (info.tipo === "pixel") {
            // render pixel grid
        } else if (info.tabelas) {
            renderTabelasMultipla(info);
        } else {
            renderTabelaNormal(info);
        }
    });
});

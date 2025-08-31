const copyFeedback = document.getElementById("copy-feedback");

// ==== Dados das tabelas ====
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
    },
    pixel: {
        titulo: "Pixel Grid",
        tipo: "pixel"
    }
};

// ==== Seletores principais ====
const tabelaContainer = document.getElementById("tabela-container");
const tituloTabela = document.getElementById("titulo-tabela");

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

function rgbToHex(rgb) {
    if (!rgb) return "#ffffff";
    const result = rgb.match(/\d+/g);
    if (!result) return "#ffffff";
    const r = parseInt(result[0]).toString(16).padStart(2, "0");
    const g = parseInt(result[1]).toString(16).padStart(2, "0");
    const b = parseInt(result[2]).toString(16).padStart(2, "0");
    return `#${r}${g}${b}`;
}


// ==== Função: renderizar pixel grid avançado ====
function renderPixelGridAdvanced() {
    const gridCols = 68;
    const gridRows = 38;
    let selectedColor = "#000000";
    let paintEnabled = true;

    // HTML da grade com checkbox e paleta HEX
    tabelaContainer.innerHTML = `
    <div class="pixel-container-advanced" style="display:flex; justify-content: space-between;">
      
      <!-- Lado esquerdo: checkbox -->
      <div class="left-panel" style="margin-right:10px;">
        <label>
          <input type="checkbox" id="togglePaint" checked>
          Ativar Pintura
        </label>
        <div id="hoverInfo" style="margin-top:10px; font-family: monospace;"></div>
      </div>

      <!-- Grade de pixels -->
      <div id="pixelGrid" class="parent" style="
        display:grid;
        grid-template-columns: repeat(${gridCols}, 12px);
        grid-gap:1px;
      "></div>

      <!-- Lado direito: paleta HEX -->
      <div class="right-panel" style="margin-left:10px;">
        <div class="sp-picker-container" style="display:flex; align-items:center; gap:5px;">
          <input type="color" id="colorPicker" value="#000000">
          <span id="selectedHex" style="font-family: monospace;">#000000</span>
        </div>
      </div>

    </div>
  `;

    const grid = document.getElementById("pixelGrid");
    const colorPicker = document.getElementById("colorPicker");
    const selectedHex = document.getElementById("selectedHex");
    const togglePaint = document.getElementById("togglePaint");
    const hoverInfo = document.getElementById("hoverInfo");

    // ==== Criação da grid de pixels ====
    for (let y = 0; y < gridRows; y++) {
        for (let x = 0; x < gridCols; x++) {
            const pixel = document.createElement("div");
            pixel.classList.add("pixel");
            pixel.dataset.x = x + 1;
            pixel.dataset.y = y + 1;
            pixel.style.width = "12px";
            pixel.style.height = "12px";
            pixel.style.border = "1px solid #ccc";
            pixel.style.background = "#ffffff";

            // Hover: sempre mostra info, formato !w <HEX> <YxX>
            pixel.addEventListener("mouseenter", () => {
                const cor = rgbToHex(pixel.style.background);
                hoverInfo.textContent = `!w ${cor} ${pixel.dataset.y}x${pixel.dataset.x}`;
            });

            pixel.addEventListener("mouseleave", () => {
                hoverInfo.textContent = ""; // limpa quando sai do pixel
            });


            pixel.addEventListener("click", () => {
                const cor = rgbToHex(pixel.style.background);
                const info = `!w ${cor} ${pixel.dataset.y}x${pixel.dataset.x}`;
                navigator.clipboard.writeText(info);

                if (paintEnabled) {
                    pixel.style.background = selectedColor;
                }

                // ==== Mostra feedback de cópia ====
                copyFeedback.style.opacity = "1";
                setTimeout(() => {
                    copyFeedback.style.opacity = "0";
                }, 1000); // some após 1 segundo
            });


            grid.appendChild(pixel);
        }
    }

    // ==== Eventos ====
    colorPicker.addEventListener("input", (e) => {
        selectedColor = e.target.value;
        selectedHex.textContent = selectedColor;
    });

    togglePaint.addEventListener("change", (e) => {
        paintEnabled = e.target.checked;
    });
}



// ==== Função principal: decide o que renderizar ====
function renderTabela(tipo) {
    const tabelaInfo = tabelas[tipo];
    if (!tabelaInfo) return;

    tituloTabela.textContent = tabelaInfo.titulo;

    if (tabelaInfo.tipo === "pixel") {
        renderPixelGridAdvanced();
    } else {
        renderTabelaNormal(tabelaInfo);
    }
}

// ==== Inicializa eventos do menu ====
function initMenu() {
    const menuLinks = document.querySelectorAll(".sidebar ul li a");
    menuLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const tipoTabela = link.getAttribute("data-table");
            renderTabela(tipoTabela);
        });
    });
}

// ==== Inicialização ====
initMenu();
renderTabela("pessoas"); // inicia com a tabela de pessoas

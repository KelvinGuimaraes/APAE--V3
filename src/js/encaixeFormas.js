// ...existing code...
var rows = 3;
var columns = 4;

var currTile; // usado como peça atual arrastada
var otherTile;

var turns = 0;

// Use caminho absoluto a partir da raiz do Live Server
const IMG_BASE = "/src/images/encaixeFormas";
// Use o total real de imagens
const TOTAL_PECAS = 12;

// Helpers
function createSlotWrapper(slotId) {
    const wrapper = document.createElement("div");
    wrapper.className = "slot-wrapper";
    wrapper.dataset.slotId = slotId;
    // Garantir sobreposição
    wrapper.style.position = "relative";
    wrapper.style.display = "inline-block";
    wrapper.style.lineHeight = "0"; // remove gaps entre inline-blocks

    // Eventos de drop no slot (alvo)
    wrapper.addEventListener("dragover", (e) => e.preventDefault());
    wrapper.addEventListener("drop", handleDropOnSlot);

    return wrapper;
}

function setupEncaixeImg(img, slotId) {
    img.draggable = false;
    img.src = `${IMG_BASE}/contornoGeometria/${slotId}.jpg`;
    img.dataset.slotId = slotId;
    img.addEventListener("error", () => {
        console.error("Imagem não encontrada:", img.src);
    });
}

function setupFormaImg(img, pieceId) {
    img.draggable = true;
    img.src = `${IMG_BASE}/formasGeometrica/${pieceId}.jpg`;
    img.dataset.pieceId = pieceId;
    img.addEventListener("error", () => {
        console.error("Imagem não encontrada:", img.src);
    });

    img.addEventListener("dragstart", function () {
        currTile = this; // peça arrastada
    });
    // Não contar tentativa no dragend; a contagem ocorre no drop errado do slot
}

function isMatch(pieceId, slotId) {
    return String(pieceId) === String(slotId);
}

function handleDropOnSlot(e) {
    e.preventDefault();
    const slotWrapper = this;
    const slotId = slotWrapper.dataset.slotId;
    const tentativas = document.getElementById("tentativas");

    // Sem peça sendo arrastada
    if (!currTile) return;

    // Slot já preenchido? Impede colocar outra peça
    if (slotWrapper.classList.contains("filled")) {
        // Conta como tentativa errada
        turns += 1;
        if (tentativas) tentativas.innerText = turns;
        return;
    }

    const pieceId = currTile.dataset.pieceId;

    // Verifica se a peça corresponde ao slot
    if (isMatch(pieceId, slotId)) {
        // Colocar a forma por cima do contorno
        placePieceOverSlot(currTile, slotWrapper);
        // Não conta tentativa em acerto
    } else {
        // Drop errado: conta tentativa, não move a peça
        turns += 1;
        if (tentativas) tentativas.innerText = turns;
    }
}

function placePieceOverSlot(pieceImg, slotWrapper) {
    // Marcar slot preenchido
    slotWrapper.classList.add("filled");

    // Manter a peça original no lugar: desabilitar e esconder, preservando o espaço
    pieceImg.draggable = false;
    pieceImg.style.visibility = "hidden";      // mantém o espaço ocupado
    pieceImg.style.pointerEvents = "none";

    // Criar um clone para exibir sobre o contorno no slot
    const clone = pieceImg.cloneNode(false);   // sem listeners de drag
    clone.style.visibility = "visible";
    clone.style.position = "absolute";
    clone.style.inset = "0";
    clone.style.width = "100%";
    clone.style.height = "100%";
    clone.style.objectFit = "contain";
    clone.style.zIndex = "2";
    clone.style.pointerEvents = "none";
    clone.draggable = false;

    slotWrapper.appendChild(clone);
}

function shuffleInPlace(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// ...existing code...
window.onload = function() {
    // Monta o board de encaixe com wrappers por slot
    const encaixe = document.getElementById("encaixe");
    for (let idx = 1; idx <= TOTAL_PECAS; idx++) {
        const wrapper = createSlotWrapper(idx);

        const contornoImg = document.createElement("img");
        setupEncaixeImg(contornoImg, idx);

        wrapper.appendChild(contornoImg);
        encaixe.appendChild(wrapper);
    }

    // Embaralhamento das formas apenas dentro de cada coluna
    // Colunas: 0..columns-1; IDs row-major: id = c+1 + r*columns
    const byCol = Array.from({ length: columns }, (_, c) => {
        const list = [];
        for (let r = 0; r < rows; r++) {
            list.push(c + 1 + r * columns);
        }
        shuffleInPlace(list); // shuffle apenas dentro da coluna
        return list;
    });

    // Montar ordem final em row-major para manter as colunas corretas visualmente
    const finalOrder = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            finalOrder.push(byCol[c][r]);
        }
    }

    // Renderizar formas
    const formas = document.getElementById("formas");
    for (const id of finalOrder) {
        const img = document.createElement("img");
        setupFormaImg(img, id);
        formas.appendChild(img);
    }
};
// DRAG TILES
function dragStart() {
    // substituído por setupFormaImg -> dragstart
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    // substituído por handleDropOnSlot
}

function dragEnd() {
    // Não utilizamos mais swap; tentativas contam apenas no drop errado no slot
}
// ...existing code...
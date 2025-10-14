const palavras = [
  {
    palavra: "amarelo",
    imagem: "../images/soletrando/amarelo.jpeg",
    audioId: "../audio/soletrando/amarelo.mp3",
  },
  {
    palavra: "vermelho",
    imagem: "../images/soletrando/vermelho.jpeg",
    audioId: "../audio/soletrando/vermelho.mp3",
  },
  {
    palavra: "azul",
    imagem: "../images/soletrando/azul.jpeg",
    audioId: "../audio/soletrando/azul.mp3",
  },
  {
    palavra: "casa",
    imagem: "../images/soletrando/casa.jpeg",
    audioId: "../audio/soletrando/casa.mp3",
  },
  {
    palavra: "carro",
    imagem: "../images/soletrando/carro.jpeg",
    audioId: "../audio/soletrando/carro.mp3",
  },
  {
    palavra: "bola",
    imagem: "../images/soletrando/bola.jpeg",
    audioId: "../audio/soletrando/bola.mp3",
  },
  {
    palavra: "mamãe",
    imagem: "../images/soletrando/mamãe.jpeg",
    audioId: "../audio/soletrando/mamãe.mp3",
  },
  {
    palavra: "papai",
    imagem: "../images/soletrando/papai.jpeg",
    audioId: "../audio/soletrando/papai.mp3",
  },
  {
    palavra: "gato",
    imagem: "../images/soletrando/gato.jpeg",
    audioId: "../audio/soletrando/gato.mp3",
  },
  {
    palavra: "cachorro",
    imagem: "../images/soletrando/cachorro.jpeg",
    audioId: "../audio/soletrando/cachorro.mp3",
  },
  {
    palavra: "peixe",
    imagem: "../images/soletrando/peixe.jpeg",
    audioId: "../audio/soletrando/peixe.mp3",
  },
  // Adicionar os outros aqui (palavras, imagens e áudios)
];

let indiceAtual = 0;
let tentativa = "";

const container = document.createElement("div");
container.classList.add("soletrando-container");

const imagem = document.createElement("img");
imagem.classList.add("soletrando-imagem");

const botoesContainer = document.createElement("div");
botoesContainer.classList.add("soletrando-letras");

const tentativaTexto = document.createElement("p");
tentativaTexto.classList.add("feedback");

document.body.querySelector(".main").after(container);
container.append(botoesContainer, tentativaTexto);

document.querySelector(".card-figure").append(imagem);
container.append(imagem);

//converte letras acentuadas para simples
function normalizarLetra(letra) {
  const mapa = {
    á: "a",
    à: "a",
    ã: "a",
    â: "a",
    é: "e",
    ê: "e",
    í: "i",
    ó: "o",
    ô: "o",
    õ: "o",
    ú: "u",
    ç: "c",
  };
  return mapa[letra] || letra;
}

function embaralharArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function iniciarRodada() {
  botoesContainer.innerHTML = "";
  tentativa = "";
  tentativaTexto.textContent = "";
  tentativaTexto.className = "feedback";

  // Remove botão de reinício se houver
  const botaoExistente = document.getElementById("botao-reiniciar");
  if (botaoExistente) botaoExistente.remove();

  if (indiceAtual >= palavras.length) {
    tentativaTexto.textContent =
      "🎉 Parabéns! Você completou todas as palavras!";
    tentativaTexto.classList.add("correto");

    // Som de vitória
    const somVitoria = new Audio("../audio/efeito-vitória.mp3");
    somVitoria.play();

    // Confete
    if (typeof confetti === "function") {
      confetti({
        particleCount: 300,
        spread: 120,
        origin: { y: 0.6 },
      });
    }

    // Esconde imagem final
    imagem.style.display = "none";
    const cardImagem = document.querySelector(".main-cards-soletrando");
    if (cardImagem) cardImagem.style.display = "none";

    // Cria botão de reinício
    const botaoReiniciar = document.createElement("button");
    botaoReiniciar.id = "botao-reiniciar";
    botaoReiniciar.textContent = "Jogar Novamente";
    botaoReiniciar.onclick = reiniciarJogo;

    // Estiliza botão diretamente no JS
    botaoReiniciar.style.position = "fixed";
    botaoReiniciar.style.top = "50%";
    botaoReiniciar.style.left = "50%";
    botaoReiniciar.style.transform = "translate(-50%, -50%)";
    botaoReiniciar.style.zIndex = "1000";
    botaoReiniciar.style.padding = "1rem 2rem";
    botaoReiniciar.style.fontSize = "1.5rem";
    botaoReiniciar.style.backgroundColor = "#5e9e63";
    botaoReiniciar.style.color = "#fff";
    botaoReiniciar.style.border = "none";
    botaoReiniciar.style.borderRadius = "12px";
    botaoReiniciar.style.cursor = "pointer";
    botaoReiniciar.style.boxShadow = "#73b369 0px 4px 30px;";

    document.body.appendChild(botaoReiniciar);
    return;
  }

  const palavraAtual = palavras[indiceAtual];
  const audio = new Audio(palavraAtual.audioId); // TOCA O ÁUDIO DA PALAVRA
  audio.play().catch((error) => {
    console.warn("Falha ao reproduzir o áudio:", error);
  });

  const cardImagem = document.querySelector(".card-img ");
  cardImagem.src = palavraAtual.imagem; // Define o caminho da imagem
  cardImagem.alt = `Imagem da palavra ${palavraAtual.palavra}`; // Texto alternativo

  // PERMITE REPRODUZIR O ÁUDIO AO CLICAR NA IMAGEM
  cardImagem.onclick = () => {
    const audioRepetir = new Audio(palavraAtual.audioId);
    audioRepetir.play();
  };

  const letras = embaralharArray(palavraAtual.palavra.split(""));

  letras.forEach((letra, index) => {
    const btn = document.createElement("button");
    btn.textContent = letra.toUpperCase();
    btn.classList.add("letra-btn");
    btn.dataset.index = index;
    btn.dataset.used = "false";

    btn.onclick = () => {
      if (
        btn.dataset.used === "false" &&
        !tentativaTexto.textContent.includes("✅")
      ) {
        tentativa += letra;
        tentativaTexto.textContent = tentativa.toUpperCase();

        // Normaliza a letra para som (ex: 'ã' -> 'a')
        const letraNormalizada = normalizarLetra(letra.toLowerCase());

        // TOCA O SOM DA LETRA NORMALIZADA
        const somLetra = new Audio(`../audio/letras/${letraNormalizada}.mp3`);
        somLetra.play().catch((error) => {
          console.warn(
            `Erro ao tocar som da letra '${letraNormalizada}':`,
            error
          );
        });

        btn.dataset.used = "true";
        btn.disabled = true;
        btn.style.opacity = "0.5";
        btn.style.transform = "scale(0.95)";

        if (tentativa.length === palavraAtual.palavra.length) {
          if (tentativa === palavraAtual.palavra) {
            // TOCA SOM DE ACERTO
            const somAcerto = new Audio("../audio/efeito_acerto.mp3");
            somAcerto.play();

            tentativaTexto.textContent = "✅ Correto! Próxima palavra...";
            tentativaTexto.classList.add("correto");
            indiceAtual++;
            setTimeout(iniciarRodada, 1500);
          } else {
            // TOCA SOM DE ERRO
            const somErro = new Audio("../audio/efeito-erro.mp3");
            somErro.play();

            tentativaTexto.textContent = "❌ Tente novamente!";
            tentativaTexto.classList.add("errado");
            setTimeout(() => {
              document.querySelectorAll(".letra-btn").forEach((b) => {
                b.disabled = false;
                b.style.opacity = "1";
                b.style.transform = "scale(1)";
                b.dataset.used = "false";
              });
              tentativa = "";
              tentativaTexto.textContent = "";
              tentativaTexto.className = "feedback";

               // TOCA O ÁUDIO DA PALAVRA NOVAMENTE APÓS O ERRO
              const audioRepetir = new Audio(palavraAtual.audioId);
              audioRepetir.play();
            }, 1500);
          }
        }
      }
    };
    botoesContainer.appendChild(btn);
  });
}
// Função para reiniciar o jogo
function reiniciarJogo() {
  indiceAtual = 0;
  tentativa = "";
  const botao = document.getElementById("botao-reiniciar");
  if (botao) botao.remove();

  const cardImagem = document.querySelector(".main-cards-soletrando");
  if (cardImagem) cardImagem.style.display = "block";
  imagem.style.display = "block";

  palavras.sort(() => 0.5 - Math.random());
  iniciarRodada();
}

// Embaralha as palavras no início
palavras.sort(() => 0.5 - Math.random());
iniciarRodada();
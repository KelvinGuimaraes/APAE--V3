// Busca usuários existentes no localStorage ou cria um array vazio
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Seleciona os campos do formulário
const nomeInput = document.getElementById("nome");
const sexoInput = document.getElementById("sexo");
const cpfInput = document.getElementById("cpf");
const idadeInput = document.getElementById("idade");
const diagnosticoInput = document.getElementById("diagnostico");
const senhaInput = document.getElementById("senha");

const btn = document.getElementById("cadastrarBtn");

btn.addEventListener("click", (e) => {
  e.preventDefault(); // evita envio real do form

  const nome = nomeInput.value.trim();
  const sexo = sexoInput.value;
  const cpf = cpfInput.value.trim();
  const idade = idadeInput.value.trim();
  const diagnostico = diagnosticoInput.value.trim();
  const senha = senhaInput.value;

  // Validação simples
  if (!nome || !sexo || !cpf || !idade || !diagnostico || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  // Verifica se o CPF já está cadastrado
  const usuarioExistente = usuarios.find((u) => u.cpf === cpf);
  if (usuarioExistente) {
    alert("CPF já cadastrado!");
    return;
  }

  // Cria o novo usuário
  const novoUsuario = { nome, sexo, cpf, idade, diagnostico, senha };

  // Salva no localStorage
  usuarios.push(novoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  // Armazena o nome para a dashboard
  sessionStorage.setItem("usuarioNome", nome);

  // Redireciona para dashboard
  window.location.href = "/dashboard.html";
});

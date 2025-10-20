// Dados mocados de usuários
const usuarios = [
  { cpf: "12345678900", senha: "1234", nome: "João" },
  { cpf: "98765432100", senha: "abcd", nome: "Maria" }
];

// Seleciona elementos do formulário
const btn = document.getElementById("entrarBtn");
const cpfInput = document.querySelector('input[placeholder*="CPF"]');
const senhaInput = document.querySelector('input[placeholder*="senha"]');

btn.addEventListener("click", (e) => {
  e.preventDefault(); // evita o envio real do form

  const cpf = cpfInput.value;
  const senha = senhaInput.value;

  // Verifica se o usuário existe
  const usuarioValido = usuarios.find(
    (u) => u.cpf === cpf && u.senha === senha
  );

  if (usuarioValido) {
    // Armazena o nome no sessionStorage para usar no dashboard
    sessionStorage.setItem("usuarioNome", usuarioValido.nome);

    // Redireciona para o dashboard
    window.location.href = "/dashboard.html";
  } else {
    alert("CPF ou senha incorretos!");
  }
});

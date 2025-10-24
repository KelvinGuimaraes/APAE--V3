const sampleProfile = {
    nome: 'Maria Clara',
    idade: 8,
    cpf: '123.456.789-00',
    diagnostico: 'Autismo grau 4',
    senha: ''
};

const sampleHistory = [
    { title: 'Jogo 1', acertos: 10, erros: 2 },
    { title: 'Jogo 2', acertos: 8, erros: 4 },
    { title: 'Jogo 3', acertos: 7, erros: 6 },
    { title: 'Jogo 4', acertos: 7, erros: 3 }
];

// Selecionando os elementos do DOM
const avatar = document.getElementById('avatar');
const childName = document.getElementById('childName');
const nomeIn = document.getElementById('nome');
const idadeIn = document.getElementById('idade');
const diagIn = document.getElementById('diagnostico');
const senhaIn = document.getElementById('senha');
const cpfIn = document.getElementById('cpf');
const editarBtn = document.getElementById('editarBtn');
const salvarBtn = document.getElementById('salvarBtn');
const cancelarBtn = document.getElementById('cancelarBtn');
const totalAcertosEl = document.getElementById('totalAcertos');
const totalErrosEl = document.getElementById('totalErros');
const historyGrid = document.getElementById('historyGrid');

function maskCPF(cpf) {
    if (!cpf) return '';
    return cpf.replace(/\d/g, '*');
}

function loadProfile() {
    const raw = sessionStorage.getItem('perfilCrianca');
    const perfil = raw ? JSON.parse(raw) : sampleProfile;

    nomeIn.value = perfil.nome || '';
    idadeIn.value = perfil.idade ?? '';
    diagIn.value = perfil.diagnostico || '';
    senhaIn.value = perfil.senha || '';
    cpfIn.value = maskCPF(perfil.cpf);

    childName.textContent = perfil.nome || 'Criança';
    avatar.textContent = (perfil.nome && perfil.nome[0]) ? perfil.nome[0].toUpperCase() : '👧';
}

function renderHistory(list) {
    historyGrid.innerHTML = '';
    let totalA = 0, totalE = 0;

    list.forEach(item => {
        const el = document.createElement('div');
        el.className = 'history-item';
        el.title = item.title;
        el.innerHTML = `
      <div style="text-align: center; line-height: 1.2;">
        <strong>${item.title}</strong>
        <div style="font-size: 15px; font-weight: normal; margin-top: 8px;">
          <span style="color: #c7f5d4;">${item.acertos} acertos</span><br>
          <span style="color: #fdd8d8;">${item.erros} erros</span>
        </div>
      </div>
    `;
        historyGrid.appendChild(el);
        totalA += item.acertos || 0;
        totalE += item.erros || 0;
    });

    totalAcertosEl.textContent = `${totalA} acertos`;
    totalErrosEl.textContent = `${totalE} erros`;
}

function setEditing(editing) {
    nomeIn.disabled = !editing;
    idadeIn.disabled = !editing;
    diagIn.disabled = !editing;
    senhaIn.disabled = !editing;
    cpfIn.disabled = true;

    salvarBtn.style.display = editing ? 'inline-block' : 'none';
    cancelarBtn.style.display = editing ? 'inline-block' : 'none';
    editarBtn.style.display = editing ? 'none' : 'inline-block';
}

// --- INICIALIZAÇÃO E EVENTOS ---

document.addEventListener('DOMContentLoaded', () => {
    loadProfile();

    const rawHist = sessionStorage.getItem('historicoJogos');
    let hist = rawHist ? JSON.parse(rawHist) : sampleHistory;
    if (Array.isArray(hist) && hist.length === 0) {
        hist = sampleHistory;
    }
    renderHistory(hist);

    editarBtn.addEventListener('click', () => setEditing(true));

    cancelarBtn.addEventListener('click', () => {
        loadProfile();
        setEditing(false);
    });

    document.getElementById('cadastroForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const perfil = {
            nome: nomeIn.value.trim(),
            idade: Number(idadeIn.value) || 0,
            cpf: sampleProfile.cpf,
            diagnostico: diagIn.value.trim(),
            senha: senhaIn.value
        };
        sessionStorage.setItem('perfilCrianca', JSON.stringify(perfil));
        loadProfile();
        setEditing(false);
        alert('Dados salvos com sucesso.');
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const toggleMenu = document.getElementById("toggleMenu");

  toggleMenu.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  const btnSair = document.getElementById("btnSair");
  btnSair.addEventListener("click", () => {
    if (confirm("Deseja sair?")) {
      window.location.href = "index.html";
    }
  });
});

import itemClick from './ItemOpen.js';
const api = 'https://api.github.com/repos/hygorqc/instagram-dio/issues';

async function buscarIssues(api) {
  const dados = await fetch(api);
  const dadosJson = await dados.json();
  imprimirDados(dadosJson);
}
const itemTela = document.querySelector('.publicacoes');
function imprimirDados(dados) {
  dados.forEach((item) => {
    const link = document.createElement('a');
    link.classList.add('publi-item');
    link.setAttribute('data-number', item.number);
    link.href = '#';

    link.innerHTML = `
          <h3>${item.title}</h3>
          <div class="infos">
            <span class="autor">
              <img src="${item.user.avatar_url}" alt="">
              <p>${item.user.login}</p>
            </span>
            <span class="data">${new Date(item.created_at).toLocaleString(
              'pt-BR',
              {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              },
            )}</span>
          </div>
        `;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      itemClick(event, api);
    });

    // Adicionando o <a> na div .publicacoes
    itemTela.appendChild(link);
  });
  console.log(dados);
}

buscarIssues(api);

function alternarTema() {
  const corpo = document.body;
  const dark = document.querySelector('.dark');
  const light = document.querySelector('.light');
  // Se o tema escuro estiver ativo, troca para o claro e vice-versa
  corpo.classList.toggle('tema-escuro');
  dark.classList.toggle('ativo');
  light.classList.toggle('ativo');
  // Armazenar a preferência do tema no localStorage
  if (corpo.classList.contains('tema-escuro')) {
    localStorage.setItem('tema', 'escuro');
  } else {
    localStorage.setItem('tema', 'claro');
  }
}

// Verificar o tema armazenado no localStorage
function verificarTema() {
  const dark = document.querySelector('.dark');
  const light = document.querySelector('.light');
  const tema = localStorage.getItem('tema');
  if (tema === 'escuro') {
    document.body.classList.add('tema-escuro');
    light.classList.remove('ativo');
    dark.classList.add('ativo');
  } else {
    document.body.classList.remove('tema-escuro');
    dark.classList.remove('ativo');
    light.classList.add('ativo');
  }
}
verificarTema();

// Adicionando o evento para alternar tema (por exemplo, um botão para trocar o tema)
const botaoAlternar = document.getElementById('botao-tema');
if (botaoAlternar) {
  botaoAlternar.addEventListener('click', alternarTema);
}

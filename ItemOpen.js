const exibir = document.querySelector('main');

async function itemClick(event, apiBase) {
  event.preventDefault();

  const target = event.currentTarget;
  const issueNumber = target.getAttribute('data-number');
  const apiUrl = `${apiBase}/${issueNumber}`;

  try {
    const resposta = await fetch(apiUrl);
    if (!resposta.ok) throw new Error('Erro ao buscar os detalhes da issue.');

    const dados = await resposta.json();

    // Criar a seção para exibir a issue
    exibir.innerHTML = `
      <section class="issue-detalhe container">
      <div class="issue-info"><button id="voltar">← Voltar</button>
        <span class="data">Atualizado em: ${new Date(
          dados.updated_at,
        ).toLocaleString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}</span></div>
        
        <section>${dados.body}</section>
        
        <div class="infos-post">
          <span class="autor">
            <img src="${dados.user.avatar_url}" alt="">
            <p>${dados.user.login}</p>
          </span>
          <span class="data">${new Date(dados.created_at).toLocaleString(
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
      </section>
    `;

    // Adicionando evento ao botão de voltar
    document.getElementById('voltar').addEventListener('click', () => {
      location.reload(); // Recarrega a página para voltar à lista
    });
  } catch (erro) {
    console.error('Erro ao buscar detalhes:', erro);
    exibir.innerHTML = `<p>Erro ao carregar detalhes da issue.</p>`;
  }
}

export default itemClick;

// Lista de chamados
const chamados = [];

// Alternar entre as seções
function mostrarSecao(secao, botao) {
    document.querySelectorAll('.secao').forEach(s => s.classList.remove('ativa'));
    document.getElementById('secao-' + secao).classList.add('ativa');

    document.querySelectorAll('.menu button').forEach(b => b.classList.remove('ativo'));
    botao.classList.add('ativo');

    if (secao === 'lista') renderizarLista();
    if (secao === 'pesquisa') {
        document.getElementById('resultado-busca').innerHTML = '';
        document.getElementById('termo-busca').value = '';
    }
}

// Mostrar ou esconder o campo de categoria personalizada
function verificarCategoriaOutro() {
    const categoria = document.getElementById('categoria').value;
    const grupoOutro = document.getElementById('grupo-categoria-outro');
    const inputOutro = document.getElementById('categoria-outro');

    if (categoria === 'outro') {
        grupoOutro.style.display = 'block';
        inputOutro.focus();
    } else {
        grupoOutro.style.display = 'none';
        inputOutro.value = '';
    }
}

// Formatar data no padrão dd/mm/aaaa hh:mm
function formatarData() {
    const agora = new Date();
    const dia = String(agora.getDate()).padStart(2, '0');
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const ano = agora.getFullYear();
    const hora = String(agora.getHours()).padStart(2, '0');
    const minuto = String(agora.getMinutes()).padStart(2, '0');
    return `${dia}/${mes}/${ano} ${hora}:${minuto}`;
}

// Exibir mensagem
function exibirMensagem(elemento, texto, tipo) {
    elemento.textContent = texto;
    elemento.className = 'mensagem ' + tipo;
    setTimeout(() => {
        elemento.className = 'mensagem';
        elemento.textContent = '';
    }, 3000);
}

// Cadastrar chamado
function cadastrarChamado() {
    const titulo = document.getElementById('titulo').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
    const prioridade = document.getElementById('prioridade').value;
    const categoriaSelecionada = document.getElementById('categoria').value;
    const categoriaOutro = document.getElementById('categoria-outro').value.trim();
    const msg = document.getElementById('mensagem-cadastro');

    // Validações
    if (!titulo) {
        exibirMensagem(msg, 'O título é obrigatório.', 'erro');
        return;
    }
    if (!descricao) {
        exibirMensagem(msg, 'A descrição é obrigatória.', 'erro');
        return;
    }
    if (!prioridade) {
        exibirMensagem(msg, 'Selecione uma prioridade válida.', 'erro');
        return;
    }
    if (!categoriaSelecionada) {
        exibirMensagem(msg, 'Selecione uma categoria válida.', 'erro');
        return;
    }
    if (categoriaSelecionada === 'outro' && !categoriaOutro) {
        exibirMensagem(msg, 'Digite a categoria personalizada.', 'erro');
        return;
    }

    // Define a categoria final
    let categoriaFinal;
    let categoriaEhOutro = false;

    if (categoriaSelecionada === 'outro') {
        categoriaFinal = categoriaOutro;
        categoriaEhOutro = true;
    } else {
        categoriaFinal = categoriaSelecionada;
    }

    const chamadoInfo = {
        titulo: titulo,
        descricao: descricao,
        prioridade: prioridade,
        categoria: categoriaFinal,
        categoriaEhOutro: categoriaEhOutro,
        status: 'Aberto',
        data_abertura: formatarData()
    };

    chamados.push(chamadoInfo);
    exibirMensagem(msg, 'Chamado cadastrado com sucesso! :-)', 'sucesso');

    // Limpar formulário
    document.getElementById('titulo').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('prioridade').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('categoria-outro').value = '';
    document.getElementById('grupo-categoria-outro').style.display = 'none';
}

// Criar HTML de um chamado
function criarHtmlChamado(chamado, index) {
    const classeCategoria = chamado.categoriaEhOutro ? 'categoria-outro' : 'categoria';
    const sufixoOutro = chamado.categoriaEhOutro ? ' (outro)' : '';

    return `
        <div class="chamado ${chamado.prioridade}">
            <h3>${index}. ${escapeHtml(chamado.titulo)}</h3>
            <p><strong>Descrição:</strong> ${escapeHtml(chamado.descricao)}</p>
            <p><strong>Data de abertura:</strong> ${chamado.data_abertura}</p>
            <div class="tags">
                <span class="tag prioridade-${chamado.prioridade}">${chamado.prioridade}</span>
                <span class="tag ${classeCategoria}">${escapeHtml(chamado.categoria)}${sufixoOutro}</span>
                <span class="tag status">${chamado.status}</span>
            </div>
        </div>
    `;
}

// Escapar HTML para evitar XSS
function escapeHtml(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

// Renderizar lista
function renderizarLista() {
    const container = document.getElementById('lista-chamados');
    if (chamados.length === 0) {
        container.innerHTML = '<p class="vazio">Nenhum chamado cadastrado.</p>';
        return;
    }
    container.innerHTML = chamados
        .map((c, i) => criarHtmlChamado(c, i + 1))
        .join('');
}

// Pesquisar chamado
function pesquisarChamado() {
    const termo = document.getElementById('termo-busca').value.trim().toLowerCase();
    const container = document.getElementById('resultado-busca');

    if (!termo) {
        container.innerHTML = '<p class="vazio">Digite um termo para buscar.</p>';
        return;
    }

    const encontrados = chamados.filter(c =>
        c.titulo.toLowerCase().includes(termo) ||
        c.descricao.toLowerCase().includes(termo) ||
        c.categoria.toLowerCase().includes(termo)
    );

    if (encontrados.length === 0) {
        container.innerHTML = '<p class="vazio">Nenhum chamado encontrado com esse termo.</p>';
        return;
    }

    container.innerHTML = `
        <p style="margin-bottom:15px;color:#1e3c72;font-weight:600;">
            ${encontrados.length} chamado(s) encontrado(s):
        </p>
        ${encontrados.map((c, i) => criarHtmlChamado(c, i + 1)).join('')}
    `;
}

// Permitir busca com Enter
document.getElementById('termo-busca').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') pesquisarChamado();
});

// Permitir cadastro com Enter nos inputs (exceto textarea)
['titulo', 'prioridade', 'categoria', 'categoria-outro'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') cadastrarChamado();
        });
    }
});

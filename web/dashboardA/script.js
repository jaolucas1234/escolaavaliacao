function verificarLogin() {
    const professorLogado = localStorage.getItem('professorLogado');
    
    if (!professorLogado) {
        window.location.href = '../login/index.html';
        return null;
    }
    
    return JSON.parse(professorLogado);
}

function obterTurmaSelecionada() {
    const turmaData = localStorage.getItem('turmaSelecionada');
    if (!turmaData) {
        window.location.href = '../dashboardP/index.html';
        return null;
    }
    return JSON.parse(turmaData);
}

function carregarDadosTurma() {
    const professor = verificarLogin();
    const turma = obterTurmaSelecionada();
    
    if (!professor || !turma) return;
    
    document.getElementById('nomeProfessor').textContent = professor.nome;
    document.getElementById('serieTurma').textContent = `TURMA: ${turma.nome}`;
    console.log('Turma carregada:', turma);
    buscarAtividadesTurma(turma.id);
}

function buscarAtividadesTurma(turmaId) {
    fetch(`http://localhost:3001/atividades/${turmaId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar atividades');
            }
            return response.json();
        })
        .then(atividades => {
            preencherTabelaAtividades(atividades);
        })
        .catch(error => {
            console.error('Erro ao buscar atividades:', error);
            preencherTabelaAtividades([]);
        });
}

function preencherTabelaAtividades(atividades) {
    const tabelaAtividadesElement = document.getElementById('tabelaAtividades');
    
    tabelaAtividadesElement.innerHTML = '';
    
    atividades.forEach((atividade, index) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${index + 1}</td>
            <td>${atividade.descricao}</td>
        `;
        tabelaAtividadesElement.appendChild(linha);
    });
}

function fazerLogout() {
    localStorage.removeItem('turmaSelecionada');
    window.location.href = '../dashboardP/index.html';
}

function abrirModal() {
    document.getElementById('modalOverlay').classList.add('mostrar');
}

function fecharModal() {
    document.getElementById('modalOverlay').classList.remove('mostrar');
    document.getElementById('descricaoAtividade').value = '';
}

function cadastrarAtividade() {
    const professor = verificarLogin();
    const turma = obterTurmaSelecionada();
    
    if (!professor || !turma) return;
    
    const descricaoAtividade = document.getElementById('descricaoAtividade').value.trim();
    
    if (descricaoAtividade) {
        fetch('http://localhost:3001/atividades', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                descricao: descricaoAtividade,
                turmaId: turma.id
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao cadastrar atividade');
            }
            return response.json();
        })
        .then(novaAtividade => {
            alert('Atividade cadastrada com sucesso!');
            fecharModal();
            buscarAtividadesTurma(turma.id);
        })
        .catch(error => {
            alert('Erro ao cadastrar atividade: ' + error.message);
        });
    } else {
        alert('Preencha todos os campos!');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    carregarDadosTurma();
    
    document.querySelector('.cadastrar-btn').addEventListener('click', abrirModal);
    document.getElementById('cancelarBtn').addEventListener('click', fecharModal);
    document.getElementById('cadastrarModalBtn').addEventListener('click', cadastrarAtividade);
    
    document.querySelector('.sair-btn').addEventListener('click', function(e) {
        e.preventDefault();
        fazerLogout();
    });
});

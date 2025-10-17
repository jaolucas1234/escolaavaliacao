function verificarLogin() {
    const professorLogado = localStorage.getItem('professorLogado');
    
    if (!professorLogado) {
        window.location.href = '../login/index.html';
        return null;
    }
    
    return JSON.parse(professorLogado);
}

function carregarDadosProfessor() {
    const professor = verificarLogin();
    
    if (!professor) return;
    
    document.getElementById('nomeProfessor').textContent = professor.nome;
    
    buscarTurmasProfessor(professor.id);
}

function buscarTurmasProfessor(professorId) {
    fetch(`http://localhost:3001/turmas/${professorId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar turmas');
            }
            return response.json();
        })
        .then(turmas => {
            preencherTabelaTurmas(turmas);
        })
        .catch(error => {
            console.error('Erro ao buscar turmas:', error);
            alert('Erro ao carregar turmas');
        });
}

function preencherTabelaTurmas(turmas) {
    const tabelaTurmasElement = document.getElementById('tabelaTurmas');
    
    tabelaTurmasElement.innerHTML = '';
    
    turmas.forEach((turma, index) => {
        const linha = document.createElement('tr');
        
        const tdNumero = document.createElement('td');
        tdNumero.textContent = index + 1;
        
        const tdNome = document.createElement('td');
        tdNome.textContent = turma.serie;
        
        const tdAcoes = document.createElement('td');
        tdAcoes.className = 'acoes';
        
        const excluirBtn = document.createElement('button');
        excluirBtn.className = 'excluir-btn';
        excluirBtn.textContent = 'Excluir';
        excluirBtn.setAttribute('data-id', turma.id);
        
        const visualizarBtn = document.createElement('button');
        visualizarBtn.className = 'visualizar-btn';
        visualizarBtn.textContent = 'Visualizar';
        visualizarBtn.setAttribute('data-id', turma.id);
        visualizarBtn.setAttribute('data-nome', turma.serie);
        
        tdAcoes.appendChild(excluirBtn);
        tdAcoes.appendChild(visualizarBtn);
        
        linha.appendChild(tdNumero);
        linha.appendChild(tdNome);
        linha.appendChild(tdAcoes);
        
        tabelaTurmasElement.appendChild(linha);
    });
}

function fazerLogout() {
    localStorage.removeItem('professorLogado');
    localStorage.removeItem('turmaSelecionada');
    window.location.href = '../login/index.html';
}

function abrirModal() {
    document.getElementById('modalOverlay').classList.add('mostrar');
}

function fecharModal() {
    document.getElementById('modalOverlay').classList.remove('mostrar');
    document.getElementById('serieTurma').value = '';
}

function cadastrarTurma() {
    const professor = verificarLogin();
    if (!professor) return;
    
    const serieTurma = document.getElementById('serieTurma').value;
    
    if (serieTurma) {
        fetch('http://localhost:3001/turmas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                serie: serieTurma,
                professorId: professor.id
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao cadastrar turma');
            }
            return response.json();
        })
        .then(novaTurma => {
            alert('Turma cadastrada com sucesso!');
            fecharModal();
            buscarTurmasProfessor(professor.id);
        })
        .catch(error => {
            alert('Erro ao cadastrar turma: ' + error.message);
        });
    } else {
        alert('Preencha todos os campos!');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    carregarDadosProfessor();
    
    document.querySelector('.cadastrar-btn').addEventListener('click', abrirModal);
    document.getElementById('cancelarBtn').addEventListener('click', fecharModal);
    document.getElementById('cadastrarModalBtn').addEventListener('click', cadastrarTurma);
    
    document.querySelector('.sair-btn').addEventListener('click', function(e) {
        e.preventDefault();
        fazerLogout();
    });
    
    document.getElementById('tabelaTurmas').addEventListener('click', function(e) {
        const professor = verificarLogin();
        if (!professor) return;
        
        if (e.target.classList.contains('excluir-btn')) {
            const turmaId = e.target.getAttribute('data-id');
            if (confirm('Tem certeza que deseja excluir esta turma?')) {
                fetch(`http://localhost:3001/turmas/${turmaId}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao excluir turma');
                    }
                    alert('Turma excluída com sucesso!');
                    buscarTurmasProfessor(professor.id);
                })
                .catch(error => {
                    alert('Erro ao excluir turma: ' + error.message);
                });
            }
        }
        
        if (e.target.classList.contains('visualizar-btn')) {
            const turmaId = e.target.getAttribute('data-id');
            const turmaNome = e.target.getAttribute('data-nome');
            
            localStorage.setItem('turmaSelecionada', JSON.stringify({
                id: Number(turmaId),
                nome: turmaNome
            }));
            
            window.location.href = '../dashboardA/index.html';
        }
    });
});
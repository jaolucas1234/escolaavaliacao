function fazerLogin(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (!email || !senha) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Credenciais inválidas');
        }
        return response.json();
    })
    .then(data => {
        console.log('Resposta completa da API:', data);
        
        // Usando a estrutura correta da API
        if (data.id_professor) {
            // Salvar dados no localStorage
            localStorage.setItem('professorLogado', JSON.stringify({
                id: data.id_professor,  
                nome: data.nome,
                email: data.email
            }));
            
            alert('Login realizado com sucesso!');
            window.location.href = '../dashboardP/index.html';
        } else {
            console.error('Estrutura inesperada:', data);
            alert('Erro: Estrutura de resposta inesperada da API');
        }
    })
    .catch(error => {
        alert('Email ou senha incorretos!');
        console.error('Erro:', error);
    });
}

// Adicionar evento ao formulário
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', fazerLogin);
    }
});
# Sistema de Gerenciamento de Turmas e Atividades

## Objetivo
Sistema web full-stack para professores registrarem, visualizarem e gerenciarem suas turmas e atividades de forma organizada.

## Contexto
A ausência de controle das atividades aplicadas pode comprometer o acompanhamento do conhecimento já trabalhado.
Em escolas de regiões remotas do Brasil, a falta de sistemas estruturados prejudica estudantes, docentes e o processo educacional.

## Funcionalidades

- Login seguro de professores

- Cadastro, listagem e exclusão de turmas

- Registro de atividades associadas às turmas

- Logout seguro

- Requisitos de Infraestrutura

- Banco de Dados

- SGBD: MySQL

## Versão recomendada: 8.0 ou superior

- Observação: Criar um banco de dados exclusivo com usuário e senha

- Servidor / Sistema Operacional

- SO: Windows 10/11 ou Linux Ubuntu 20.04+

- Servidor de aplicação: Node.js

- Versão recomendada: 18 ou superior

## Linguagens e Frameworks

- Back-end: JavaScript (Node.js, Express, Prisma ORM)

- Front-end: HTML e CSS

- Banco de Dados: MySQL

## Instalação e Teste

### Clonar o Repositório

``` git clone https://github.com/jaolucas1234/escolaavaliacao.git ``` 
``` cd escolaavaliacao ```

### Instalar Dependências
``` npm install ```

### Configurar Banco de Dados

- Crie um banco MySQL exclusivo para o projeto

- Configure usuário e senha no arquivo ``` .env ``` :
``` DATABASE_URL="mysql://root@localhost:3306/nome_do_banco" ```

### Executar Migrations
``` npx prisma migrate dev --name init ```

### Iniciar o Servidor
``` npm run dev ```
O servidor estará disponível em: ``` http://localhost:3001```

### Testar Funcionalidades

- Acesse pelo navegador ou utilize Insomnia/Postman

- Funcionalidades a testar:

- Cadastro, listagem e exclusão de turmas

- Cadastro e listagem de atividades

- Login e logout de professores

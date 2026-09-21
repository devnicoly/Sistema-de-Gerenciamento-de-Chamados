# Sistema de Gerenciamento de Chamados

[ Português ](#português) | [ English ](#english)

---

<a name="português"></a>
## Português

Projeto pessoal desenvolvido em HTML, CSS e JavaScript que implementa um **Sistema de Gerenciamento de Chamados de TI** (help desk). O programa exibe uma interface web com abas interativas para cadastrar, listar e pesquisar chamados de suporte técnico.

---

### O que é o Sistema de Gerenciamento de Chamados de TI?

É uma aplicação web que simula o fluxo básico de um service desk. O usuário pode abrir chamados informando título, descrição, prioridade e categoria, além de consultar todos os chamados cadastrados e pesquisá-los por palavras-chave.

Cada chamado possui:

- **Título**: resumo do problema.
- **Descrição**: detalhamento do ocorrido.
- **Prioridade**: alta, média ou baixa.
- **Categoria**: hardware, software, rede, e-mail, impressora ou acesso.
- **Status**: inicia automaticamente como "Aberto".
- **Data de abertura**: gerada automaticamente no formato `dd/mm/aaaa hh:mm`.

---

### Estrutura do projeto

O projeto é composto por três arquivos:

- **index.html**: Estrutura da página web.
- **style.css**: Estilização e responsividade.
- **script.js**: Lógica de negócio e manipulação do DOM.

---

### Como funciona

1. O programa exibe uma **interface** com três abas principais:
   - `Novo Chamado`
   - `Lista de Chamados`
   - `Pesquisar`
2. Na aba **Novo Chamado**, o usuário:
   - Informa título e descrição.
   - Seleciona prioridade e categoria.
   - Clica em "Cadastrar Chamado".
   - O sistema valida os campos e exibe uma mensagem de sucesso.
3. Na aba **Lista de Chamados**, todos os chamados cadastrados são exibidos em cards, com cor de borda conforme a prioridade.
4. Na aba **Pesquisar**, o usuário digita um termo e o sistema filtra os chamados por título ou descrição.
5. O sistema previne injeção de HTML/XSS ao renderizar dados do usuário.

---

### Como executar

#### Pré-requisitos

- Um navegador moderno (Chrome, Firefox, Edge, Safari).
- Opcionalmente, um servidor local (Python ou Node.js).

#### Executar diretamente

Abra o arquivo `index.html` com duplo clique.

#### Executar com servidor local

```bash
# Com Python 3
python -m http.server 8000

# Com Node.js
npx http-server
```

Acesse: http://localhost:8000

---

### Exemplo de uso

Ao abrir o sistema e cadastrar um chamado:

```
Título: Computador não liga
Descrição: O computador da recepção não liga após queda de energia.
Prioridade: alta
Categoria: hardware

Chamado cadastrado com sucesso!
```

Na lista, o chamado aparece com borda vermelha (prioridade alta) e as tags:

```
1. Computador não liga
   Descrição: O computador da recepção não liga após queda de energia.
   Data de abertura: 15/01/2025 09:32
   [ALTA] [HARDWARE] [ABERTO]
```

---

### Explicação do código

O código está organizado em funções principais:

- **`mostrarSecao`**: Alterna entre as abas Novo, Lista e Pesquisar.
- **`cadastrarChamado`**: Valida e adiciona um novo chamado ao array.
- **`renderizarLista`**: Renderiza todos os chamados na seção Lista.
- **`pesquisarChamado`**: Filtra chamados por termo de busca.
- **`criarHtmlChamado`**: Gera o HTML de um card de chamado.
- **`formatarData`**: Retorna a data atual no formato `dd/mm/aaaa hh:mm`.
- **`escapeHtml`**: Previne injeção de HTML/XSS.
- **`exibirMensagem`**: Mostra mensagens de sucesso ou erro temporárias.

---

### Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (vanilla, sem bibliotecas externas)

---

### Melhorias futuras

- Adicionar persistência dos dados com localStorage.
- Permitir alteração de status (Aberto, Em andamento, Fechado).
- Adicionar edição e exclusão de chamados.
- Criar filtros por prioridade, categoria ou status.
- Adicionar ordenação por data ou prioridade.
- Implementar backend com Node.js/Express e banco de dados.
- Adicionar autenticação de usuários.
- Criar dashboard com estatísticas e gráficos.

---

### Autora

Desenvolvido por Nicoly Alves dos Santos.

LinkedIn: https://www.linkedin.com/in/devnicoly  
GitHub: https://github.com/devnicoly

---

### Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, estudar e modificar.

---

<a name="english"></a>
## English

Personal project developed in HTML, CSS, and JavaScript that implements an **IT Ticket Management System** (help desk). The program displays a web interface with interactive tabs to register, list, and search IT support tickets.

---

### What is the IT Ticket Management System?

It is a web application that simulates the basic flow of a service desk. The user can open tickets providing a title, description, priority, and category, as well as view all registered tickets and search them by keywords.

Each ticket has:

- **Title**: summary of the issue.
- **Description**: detailed explanation of what happened.
- **Priority**: high, medium, or low.
- **Category**: hardware, software, network, e-mail, printer, or access.
- **Status**: automatically starts as "Open".
- **Opening date**: automatically generated in the format `dd/mm/yyyy hh:mm`.

---

### Project structure

The project consists of three files:

- **index.html**: Web page structure.
- **style.css**: Styling and responsiveness.
- **script.js**: Business logic and DOM manipulation.

---

### How it works

1. The program displays an **interface** with three main tabs:
   - `New Ticket`
   - `Ticket List`
   - `Search`
2. In the **New Ticket** tab, the user:
   - Enters title and description.
   - Selects priority and category.
   - Clicks "Register Ticket".
   - The system validates the fields and displays a success message.
3. In the **Ticket List** tab, all registered tickets are displayed as cards, with border color based on priority.
4. In the **Search** tab, the user types a term and the system filters tickets by title or description.
5. The system prevents HTML/XSS injection when rendering user data.

---

### How to run

#### Requirements

- A modern browser (Chrome, Firefox, Edge, Safari).
- Optionally, a local server (Python or Node.js).

#### Run directly

Open the `index.html` file by double-clicking it.

#### Run with a local server

```bash
# With Python 3
python -m http.server 8000

# With Node.js
npx http-server
```

Access: http://localhost:8000

---

### Usage example

When opening the system and registering a ticket:

```
Title: Computer won't turn on
Description: The front desk computer won't turn on after a power outage.
Priority: high
Category: hardware

Ticket registered successfully!
```

In the list, the ticket appears with a red border (high priority) and the tags:

```
1. Computer won't turn on
   Description: The front desk computer won't turn on after a power outage.
   Opening date: 01/15/2025 09:32
   [HIGH] [HARDWARE] [OPEN]
```

---

### Code explanation

The code is organized into main functions:

- **`mostrarSecao`**: Switches between the New, List, and Search tabs.
- **`cadastrarChamado`**: Validates and adds a new ticket to the array.
- **`renderizarLista`**: Renders all tickets in the List section.
- **`pesquisarChamado`**: Filters tickets by search term.
- **`criarHtmlChamado`**: Generates the HTML of a ticket card.
- **`formatarData`**: Returns the current date in the format `dd/mm/yyyy hh:mm`.
- **`escapeHtml`**: Prevents HTML/XSS injection.
- **`exibirMensagem`**: Shows temporary success or error messages.

---

### Technologies used

- HTML5
- CSS3
- JavaScript (vanilla, no external libraries)

---

### Future improvements

- Add data persistence with localStorage.
- Allow status changes (Open, In Progress, Closed).
- Add ticket editing and deletion.
- Create filters by priority, category, or status.
- Add sorting by date or priority.
- Implement backend with Node.js/Express and database.
- Add user authentication.
- Create dashboard with statistics and charts.

---

### Author

Developed by Nicoly Alves dos Santos.

LinkedIn: https://www.linkedin.com/in/devnicoly  
GitHub: https://github.com/devnicoly

---

### License

This project is licensed under the MIT License. Feel free to use, study, and modify it.

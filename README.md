# 🎬 Exclusiflix: Biblioteca de Filmes

Projeto Integrador desenvolvido para a avaliação das Unidades I e II da disciplina **Front-End Frameworks (2026.2)**.

---

## 10.1. Nome do Projeto
**Exclusiflix: Biblioteca de Filmes** *(Cenário D: Biblioteca de filmes)*

---

## 10.2. Integrantes
- **Ronald Eli** — GitHub: [@ronaldeli](https://github.com/ronaldeli)
- **Ittalo Henrique** — GitHub: [@Ittalohsilva](https://github.com/Ittalohsilva)
- **Cleberson Murilo** — GitHub: [@Cleberson7-devs](https://github.com/Cleberson7-devs)
- **Victor Matheus** — GitHub: [@Victor98](https://github.com/Victor98)
- **Vinicius Queiroz** — GitHub: [@ViniciusQueiroz18](https://github.com/ViniciusQueiroz18)

---

## 10.3. Descrição do Projeto, Público-Alvo, Necessidades e Alternativas

### 🎯 Visão Geral
O projeto consiste em uma aplicação web interativa que funciona como um catálogo e organizador pessoal de filmes. 

- **Problema:** A dificuldade de amantes de cinema e usuários casuais em organizarem os filmes que desejam assistir, registrarem os que já viram e acompanharem contagens regressivas de lançamentos futuros de forma simples e sem a necessidade de criar contas ou efetuar logins.
- **Proposta:** Uma interface leve, acessível e responsiva que permite navegar por uma coleção pré-carregada de 14 obras cinematográficas, pesquisar, filtrar, favoritar, atribuir notas de 1 a 5 estrelas e gerenciar sua própria lista de filmes com persistência de dados local.

### 👥 Público-Alvo / Usuários
Estudantes, cinéfilos, entusiastas de cinema e público em geral que buscam uma ferramenta intuitiva, privada e ágil para organização pessoal de filmes, sem burocracia de cadastros ou conexões externas obrigatórias.

### 💡 Necessidades Identificadas
- **Organização Pessoal:** Acompanhar filmes assistidos, favoritos e lançamentos futuros.
- **Avaliação e Memória:** Registrar notas de 1 a 5 estrelas com opção de remoção/alteração simples.
- **Pesquisa e Filtro Ágil:** Encontrar rapidamente títulos ou diretores sem se preocupar com acentuação ou letras maiúsculas.
- **Privacidade e Funcionamento Offline:** Ter todos os dados salvos no próprio dispositivo (`localStorage`), funcionando sem depender de servidores back-end.

### 🔄 Alternativas Considerando o Cenário
- **Planilhas (Excel / Google Sheets):** Úteis para listas, mas carecem de apelo visual, cartões interativos, estrelas de avaliação e cálculo automático de dias para estreia.
- **Plataformas com Rede Social (Letterboxd / Trakt):** Exigem criação de conta, login e conexão constante à internet, além de apresentarem interfaces poluídas.
- **APIs Externas (ex: TMDB):** Alternativa interessante, porém descartada na versão atual para priorizar leveza, autonomia offline e foco no aprendizado de manipulação pura do DOM e `localStorage`.

---

## 10.4. Funcionalidades
- **Navegação por Abas:** Exibição de Todos os filmes, Próximos Lançamentos (com cálculo de dias até a estreia), Favoritos e Assistidos.
- **Busca Tolerante a Acentos:** Pesquisa em tempo real por título ou diretor, insensível a maiúsculas/minúsculas e acentos gráficos (`normalize('NFD')`).
- **Filtros e Ordenação:** Filtro por gêneros (Ação, Crime, Drama, Ficção Científica, etc.) e ordenação por data de lançamento (mais recente/antigo), ordem alfabética (A–Z) e avaliação do usuário.
- **Gerenciamento de Estado do Usuário:** Favoritar filmes, marcar/desmarcar como visto e atribuição de notas (1 a 5 estrelas) com atualização automática de estatísticas no painel dinâmico.
- **Cadastro, Edição e Exclusão:** Formulário via janela modal nativa (`<dialog>`) para inserção/edição de filmes cadastrados pelo usuário, com validação de campos e bloqueio de títulos duplicados.
- **Persistência de Dados:** Salvamento automático de novos filmes, notas e marcações no `localStorage` do navegador.

---

## 10.5. Tecnologias Utilizadas
- **HTML5:** Estrutura semântica, elementos de acessibilidade ARIA e janela modal nativa `<dialog>`.
- **CSS3:** Estilização responsiva, CSS Grid, Flexbox e Variáveis CSS (design tokens) para tema escuro.
- **JavaScript (ES6+):** Manipulação dinâmica do DOM, gestão de eventos, manipulação de datas sem erro de fuso e comunicação com `localStorage`.
- **Git & GitHub:** Versionamento do código-fonte, trabalho em equipe com branches e controle de histórico de commits.

---

## 10.6. Estrutura do Projeto
A organização dos diretórios e arquivos do repositório segue o padrão abaixo:

```text
Exclusiflix/
├── index.html        # Estrutura principal da página, filtros e janelas modais
├── README.md         # Documentação e relatório oficial do projeto integrador
├── css/
│   └── style.css     # Estilização visual, variáveis CSS e responsividade
└── js/
    └── script.js     # Lógica da aplicação, estado, filtros, datas e localStorage
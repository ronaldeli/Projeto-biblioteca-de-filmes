<div align="center">

# 🎬 Biblioteca de Filmes

**Sua biblioteca pessoal de filmes: pesquise, avalie, favorite e acompanhe o que já assistiu.**

</div>

---

## 📖 Sobre o projeto

A **Biblioteca de Filmes** é uma aplicação web que funciona como um catálogo pessoal de filmes. Ela já vem com **14 filmes clássicos e recentes** (de *O Poderoso Chefão* a *Oppenheimer*, incluindo produções brasileiras como *Central do Brasil*, *Cidade de Deus* e *Tropa de Elite*) e permite que o usuário **cadastre os próprios filmes**, marque favoritos, registre o que já assistiu e dê notas de 1 a 5 estrelas.

Foi desenvolvida **somente com HTML, CSS e JavaScript puro**, sem frameworks, bibliotecas ou back-end, com o objetivo de praticar os fundamentos da web: manipulação do DOM, eventos, organização de estado, persistência de dados e design responsivo.


## ✨ Funcionalidades

### 🔎 Explorar a biblioteca
- **Busca por título ou diretor**, em tempo real e **sem diferenciar acentos** (buscar "acao" encontra "Ação").
- **Filtro por gênero**: Ação, Animação, Aventura, Comédia, Crime, Drama, Ficção científica, Suspense e Terror.
- **Ordenação** por mais recentes, mais antigos, título (A–Z) ou melhor nota.
- **Abas de navegação**: Todos, Favoritos, Assistidos e Próximos lançamentos.
- **Painel de resumo** com o total de filmes, assistidos, favoritos e filmes por estrear.

### ⭐ Acompanhar o que você assistiu
- **Favoritar** filmes com um clique.
- **Marcar como assistido** ou desmarcar.
- **Avaliar de 1 a 5 estrelas.** Ao dar uma nota, o filme é marcado automaticamente como assistido, e clicar na mesma nota de novo limpa a avaliação.

### ➕ Montar a sua coleção
- **Cadastrar novos filmes** com título, direção, gênero, data de lançamento, duração e sinopse.
- **Editar e remover** os filmes que você mesmo cadastrou (os filmes originais ficam protegidos).
- **Validação do formulário**, incluindo bloqueio de filmes duplicados (mesmo título e data).

### 📅 Detalhes inteligentes
- Cada filme mostra se já foi lançado ou quantos dias faltam para a estreia (*"Estreia em 12 dias"*, *"Estreia amanhã"*).
- Duração formatada de forma legível (`175 min` vira **2h 55min**).
- Janela de detalhes com ficha completa e sinopse.

### 💾 Seus dados ficam salvos
Favoritos, assistidos, notas e filmes cadastrados são guardados no navegador com `localStorage`, então continuam lá quando você fechar e abrir a página novamente.

## 🛠️ Tecnologias

| Tecnologia | Como foi usada |
|---|---|
| **HTML** | Estrutura semântica e o elemento nativo `<dialog>` para os modais |
| **CSS** | Variáveis CSS (design tokens), Grid, Flexbox, transições e media queries |
| **JavaScript** | Lógica completa da aplicação, sem nenhuma biblioteca externa |

## ⚙️ Como funciona por dentro

O código é organizado em seções, cada uma com uma responsabilidade clara:

```
Armazenamento  →  lê e grava no localStorage (com tratamento de erros)
Datas          →  cálculo de dias até a estreia e formatação em pt-BR
Dados          →  junta filmes base + cadastrados, filtra e ordena
Renderização   →  cria os cartões e atualiza a tela
Eventos        →  favoritos, detalhes, avaliação, cadastro e filtros
```

**Fluxo de uma interação** (exemplo: o usuário digita na busca):

1. O evento `input` atualiza o objeto de **estado** (`aba`, `busca`, `genero`, `ordem`).
2. `filmesFiltrados()` aplica filtros e ordenação sobre a lista completa.
3. `renderizar()` reconstrói a grade de cartões e o painel de resumo.
4. Quando algo muda (favorito, nota, novo filme), os dados são salvos e a tela é renderizada de novo.

Essa separação entre **estado → filtro → renderização** mantém a interface sempre consistente com os dados.

## 📁 Estrutura do projeto

```
```text
Projeto-biblioteca-de-filmes/
├── index.html        # Estrutura principal da página, filtros e janelas modais (<dialog>)
├── README.md         # Documentação e relatório oficial do projeto integrador
├── css/
│   └── style.css     # Estilização visual, variáveis CSS e responsividade
└── js/
    └── script.js     # Lógica da aplicação, estado, filtros, datas e localStorage
```

## 🚀 Como executar?

Não é preciso instalar nada. Basta um navegador moderno (Chrome, Edge, Firefox ou Safari).

```bash
# 1. Clone o repositório
git clone https://github.com/ronaldeli/Projeto-biblioteca-de-filmes.git

# 2. Entre na pasta
cd Projeto-biblioteca-de-filmes
```

Depois, abra o `index.html` no navegador. Se preferir, use a extensão **Live Server** do VS Code.

## 🎓 Conceitos aplicados

- Manipulação dinâmica do **DOM** e criação de elementos via JavaScript
- **Gerenciamento de estado** simples com um objeto central
- Funções de ordem superior: `filter`, `map`, `some`, `sort`, `includes`
- **Persistência** com `localStorage` e serialização com `JSON`
- **Validação de formulários** com `FormData`
- Manipulação de **datas** e internacionalização com `toLocaleDateString('pt-BR')`
- Elemento `<dialog>` e métodos nativos `showModal()` e `close()`
- Layout moderno com **CSS Grid, Flexbox e variáveis CSS**
- Boas práticas de **segurança e acessibilidade**
- Versionamento com **Git e GitHub**

## 🔮 Próximos passos

- [ ] Integrar uma API de filmes (como TMDB) para buscar pôsteres e sinopses automaticamente
- [ ] Permitir upload de capa para os filmes cadastrados
- [ ] Exportar e importar a biblioteca em arquivo JSON
- [ ] Alternância entre tema claro e escuro
- [ ] Testes automatizados das funções de filtro e Data

## 👨‍💻 Desenvolvedores

| Nome Completo | GitHub |
| :--- | :--- |
| **Ronald Eli** | [![GitHub](https://img.shields.io/badge/GitHub-ronaldeli-181717?style=flat&logo=github)](https://github.com/ronaldeli) |
| **Ittalo Henrique** | [![GitHub](https://img.shields.io/badge/GitHub-Ittalohsilva-181717?style=flat&logo=github)](https://github.com/Ittalohsilva) |
| **Cleberson Santos** | [![GitHub](https://img.shields.io/badge/GitHub-Cleberson7-181717?style=flat&logo=github)](https://github.com/Cleberson7) |
| **Victor Matheus** | [![GitHub](https://img.shields.io/badge/GitHub-Victor98-181717?style=flat&logo=github)](https://github.com/Victor98) |
| **Vinicius Queiroz** | [![GitHub](https://img.shields.io/badge/GitHub-ViniciusQueiroz18-181717?style=flat&logo=github)](https://github.com/ViniciusQueiroz18) |

---

🤖 O papel da Inteligência Artificial no projeto
A Inteligência Artificial (IA) foi utilizada como ferramenta de suporte e coautoria ao longo do desenvolvimento do projeto, atuando nas seguintes frentes:

Arquitetura e Organização do Código: Auxílio na estruturação modular do projeto em HTML semântico, estilização com CSS moderno (utilizando variáveis, Flexbox e Grid) e lógica em JavaScript puro para gerenciamento de estado e manipulação do DOM.

Refinamento e Boas Práticas: Revisão de trechos de código para garantir responsividade, acessibilidade (uso do elemento nativo <dialog> e atributos ARIA) e tratamento adequado de erros no localStorage.

Documentação e Organização: Suporte na formatação e redação da documentação oficial (README.md), estruturação de tabelas de contribuidores e padronização visual dos selos (badges) do GitHub.
<div align="center">

# 🎬 Biblioteca de Filmes

**Projeto acadêmico desenvolvido para a faculdade com o objetivo de criar uma aplicação web completa para gerenciamento e catálogo pessoal de filmes.**

</div>

Desenvolvido com dedicação para fins de estudo

</div>

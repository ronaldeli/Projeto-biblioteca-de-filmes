// Cinemateca - lógica da biblioteca de filmes

const CHAVE_EXTRAS = 'cinemateca:extras';
const CHAVE_FAVORITOS = 'cinemateca:favoritos';
const CHAVE_ASSISTIDOS = 'cinemateca:assistidos';
const CHAVE_NOTAS = 'cinemateca:notas';

const generos = [
  'Ação', 'Animação', 'Aventura', 'Comédia', 'Crime',
  'Drama', 'Ficção científica', 'Suspense', 'Terror'
];

// As datas são do lançamento original de cada filme
const filmesBase = [
  {
    id: 1, titulo: 'O Poderoso Chefão', diretor: 'Francis Ford Coppola',
    genero: 'Crime', lancamento: '1972-03-24', duracao: 175,
    sinopse: 'A saga de uma família da máfia ítalo-americana e a difícil transição de poder entre pai e filho.'
  },
  {
    id: 2, titulo: 'Pulp Fiction', diretor: 'Quentin Tarantino',
    genero: 'Crime', lancamento: '1994-10-14', duracao: 154,
    sinopse: 'Histórias de criminosos de Los Angeles se cruzam em episódios violentos, irônicos e fora de ordem.'
  },
  {
    id: 3, titulo: 'Forrest Gump', diretor: 'Robert Zemeckis',
    genero: 'Drama', lancamento: '1994-07-06', duracao: 142,
    sinopse: 'Um homem de coração simples atravessa décadas da história americana sem perceber a própria importância.'
  },
  {
    id: 4, titulo: 'Central do Brasil', diretor: 'Walter Salles',
    genero: 'Drama', lancamento: '1998-04-03', duracao: 113,
    sinopse: 'Uma ex-professora que escreve cartas na estação ajuda um menino a procurar o pai no interior do Nordeste.'
  },
  {
    id: 5, titulo: 'Matrix', diretor: 'Lana e Lilly Wachowski',
    genero: 'Ficção científica', lancamento: '1999-03-31', duracao: 136,
    sinopse: 'Um programador descobre que a realidade em que vive é uma simulação controlada por máquinas.'
  },
  {
    id: 6, titulo: 'Clube da Luta', diretor: 'David Fincher',
    genero: 'Drama', lancamento: '1999-10-15', duracao: 139,
    sinopse: 'Um funcionário insone funda um clube clandestino de lutas com um vendedor de sabão carismático e perigoso.'
  },
  {
    id: 7, titulo: 'Cidade de Deus', diretor: 'Fernando Meirelles',
    genero: 'Crime', lancamento: '2002-08-30', duracao: 130,
    sinopse: 'O crescimento do crime organizado numa favela do Rio de Janeiro, visto pelos olhos de um jovem fotógrafo.'
  },
  {
    id: 8, titulo: 'Tropa de Elite', diretor: 'José Padilha',
    genero: 'Ação', lancamento: '2007-10-05', duracao: 115,
    sinopse: 'Um capitão do BOPE procura um sucessor enquanto enfrenta o tráfico e a corrupção no Rio de Janeiro.'
  },
  {
    id: 9, titulo: 'O Cavaleiro das Trevas', diretor: 'Christopher Nolan',
    genero: 'Ação', lancamento: '2008-07-18', duracao: 152,
    sinopse: 'Batman enfrenta o Coringa, que espalha o caos em Gotham e testa os limites morais do herói.'
  },
  {
    id: 10, titulo: 'Interestelar', diretor: 'Christopher Nolan',
    genero: 'Ficção científica', lancamento: '2014-11-07', duracao: 169,
    sinopse: 'Com a Terra à beira do colapso, um grupo de astronautas atravessa um buraco de minhoca atrás de um novo lar.'
  },
  {
    id: 11, titulo: 'Blade Runner 2049', diretor: 'Denis Villeneuve',
    genero: 'Ficção científica', lancamento: '2017-10-06', duracao: 164,
    sinopse: 'Um novo caçador de replicantes descobre um segredo capaz de abalar a ordem entre humanos e androides.'
  },
  {
    id: 12, titulo: 'Parasita', diretor: 'Bong Joon-ho',
    genero: 'Suspense', lancamento: '2019-05-30', duracao: 132,
    sinopse: 'Uma família pobre se infiltra aos poucos na casa de uma família rica, com consequências imprevisíveis.'
  },
  {
    id: 13, titulo: 'Duna', diretor: 'Denis Villeneuve',
    genero: 'Aventura', lancamento: '2021-10-22', duracao: 155,
    sinopse: 'Paul Atreides viaja ao deserto de Arrakis, único lugar onde nasce a substância mais valiosa do universo.'
  },
  {
    id: 14, titulo: 'Oppenheimer', diretor: 'Christopher Nolan',
    genero: 'Drama', lancamento: '2023-07-21', duracao: 180,
    sinopse: 'A trajetória do físico que liderou o Projeto Manhattan e o peso moral da bomba atômica.'
  }
];

// ---------- Armazenamento ----------

function lerLocal(chave, padrao) {
  try {
    const bruto = localStorage.getItem(chave);
    return bruto ? JSON.parse(bruto) : padrao;
  } catch (e) {
    return padrao;
  }
}

function salvarLocal(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch (e) {
    // sem armazenamento disponível, o site continua funcionando na sessão
  }
}

let extras = lerLocal(CHAVE_EXTRAS, []);
let favoritos = lerLocal(CHAVE_FAVORITOS, []);
let assistidos = lerLocal(CHAVE_ASSISTIDOS, []);
let notas = lerLocal(CHAVE_NOTAS, {});
let editandoId = null;

const estado = {
  aba: 'todos',
  busca: '',
  genero: '',
  ordem: 'recentes'
};

let filmeAberto = null;

// ---------- Elementos ----------

const $ = (seletor) => document.querySelector(seletor);

const grade = $('#grade');
const vazio = $('#vazio');
const contagem = $('#contagem');
const campoBusca = $('#busca');
const filtroGenero = $('#filtro-genero');
const seletorOrdem = $('#ordem');
const modalDetalhes = $('#modal-detalhes');
const modalCadastro = $('#modal-cadastro');
const formFilme = $('#form-filme');
const formErro = $('#form-erro');

// ---------- Datas ----------

// Cria a data a partir do texto AAAA-MM-DD sem deslocar o fuso
function paraData(texto) {
  const [ano, mes, dia] = texto.split('-').map(Number);
  return new Date(ano, mes - 1, dia);
}

function formatarData(texto) {
  return paraData(texto).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function diasAteLancamento(texto) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const diferenca = paraData(texto) - hoje;
  return Math.ceil(diferenca / (1000 * 60 * 60 * 24));
}

function textoSituacao(texto) {
  const dias = diasAteLancamento(texto);
  if (dias > 1) return `Estreia em ${dias} dias`;
  if (dias === 1) return 'Estreia amanhã';
  if (dias === 0) return 'Estreia hoje';
  return 'Já lançado';
}

function formatarDuracao(minutos) {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return h > 0 ? `${h}h ${String(m).padStart(2, '0')}min` : `${m}min`;
}

// ---------- Dados ----------

function todosOsFilmes() {
  return [...filmesBase, ...extras];
}

function semAcento(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function filmesFiltrados() {
  const termo = semAcento(estado.busca.trim());

  let lista = todosOsFilmes().filter((filme) => {
    if (estado.aba === 'favoritos' && !favoritos.includes(filme.id)) return false;
    if (estado.aba === 'assistidos' && !assistidos.includes(filme.id)) return false;
    if (estado.aba === 'proximos' && diasAteLancamento(filme.lancamento) < 0) return false;
    if (estado.genero && filme.genero !== estado.genero) return false;

    if (termo) {
      const alvo = semAcento(`${filme.titulo} ${filme.diretor}`);
      if (!alvo.includes(termo)) return false;
    }
    return true;
  });

  lista.sort((a, b) => {
    if (estado.ordem === 'titulo') return a.titulo.localeCompare(b.titulo, 'pt-BR');
    if (estado.ordem === 'nota') return (notas[b.id] || 0) - (notas[a.id] || 0);
    if (estado.ordem === 'antigos') return a.lancamento.localeCompare(b.lancamento);
    return b.lancamento.localeCompare(a.lancamento);
  });

  return lista;
}

// ---------- Renderização ----------

function criarElemento(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto !== undefined) el.textContent = texto;
  return el;
}

function criarCartao(filme) {
  const cartao = criarElemento('article', 'cartao');

  const capa = criarElemento('div', 'cartao__capa');
  capa.append(
    criarElemento('span', 'cartao__ano', filme.lancamento.slice(0, 4)),
    criarElemento('span', 'cartao__genero', filme.genero)
  );

  const info = criarElemento('div', 'cartao__info');
  const data = criarElemento('p', 'cartao__data');
  data.append('Lançamento: ', criarElemento('strong', '', formatarData(filme.lancamento)));

  const breve = diasAteLancamento(filme.lancamento) >= 0;
  const situacao = criarElemento(
    'span',
    breve ? 'situacao situacao--breve' : 'situacao',
    textoSituacao(filme.lancamento)
  );

  const marcas = criarElemento('div', 'cartao__marcas');
  marcas.append(situacao);
  if (assistidos.includes(filme.id)) {
    marcas.append(criarElemento('span', 'situacao situacao--visto', 'Assistido'));
  }
  if (notas[filme.id]) {
    marcas.append(criarElemento('span', 'situacao', `★ ${notas[filme.id]}/5`));
  }

  info.append(
    criarElemento('h3', 'cartao__titulo', filme.titulo),
    criarElemento('p', 'cartao__diretor', `${filme.diretor} · ${formatarDuracao(filme.duracao)}`),
    data,
    marcas
  );

  const rodape = criarElemento('div', 'cartao__rodape');

  const btnDetalhes = criarElemento('button', 'botao', 'Detalhes');
  btnDetalhes.type = 'button';
  btnDetalhes.addEventListener('click', () => abrirDetalhes(filme.id));

  const btnFav = criarElemento('button', 'botao btn-fav');
  btnFav.type = 'button';
  atualizarBotaoFavorito(btnFav, filme.id);
  btnFav.addEventListener('click', () => alternarFavorito(filme.id));

  rodape.append(btnDetalhes, btnFav);
  cartao.append(capa, info, rodape);
  return cartao;
}

function atualizarBotaoFavorito(botao, id) {
  const marcado = favoritos.includes(id);
  botao.textContent = marcado ? 'Favorito' : 'Favoritar';
  botao.setAttribute('aria-pressed', marcado);
}

function renderizar() {
  const lista = filmesFiltrados();
  grade.replaceChildren(...lista.map(criarCartao));
  vazio.hidden = lista.length > 0;

  const total = todosOsFilmes().length;
  const proximos = todosOsFilmes().filter((f) => diasAteLancamento(f.lancamento) >= 0).length;
  contagem.textContent =
    `${total} filmes na biblioteca · ${assistidos.length} assistidos · ` +
    `${favoritos.length} favoritos · ${proximos} por estrear`;
}

function montarGeneros() {
  generos.forEach((g) => {
    filtroGenero.append(new Option(g, g));
    $('#form-genero').append(new Option(g, g));
  });
}

// ---------- Favoritos ----------

function alternarFavorito(id) {
  if (favoritos.includes(id)) {
    favoritos = favoritos.filter((f) => f !== id);
  } else {
    favoritos.push(id);
  }
  salvarLocal(CHAVE_FAVORITOS, favoritos);
  renderizar();

  if (filmeAberto === id) atualizarFavoritoNoModal();
}

// ---------- Detalhes ----------

function abrirDetalhes(id) {
  const filme = todosOsFilmes().find((f) => f.id === id);
  if (!filme) return;

  filmeAberto = id;
  $('#det-selo').textContent = textoSituacao(filme.lancamento);
  $('#det-titulo').textContent = filme.titulo;
  $('#det-data').textContent = formatarData(filme.lancamento);
  $('#det-diretor').textContent = filme.diretor;
  $('#det-genero').textContent = filme.genero;
  $('#det-duracao').textContent = formatarDuracao(filme.duracao);
  $('#det-sinopse').textContent = filme.sinopse || 'Sem sinopse cadastrada.';

  // só os filmes cadastrados pelo usuário podem ser editados ou removidos
  const cadastradoPorMim = extras.some((e) => e.id === id);
  $('#det-remover').hidden = !cadastradoPorMim;
  $('#det-editar').hidden = !cadastradoPorMim;

  atualizarFavoritoNoModal();
  atualizarAvaliacaoNoModal();
  modalDetalhes.showModal();
}

function atualizarFavoritoNoModal() {
  $('#det-favorito').textContent = favoritos.includes(filmeAberto)
    ? 'Remover dos favoritos'
    : 'Adicionar aos favoritos';
}

function atualizarAvaliacaoNoModal() {
  const nota = notas[filmeAberto] || 0;
  const caixa = $('#det-estrelas');
  caixa.replaceChildren();

  for (let i = 1; i <= 5; i++) {
    const estrela = criarElemento('button', i <= nota ? 'estrela cheia' : 'estrela', '★');
    estrela.type = 'button';
    estrela.setAttribute('aria-label', `${i} ${i === 1 ? 'estrela' : 'estrelas'}`);
    estrela.addEventListener('click', () => definirNota(i));
    caixa.append(estrela);
  }

  $('#det-assistido').textContent = assistidos.includes(filmeAberto)
    ? 'Desmarcar como assistido'
    : 'Marcar como assistido';
}

function definirNota(valor) {
  if (notas[filmeAberto] === valor) {
    delete notas[filmeAberto];   // clicar na mesma nota de novo limpa a avaliação
  } else {
    notas[filmeAberto] = valor;
    if (!assistidos.includes(filmeAberto)) assistidos.push(filmeAberto);
    salvarLocal(CHAVE_ASSISTIDOS, assistidos);
  }
  salvarLocal(CHAVE_NOTAS, notas);
  atualizarAvaliacaoNoModal();
  renderizar();
}

function alternarAssistido() {
  if (assistidos.includes(filmeAberto)) {
    assistidos = assistidos.filter((f) => f !== filmeAberto);
  } else {
    assistidos.push(filmeAberto);
  }
  salvarLocal(CHAVE_ASSISTIDOS, assistidos);
  atualizarAvaliacaoNoModal();
  renderizar();
}

$('#det-assistido').addEventListener('click', alternarAssistido);

$('#det-favorito').addEventListener('click', () => alternarFavorito(filmeAberto));

$('#det-remover').addEventListener('click', () => {
  if (!confirm('Remover este filme da biblioteca?')) return;

  extras = extras.filter((f) => f.id !== filmeAberto);
  favoritos = favoritos.filter((f) => f !== filmeAberto);
  assistidos = assistidos.filter((f) => f !== filmeAberto);
  delete notas[filmeAberto];
  salvarLocal(CHAVE_EXTRAS, extras);
  salvarLocal(CHAVE_FAVORITOS, favoritos);
  salvarLocal(CHAVE_ASSISTIDOS, assistidos);
  salvarLocal(CHAVE_NOTAS, notas);

  modalDetalhes.close();
  renderizar();
});

// ---------- Cadastro ----------

$('#btn-novo').addEventListener('click', () => {
  editandoId = null;
  formFilme.reset();
  formErro.hidden = true;
  $('#form-titulo').textContent = 'Adicionar filme';
  modalCadastro.showModal();
});

$('#det-editar').addEventListener('click', () => {
  const filme = extras.find((e) => e.id === filmeAberto);
  if (!filme) return;

  editandoId = filme.id;
  modalDetalhes.close();

  formFilme.reset();
  formErro.hidden = true;
  $('#form-titulo').textContent = 'Editar filme';

  const campos = formFilme.elements;
  campos.titulo.value = filme.titulo;
  campos.diretor.value = filme.diretor;
  campos.genero.value = filme.genero;
  campos.lancamento.value = filme.lancamento;
  campos.duracao.value = filme.duracao;
  campos.sinopse.value = filme.sinopse || '';

  modalCadastro.showModal();
});

formFilme.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const dados = new FormData(formFilme);
  const titulo = dados.get('titulo').trim();
  const diretor = dados.get('diretor').trim();
  const lancamento = dados.get('lancamento');
  const duracao = Number(dados.get('duracao'));

  if (!titulo || !diretor || !lancamento || !duracao) {
    formErro.textContent = 'Preencha título, direção, data e duração.';
    formErro.hidden = false;
    return;
  }

  const jaExiste = todosOsFilmes().some(
    (f) => f.id !== editandoId &&
           semAcento(f.titulo) === semAcento(titulo) && f.lancamento === lancamento
  );
  if (jaExiste) {
    formErro.textContent = 'Esse filme já está na biblioteca.';
    formErro.hidden = false;
    return;
  }

  const genero = dados.get('genero');
  const sinopse = dados.get('sinopse').trim();

  if (editandoId) {
    extras = extras.map((f) =>
      f.id === editandoId ? { ...f, titulo, diretor, genero, lancamento, duracao, sinopse } : f
    );
    editandoId = null;
  } else {
    extras.push({ id: Date.now(), titulo, diretor, genero, lancamento, duracao, sinopse });
  }
  salvarLocal(CHAVE_EXTRAS, extras);

  modalCadastro.close();
  renderizar();
});

// ---------- Fechar modais ----------

document.querySelectorAll('[data-fechar]').forEach((botao) => {
  botao.addEventListener('click', () => botao.closest('dialog').close());
});

// clique na área escura fora do conteúdo
[modalDetalhes, modalCadastro].forEach((modal) => {
  modal.addEventListener('click', (evento) => {
    if (evento.target === modal) modal.close();
  });
});

modalDetalhes.addEventListener('close', () => {
  filmeAberto = null;
});

// ---------- Filtros ----------

document.querySelectorAll('.aba').forEach((aba) => {
  aba.addEventListener('click', () => {
    document.querySelector('.aba.ativa').classList.remove('ativa');
    aba.classList.add('ativa');
    estado.aba = aba.dataset.aba;
    renderizar();
  });
});

campoBusca.addEventListener('input', () => {
  estado.busca = campoBusca.value;
  renderizar();
});

filtroGenero.addEventListener('change', () => {
  estado.genero = filtroGenero.value;
  renderizar();
});

seletorOrdem.addEventListener('change', () => {
  estado.ordem = seletorOrdem.value;
  renderizar();
});

// ---------- Início ----------

montarGeneros();
renderizar();

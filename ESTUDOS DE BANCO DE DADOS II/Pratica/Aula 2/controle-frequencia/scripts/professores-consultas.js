use("frequencia");

// =========================================================
// CONSULTAS EM MONGO SHELL - DOCENTES / PROFESSORES
// =========================================================
// Este arquivo mostra exemplos de consultas no padrão do mongosh.
// Cada bloco explica o que a consulta faz e como ela funciona.

// Variáveis reutilizáveis para exemplos práticos
const nomeProfessor = "Joao";
const rpProfessor = "123456";
const codigoDisciplina = "12490-P";
const cursoFiltro = "Engenharia de Software";

// 1) Listar todos os professores
// O que faz: retorna todos os documentos da coleção docentes.
// Como faz: db.docentes.find() busca todos os documentos e .pretty() formata a saída.
db.docentes.find().pretty();

// 2) Buscar professor por RP
// O que faz: localiza um docente com um RP específico.
// Como faz: usa o filtro { RP: rpProfessor } dentro de find().
db.docentes.find({ RP: rpProfessor }).pretty();

// 3) Buscar professor por nome
// O que faz: pesquisa um professor por parte do nome, sem diferenciar maiúsculas e minúsculas.
// Como faz: cria um regex com new RegExp(nomeProfessor, "i") e aplica ao campo nome.
db.docentes.find({ nome: new RegExp(nomeProfessor, "i") }).pretty();

// 4) Contar docentes cadastrados
// O que faz: conta quantos documentos existem na coleção docentes.
// Como faz: db.docentes.countDocuments() usa a contagem total da coleção.
db.docentes.countDocuments();

// 5) Ordenar docentes por nome
// O que faz: mostra os nomes dos professores em ordem alfabética.
// Como faz: find() com projeção limita os campos e sort({ nome: 1 }) ordena crescente.
db.docentes.find({}, { _id: 0, RP: 1, nome: 1 }).sort({ nome: 1 }).pretty();

// 6) Ver todas as disciplinas de um professor
// O que faz: identifica quais disciplinas esse professor ministra.
// Como faz: procura em disciplinas onde "turmas.docente.RP" seja igual ao RP informado.
db.disciplinas.find(
  { "turmas.docente.RP": rpProfessor },
  { _id: 0, codigo: 1, nome: 1, curso: 1, "turmas.$": 1 }
).pretty();

// 7) Ver turmas de um professor
// O que faz: lista todas as turmas em que um professor atua.
// Como faz: $unwind separa cada item do array turmas, $match filtra pelo RP e $project mostra os campos úteis.
db.disciplinas.aggregate([
  { $unwind: "$turmas" },
  { $match: { "turmas.docente.RP": rpProfessor } },
  {
    $project: {
      _id: 0,
      disciplinaCodigo: "$codigo",
      disciplinaNome: "$nome",
      turmaCodigo: "$turmas.codigo",
      docenteNome: "$turmas.docente.nome"
    }
  }
]).pretty();

// 8) Quem ministra uma disciplina?
// O que faz: mostra os dados do docente de uma disciplina informada.
// Como faz: busca a disciplina pelo campo codigo e exibe os dados da turma.
db.disciplinas.find(
  { codigo: codigoDisciplina },
  { _id: 0, codigo: 1, nome: 1, turmas: 1 }
).pretty();

// 9) Ver professores por curso
// O que faz: lista todos os docentes relacionados a um curso específico.
// Como faz: filtra por curso, destrói o array turmas e projeta somente disciplina e professor.
db.disciplinas.aggregate([
  { $match: { curso: cursoFiltro } },
  { $unwind: "$turmas" },
  {
    $project: {
      _id: 0,
      disciplina: "$nome",
      codigo: "$codigo",
      docenteRP: "$turmas.docente.RP",
      docenteNome: "$turmas.docente.nome"
    }
  }
]).pretty();

// 10) Quantas turmas cada professor leciona
// O que faz: mostra quem tem mais turmas atribuídas.
// Como faz: $unwind separa turmas, $group agrega por docente e contabiliza quantas turmas cada um tem.
db.disciplinas.aggregate([
  { $unwind: "$turmas" },
  { $group: { _id: "$turmas.docente.RP", nome: { $first: "$turmas.docente.nome" }, totalTurmas: { $sum: 1 } } },
  { $sort: { totalTurmas: -1, nome: 1 } }
]).pretty();

// 11) Professores sem disciplina atribuída
// O que faz: identifica docentes que não aparecem em nenhuma disciplina.
// Como faz: $lookup junta os dados de disciplinas e depois filtra quem não tem relacionamento.
db.docentes.aggregate([
  {
    $lookup: {
      from: "disciplinas",
      localField: "RP",
      foreignField: "turmas.docente.RP",
      as: "disciplinasMinistradas"
    }
  },
  { $match: { disciplinasMinistradas: { $size: 0 } } },
  { $project: { _id: 0, RP: 1, nome: 1 } }
]).pretty();

// 12) Buscar docente em uma disciplina específica
// O que faz: mostra qual professor está ligado à disciplina e à turma informadas.
// Como faz: $match filtra a disciplina, $unwind separa cada turma e $project exibe professor, turma e código.
db.disciplinas.aggregate([
  { $match: { codigo: codigoDisciplina } },
  { $unwind: "$turmas" },
  { $project: { _id: 0, codigo: "$codigo", nome: "$nome", turma: "$turmas.codigo", docenteRP: "$turmas.docente.RP", docenteNome: "$turmas.docente.nome" } }
]).pretty();

// 13) Professor com mais disciplinas diferentes
// O que faz: calcula quais professores ministram mais disciplinas distintas.
// Como faz: $group por docente, monta um conjunto de códigos de disciplinas com $addToSet e depois mede o tamanho.
db.disciplinas.aggregate([
  { $unwind: "$turmas" },
  { $group: { _id: "$turmas.docente.RP", nome: { $first: "$turmas.docente.nome" }, disciplinas: { $addToSet: "$codigo" } } },
  { $project: { _id: 0, RP: "$_id", nome: 1, quantidadeDisciplinas: { $size: "$disciplinas" } } },
  { $sort: { quantidadeDisciplinas: -1, nome: 1 } }
]).pretty();

// 14) Ver outros dados do professor
// O que faz: mostra apenas os dados básicos do docente.
// Como faz: find({}, { _id: 0, RP: 1, nome: 1 }) projeta somente os campos desejados.
db.docentes.find({}, { _id: 0, RP: 1, nome: 1 }).pretty();

// 15) Consulta aberta para data e docente
// O que faz: responde a pergunta: quem ministrou aulas em uma data específica?
// Como faz: busca na coleção chamadas pela data e projeta professor, disciplina, turma e data.
db.chamadas.find({ data: "2026-07-26" }, { _id: 0, docente: 1, disciplina: 1, turma: 1, data: 1 }).pretty();

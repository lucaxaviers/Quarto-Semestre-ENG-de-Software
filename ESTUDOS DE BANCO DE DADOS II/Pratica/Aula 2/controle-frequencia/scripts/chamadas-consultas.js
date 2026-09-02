use("frequencia");

// =========================================================
// CONSULTAS EM MONGO SHELL - CHAMADAS / PRESENÇA
// =========================================================
// Este arquivo responde perguntas sobre presença, faltas, turmas e aulas.

const dataConsulta = "2026-07-26";
const disciplinaFiltro = "12490-P";
const turmaFiltro = "0101";
const alunoFiltro = "1234";
const docenteFiltro = "123456";

// 1) Listar todas as chamadas
// O que faz: mostra todas as aulas registradas na coleção chamadas.
// Como faz: db.chamadas.find() busca todos os documentos da coleção.
db.chamadas.find().pretty();

// 2) Buscar por data
// O que faz: responde quem esteve presente em uma data específica.
// Como faz: aplica filtro por data e exibe disciplina, turma e alunos.
db.chamadas.find({ data: dataConsulta }, { _id: 0, data: 1, disciplina: 1, turma: 1, alunos: 1 }).pretty();

// 3) Buscar por disciplina
// O que faz: lista todas as aulas registradas para uma disciplina.
// Como faz: filtra pelo campo disciplina.codigo.
db.chamadas.find({ "disciplina.codigo": disciplinaFiltro }, { _id: 0, data: 1, disciplina: 1, turma: 1, docente: 1, aula: 1 }).pretty();

// 4) Buscar por turma
// O que faz: mostra todas as aulas de uma turma.
// Como faz: filtra por turma.codigo.
db.chamadas.find({ "turma.codigo": turmaFiltro }, { _id: 0, data: 1, disciplina: 1, turma: 1, aula: 1 }).pretty();

// 5) Buscar por docente
// O que faz: responde quais aulas um professor ministrou.
// Como faz: filtra no campo docente.RP.
db.chamadas.find({ "docente.RP": docenteFiltro }, { _id: 0, data: 1, disciplina: 1, turma: 1, aula: 1 }).pretty();

// 6) Ver alunos de uma chamada
// O que faz: mostra todos os alunos que compareceram em uma aula.
// Como faz: busca pela data da chamada e exibe o campo alunos.
db.chamadas.find({ data: dataConsulta }, { _id: 0, data: 1, disciplina: 1, turma: 1, alunos: 1 }).pretty();

// 7) Ver apenas presentes
// O que faz: lista só os alunos que estiveram presentes em uma data.
// Como faz: $match filtra data, $unwind separa cada aluno e $match com "alunos.presente": true.
db.chamadas.aggregate([
  { $match: { data: dataConsulta } },
  { $unwind: "$alunos" },
  { $match: { "alunos.presente": true } },
  { $project: { _id: 0, data: 1, disciplina: "$disciplina.nome", turma: "$turma.codigo", alunoRA: "$alunos.RA", alunoNome: "$alunos.nome" } }
]).pretty();

// 8) Ver apenas ausentes
// O que faz: responde quem faltou em um dia específico.
// Como faz: similar ao anterior, mas com "alunos.presente": false.
db.chamadas.aggregate([
  { $match: { data: dataConsulta } },
  { $unwind: "$alunos" },
  { $match: { "alunos.presente": false } },
  { $project: { _id: 0, data: 1, disciplina: "$disciplina.nome", turma: "$turma.codigo", alunoRA: "$alunos.RA", alunoNome: "$alunos.nome", justificativa: "$alunos.justificativa" } }
]).pretty();

// 9) Ausentes com justificativa
// O que faz: mostra alunos que faltaram e informaram o motivo.
// Como faz: verifica "alunos.presente": false e a existência do campo justificativa.
db.chamadas.aggregate([
  { $unwind: "$alunos" },
  { $match: { "alunos.presente": false, "alunos.justificativa": { $exists: true } } },
  { $project: { _id: 0, data: 1, disciplina: "$disciplina.nome", turma: "$turma.codigo", alunoRA: "$alunos.RA", alunoNome: "$alunos.nome", justificativa: "$alunos.justificativa" } }
]).pretty();

// 10) Ausentes sem justificativa
// O que faz: lista alunos faltosos que não informaram justificativa.
// Como faz: usa $match com "alunos.justificativa": { $exists: false }.
db.chamadas.aggregate([
  { $unwind: "$alunos" },
  { $match: { "alunos.presente": false, "alunos.justificativa": { $exists: false } } },
  { $project: { _id: 0, data: 1, disciplina: "$disciplina.nome", turma: "$turma.codigo", alunoRA: "$alunos.RA", alunoNome: "$alunos.nome" } }
]).pretty();

// 11) Quantidade de chamadas por disciplina
// O que faz: conta quantas aulas foram dadas em cada disciplina.
// Como faz: $group agrega por disciplina e usa $sum: 1 para contar registros.
db.chamadas.aggregate([
  { $group: { _id: "$disciplina.codigo", nome: { $first: "$disciplina.nome" }, totalChamadas: { $sum: 1 } } },
  { $sort: { totalChamadas: -1, nome: 1 } }
]).pretty();

// 12) Resumo de presença por turma
// O que faz: mostra a presença e ausência por turma em cada aula.
// Como faz: seleciona a turma e projeta os campos resumo.presentes e resumo.ausentes.
db.chamadas.aggregate([
  { $match: { "turma.codigo": turmaFiltro } },
  { $project: { _id: 0, data: 1, disciplina: "$disciplina.nome", turma: "$turma.codigo", presentes: "$resumo.presentes", ausentes: "$resumo.ausentes" } },
  { $sort: { data: 1 } }
]).pretty();

// 13) Aula com maior presença
// O que faz: encontra as aulas com maior número de presenças.
// Como faz: ordena pelo campo resumo.presentes em ordem decrescente e limita o resultado.
db.chamadas.aggregate([
  { $sort: { "resumo.presentes": -1, data: 1 } },
  { $project: { _id: 0, data: 1, disciplina: "$disciplina.nome", turma: "$turma.codigo", presentes: "$resumo.presentes", ausentes: "$resumo.ausentes" } },
  { $limit: 5 }
]).pretty();

// 14) Aula com maior ausência
// O que faz: identifica as aulas com maior número de faltas.
// Como faz: ordena resumo.ausentes em ordem decrescente e projeta os valores finais.
db.chamadas.aggregate([
  { $sort: { "resumo.ausentes": -1, data: 1 } },
  { $project: { _id: 0, data: 1, disciplina: "$disciplina.nome", turma: "$turma.codigo", presentes: "$resumo.presentes", ausentes: "$resumo.ausentes" } },
  { $limit: 5 }
]).pretty();

// 15) Ver presença de um aluno
// O que faz: mostra quantas vezes um aluno esteve presente e quantas faltou.
// Como faz: $unwind expande o array alunos, $match pela RA, $group soma presenças e faltas.
db.chamadas.aggregate([
  { $unwind: "$alunos" },
  { $match: { "alunos.RA": alunoFiltro } },
  { $group: { _id: "$alunos.RA", nome: { $first: "$alunos.nome" }, presencas: { $sum: { $cond: ["$alunos.presente", 1, 0] } }, faltas: { $sum: { $cond: ["$alunos.presente", 0, 1] } } } }
]).pretty();

// 16) Consulta aberta por data e disciplina
// O que faz: responde a pergunta: quem participou da disciplina X no dia Y?
// Como faz: filtra por data e disciplina.codigo e mostra os alunos registrados no documento.
db.chamadas.find({ data: dataConsulta, "disciplina.codigo": disciplinaFiltro }, { _id: 0, data: 1, disciplina: 1, turma: 1, alunos: 1 }).pretty();

use("frequencia");

// =========================================================
// CONSULTAS EM MONGO SHELL - DISCIPLINAS
// =========================================================
// Este arquivo reúne consultas para responder perguntas sobre disciplinas, turmas e professores.

const codigoDisciplina = "12490-P";
const nomeDisciplina = "Banco";
const cursoFiltro = "Engenharia de Software";
const periodoFiltro = 4;
const dataConsulta = "2026-07-26";

// 1) Listar todas as disciplinas
// O que faz: retorna todas as disciplinas cadastradas.
// Como faz: db.disciplinas.find() busca todos os documentos da coleção.
db.disciplinas.find().pretty();

// 2) Buscar disciplina por código
// O que faz: localiza uma disciplina pelo código.
// Como faz: filtra o campo codigo com o valor da variável codigoDisciplina.
db.disciplinas.find({ codigo: codigoDisciplina }).pretty();

// 3) Buscar disciplina por nome
// O que faz: busca disciplinas cujo nome contém um texto informado.
// Como faz: usa RegExp com "i" para ignorar maiúsculas/minúsculas e procurar por parte do nome.
db.disciplinas.find({ nome: new RegExp(nomeDisciplina, "i") }).pretty();

// 4) Filtrar por curso
// O que faz: lista todas as disciplinas de um curso.
// Como faz: usa o filtro { curso: cursoFiltro } dentro do find().
db.disciplinas.find({ curso: cursoFiltro }, { _id: 0, codigo: 1, nome: 1, curso: 1, periodo: 1 }).pretty();

// 5) Filtrar por período
// O que faz: mostra disciplinas do semestre/período desejado.
// Como faz: query no campo periodo com o valor periodoFiltro.
db.disciplinas.find({ periodo: periodoFiltro }, { _id: 0, codigo: 1, nome: 1, periodo: 1 }).pretty();

// 6) Filtrar por ano e semestre
// O que faz: responde quais disciplinas existem em um ano e semestre específicos.
// Como faz: utiliza a combinação de dois campos no filtro: anoCalendario e semestreCalendario.
db.disciplinas.find({ anoCalendario: 2026, semestreCalendario: 2 }, { _id: 0, codigo: 1, nome: 1, anoCalendario: 1, semestreCalendario: 1 }).pretty();

// 7) Contar disciplinas
// O que faz: conta quantas disciplinas existem na base.
// Como faz: countDocuments() mede o total de documentos na coleção.
db.disciplinas.countDocuments();

// 8) Ver turmas de uma disciplina
// O que faz: mostra todas as turmas e o conteúdo do array turmas de uma disciplina.
// Como faz: filtra pelo campo codigo e projeta o array turmas completo.
db.disciplinas.find({ codigo: codigoDisciplina }, { _id: 0, codigo: 1, nome: 1, turmas: 1 }).pretty();

// 9) Ver docentes de uma disciplina
// O que faz: responde quem ministra a disciplina.
// Como faz: $unwind separa cada turma do array e $project mostra professor e turma.
db.disciplinas.aggregate([
  { $match: { codigo: codigoDisciplina } },
  { $unwind: "$turmas" },
  { $project: { _id: 0, disciplina: "$nome", turma: "$turmas.codigo", docenteRP: "$turmas.docente.RP", docenteNome: "$turmas.docente.nome" } }
]).pretty();

// 10) Ver agenda de aulas de uma turma
// O que faz: mostra a programação de aula de uma turma específica.
// Como faz: filtra por codigo da disciplina e codigo da turma, e retorna somente o item da turma localizado.
db.disciplinas.find({ codigo: codigoDisciplina, "turmas.codigo": "0101" }, { _id: 0, codigo: 1, nome: 1, "turmas.$": 1 }).pretty();

// 11) Ver disciplinas com mais de uma turma
// O que faz: encontra disciplinas que possuem múltiplas turmas.
// Como faz: verifica se existe um segundo elemento em "turmas" usando "turmas.1": { $exists: true }.
db.disciplinas.find({ "turmas.1": { $exists: true } }, { _id: 0, codigo: 1, nome: 1 }).pretty();

// 12) Quantidade de turmas por disciplina
// O que faz: lista quantas turmas cada disciplina possui.
// Como faz: $project cria um campo quantidadeTurmas usando $size em turmas e depois ordena.
db.disciplinas.aggregate([
  { $project: { _id: 0, codigo: 1, nome: 1, quantidadeTurmas: { $size: "$turmas" } } },
  { $sort: { quantidadeTurmas: -1, nome: 1 } }
]).pretty();

// 13) Filtrar disciplinas por carga horária
// O que faz: retorna as disciplinas que possuem determinada carga horária.
// Como faz: procura o valor exato do campo cargaHorariaTotal.
db.disciplinas.find({ cargaHorariaTotal: 40 }, { _id: 0, codigo: 1, nome: 1, cargaHorariaTotal: 1 }).pretty();

// 14) Disciplinas por docente
// O que faz: responde qual disciplina um professor está ministrando.
// Como faz: $unwind expande o array de turmas e $match filtra pelo RP do docente.
db.disciplinas.aggregate([
  { $unwind: "$turmas" },
  { $match: { "turmas.docente.RP": "123456" } },
  { $project: { _id: 0, codigo: "$codigo", nome: "$nome", turma: "$turmas.codigo", docente: "$turmas.docente.nome" } }
]).pretty();

// 15) Consulta aberta por data de aula
// O que faz: responde a pergunta: quais aulas aconteceram em uma data específica?
// Como faz: busca a coleção chamadas pela data e mostra disciplina, turma e observações da aula.
db.chamadas.find({ data: dataConsulta }, { _id: 0, data: 1, disciplina: 1, turma: 1, docente: 1, aula: 1 }).pretty();

// 16) Ver disciplinas com desistência ou transferência
// O que faz: mostra turmas que tiveram movimentações de alunos em termos de transferências, desistências ou trancamentos.
// Como faz: $unwind expande turmas e $match usa $or para verificar qualquer um desses campos com valor maior que zero.
db.disciplinas.aggregate([
  { $unwind: "$turmas" },
  { $match: { $or: [{ "turmas.transferencias": { $gt: 0 } }, { "turmas.desistencias": { $gt: 0 } }, { "turmas.trancamentos": { $gt: 0 } }] } },
  { $project: { _id: 0, disciplina: "$nome", codigo: "$codigo", turma: "$turmas.codigo", transferencias: "$turmas.transferencias", desistencias: "$turmas.desistencias", trancamentos: "$turmas.trancamentos" } }
]).pretty();

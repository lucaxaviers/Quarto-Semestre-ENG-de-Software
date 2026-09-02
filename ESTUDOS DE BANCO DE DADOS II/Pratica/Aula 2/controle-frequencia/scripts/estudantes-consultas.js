use("frequencia");

// =========================================================
// CONSULTAS EM MONGO SHELL - ALUNOS / ESTUDANTES
// =========================================================
// Este arquivo mostra como consultar alunos, matrículas e presença com filtros práticos.

const raAluno = "1234";
const nomeAluno = "Ana";
const cursoFiltro = "Engenharia de Software";
const disciplinaFiltro = "12490-P";
const turmaFiltro = "0101";
const dataConsulta = "2026-07-26";

// 1) Listar todos os estudantes
// O que faz: mostra todos os alunos cadastrados.
// Como faz: db.alunos.find() busca todos os documentos da coleção.
db.alunos.find().pretty();

// 2) Buscar aluno por RA
// O que faz: localiza um estudante pelo registro acadêmico.
// Como faz: filtro no campo RA com o valor da variável raAluno.
db.alunos.find({ RA: raAluno }).pretty();

// 3) Buscar aluno por nome
// O que faz: busca alunos pelo nome, mesmo com letras diferentes.
// Como faz: usa RegExp com i para buscar por parte do nome sem diferenciar maiúsculas/minúsculas.
db.alunos.find({ nome: new RegExp(nomeAluno, "i") }).pretty();

// 4) Contar alunos cadastrados
// O que faz: conta quantos alunos existem no banco.
// Como faz: countDocuments() calcula o número total de documentos da coleção.
db.alunos.countDocuments();

// 5) Filtrar alunos por curso
// O que faz: lista alunos de um determinado curso.
// Como faz: usa o filtro { curso: cursoFiltro } e ordena por nome.
db.alunos.find({ curso: cursoFiltro }, { _id: 0, RA: 1, nome: 1, curso: 1, periodo: 1 }).sort({ nome: 1 }).pretty();

// 6) Filtrar alunos por período
// O que faz: mostra alunos de um período específico.
// Como faz: verifica o campo periodo e ordena por nome.
db.alunos.find({ periodo: 4 }, { _id: 0, RA: 1, nome: 1, curso: 1, periodo: 1 }).sort({ nome: 1 }).pretty();

// 7) Ver matrículas de um aluno
// O que faz: mostra todas as disciplinas em que o aluno está matriculado.
// Como faz: consulta por RA e exibe o array matriculas.
db.alunos.find({ RA: raAluno }, { _id: 0, RA: 1, nome: 1, matriculas: 1 }).pretty();

// 8) Ver alunos de uma disciplina
// O que faz: responde quem está matriculado em uma disciplina específica.
// Como faz: busca no array matriculas pelo campo disciplinaCodigo.
db.alunos.find({ "matriculas.disciplinaCodigo": disciplinaFiltro }, { _id: 0, RA: 1, nome: 1, curso: 1, periodo: 1 }).sort({ nome: 1 }).pretty();

// 9) Ver alunos de uma turma específica
// O que faz: mostra quem está em uma turma da disciplina escolhida.
// Como faz: usa dois filtros no array matriculas: disciplinaCodigo e turmaCodigo.
db.alunos.find({ "matriculas.disciplinaCodigo": disciplinaFiltro, "matriculas.turmaCodigo": turmaFiltro }, { _id: 0, RA: 1, nome: 1, curso: 1 }).sort({ nome: 1 }).pretty();

// 10) Ver alunos por curso e disciplina
// O que faz: responde quais alunos de um curso estão na disciplina X.
// Como faz: combina curso e disciplina no mesmo filtro e exibe dados do aluno.
db.alunos.find({ curso: cursoFiltro, "matriculas.disciplinaCodigo": disciplinaFiltro }, { _id: 0, RA: 1, nome: 1, curso: 1, periodo: 1 }).sort({ nome: 1 }).pretty();

// 11) Ver alunos com mais de uma matrícula
// O que faz: identifica estudantes matriculados em mais de uma disciplina.
// Como faz: verifica se existe o segundo item do array matriculas com "matriculas.1": { $exists: true }.
db.alunos.find({ "matriculas.1": { $exists: true } }, { _id: 0, RA: 1, nome: 1, totalMatriculas: { $size: "$matriculas" } }).sort({ totalMatriculas: -1 }).pretty();

// 12) Quantidade de alunos por disciplina
// O que faz: mostra quantos alunos há em cada disciplina.
// Como faz: $unwind expande as matrículas, $group conta por disciplina e $sort ordena por quantidade.
db.alunos.aggregate([
  { $unwind: "$matriculas" },
  { $group: { _id: "$matriculas.disciplinaCodigo", totalAlunos: { $sum: 1 }, nomeDisciplina: { $first: "$matriculas.disciplinaNome" } } },
  { $sort: { totalAlunos: -1, _id: 1 } }
]).pretty();

// 13) Quantidade de alunos por curso
// O que faz: mostra quantos alunos existem em cada curso.
// Como faz: $group por curso e soma 1 para cada documento.
db.alunos.aggregate([
  { $group: { _id: "$curso", total: { $sum: 1 } } },
  { $sort: { total: -1, _id: 1 } }
]).pretty();

// 14) Ver alunos com nome parecido
// O que faz: busca nomes parecidos ou iniciados por uma letra ou texto.
// Como faz: usa um regex no campo nome para fazer match parcial.
db.alunos.find({ nome: /^A/i }, { _id: 0, RA: 1, nome: 1 }).pretty();

// 15) Ver se aluno está em disciplina e turma específicas
// O que faz: responde se um aluno pertence a uma disciplina e turma específicas.
// Como faz: combina três filtros: RA, disciplinaCodigo e turmaCodigo.
db.alunos.find({ RA: raAluno, "matriculas.disciplinaCodigo": disciplinaFiltro, "matriculas.turmaCodigo": turmaFiltro }, { _id: 0, RA: 1, nome: 1, "matriculas.$": 1 }).pretty();

// 16) Consultas abertas por data de aula
// O que faz: responde a pergunta: quem esteve presente no dia X?
// Como faz: busca registros de chamadas pela data e mostra os alunos presentes.
db.chamadas.find({ data: dataConsulta }, { _id: 0, data: 1, disciplina: 1, turma: 1, alunos: 1 }).pretty();

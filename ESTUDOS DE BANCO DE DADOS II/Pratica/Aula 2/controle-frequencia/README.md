# Sistema de Controle de Frequência - MongoDB

Este projeto foi desenvolvido como parte da disciplina de Estudos de Banco de Dados II. O objetivo foi aplicar conceitos de banco de dados NoSQL com MongoDB para modelar e consultar dados de um sistema acadêmico de controle de frequência.

## 1. Objetivo da aula

Durante a aula, trabalhamos com:

- modelagem de dados em MongoDB;
- importação de arquivos JSON para coleções;
- organização de dados em documentos;
- criação de consultas em Mongo Shell;
- uso de filtros, agregações e agrupamentos;
- teste de consultas no VS Code com a extensão MongoDB.

A ideia principal foi montar um banco de dados para armazenar informações de:

- professores;
- disciplinas;
- alunos;
- chamadas/frequência.

---

## 2. Estrutura do projeto

A raiz do projeto contém os arquivos JSON com os dados originais e a pasta `scripts` com consultas prontas para Mongo Shell.

```text
controle-frequencia/
├── README.md
├── professores.json
├── disciplinas.json
├── estudantes.json
├── chamadas.json
└── scripts/
    ├── professores-consultas.js
    ├── disciplinas-consultas.js
    ├── estudantes-consultas.js
    └── chamadas-consultas.js
```

### Arquivos principais

- `professores.json`: dados dos docentes/professores
- `disciplinas.json`: dados das disciplinas e turmas
- `estudantes.json`: dados dos alunos e matrículas
- `chamadas.json`: registros de presença e ausência em aulas

---

## 3. Banco de dados e coleções

O banco usado foi o `frequencia`.

As coleções principais foram pensadas como:

- `docentes` ou `professores`
- `disciplinas`
- `alunos` ou `estudantes`
- `chamadas`

A estrutura foi montada com base no tipo de dados do sistema acadêmico:

### Professores

Informações como:

- RP
- nome
- disciplina(s) que ministra
- turma(s) vinculadas

### Disciplinas

Informações como:

- código da disciplina
- nome
- curso
- período
- turmas
- docentes vinculados

### Alunos

Informações como:

- RA
- nome
- curso
- período
- matrículas
- disciplinas e turmas em que está matriculado

### Chamadas / frequência

Informações como:

- data da aula
- disciplina
- turma
- docente
- alunos presentes ou ausentes
- justificativas de falta
- resumo de presença e ausência

---

## 4. O que foi feito na prática

### 4.1 Organização dos dados em JSON

Os dados foram organizados em arquivos `.json`, cada um representa uma coleção ou um conjunto de registros do sistema.

Esse formato foi útil porque:

- é simples de importar para o MongoDB;
- facilita a visualização dos documentos;
- mantém uma estrutura parecida com o modelo de documento do MongoDB.

### 4.2 Importação para o MongoDB

Foi estudado o processo de importar arquivos JSON para o banco com comandos como:

```bash
mongoimport --db frequencia --collection docentes --file professores.json --jsonArray
mongoimport --db frequencia --collection disciplinas --file disciplinas.json --jsonArray
mongoimport --db frequencia --collection alunos --file estudantes.json --jsonArray
mongoimport --db frequencia --collection chamadas --file chamadas.json --jsonArray
```

Esses comandos permitem inserir muitos registros rapidamente sem precisar incluir tudo manualmente.

### 4.3 Criação de scripts em Mongo Shell

Em seguida, criamos consultas em arquivos JavaScript para responder perguntas do sistema acadêmico.

Os scripts ficaram em:

- `scripts/professores-consultas.js`
- `scripts/disciplinas-consultas.js`
- `scripts/estudantes-consultas.js`
- `scripts/chamadas-consultas.js`

Esses arquivos contêm consultas do tipo:

- buscar por código ou nome;
- listar documentos;
- filtrar por curso, disciplina, turma ou data;
- contar registros;
- agrupar valores;
- verificar presença e ausência;
- analisar turmas e matrículas.

---

## 5. Tipos de consultas estudados

### Consultas simples

Usam `find()` para buscar dados.

Exemplo:

```js
use("frequencia");
db.alunos.find().pretty();
```

### Filtros

Usam objetos de consulta para localizar registros específicos.

Exemplo:

```js
use("frequencia");
db.disciplinas.find({ curso: "Engenharia de Software" }).pretty();
```

### Contagem

Usa `countDocuments()` para contar registros.

Exemplo:

```js
use("frequencia");
db.alunos.countDocuments();
```

### Agregação

Usa `aggregate()` para realizar agrupamentos e resumos.

Exemplo:

```js
use("frequencia");
db.chamadas.aggregate([
  { $match: { data: "2026-07-26" } },
  { $unwind: "$alunos" },
  { $match: { "alunos.presente": false } }
]).pretty();
```

### Ordenação

Usa `.sort()` para organizar os resultados.

Exemplo:

```js
use("frequencia");
db.alunos.find({}, { nome: 1, curso: 1 }).sort({ nome: 1 }).pretty();
```

---

## 6. Exemplos de perguntas que o banco consegue responder

### Sobre professores

- Quem são os professores cadastrados?
- Qual professor pertence ao RP X?
- Quem ministra determinada disciplina?
- Quais turmas um professor leciona?
- Quantas turmas cada professor tem?

### Sobre disciplinas

- Quais disciplinas existem no sistema?
- Quais disciplinas pertencem ao curso X?
- Quem ministra a disciplina Y?
- Quantas turmas cada disciplina possui?
- Quais turmas têm desistência ou trancamento?

### Sobre alunos

- Quem são os alunos cadastrados?
- Qual aluno tem o RA X?
- Em quais disciplinas o aluno está matriculado?
- Quais alunos da turma Y estão nessa disciplina?
- Quantos alunos há por disciplina e por curso?

### Sobre frequência

- Quem esteve presente no dia X?
- Quem faltou no dia X?
- Quem faltou e justificou?
- Qual turma teve mais presença?
- Qual aula teve mais ausência?
- Qual aluno teve maior número de presenças?

---

## 7. Como testar no VS Code

A extensão MongoDB para VS Code permite testar consultas diretamente no banco.

### Passos

1. Instale a extensão MongoDB for VS Code.
2. Conecte-se ao banco.
3. Abra um arquivo `.mongodb.js` ou use o Playground.
4. Execute consultas com `use("frequencia")`.

Exemplo:

```js
use("frequencia");
db.alunos.find().limit(5).pretty();
```

Outro exemplo:

```js
use("frequencia");
db.chamadas.find({ data: "2026-07-26" }).pretty();
```

---

## 8. Observações importantes

- O MongoDB usa documentos em JSON-like format.
- A sintaxe correta para o Mongo Shell é em JavaScript.
- O `pretty()` apenas deixa a saída mais legível; ele não altera a consulta.
- As consultas em arquivos JavaScript ficam no ambiente local do projeto;
  o banco MongoDB (local ou Atlas) recebe e executa as consultas quando conectado.

---

## 9. Conclusão

Nesta aula, aprendemos a:

- modelar dados de frequência em MongoDB;
- organizar arquivos JSON;
- importar dados para coleções;
- criar consultas importantes para o sistema;
- interpretar resultados em Mongo Shell e no VS Code;
- entender como um banco NoSQL pode responder perguntas do mundo real de uma instituição acadêmica.

Esse projeto serviu como uma aplicação prática de banco de dados NoSQL, mostrando como MongoDB pode ser usado para controlar alunos, disciplinas, professores e presença em aulas.

---

## 10. Referência rápida

### Comandos úteis

```js
use("frequencia");
db.getCollectionNames();
show collections;
```

```js
db.alunos.find().pretty();
db.disciplinas.find({ curso: "Engenharia de Software" }).pretty();
db.chamadas.find({ data: "2026-07-26" }).pretty();
```

---

Projeto desenvolvido para a disciplina de Estudos de Banco de Dados II.

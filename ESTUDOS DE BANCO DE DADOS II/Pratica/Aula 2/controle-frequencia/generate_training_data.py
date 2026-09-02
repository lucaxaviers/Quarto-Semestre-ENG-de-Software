import json
from pathlib import Path

base = Path(r"c:\Users\25000508.LAB-INF\Downloads\controle-frequencia")

professores_path = base / "professores.json"
disciplinas_path = base / "disciplinas.json"
estudantes_path = base / "estudantes.json"
chamadas_path = base / "chamadas.json"

professores = json.loads(professores_path.read_text(encoding="utf-8"))
disciplinas = json.loads(disciplinas_path.read_text(encoding="utf-8"))
estudantes = json.loads(estudantes_path.read_text(encoding="utf-8"))
chamadas = json.loads(chamadas_path.read_text(encoding="utf-8"))

new_professores = [
    {"RP": "112200", "nome": "Alan Turing"},
    {"RP": "112201", "nome": "Margaret Hamilton"},
    {"RP": "112202", "nome": "Linus Torvalds"},
    {"RP": "112203", "nome": "Grace Hopper"},
    {"RP": "112204", "nome": "Tim Berners-Lee"},
    {"RP": "112205", "nome": "Donald Knuth"},
    {"RP": "112206", "nome": "Guido van Rossum"},
    {"RP": "112207", "nome": "James Gosling"},
    {"RP": "112208", "nome": "Dennis Ritchie"},
    {"RP": "112209", "nome": "Hedy Lamarr"},
    {"RP": "112210", "nome": "John von Neumann"},
    {"RP": "112211", "nome": "Barbara Liskov"},
    {"RP": "112212", "nome": "Evelyn Boyd Granville"},
    {"RP": "112213", "nome": "Richard Stallman"},
    {"RP": "112214", "nome": "Bjarne Stroustrup"},
    {"RP": "112215", "nome": "Brian Kernighan"},
    {"RP": "112216", "nome": "Margo Seltzer"},
    {"RP": "112217", "nome": "Niklaus Wirth"},
    {"RP": "112218", "nome": "Katherine Johnson"},
    {"RP": "112219", "nome": "Anders Hejlsberg"},
]

existing_rps = {p["RP"] for p in professores}
new_professores = [p for p in new_professores if p["RP"] not in existing_rps]
professores.extend(new_professores)

extra_disciplina_names = [
    "Algoritmos e Estruturas de Dados",
    "Programação Web",
    "Banco de Dados I",
    "Engenharia de Requisitos",
    "Arquitetura de Software",
    "Redes de Computadores",
    "Sistemas Operacionais",
    "Computação Gráfica",
    "Linguagens Formais",
    "Segurança da Informação",
    "Teoria dos Grafos",
    "Estruturas de Dados Avançadas",
    "Inteligência Artificial",
    "Desenvolvimento Mobile",
    "Linguagem de Programação II",
    "Compiladores",
    "Banco de Dados II",
    "Processamento de Imagens",
    "Modelagem de Dados",
    "Arquitetura de Computadores",
]

novo_estudante_nomes = [
    "Lucas Almeida",
    "Beatriz Costa",
    "Gabriel Rocha",
    "Larissa Dias",
    "Matheus Nobre",
    "Sofia Andrade",
    "João Pedro Vieira",
    "Carolina Mota",
    "Rafael Nascimento",
    "Fernanda Silva",
    "Pedro Henrique",
    "Milena Cunha",
    "Vinicius Prado",
    "Júlia Freitas",
    "Enzo Moreira",
    "Bianca Santos",
    "Leonardo Pires",
    "Mariana Cordeiro",
    "Theo Souza",
    "Isabella Araujo",
]

new_disciplinas = []
new_estudantes = []
new_chamadas = []

for i in range(20):
    code = 12491 + i
    disciplina_codigo = f"{code}-P"
    turma_codigo = f"{201 + i:04d}"
    professor = new_professores[i]
    disciplina_nome = extra_disciplina_names[i]
    curso = [
        "Engenharia de Software",
        "Ciência da Computação",
        "Sistemas de Informação",
    ][i % 3]
    periodo = [3, 4, 5, 6][i % 4]

    disciplina = {
        "codigo": disciplina_codigo,
        "nome": disciplina_nome,
        "cargaHorariaTotal": 60 if i in {12, 17} else 40,
        "curso": curso,
        "periodo": periodo,
        "anoCalendario": 2026,
        "semestreCalendario": 2,
        "turmas": [
            {
                "codigo": turma_codigo,
                "qtdeInicialDeMatriculados": 28 + (i % 8),
                "qtdeAtualDeMatriculados": 28 + (i % 8),
                "trancamentos": 0,
                "desistencias": 0,
                "transferencias": 0,
                "docente": {
                    "RP": professor["RP"],
                    "nome": professor["nome"],
                },
                "agendaDeAulas": [
                    {
                        "dataHoraInicio": f"2026-08-{(i % 28) + 1:02d}T08:00:00",
                        "dataHoraFim": f"2026-08-{(i % 28) + 1:02d}T09:40:00",
                        "qtdeHorasAula": 2,
                    }
                ],
            }
        ],
    }
    new_disciplinas.append(disciplina)

    estudante = {
        "RA": f"{3001 + i}",
        "nome": novo_estudante_nomes[i],
        "curso": curso,
        "periodo": periodo,
        "matriculas": [
            {
                "disciplinaCodigo": disciplina_codigo,
                "disciplinaNome": disciplina_nome,
                "turmaCodigo": turma_codigo,
                "anoCalendario": 2026,
                "semestreCalendario": 2,
                "situacao": "matriculado",
            }
        ],
    }
    new_estudantes.append(estudante)

    alunos = []
    for j in range(5):
        ra = f"{3001 + i + j * 20}"
        nome = novo_estudante_nomes[(i + j) % 20]
        presente = j != 2 if i % 2 == 0 else j != 4
        aluno = {"RA": ra, "nome": nome, "presente": presente}
        if not presente:
            aluno["justificativa"] = "Sem justificativa informada" if j == 2 else "Atestado pendente"
        alunos.append(aluno)

    presentes = sum(1 for a in alunos if a["presente"])
    chamada = {
        "_id": f"CH-{disciplina_codigo}-{turma_codigo}-2026-08-{(i % 28) + 1:02d}",
        "data": f"2026-08-{(i % 28) + 1:02d}",
        "disciplina": {
            "codigo": disciplina_codigo,
            "nome": disciplina_nome,
            "curso": curso,
            "periodo": periodo,
            "anoCalendario": 2026,
            "semestreCalendario": 2,
        },
        "turma": {
            "codigo": turma_codigo,
            "qtdeAtualDeMatriculados": 28 + (i % 8),
        },
        "docente": {
            "RP": professor["RP"],
            "nome": professor["nome"],
        },
        "aula": {
            "dataHoraInicio": f"2026-08-{(i % 28) + 1:02d}T08:00:00",
            "dataHoraFim": f"2026-08-{(i % 28) + 1:02d}T09:40:00",
            "qtdeHorasAula": 2,
            "conteudo": f"Aula prática de {disciplina_nome}.",
        },
        "resumo": {
            "totalAlunos": len(alunos),
            "presentes": presentes,
            "ausentes": len(alunos) - presentes,
        },
        "alunos": alunos,
    }
    new_chamadas.append(chamada)

professores.extend(new_professores)
disciplinas.extend(new_disciplinas)
estudantes.extend(new_estudantes)
chamadas.extend(new_chamadas)

professores_path.write_text(json.dumps(professores, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
disciplinas_path.write_text(json.dumps(disciplinas, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
estudantes_path.write_text(json.dumps(estudantes, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
chamadas_path.write_text(json.dumps(chamadas, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

print(f"professores={len(professores)}")
print(f"disciplinas={len(disciplinas)}")
print(f"estudantes={len(estudantes)}")
print(f"chamadas={len(chamadas)}")

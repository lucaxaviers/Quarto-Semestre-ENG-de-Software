# PARADIGMA E PROGRAMAÇÃO ORIENTADA A OBJETOS

## 📋 INFORMAÇÕES GERAIS

- **Disciplina**: Paradigma e Programação Orientada a Objetos
- **Créditos**: 3 aulas/semana
- **Período**: 2026/2
- **Formato**: Aulas presenciais com rodízio quinzenal

---

## 🎯 OBJETIVO

Desenvolver competências em análise orientada a objetos, modelagem de sistemas usando UML, e implementação de soluções orientadas a objetos, com ênfase em conceitos, padrões e boas práticas.

---

## 📚 CONTEÚDOS PRINCIPAIS

### 1. Análise de Requisitos
- Extração, definição e validação de necessidades do cliente
- Comunicação entre analistas e usuários
- Técnicas de levantamento de requisitos
- Princípios de boa especificação

### 2. Conceitos Fundamentais de POO
- **Objeto**: Representam "coisas" do mundo real
- **Classe**: Descrição de um conjunto de objetos
- **Mensagem**: Sinal enviado entre objetos
- **Polimorfismo**: Múltiplas formas de comportamento
- **Herança**: Capacidade de reutilização de atributos e operações

### 3. Modelagem de Sistemas com UML
Unified Modeling Language é uma linguagem gráfica para visualizar, especificar, construir e documentar sistemas complexos.

#### Diagramas Estruturais:
- Diagrama de Classes
- Diagrama de Objetos
- Diagrama de Pacotes
- Diagrama de Componentes
- Diagrama de Estrutura Composta
- Diagrama de Implantação

#### Diagramas Comportamentais:
- **Casos de Uso**: Requisitos funcionais do sistema
- **Transição de Estados**: Comportamentos possíveis dos objetos
- **Atividades**: Processos de negócios e fluxos
- **Sequência**: Ordem de invocação de métodos
- **Colaboração**: Relacionamentos entre objetos
- **Tempo**: Sequência temporal de eventos

### 4. Especificação de Classes
- Atributos (dados, tipo, tamanho, valores válidos)
- Métodos (operações, pré/pós-condições)
- Relacionamentos entre classes

---

## 📅 CRONOGRAMA DE AULAS

### Horários:
- **Semanal**: Toda 5ª feira, 09h55 às 11h35
- **Quinzenal (Aulas Duplas)**: 08h00 às 09h40

### Datas das Aulas Duplas:
- **Agosto**: 04/08 e 18/08
- **Setembro**: 01/09, 15/09 e 29/09
- **Outubro**: 13/10 e 27/10
- **Novembro**: 10/11 e 24/11
- **Dezembro**: 15/12

---

## 📊 SISTEMA DE AVALIAÇÃO

### Componentes:
- **2 Provas regulares**: P1 e P2
- **1 Prova facultativa de recuperação**: REC
- **3 Notas práticas**: T1, T2 e T3

### Fórmulas de Cálculo:

**Média Teórica (MTeo):**
$$MTeo = \frac{P1 + 2 \times P2}{3}$$

Se MTeo < 5:
$$MTeo = \frac{MTeo + REC}{2}$$

**Média Prática (MPrat):**
$$MPrat = \frac{T1 + 2 \times T2 + 2 \times T3}{5}$$

**Média Final (MFinal):**

Se MTeo ≥ 5 E MPrat ≥ 5:
$$MFinal = 0,6 \times MTeo + 0,3 \times MPrat + 0,1 \times AT$$

Senão:
$$MFinal = \min(MTeo, MPrat)$$

### Observações Importantes:
⚠️ **Não há recuperação para a parte prática**  
⚠️ **Negociar prazos e descontos COM O PROFESSOR ANTES DE VENCER O PRAZO**

---

## 📖 TÓPICOS POR AULA

### Aula 1 - 03/08/2026
- Apresentação da disciplina
- Objeto Monolítico vs. Objeto Modular
- Sistema de Avaliação
- Conceitos fundamentais de POO: classes, atributos, getters/setters e nomenclatura Java

#### Conteúdo detalhado de Aula 1

##### 1. Classes
Representam **tipos de peças de software** que serão usadas nos programas.
Se caracterizam por três coisas:
- **Nome**
- **Atributos**
- **Métodos**

##### 2. Atributos
Atributo é aquele tipo de peça — uma característica **daquele tipo de peça** (da classe). Podem ser classificados em três eixos:
- Quanto a mudar: **Constante** ou **Variável**
- Quanto ao acesso: **Público**, **Privativo** ou **Protegido**
- Quanto à origem: característica da própria classe ou das peças que a utilizam

###### 2.1 Atributos constantes
Representam características **imutáveis**, como `RA`, `Pai`, `Mãe` em uma classe `Aluno`.
Use a palavra **`final`** na declaração.

###### 2.2 Atributos variáveis
Representam características **alteráveis**, como telefone ou endereço.

###### 2.3 Atributos de classe (`static`)
Atributos podem pertencer **à classe** em vez de pertencerem aos objetos individuais.
- Existe somente um valor único
- Existe mesmo sem objetos criados
- É indicado por **`static`**

```java
public class Aluno {
    static int totalAlunos; // pertence à classe
    String nome;            // pertence a cada objeto
}
```

##### 3. Controle de acesso dos atributos
- **Privativos**: não acessáveis fora da classe
- **Públicos**: acessáveis de fora da classe
- **Protegidos**: usados com herança

Regra que NUNCA muda:
- Atributos variáveis **JAMAIS** podem ser públicos
- Atributos constantes podem ser públicos

##### 4. Getters e Setters
- `get` / `is`: recuperam o valor do atributo
- `set`: valida e atualiza o valor
- Setters não inicializam, apenas atualizam

Exemplo:
```java
public String getTelefone() {
    return telefone;
}

public void setTelefone(String novoTelefone) {
    if (novoTelefone != null) {
        telefone = novoTelefone;
    }
}
```

##### 5. Regras universais de nomenclatura em Java
- Classe: `PascalCase`
- Método / atributo: `camelCase`
- Constante: `UPPER_SNAKE_CASE`
- Pacote: tudo minúsculo sem underline

---

**Checklist do que ficou pronto:**
- [x] O que são Classes
- [x] O que são Atributos (constantes x variáveis x static/classe)
- [x] Regra do IMPORTANTE (atributo precisa representar a classe)
- [x] Controle de acesso (privativo, público, protegido)
- [x] Getters e Setters (recuperadores e alteradores, exceção do boolean com `is`)
- [x] Regras universais de nomenclatura do Java (classe, método, atributo, constante)

### Aula 2 - Modelagem de Sistemas

- **Métodos**

##### 2. Atributos
Atributo é uma característica **daquilo que a classe representa**. Podem ser classificados em três eixos:
- Quanto a mudar: **Constante** ou **Variável**
- Quanto ao acesso: **Público**, **Privativo** ou **Protegido**
- Quanto à origem: característica da própria classe ou das peças que a utilizam

###### 2.1 Atributos constantes
Representam características **imutáveis**, como `RA`, `Pai`, `Mãe` em uma classe `Aluno`.
Use a palavra **`final`** na declaração.

###### 2.2 Atributos variáveis
Representam características **alteráveis**, como telefone ou endereço em `Aluno`.

###### 2.3 Atributos de classe (`static`)
Atributos podem pertencer **à classe** em vez de pertencerem aos objetos individuais.
- Existe somente **um único** valor do atributo
- Está presente mesmo sem nenhum objeto criado
- É indicado pela palavra **`static`**

```java
public class Aluno {
    static int totalAlunos; // pertence à classe
    String nome;            // pertence a cada objeto
}
```

##### 3. Controle de acesso dos atributos
- **Privativos**: não podem ser acessados nem alterados fora da classe
- **Públicos**: podem ser acessados e alterados fora da classe
- **Protegidos**: serão estudados com herança

Regra que NUNCA muda:
- Atributos **variáveis JAMAIS** podem ser públicos
- Atributos **constantes** podem ser públicos

##### 4. Getters e Setters
Getters recuperam o valor do atributo. Setters validam e alteram o valor.
- `get` + nome do atributo
- `is` + nome do atributo para atributos booleanos

Exemplo:
```java
public String getTelefone() {
    return telefone;
}

public void setTelefone(String novoTelefone) {
    if (novoTelefone != null) {
        telefone = novoTelefone;
    }
}
```

##### 5. Regras de nomenclatura em Java
- Classe: `PascalCase` (`Aluno`, `ContaBancaria`)
- Método/atributo: `camelCase` (`getTelefone`, `nomeAluno`)
- Constante: `UPPER_SNAKE_CASE` (`RA_ALUNO`, `MAX_VALOR`)
- Pacote: minúsculo sem underline (`com.escola.alunos`)

### Aula 2 - Modelagem de Sistemas
- Análise de Requisitos
- Definição de Função
- UML e seus 13 diagramas
- Especificação de Classes
- Diagramas de Sequência e Colaboração

---

## 📂 ARQUIVOS DISPONÍVEIS

- `Aula_01_03-08-2026.txt` - Aula 1: Visão Geral
- `Aula_02_Modelagem_Sistemas_OO.txt` - Aula 2: Modelagem de Sistemas
- `CALENDARIO_AULAS.txt` - Calendário detalhado
- `README.md` - Este arquivo

---

## 🎓 COMPETÊNCIAS DESENVOLVIDAS

✅ Aplicar técnicas de análise, avaliação e revisão de modelos  
✅ Aplicar técnicas e procedimentos de desenvolvimento V&V  
✅ Detectar falhas de software em sistemas críticos  
✅ Aplicar ferramentas, métodos e processos da Engenharia de Software  
✅ Comunicação profissional efetiva  
✅ Trabalho colaborativo em equipe  

---

## 📚 RECURSOS

- **Canvas**: Material didático, listas de exercícios, slides
- **Laboratório**: LABI quando necessário
- **Ferramentas**: Dia, StarUML ou similares para UML
- **Ambiente Virtual**: Plataforma Canvas para aulas síncronas/assíncronas

---

## 💡 DICAS IMPORTANTES

1. **Caderno**: Manter manuscrito completo, datado e em ordem cronológica
2. **Participação**: Aulas expositivas e dialogadas - participar ativamente
3. **Trabalhos**: Entregar dentro dos prazos combinados
4. **Dúvidas**: Tirar com o professor durante as aulas ou em atendimento
5. **Estudos**: Revisar conteúdo regularmente

---

**Status**: ✅ Ativo  
**Período**: 2026/2  
**Última atualização**: 04/08/2026
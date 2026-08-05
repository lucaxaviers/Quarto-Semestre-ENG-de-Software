# Aula 1 — Prática de Paradigma e Programação Orientada a Objetos

*Conceitos fundamentais — 05/08/2026*

---

## 1. Classes

Representam **tipos de peças de software** que serão usadas nos programas.

Se caracterizam por três coisas:

- **Nome**
- **Atributos**
- **Métodos**

---

## 2. Atributos

Atributo é aquele tipo de peça — uma característica **daquele tipo de peça** (da classe). Podem ser classificados em três eixos, ao mesmo tempo:

Eixo
Opções

Quanto a mudar
**Constante** ou **Variável**

Quanto ao acesso
**Público**, **Privativo** ou **Protegido**

Quanto à origem
Característica da própria classe, ou das peças que a utilizam (tipo e valor)

### 2.1 Atributos constantes

Representam características **imutáveis**, como `RA`, `Pai`, `Mãe` etc. em uma classe `Aluno`.

Indicamos que um atributo é constante usando a palavra **`final`** na sua declaração.

### 2.2 Atributos variáveis

Representam características **alteráveis**, como por exemplo o telefone ou o endereço na classe `Aluno`.

### 2.3 Atributos de classe (`static`)

Atributos podem pertencer **à classe** em vez de pertencerem às peças (objetos) individuais. Quando isso acontece:

- Eles **não existem em multiplicidade** — só existe **um único** valor daquele atributo
- Esse valor existe **independentemente** de existirem ou não peças (objetos) daquele tipo criadas
- São indicados pela presença da palavra **`static`** na declaração

```
public class Aluno {
    static int totalAlunos; // pertence à classe, existe só 1, mesmo sem nenhum Aluno criado
    String nome;             // pertence a cada objeto Aluno
}
```

---

## 3. ⚠️ IMPORTANTE

> Atributos precisam **mesmo** ser características daquilo que a classe representa.

---

## 4. Controle de acesso dos atributos

Tipo
Regra

**Privativos**
Não podem ser acessados nem alterados **fora** da classe onde foram definidos

**Públicos**
Podem ser acessados e alterados de fora da classe

**Protegidos**
Serão estudados quando estudarmos **Herança**

**Regra que NUNCA muda:**

- Atributos **variáveis JAMAIS** podem ser públicos
- Atributos **constantes** não têm essa proibição — podem ser públicos

---

## 5. Getters e Setters (recuperadores e alteradores)

Muitas vezes o programa precisa:

- **Alterar** o valor de um atributo (ex: atualizar o telefone de um aluno), ou
- **Recuperar** o valor de um atributo (ex: exibir na tela)

Como os atributos variáveis são privativos, isso se faz através de métodos:

Método
Função
Padrão de nome

**Recuperador (getter)**
Faz `return` do valor do atributo
Começa com **`get`** + nome do atributo — **exceto quando o atributo é `boolean`**, aí usa **`is`** no lugar de `get`

**Alterador (setter)**
Recebe como parâmetro o novo valor, **valida** e, sendo válido, atualiza o valor do atributo
Começa com **`set`** + nome do atributo

**Exceção do boolean:**

```
// Atributo comum -> get
public String getTelefone() { return telefone; }

// Atributo boolean -> is, NÃO get
public boolean isAtivo() { return ativo; }
```

**Um atributo pode combinar de 4 formas:**

- Não ter `get` nem `set`
- Ter só `get`
- Ter só `set`
- Ter `get` e `set`

> **Atenção:** Setters servem para **atualizar** um valor, e **não** para inicializar. A inicialização deve ser feita por **construtores** (assunto que vem em breve).

**Exemplo (classe `Aluno`, atributo `telefone`):**

```
public String getTelefone() {
    return telefone;
}

public void setTelefone(String novoTelefone) {
    // valida antes de atualizar
    if (novoTelefone != null) {
        telefone = novoTelefone;
    }
}
```

---

## 6. Regras universais de nomenclatura em Java

Elemento
Padrão
Exemplo

**Classe**
`PascalCase` — cada palavra começa com maiúscula, sem underline
`ClasseA`, `ClasseB`, `Aluno`, `ContaBancaria`

**Método / função**
`camelCase` — primeira palavra minúscula, demais com maiúscula
`getTelefone`, `setEndereco`, `calcularMedia`

**Atributo / variável**
`camelCase` — mesmo padrão dos métodos
`nomeAluno`, `telefone`, `saldoAtual`

**Constante (`final`)**
`UPPER_SNAKE_CASE` — tudo maiúsculo, palavras separadas por underline (`_`)
`RA_ALUNO`, `MAX_VALOR`, `TAXA_JUROS`

**Pacote (package)**
tudo minúsculo, sem underline
`com.escola.alunos`

**Frase pra decorar:**
*"Classe é PascalCase. Método e atributo são camelCase. Constante é TUDO_MAIUSCULO_COM_UNDERLINE."*

---

## ✅ Checklist do que ficou pronto

- [x] O que são Classes
- [x] O que são Atributos (constantes x variáveis x static/classe)
- [x] Regra do IMPORTANTE (atributo precisa representar a classe)
- [x] Controle de acesso (privativo, público, protegido)
- [x] Getters e Setters (recuperadores e alteradores, exceção do boolean com `is`)
- [x] Regras universais de nomenclatura do Java (classe, método, atributo, constante)

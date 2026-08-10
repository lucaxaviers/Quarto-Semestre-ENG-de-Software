# Título errado: Dicionário de dados: sistema para locadora de veículos

> Este título está errado porque é genérico demais. Um dicionário de dados deve ser específico de um sistema e do cliente.

# Título adequado: Dicionário de dados do sistema de locação de veículos automotores da Localiza S.A.

## Histórico de versões

| Data | Autor | Versão | Comentários |
| ---- | ----- | ------ | ----------- |
| 10/08/2026 | Lucas Xavier | 1.0.0 | Versão inicial com a especificação das entidades: Locador, Veículo e Unidade |

## Entidades

A seguir estão documentadas as entidades e seus dados (atributos), que serão necessários para suportar todas as operações exigidas pelo sistema de locação.

### 1. Cliente

Descrição: representa uma pessoa física ou jurídica (empresa) que aluga um ou mais veículos ao longo do tempo. É importante destacar que clientes que nunca alugaram um veículo devem ser representados.

Atributos:

| Nome | Tipo | Obrigatoriedade | Exemplos |
|------|------|-----------------|----------|
| Código | Inteiro único | Sim | São aceitos números inteiros a partir de 1, incrementados de um em um. |
| Tipo | Lista literal e estática de valores | Sim | A lista é composta de apenas 2 valores: Física (pessoa física) e Jurídica (empresa). |
| Documento | Par chave-valor | Sim | A chave é uma lista estática contendo: "CPF", "CNPJ" e "PASSAPORTE" (pesquisar se o passaporte serve para emissão de um documento fiscal, caso o cliente seja estrangeiro). O valor é o conteúdo textual do documento, com formatação própria. |
| Nome | String livre sem caracteres especiais | Sim | Este é um campo que armazenará, pela primeira vez, o nome do cliente. O nome ou razão social da empresa será corrigido de acordo com a Receita Federal. Sempre o nome será armazenado em maiúsculas para não ter variações ou problemas de formatação em relatórios e listas. |
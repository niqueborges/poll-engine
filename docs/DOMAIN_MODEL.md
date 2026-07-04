# Modelo de Domínio

Este documento descreve as entidades do sistema focando exclusivamente em suas responsabilidades, invariantes e comportamentos, sem qualquer detalhe de implementação técnica (código).

---

## Entidade: User

A entidade User representa uma pessoa única dentro do Poll Engine, capaz de criar e interagir com enquetes.

### Responsabilidades
- Identificar uma pessoa no sistema.
- Possuir um e-mail único que serve como chave primária de negócio.

### Invariantes (Regras que nunca podem ser quebradas)
- O ID interno (UUID) é obrigatório e imutável.
- O nome é obrigatório (não pode ser nulo ou vazio).
- O e-mail é obrigatório e deve possuir formato válido.
- O e-mail deve ser estritamente único em todo o sistema.
- A data de criação (`createdAt`) é obrigatória e imutável.

### Comportamentos (Ações permitidas)
- Alterar o nome (correção ou preferência do usuário).

### Restrições (O que não pode fazer)
- Não pode existir no sistema com um e-mail já cadastrado por outro usuário.
- Não pode ter seu e-mail alterado (nesta versão, o e-mail atua como a âncora de identidade).

---

*Nota: Conforme novas entidades (Poll, Vote, Option) forem adicionadas ao escopo da aplicação, elas deverão ser documentadas e modeladas neste arquivo antes de terem sua primeira linha de código escrita.*

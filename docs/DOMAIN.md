# Domínio do Poll Engine

Este documento centraliza as regras de negócio que governam a aplicação. O código-fonte deve refletir estritamente as regras descritas aqui. O banco de dados é uma consequência destas entidades e regras, e não o contrário.

---

## 1. Usuários (User)

O domínio reconhece a existência de um usuário registrado. Mecanismos de autenticação (JWT, OAuth) são abstraídos pelas camadas de aplicação e infraestrutura.

**Propriedades:**
- `id` (Identificador único)
- `name` (Nome de exibição)
- `email` (Email para contato/identificação)
- `createdAt` (Data de criação do registro)

---

## 2. Enquetes (Poll)

A Enquete é a raiz de agregação do domínio.

**Propriedades:**
- `id`
- `title`
- `description` (Opcional)
- `status` (DRAFT, OPEN, CLOSED, CANCELLED)
- `ownerId` (ID do usuário que a criou)
- `createdAt`
- `updatedAt`
- `openedAt` (Registrado na transição para OPEN)
- `closedAt` (Opcional, registrado na transição para CLOSED)
- `options` (Lista de Opções vinculadas)

**Regras do Ciclo de Vida:**
1. Toda enquete nasce no estado `DRAFT`.
2. Apenas enquetes no estado `DRAFT` podem ser editadas (alteração de título, descrição e lista de opções).
3. A transição para `OPEN` (Publicar) bloqueia a adição ou remoção de opções permanentemente.
4. Apenas enquetes no estado `OPEN` podem receber votos.
5. Apenas o "Dono" (`ownerId`) possui permissão para Editar, Publicar, Encerrar ou Cancelar a enquete.
6. Uma enquete que atingiu o status `CLOSED` ou `CANCELLED` não pode retornar para os estados anteriores (DRAFT ou OPEN).

---

## 3. Opções (Option)

**Regras:**
1. Toda enquete deve conter, no mínimo, **2 opções**. Não existe enquete de opção única.
2. Toda enquete pode conter, no máximo, **10 opções** (Este limite pode ser parametrizado em futuras versões).
3. Opções não podem ser manipuladas (adicionadas ou removidas) quando a enquete já estiver publicada.

---

## 4. Votos (Vote)

**Regras:**
1. **Unicidade:** Um usuário só pode votar uma única vez em cada enquete.
2. **Cardinalidade:** Um voto pertence a exatamente uma opção.
3. **Restrição de Estado:** Um voto só é processado e aceito se a enquete vinculada estiver no estado `OPEN`.
4. **Anonimato:** Não existe voto anônimo (todos são vinculados ao `userId`).
5. **Imutabilidade:** Nesta versão do sistema, um voto computado não pode ser alterado ou removido pelo usuário.

---

## 5. Resultados (Results)

O resultado é uma visão consolidada de uma enquete.

**Composição exigida:**
- Total absoluto de votos da enquete.
- Votos absolutos agrupados por opção.
- Percentual de votos por opção (calculado dinamicamente no momento da extração, sem persistência fixa).
- Opção vencedora (A que possui o maior número de votos. Em caso de empate, todos os empatados no topo).

---

## 6. Casos de Uso da Primeira Versão (Application Layer)

Os fluxos de aplicação expostos pelo Domínio são restritos a:

**Users:**
- `CreateUser`
- `GetUser`
- `ListUsers`

**Polls (Inclui gerenciamento de Options):**
- `CreatePoll`
- `UpdatePoll`
- `PublishPoll`
- `ClosePoll`
- `CancelPoll`
- `GetPoll`
- `ListPolls`
- `AddOption`
- `RemoveOption`

**Votes:**
- `VotePoll`
- `GetPollResult`

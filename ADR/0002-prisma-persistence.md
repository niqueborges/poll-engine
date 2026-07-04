# ADR 0002 - Escolha do Prisma como camada de persistência

## Contexto

A aplicação precisa de uma camada de persistência robusta, tipada e que respeite a arquitetura limpa (Clean Architecture). A escolha da ferramenta de ORM (Object-Relational Mapping) impacta a produtividade, a segurança de tipos e o acoplamento do sistema com o banco de dados.

## Decisão

Foi adotado o **Prisma ORM** como ferramenta principal para a persistência de dados.

## Alternativas Consideradas

- **TypeORM**: Embora seja muito popular no ecossistema NestJS, depende fortemente do padrão Active Record e do uso de decorators (`@Entity()`, `@Column()`). Isso incentiva o vazamento de detalhes de banco de dados para a camada de Domínio, dificultando o isolamento requerido pela Clean Architecture sem um excesso de mapeamento verboso.
- **Drizzle / MikroORM**: São excelentes alternativas. O MikroORM lida bem com Clean Architecture utilizando Unit of Work, mas possui uma curva de aprendizado mais íngreme. O Drizzle foca em SQL-first e type-safety, porém o ecossistema e as migrações do Prisma são mais maduros e oferecem maior velocidade no desenvolvimento inicial.

## Consequências

- **Isolamento via Repositórios**: Como o Prisma gera tipos próprios e gerencia a conexão, ele será confinado à camada de `infrastructure`. O Domínio nunca interagirá com o Prisma, sendo mediado exclusivamente por Repositórios e Interfaces.
- **Cliente Customizado**: O cliente do Prisma é gerado localmente em `src/infrastructure/database/prisma/client` para não depender do caminho padrão e evitar quebras de compilação por regras de isolamento de módulos.
- **Maior segurança de tipos e produtividade**: As queries e migrações se tornam automáticas e fortemente tipadas.

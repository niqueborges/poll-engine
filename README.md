
# Poll Service

## Visão Geral

O Poll Service é um serviço responsável pelo gerenciamento de enquetes e votações em tempo real.

Seu objetivo é disponibilizar uma API reutilizável para diferentes sistemas da empresa, permitindo criar enquetes, registrar votos, acompanhar resultados e gerenciar o ciclo de vida das votações.

Este serviço foi projetado para ser independente das aplicações consumidoras, permitindo que novos produtos utilizem a mesma API sem necessidade de reimplementar regras de negócio.

---

# Contexto

A empresa possui diversos produtos que eventualmente necessitam realizar votações.

Exemplos:

- Pesquisa de satisfação de clientes
- Escolha de funcionalidades para roadmap
- Votação entre colaboradores
- Assembleias
- Eleições internas
- Enquetes públicas
- Confirmação de presença em eventos
- Pesquisas de opinião

Atualmente cada equipe implementa sua própria solução, gerando duplicação de código, inconsistência nas regras de votação e maior custo de manutenção.

Foi decidido criar um serviço centralizado responsável exclusivamente pelo domínio de votações.

---

# Objetivos

O serviço deverá:

- permitir criação de enquetes;
- permitir múltiplas opções por enquete;
- registrar votos;
- impedir votos inválidos;
- impedir votos duplicados;
- calcular resultados automaticamente;
- disponibilizar resultados em tempo real;
- controlar abertura, encerramento e cancelamento de enquetes.

---

# Objetivos Arquiteturais

O projeto deve priorizar:

- simplicidade;
- legibilidade;
- testabilidade;
- baixo acoplamento;
- alta coesão;
- facilidade de manutenção;
- facilidade de evolução.

---

# Escopo

## Incluído

- gerenciamento de usuários;
- gerenciamento de enquetes;
- gerenciamento de opções;
- registro de votos;
- consulta de resultados;
- encerramento de enquetes;
- cancelamento de enquetes;
- ranking de enquetes.

## Fora do escopo

Nesta primeira versão não serão implementados:

- autenticação;
- autorização;
- notificações;
- WebSocket;
- filas;
- cache distribuído;
- multiempresa (multi-tenant);
- internacionalização.

Essas funcionalidades poderão ser adicionadas futuramente sem necessidade de reescrever a arquitetura.

---

# Arquitetura

O projeto seguirá uma adaptação da Clean Architecture.

```
Presentation

↓

Application

↓

Domain

↓

Infrastructure
```

As regras de negócio permanecerão isoladas do banco de dados, do framework e de bibliotecas externas.

---

# Tecnologias

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker
- Swagger/OpenAPI
- Jest

---

# Requisitos Não Funcionais

O sistema deverá possuir:

- documentação automática;
- testes automatizados;
- tratamento global de exceções;
- logs estruturados;
- validação de entrada;
- versionamento da API;
- configuração por ambiente.

---

# Evolução Prevista

A arquitetura foi planejada para permitir futuras implementações como:

- autenticação JWT;
- OAuth;
- RBAC;
- WebSocket para resultados em tempo real;
- filas de processamento;
- auditoria;
- métricas;
- observabilidade;
- cache Redis;
- múltiplas organizações;
- importação/exportação de resultados.

---

# Filosofia do Projeto

Este projeto possui caráter educacional, mas será desenvolvido seguindo práticas utilizadas em sistemas reais.

O objetivo não é apenas entregar uma API funcional, mas construir um código de fácil manutenção, alta legibilidade e preparado para evolução contínua.

Cada decisão arquitetural será documentada por meio de ADRs (Architecture Decision Records).

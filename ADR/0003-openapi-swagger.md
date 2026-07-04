# ADR 0003 - Uso do OpenAPI através do @nestjs/swagger

## Contexto

A aplicação precisa expor seus contratos de forma clara e acessível para os consumidores da API. Documentações isoladas (Wikis, arquivos PDF) tendem a ficar rapidamente desatualizadas em relação ao código real. A abordagem "Docs as Code" é necessária para manter a sincronia entre a implementação e o contrato.

## Decisão

Foi decidido utilizar a especificação **OpenAPI** integrada diretamente no código através da biblioteca oficial `@nestjs/swagger`, utilizando a abordagem de **decorators explícitos** (`@ApiProperty()`, `@ApiOperation()`, `@ApiResponse()`).

## Alternativas Consideradas

1. **Swagger CLI Plugin (NestJS):**
   - Automatiza a geração da documentação lendo as propriedades diretamente do AST do TypeScript, sem a necessidade de decorators explícitos nos DTOs e Controllers.
   - *Por que foi descartada?* Oculta o funcionamento do contrato. Como este é um projeto educacional estruturado com as melhores práticas de design de software, o uso de decorators explícitos garante que quem lê o código compreende imediatamente o contrato que está sendo exposto (parâmetros, respostas de erro mapeadas, tags).
2. **Escrever o arquivo `swagger.yaml` manualmente:**
   - Desacoplamento total, mas altíssimo risco de descompasso. A manutenção dupla exigiria esforço que não compensa a vantagem do desacoplamento nesta camada.

## Consequências

- **Verbosidade controlada:** Os DTOs e Controllers terão decorators adicionais, o que aumenta a quantidade de linhas de código, mas fornece transparência imediata.
- **Evolução em conjunto:** Erros de HTTP (400, 404, 409, 422) deverão ser mapeados explícita e antecipadamente nos métodos de controle.
- **Documentação centralizada:** Informações descritivas e metadados, além da versão da API, serão refletidas dinamicamente a partir do `package.json` na rota de `/docs`.

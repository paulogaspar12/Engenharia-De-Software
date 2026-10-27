# SGE — Sistema de Gestão Escolar (frontend inicial)

## Estado actual
**Fase 1 — Estrutura visual e interacções demonstrativas.**

Este protótipo contém um dashboard responsivo feito com HTML5, CSS3 e JavaScript puro. Ainda não está ligado à base de dados nem ao backend Java.

## Como executar
1. Descompacte o projecto.
2. Abra `index.html` num navegador moderno.
3. Para desenvolvimento, recomenda-se abrir a pasta no VS Code e usar a extensão Live Server.

Não é necessária instalação de dependências JavaScript.

## Funcionalidades já incluídas
- Layout responsivo com menu lateral.
- Dashboard com indicadores, tabela de alunos e ocorrências demonstrativas.
- Pesquisa local na tabela de alunos.
- Alternância entre tema claro e escuro (preferência guardada no navegador).
- Calendário com navegação entre meses.
- Modais e notificações para acções demonstrativas.
- Atalhos: `Ctrl + K` ou `Cmd + K` para focar a pesquisa.

## Limitações actuais
- Os dados são fictícios e estão escritos no HTML.
- Os formulários e botões ainda não gravam dados.
- Não existe autenticação nem ligação à base de dados.
- Os relatórios e a impressão serão implementados numa fase posterior; antes de imprimir, o sistema deverá mostrar a fase actual, os trabalhos concluídos, as pendências e os próximos passos.

## Estrutura
- `index.html` — estrutura semântica da interface.
- `css/styles.css` — layout, componentes e media queries.
- `js/app.js` — interacções, pesquisa, tema e calendário.
- `docs/diario-desenvolvimento.md` — registo de fases e decisões.

## Próxima fase
Analisar a base de dados existente e adaptar o modelo visual antes de implementar o backend Java/Spring Boot.

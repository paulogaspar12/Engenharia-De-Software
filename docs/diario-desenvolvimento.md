# Diário de desenvolvimento — SGE

## Fase 1 — Estrutura visual do frontend
**Estado:** concluída como protótipo visual.

### Objectivo
Criar uma primeira versão navegável da interface usando HTML5, CSS3 e JavaScript, sem avançar ainda para o backend.

### Trabalho realizado
- Criado o menu lateral e a barra superior.
- Criado o dashboard com indicadores, alunos recentes, distribuição por turmas, ocorrências e notificações.
- Adicionada pesquisa local na tabela de alunos.
- Adicionado tema claro/escuro.
- Adicionado calendário navegável.
- Adicionadas mensagens e modais demonstrativos para acções rápidas.
- Criado layout adaptável a ecrãs menores.

### O que ainda não está feito
- Ligação à base de dados.
- Autenticação e permissões.
- Formulários funcionais para criar/editar alunos.
- Relatórios ligados a dados reais e fluxo de pré-visualização antes da impressão.
- Testes automatizados.

### Próxima fase
Analisar o SQL e o layout existente para confirmar tabelas, relações e requisitos. Depois, preparar a integração com Java/Spring Boot sem duplicar a base de dados.

## Decisões
- Usar JavaScript sem framework nesta fase para manter o protótipo simples.
- Separar HTML, CSS e JavaScript em ficheiros distintos.
- Usar dados fictícios na interface; não inserir dados pessoais reais no protótipo.
- Tratar a versão actual como protótipo e não como sistema pronto para produção.

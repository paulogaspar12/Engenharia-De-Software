# Diário de desenvolvimento — SGE

## Fase 1 — Estrutura visual inicial
**Estado:** concluída como protótipo.

Foi criado o dashboard responsivo com HTML5, CSS3 e JavaScript puro. A interface apresenta indicadores, alunos demonstrativos, ocorrências, navegação, pesquisa, tema claro/escuro e calendário.

### Limitações identificadas
- Os dados são fictícios.
- Ainda não existe autenticação nem ligação à base de dados.
- Os módulos anteriores não fazem operações reais no servidor.

## Fase 2 — Controlo de perfis e permissões
**Estado:** protótipo frontend implementado.

### Objectivo
Preparar a interface de administração dos perfis de acesso antes de implementar o backend de autenticação.

### O que foi feito
- Adicionado o menu **Perfis e Acessos**.
- Criada a lista inicial de seis perfis: Administrador, Direção, Secretaria, Professor, Responsável disciplinar e Consulta.
- Criado o formulário para adicionar e editar perfis.
- Criada a matriz de permissões por módulo e operação: consultar, criar, editar e eliminar.
- Permite editar permissões, activar/desactivar perfis e eliminar perfis personalizados.
- Adicionada pesquisa por nome e descrição.
- As alterações são guardadas no `localStorage` do navegador para fins demonstrativos.
- A interface é responsiva e acompanha o tema claro/escuro.

### Como testar esta fase
1. Abrir `index.html` no navegador ou usar Live Server no VS Code.
2. No menu lateral, escolher **Perfis e Acessos**.
3. Criar um perfil personalizado.
4. Seleccionar **Permissões** e alterar operações em alguns módulos.
5. Actualizar a página para confirmar que os dados demonstrativos persistem no mesmo navegador.

### Decisões técnicas
- Continuar com JavaScript sem framework para manter o protótipo simples e fácil de manter.
- Separar estrutura (`index.html`), estilos (`css/styles.css`) e comportamento (`js/app.js`).
- Usar uma matriz de permissões baseada em módulo e operação.
- Não guardar dados pessoais reais nesta fase.

### Limitações e segurança
Este ecrã **não constitui um sistema de segurança real**. `localStorage` pode ser alterado pelo utilizador e não protege páginas, APIs nem dados. A autorização real deverá ser aplicada no backend Java com Spring Security, com verificação em cada operação. As palavras-passe nunca devem ser guardadas em texto simples.

### Próxima fase recomendada
1. Analisar a base de dados já definida e evitar tabelas duplicadas.
2. Confirmar os perfis e permissões com os responsáveis da escola.
3. Implementar entidades e relações no backend Java/Spring Boot.
4. Implementar autenticação, sessões seguras e autorização no servidor.
5. Testar acessos permitidos e negados para cada perfil.

## Controlo de versões (Git)
Sugestão de sequência para registar esta fase:

```bash
git status
git add index.html css/styles.css js/app.js docs/diario-desenvolvimento.md README.md
git commit -m "feat: adicionar prototipo de controlo de perfis"
```

Se o repositório ainda não estiver iniciado:

```bash
git init
git branch -M main
git add .
git commit -m "chore: iniciar projecto SGE"
```

Não adicionar credenciais, palavras-passe, ficheiros `.env` ou dados reais de alunos ao repositório.

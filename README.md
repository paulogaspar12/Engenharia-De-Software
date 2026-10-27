# SGE — Sistema de Gestão Escolar

Protótipo frontend em HTML5, CSS3 e JavaScript puro.

## Versão 2 — Controlo de perfis
Esta versão adiciona uma área de gestão de perfis e permissões demonstrativas.

### Executar
1. Descompacte o projecto.
2. Abra a pasta no Visual Studio Code.
3. Abra `index.html` directamente ou execute com a extensão Live Server.

Não são necessárias dependências JavaScript nem servidor para testar o protótipo.

### Testar o controlo de perfis
1. Seleccione **Perfis e Acessos** no menu lateral.
2. Crie ou edite um perfil.
3. Abra **Permissões** para seleccionar as operações permitidas por módulo.
4. As alterações são guardadas no `localStorage` do navegador.

### Estrutura
```text
sge-v2/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── assets/
│   └── dashboard-referencia.png
└── docs/
    └── diario-desenvolvimento.md
```

### Aviso importante
Esta é apenas uma demonstração de interface. Os perfis e permissões no navegador **não impedem acessos indevidos** e não devem ser usados para proteger dados reais. A segurança efectiva será implementada no backend Java/Spring Security, depois de analisarmos a base de dados existente.

Consulte `docs/diario-desenvolvimento.md` para o registo das fases, decisões, limitações e comandos Git.

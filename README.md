# Calculadora + Jogo — Projeto

Este repositório contém duas páginas simples em HTML/CSS/JS:

- `calculadora.html` — uma calculadora funcional com suporte a teclado, percent, toggle-sign e tratamento de erros.
- `jogo2/` — jogo "Acerta o Alvo" (HTML/CSS/JS).

Como executar (local):

1. Abra um terminal na pasta do projeto:

```bash
cd C:\Users\balas\Downloads\calculadora
```

2. Inicie um servidor estático (recomendado `serve` via npx):

```bash
npx serve -l 3001 .
```

3. Abra no navegador:

- Página inicial (launcher): http://localhost:3001/
- Calculadora: http://localhost:3001/calculadora.html
- Jogo: http://localhost:3001/jogo2/

Notas
- O `index.html` na raiz serve como launcher para ambos os projetos.
- O jogo e a calculadora foram ajustados para corrigir problemas de inicialização, posicionamento e erros de cálculo.

Se desejar, posso também criar um branch de release e abrir um PR com essas mudanças.

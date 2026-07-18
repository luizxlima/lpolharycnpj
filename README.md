# Template de Landing Page Premium (Estilo Conversão Extrema)

Este é um template de Landing Page de alta performance, projetado com foco em conversão e com um visual dark mode premium com detalhes em neon. O design é totalmente responsivo (otimizado para dispositivos móveis) e inclui animações fluidas e componentes interativos (FAQ acordeão, timer de contagem regressiva dinâmico e botão flutuante de WhatsApp).

---

## 📁 Estrutura de Arquivos

```text
lp-conversao-extrema/
├── index.html          # Estrutura HTML5 semântica comentada
├── style.css           # Folha de estilos (Design System com variáveis HSL)
├── script.js           # Lógica interativa (Acordeão, Revelação e Cronômetro)
└── assets/
    └── images/
        └── hero-dashboard.png  # Imagem de mockup do Hero (painel gerado)
```

---

## 🚀 Como Customizar o Template

### 1. Cores e Identidade Visual (CSS Variables)
No topo do arquivo `style.css`, você encontrará a seção `:root` com variáveis CSS. Alterando esses valores, você modifica as cores em toda a página de uma só vez:

```css
:root {
  /* Altere a cor principal de destaque (Neon) */
  --primary: hsl(158, 100%, 41%); /* Padrão: Verde Neon */
  
  /* Altere a cor secundária (Bônus, bordas alternativas) */
  --secondary: hsl(263, 90%, 51%); /* Padrão: Roxo Elétrico */

  /* Altere a cor de fundo geral */
  --bg-dark: hsl(222, 47%, 4%); /* Padrão: Azul Escuro muito escuro */
}
```

### 2. Alterando Textos e Títulos
O arquivo `index.html` contém comentários com `<!-- COMENTÁRIO: ... -->` indicando exatamente onde estão os textos estruturais. Basta procurar por estas tags e trocar o texto de exemplo pelo do seu produto.

### 3. Substituindo a Imagem do Hero
A imagem padrão está em `assets/images/hero-dashboard.png`. Para usar o seu próprio mockup (uma foto do seu curso, painel da sua plataforma ou logo):
1. Salve sua imagem em formato `.png` ou `.webp` (preferencialmente transparente).
2. Substitua o arquivo dentro da pasta `assets/images/` ou mude o caminho no atributo `src` da tag `<img>` na seção Hero do `index.html` (Linha ~78).

### 4. Configurando o Botão do WhatsApp
No arquivo `index.html` (Linha ~466), procure pela div `.floating-cta`. Altere o número de telefone no link para o seu próprio:
```html
href="https://wa.me/5500000000000?text=Olá..."
<!-- Troque o "5500000000000" pelo código do país (55) + DDD + seu número -->
```

### 5. Configurando o Temporizador (Urguência)
O script calcula automaticamente o cronômetro para resetar e contar as horas restantes até a meia-noite do dia atual. Caso queira definir uma data fixa no futuro para encerramento de um lançamento, edite a função `getRemainingTime` no arquivo `script.js`.

---

## 💻 Como Visualizar Localmente
Basta abrir o arquivo `index.html` em qualquer navegador ou rodar um servidor local leve (como a extensão Live Server do VS Code ou usando `npx http-server` no terminal).

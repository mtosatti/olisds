# OLIS Data Solutions - Website

Site institucional da OLIS Data Solutions - Consultoria e implantação de soluções de Business Intelligence.

## 📁 Estrutura do Projeto

```
olisds/
├── README.md                    # Este arquivo
└── site/
    ├── scr/
    │   ├── index.html          # Página principal do site
    │   └── assets/             # Recursos visuais
    │       ├── logo.svg        # Logo da empresa
    │       ├── airflow.svg     # Ícone Apache Airflow
    │       ├── fivetran.svg    # Ícone Fivetran
    │       ├── mysql.svg       # Ícone MySQL
    │       ├── postgres.svg    # Ícone PostgreSQL
    │       ├── powerbi.svg     # Ícone Power BI
    │       └── snowflake.svg   # Ícone Snowflake
    ├── css/
    │   └── styles.css          # Estilos do site
    ├── js/
    │   └── script.js           # JavaScript (interações, formulário, etc.)
    ├── CONFIGURACAO_EMAIL.md   # Guia de configuração do EmailJS
    └── README.md               # Documentação do site
```

## 🚀 Funcionalidades

### ✅ Implementadas
- [x] Design responsivo para todos os dispositivos
- [x] Animações suaves e efeitos visuais
- [x] Seções: Hero, Estatísticas, Serviços, Ferramentas, Processo, Time, Contato
- [x] Formulário de contato com EmailJS
- [x] Proteção contra spam com Google reCAPTCHA v3
- [x] Máscara automática no campo de telefone: (99) 99999-9999
- [x] Ícones de LinkedIn para membros do time
- [x] Modais para Política de Privacidade e Termos de Uso
- [x] Navegação com scroll suave
- [x] Menu mobile responsivo

### 🎨 Design
- Paleta de cores: Azul (#2563eb) e Ciano (#06b6d4)
- Fonte principal: Inter
- Fonte de destaque: Exo 2
- Componentes com sombras e gradientes modernos
- Efeitos hover interativos

## ⚙️ Configuração

### 1. Abrir o Site Localmente
Simplesmente abra o arquivo `site/scr/index.html` em um navegador web moderno.

### 2. Configurar Formulário de Contato
Para ativar o envio de emails pelo formulário, siga o guia completo em:
**[site/CONFIGURACAO_EMAIL.md](site/CONFIGURACAO_EMAIL.md)**

Resumo:
1. Criar conta no [EmailJS](https://www.emailjs.com/) (gratuito)
2. Criar conta no [Google reCAPTCHA](https://www.google.com/recaptcha/admin) (gratuito)
3. Configurar as chaves em:
   - `site/scr/index.html` (linha 22)
   - `site/js/script.js` (linhas 178-181)

## 🔧 Customização

### Alterar Conteúdo
Edite o arquivo `site/scr/index.html` para modificar:
- Textos das seções
- Informações dos membros do time
- Links de redes sociais
- Dados de contato

### Alterar Estilos
Edite o arquivo `site/css/styles.css` para modificar:
- Cores (variáveis CSS no `:root`)
- Tipografia
- Espaçamentos
- Animações

### Alterar Comportamentos
Edite o arquivo `site/js/script.js` para modificar:
- Interações
- Validações do formulário
- Animações JavaScript

## 📋 Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- Conexão com internet (para fontes Google e bibliotecas CDN)

## 🌐 Deploy

### Hospedagem Estática
Este é um site estático puro (HTML, CSS, JS). Pode ser hospedado em:
- **GitHub Pages** (gratuito)
- **Netlify** (gratuito)
- **Vercel** (gratuito)
- **AWS S3** + CloudFront
- Qualquer servidor web tradicional

### Passos para Deploy:
1. Faça upload da pasta `site` completa para o servidor
2. Configure o domínio `olisds.tech` para apontar para o servidor
3. Atualize as chaves do EmailJS e reCAPTCHA com o domínio de produção
4. Teste o formulário de contato

## 🔒 Segurança

- **reCAPTCHA v3**: Proteção invisível contra bots e spam
- **HTTPS**: Recomendado para produção
- **Validação**: Campos do formulário validados no frontend
- **Rate Limiting**: EmailJS limita envios (200/mês no plano gratuito)

## 📱 Responsividade

O site é totalmente responsivo e testado em:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com Flexbox e Grid
- **JavaScript (ES6+)**: Interatividade e validações
- **EmailJS**: Serviço de envio de emails
- **Google reCAPTCHA v3**: Proteção contra spam
- **Google Fonts**: Fontes Inter e Exo 2
- **SVG**: Ícones e animações vetoriais

## 📞 Contato

- **Email**: comercial@olisds.com.br
- **LinkedIn**: [OLIS Data Solutions](https://linkedin.com)
- **Website**: olisds.com.br

## 📄 Licença

© 2024 OLIS Data Solutions. Todos os direitos reservados.

---

**Desenvolvido com ❤️ por OLIS Data Solutions**

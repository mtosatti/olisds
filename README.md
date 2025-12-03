# OLIS Data Solutions - Website

Site institucional da OLIS Data Solutions - Consultoria e implantação de soluções de Business Intelligence.

## 📁 Estrutura do Projeto

```
olisds/
├── README.md                    # Este arquivo
├── index.html                   # Página principal do site
├── blog.html                    # Página do blog com artigos técnicos
├── sitemap.xml                  # Mapa do site para SEO
├── robots.txt                   # Instruções para crawlers
├── assets/                      # Recursos visuais
│   ├── logo.svg                # Logo da empresa
│   ├── airflow.svg             # Ícone Apache Airflow
│   ├── fivetran.svg            # Ícone Fivetran
│   ├── mysql.svg               # Ícone MySQL
│   ├── postgres.svg            # Ícone PostgreSQL
│   ├── powerbi.svg             # Ícone Power BI
│   └── snowflake.svg           # Ícone Snowflake
├── css/
│   └── styles.css              # Estilos do site (incluindo blog)
├── js/
│   └── script.js               # JavaScript (interações, formulário, etc.)
└── CONFIGURACAO_EMAIL.md       # Guia de configuração do EmailJS
```

## 🚀 Funcionalidades

### ✅ Implementadas
- [x] Design responsivo para todos os dispositivos
- [x] Animações suaves e efeitos visuais
- [x] Seções: Hero, Estatísticas, Serviços, Ferramentas, Processo, Time, Blog, FAQ, Contato
- [x] **Blog Técnico** com 4 artigos em tom formal sobre BI e Analytics
- [x] Formulário de contato com EmailJS
- [x] Proteção contra spam com Google reCAPTCHA v3
- [x] Máscara automática no campo de telefone: (99) 99999-9999
- [x] Ícones de LinkedIn para membros do time
- [x] Modais para Política de Privacidade e Termos de Uso
- [x] Navegação com scroll suave
- [x] Menu mobile responsivo
- [x] **SEO Completo:** sitemap.xml, robots.txt, meta tags, Open Graph, Schema.org
- [x] **FAQ Accordion** com 8 perguntas relevantes

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

## 🔍 SEO e Marketing

### Otimizações Implementadas
- ✅ **Sitemap.xml** - Mapeamento completo do site
- ✅ **Robots.txt** - Instruções para crawlers
- ✅ **Meta Tags Otimizadas** - Title, description, keywords
- ✅ **Open Graph** - Compartilhamento bonito no Facebook/LinkedIn
- ✅ **Twitter Cards** - Preview otimizado no Twitter
- ✅ **Schema.org JSON-LD** - Dados estruturados para rich snippets
- ✅ **Geo Tags** - SEO local para São Paulo
- ✅ **FAQPage Schema** - FAQ aparece nos resultados do Google

### 📋 Próximos Passos para SEO
**Leia:** [SEO_GUIA.md](SEO_GUIA.md) e [RESUMO_SEO.md](RESUMO_SEO.md)

**Obrigatório:**
1. Configurar Google Search Console
2. Criar imagem Open Graph (1200x630px)
3. Enviar sitemap ao Google
4. Garantir HTTPS ativo

**Recomendado:**
- Configurar Google Analytics 4
- Criar Google Business Profile
- ✅ ~~Implementar estratégia de conteúdo (blog)~~ **Concluído!**

## 📝 Blog

### Artigos Publicados
O site conta com uma seção de blog dedicada a compartilhar conhecimento técnico sobre Business Intelligence e Analytics:

1. **Business Intelligence: o que é e para que serve**
   - Fundamentos do BI
   - Componentes essenciais (ETL, Data Warehouse, visualização)
   - Aplicações práticas e benefícios

2. **A importância dos dados no processo de tomada de decisão**
   - Dados como ativos estratégicos
   - Redução de incertezas e eliminação de vieses
   - Agilidade e alinhamento organizacional

3. **Kimball e Inmon: metodologias diferentes, um mesmo objetivo**
   - Comparação detalhada entre as metodologias
   - Abordagem bottom-up vs top-down
   - Cenários de aplicação

4. **Star Schema: uma modelagem que objetiva performance e a análise dos dados**
   - Estrutura fundamental do Star Schema
   - Otimização de performance
   - Padrões avançados e boas práticas

### Características do Blog
- Artigos em **tom formal e técnico**
- Conteúdo direcionado a profissionais de TI e gestores
- Design consistente com o restante do site
- Totalmente responsivo
- Otimizado para SEO com meta tags específicas
- Schema.org markup para melhor indexação

---

## 📄 Licença

© 2024 OLIS Data Solutions. Todos os direitos reservados.

---

**Desenvolvido com ❤️ por OLIS Data Solutions**

# OLIS Data Solutions - Website

Site moderno e responsivo para a OLIS Data Solutions, empresa especializada em consultoria e implantação de soluções de Business Intelligence.

## 🚀 Características

- ✨ Design moderno e minimalista
- 📱 Totalmente responsivo (mobile, tablet e desktop)
- 🎨 Animações suaves e interativas
- ⚡ Performance otimizada
- 🔍 SEO-friendly
- ♿ Acessível (WCAG compliant)
- 🎯 Navegação intuitiva

## 📁 Estrutura de Arquivos

```
olisds/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript para interatividade
├── logo.svg            # Logo da empresa
├── bruno.jpg           # Foto do Bruno (você precisa adicionar)
├── matheus.jpg         # Foto do Matheus (você precisa adicionar)
└── README.md           # Este arquivo
```

## 🎯 Seções do Site

1. **Hero Section** - Apresentação principal com call-to-action
2. **Serviços** - Três serviços principais:
   - Solução de Dados
   - Modelagem
   - Visualização
3. **Ferramentas** - Tecnologias que utilizamos:
   - Grid com 12 ferramentas principais (Fivetran, Looker, Snowflake, dbt, BigQuery, Tableau, Power BI, MySQL, Oracle, SQL Server, PostgreSQL, Apache Airflow)
   - Marquee animado com logos das ferramentas
   - Efeito hover com cores e animações
4. **Sobre Nós** - Apresentação da equipe (Bruno e Matheus)
5. **Contato** - Formulário e informações de contato

## 🛠️ Como Usar

### Opção 1: Abrir Localmente

1. Simplesmente abra o arquivo `index.html` em um navegador moderno
2. O site funcionará perfeitamente sem necessidade de servidor

### Opção 2: Com Servidor Local (Recomendado)

Para melhor experiência durante o desenvolvimento, use um servidor local:

#### Usando Python:
```bash
# Python 3
python -m http.server 8000

# Ou Python 2
python -m SimpleHTTPServer 8000
```

#### Usando Node.js:
```bash
# Instale o http-server globalmente
npm install -g http-server

# Execute
http-server
```

#### Usando VS Code:
- Instale a extensão "Live Server"
- Clique com o botão direito em `index.html`
- Selecione "Open with Live Server"

Acesse: `http://localhost:8000` (ou a porta configurada)

## 📸 Adicionando Fotos da Equipe

Você precisa adicionar as fotos dos membros da equipe:

1. Salve a foto do **Bruno Vendruscolo** como `bruno.jpg`
2. Salve a foto do **Matheus Tosatti** como `matheus.jpg`
3. Coloque ambas as fotos na pasta raiz do projeto
4. Recomendação: Use imagens quadradas de pelo menos 400x400px para melhor qualidade

## 🎨 Personalização

### Cores

As cores principais podem ser alteradas no arquivo `styles.css` na seção `:root`:

```css
:root {
    --primary-color: #2563eb;      /* Azul principal */
    --primary-dark: #1e40af;       /* Azul escuro */
    --secondary-color: #0ea5e9;    /* Azul secundário */
    --accent-color: #06b6d4;       /* Azul claro */
}
```

### Conteúdo

Edite o arquivo `index.html` para alterar:
- Textos e descrições
- Links das redes sociais
- Informações de contato
- Conteúdo dos serviços

### Logo

Para substituir o logo:
- Substitua o arquivo `logo.svg` pelo seu logo
- Ou edite o arquivo SVG existente com as cores e formas desejadas

## 📧 Configuração do Formulário de Contato

O formulário de contato atualmente exibe apenas uma mensagem de sucesso. Para integrá-lo com um backend:

### Opção 1: Usando FormSpree (Grátis e Fácil)

1. Acesse [formspree.io](https://formspree.io)
2. Crie uma conta gratuita
3. Crie um novo formulário
4. Substitua no `script.js`:

```javascript
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    try {
        const response = await fetch('https://formspree.io/f/SEU_ID_AQUI', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            showNotification('Mensagem enviada com sucesso!', 'success');
            contactForm.reset();
        }
    } catch (error) {
        showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
    }
});
```

### Opção 2: Integração com Backend Próprio

Se você tiver um servidor backend, modifique a URL no código acima para apontar para sua API.

## 🌐 Deploy

### GitHub Pages (Grátis)

1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Vá em Settings > Pages
4. Selecione a branch main
5. Seu site estará em `https://seu-usuario.github.io/nome-do-repositorio`

### Netlify (Grátis - Recomendado)

1. Acesse [netlify.com](https://netlify.com)
2. Arraste a pasta do projeto para o site
3. Pronto! Seu site estará online

### Vercel (Grátis)

1. Instale o Vercel CLI: `npm i -g vercel`
2. Na pasta do projeto: `vercel`
3. Siga as instruções

## 📱 Redes Sociais

Atualize os links das redes sociais no arquivo `index.html`:

```html
<a href="https://linkedin.com/company/sua-empresa" target="_blank">
<a href="https://instagram.com/sua-empresa" target="_blank">
```

## ✅ Checklist de Lançamento

Antes de colocar o site no ar, verifique:

- [ ] Adicionar fotos da equipe (bruno.jpg e matheus.jpg)
- [ ] Atualizar links das redes sociais
- [ ] Configurar formulário de contato
- [ ] Testar em diferentes navegadores
- [ ] Testar em diferentes dispositivos (mobile, tablet, desktop)
- [ ] Verificar todos os links
- [ ] Otimizar imagens para web
- [ ] Adicionar favicon
- [ ] Configurar Google Analytics (opcional)
- [ ] Testar performance com Lighthouse

## 🔧 Tecnologias Utilizadas

- HTML5 semântico
- CSS3 (Grid, Flexbox, Animations)
- JavaScript (Vanilla - sem frameworks)
- Google Fonts (Inter)
- SVG para gráficos vetoriais

## 📊 Performance

O site foi otimizado para:
- Carregamento rápido
- SEO
- Acessibilidade
- Mobile-first
- Animações performáticas

## 🐛 Problemas Comuns

### Imagens não aparecem
- Verifique se os nomes dos arquivos estão corretos (bruno.jpg, matheus.jpg)
- Verifique se as imagens estão na pasta raiz

### Fontes não carregam
- Certifique-se de ter conexão com internet (Google Fonts)
- Ou baixe a fonte Inter e use localmente

### Menu mobile não funciona
- Verifique se o JavaScript está carregando corretamente
- Abra o console do navegador (F12) para ver erros

## 📞 Suporte

Para dúvidas ou sugestões sobre o site:
- Email: comercial@olisds.tech
- Localização: São Paulo - SP - Brasil

## 📄 Licença

Este site foi desenvolvido para OLIS Data Solutions.

---

Desenvolvido com ❤️ para transformar dados em decisões estratégicas.

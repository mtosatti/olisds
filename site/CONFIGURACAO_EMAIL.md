# Configuração do Formulário de Contato

O formulário de contato do site utiliza **EmailJS** para envio de emails e **Google reCAPTCHA v3** para proteção contra spam e robôs.

## 📋 Pré-requisitos

1. Conta no EmailJS (gratuita)
2. Conta no Google reCAPTCHA (gratuita)
3. Email para receber as mensagens

---

## 🔧 Passo 1: Configurar EmailJS

### 1.1 Criar conta no EmailJS
1. Acesse: https://dashboard.emailjs.com/sign-up
2. Crie uma conta gratuita (permite até 200 emails/mês)

### 1.2 Adicionar serviço de email
1. Acesse: https://dashboard.emailjs.com/admin
2. Clique em **"Add New Service"**
3. Escolha seu provedor de email (Gmail, Outlook, etc.)
4. Siga as instruções para conectar sua conta
5. **Copie o Service ID** (ex: `service_xyz123`)

### 1.3 Criar template de email
1. Acesse: https://dashboard.emailjs.com/admin/templates
2. Clique em **"Create New Template"**
3. Configure o template com as seguintes variáveis:

**Subject (Assunto):**
```
Nova mensagem de contato - {{user_name}}
```

**Content (Conteúdo):**
```
Nome: {{user_name}}
Email: {{user_email}}
Telefone: {{user_phone}}

Mensagem:
{{message}}

---
reCAPTCHA Token: {{g-recaptcha-response}}
```

4. **Copie o Template ID** (ex: `template_abc456`)

### 1.4 Obter Public Key
1. Acesse: https://dashboard.emailjs.com/admin/account
2. Encontre **"Public Key"** na seção API Keys
3. **Copie a Public Key** (ex: `xYz123AbC456`)

---

## 🛡️ Passo 2: Configurar Google reCAPTCHA v3

### 2.1 Criar site no reCAPTCHA
1. Acesse: https://www.google.com/recaptcha/admin/create
2. Preencha os campos:
   - **Label:** OLIS Data Solutions
   - **reCAPTCHA type:** reCAPTCHA v3
   - **Domains:**
     - `localhost` (para testes locais)
     - `olisds.tech` (seu domínio de produção)
3. Aceite os termos e clique em **"Submit"**

### 2.2 Copiar as chaves
Após criar, você verá duas chaves:
- **Site Key** (Chave do Site) - ex: `6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
- **Secret Key** (Chave Secreta) - guarde com segurança, mas NÃO será usada no frontend

---

## ⚙️ Passo 3: Configurar o Site

### 3.1 Estrutura do Projeto
```
olisds/
└── site/
    ├── scr/
    │   ├── index.html          # Página principal
    │   └── assets/
    │       └── logo.svg        # Logo da empresa
    ├── css/
    │   └── styles.css          # Estilos do site
    ├── js/
    │   └── script.js           # JavaScript do site
    └── CONFIGURACAO_EMAIL.md   # Este arquivo
```

### 3.2 Atualizar index.html
Abra o arquivo `site/scr/index.html` e substitua na linha 22:

```html
<!-- Substitua YOUR_RECAPTCHA_SITE_KEY pela sua Site Key -->
<script src="https://www.google.com/recaptcha/api.js?render=6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"></script>
```

### 3.3 Atualizar script.js
Abra o arquivo `site/js/script.js` e substitua nas linhas 178-181:

```javascript
const EMAILJS_PUBLIC_KEY = 'xYz123AbC456'; // Sua Public Key do EmailJS
const EMAILJS_SERVICE_ID = 'service_xyz123'; // Seu Service ID
const EMAILJS_TEMPLATE_ID = 'template_abc456'; // Seu Template ID
const RECAPTCHA_SITE_KEY = '6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // Sua Site Key do reCAPTCHA
```

---

## 🧪 Passo 4: Testar

### 4.1 Testar localmente
1. Abra o arquivo `site/scr/index.html` em um navegador
2. Role até a seção de contato
3. Preencha o formulário (o campo telefone tem máscara automática: (99) 99999-9999)
4. Clique em "Enviar Mensagem"
5. Verifique se:
   - Aparece a notificação de sucesso verde
   - O email chegou na sua caixa de entrada
   - O formulário foi limpo

### 4.2 Verificar no console
Abra o Console do navegador (F12) para ver logs de sucesso ou erro.

---

## 🔒 Segurança e Recursos

### reCAPTCHA v3
- **Invisível**: Não requer interação do usuário
- **Score**: Google atribui um score de 0.0 a 1.0 (quanto maior, mais provável que seja humano)
- **Proteção**: Bloqueia bots automaticamente

### Máscara de Telefone
- **Formato automático**: (99) 99999-9999
- **Validação**: Aceita apenas números
- **Limite**: Máximo de 11 dígitos
- **Funciona em**: Digitação e colagem de texto

### Limitações do EmailJS (Plano Gratuito)
- 200 emails por mês
- Máximo de 50kb por email
- Para mais, veja os planos pagos: https://www.emailjs.com/pricing/

---

## 🆘 Solução de Problemas

### "Erro ao carregar o serviço de email"
- Verifique se a Public Key do EmailJS está correta
- Verifique se os scripts estão carregando (veja o Console)

### Email não está sendo enviado
1. Verifique se o Service ID e Template ID estão corretos
2. Verifique se o serviço de email está ativo no EmailJS
3. Verifique os logs no Console do navegador
4. Acesse o Dashboard do EmailJS para ver o histórico de emails

### reCAPTCHA não está funcionando
1. Verifique se a Site Key está correta
2. Verifique se o domínio está registrado no Google reCAPTCHA
3. Para testes locais, adicione `localhost` nos domínios permitidos

---

## 📧 Template Sugerido no EmailJS

Você pode personalizar ainda mais o template no EmailJS:

**HTML Template:**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%); color: white; padding: 20px; text-align: center; }
        .content { background: #f8fafc; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #2563eb; }
        .footer { text-align: center; color: #64748b; font-size: 12px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Nova Mensagem de Contato</h2>
        </div>
        <div class="content">
            <div class="field">
                <span class="label">Nome:</span><br>
                {{user_name}}
            </div>
            <div class="field">
                <span class="label">Email:</span><br>
                <a href="mailto:{{user_email}}">{{user_email}}</a>
            </div>
            <div class="field">
                <span class="label">Telefone:</span><br>
                {{user_phone}}
            </div>
            <div class="field">
                <span class="label">Mensagem:</span><br>
                {{message}}
            </div>
        </div>
        <div class="footer">
            <p>Enviado via olisds.tech</p>
        </div>
    </div>
</body>
</html>
```

---

## ✅ Checklist Final

- [ ] Conta criada no EmailJS
- [ ] Serviço de email configurado no EmailJS
- [ ] Template de email criado no EmailJS
- [ ] Public Key, Service ID e Template ID copiados
- [ ] Conta criada no Google reCAPTCHA
- [ ] Site registrado no reCAPTCHA v3
- [ ] Site Key do reCAPTCHA copiada
- [ ] `site/scr/index.html` atualizado com a Site Key
- [ ] `site/js/script.js` atualizado com todas as chaves
- [ ] Formulário testado localmente
- [ ] Email de teste recebido com sucesso
- [ ] Máscara de telefone funcionando: (99) 99999-9999

---

## 📞 Suporte

- **EmailJS:** https://www.emailjs.com/docs/
- **Google reCAPTCHA:** https://developers.google.com/recaptcha/docs/v3

Se tiver problemas, verifique sempre os logs no Console do navegador (F12).

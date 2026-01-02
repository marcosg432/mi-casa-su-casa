# Deploy na Hostinger - Guia Completo

## Problemas Comuns

### 1. Tela Branca no Painel
Quando o site é publicado na Hostinger, o painel fica com tela branca.

### 2. Cardápio não carrega
O cardápio fica em "Carregando..." e não carrega os dados.

## Soluções

### 1. Configurar .htaccess para React Router (IMPORTANTE!)

O arquivo `.htaccess` já está incluído em `public/.htaccess` e será copiado automaticamente para `dist/` durante o build.

**Após fazer o build, verifique se o arquivo `dist/.htaccess` existe.** Se não existir, copie manualmente:

```bash
cp public/.htaccess dist/.htaccess
```

Este arquivo é **ESSENCIAL** para que o React Router funcione corretamente na Hostinger. Sem ele, rotas como `/admin` resultarão em tela branca ou erro 404.

### 2. Garantir que o Next.js está rodando
O servidor Next.js do cardápio precisa estar rodando na Hostinger. Verifique se o processo está ativo:

```bash
pm2 list
```

Se não estiver, inicie o servidor Next.js:
```bash
cd cardapio
npm install
npm run build
pm2 start npm --name "cardapio-nextjs" -- start
```

### 2. Configurar a URL da API

Crie um arquivo `.env` na raiz do projeto React com a URL do servidor Next.js:

```env
# Se o Next.js estiver na mesma origem (mesmo domínio)
VITE_API_URL=/api

# Se o Next.js estiver em uma porta diferente (ex: 3000)
VITE_API_URL=http://seu-ip:3000/api

# Se o Next.js estiver em um subdomínio
VITE_API_URL=https://api.seudominio.com/api
```

### 3. Rebuild do projeto React

Após configurar a variável de ambiente, faça rebuild:

```bash
npm run build
```

### 4. Verificar se está funcionando

Acesse o cardápio no navegador e abra o Console (F12) para verificar se há erros de conexão com a API.

## Estrutura Recomendada na Hostinger

```
/domains/seudominio.com/
├── public_html/          # Build do React (dist/)
├── cardapio/             # Projeto Next.js
└── .env                  # Variáveis de ambiente
```

## Configuração PM2 para Next.js

Crie um arquivo `ecosystem.cardapio.config.cjs`:

```javascript
module.exports = {
  apps: [{
    name: 'cardapio-nextjs',
    script: 'npm',
    args: 'start',
    cwd: '/caminho/para/cardapio',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

Inicie com:
```bash
pm2 start ecosystem.cardapio.config.cjs
pm2 save
```

## Troubleshooting

### Tela Branca no Painel

1. **Verificar se o .htaccess está na pasta dist/**
   ```bash
   ls -la dist/.htaccess
   ```
   Se não existir, copie manualmente:
   ```bash
   cp public/.htaccess dist/.htaccess
   ```

2. **Verificar erros no console do navegador**
   - Abra o DevTools (F12)
   - Vá na aba Console
   - Procure por erros em vermelho
   - Os erros vão indicar o problema específico

3. **Verificar se os arquivos foram buildados corretamente**
   ```bash
   ls -la dist/
   ```
   Deve conter: `index.html`, `assets/`, `.htaccess`

4. **Limpar cache do navegador**
   - Pressione Ctrl+Shift+Delete
   - Limpe o cache
   - Recarregue a página

### Cardápio não carrega

1. **Verificar se o Next.js está rodando**
   ```bash
   pm2 list
   ```

2. **Verificar logs do Next.js**
   ```bash
   pm2 logs cardapio-nextjs
   ```

3. **Erro 404 nas APIs**: Verifique a configuração de `VITE_API_URL`

4. **Timeout**: Verifique se a porta do Next.js não está bloqueada pelo firewall

### Erros Comuns

- **"Cannot read property of undefined"**: Verifique se todas as dependências estão instaladas
- **"Failed to fetch"**: Problema de conexão com a API - verifique `VITE_API_URL`
- **404 em rotas**: O `.htaccess` não está configurado corretamente


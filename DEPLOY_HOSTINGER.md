# Guia de Deploy na Hostinger com PM2

## Passo 1: Conectar ao servidor via SSH
```bash
ssh seu-usuario@seu-ip-hostinger
```

## Passo 2: Criar pasta do projeto
```bash
# Navegar para o diretório home ou onde você quer o projeto
cd ~
# ou
cd /home/seu-usuario

# Criar pasta do projeto
mkdir brisa-azul
cd brisa-azul
```

## Passo 3: Clonar o repositório
```bash
git clone https://github.com/marcosg432/casa10.git .
```

## Passo 4: Instalar Node.js e PM2 (se ainda não estiver instalado)
```bash
# Verificar se Node.js está instalado
node --version

# Se não estiver, instalar Node.js (versão 18 ou superior)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2 globalmente
sudo npm install -g pm2
```

## Passo 5: Instalar dependências do projeto
```bash
npm install
```

## Passo 6: Fazer build do projeto
```bash
npm run build
```

## Passo 7: Criar arquivo de configuração do PM2
```bash
nano ecosystem.config.js
```

Cole o seguinte conteúdo (ajuste as portas conforme necessário):
```javascript
module.exports = {
  apps: [{
    name: 'brisa-azul',
    script: 'node_modules/vite/bin/vite.js',
    args: 'preview --port 3000 --host',
    cwd: '/home/seu-usuario/brisa-azul',
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

**OU** se preferir usar o servidor de produção do Vite diretamente:
```javascript
module.exports = {
  apps: [{
    name: 'brisa-azul',
    script: 'npm',
    args: 'run preview -- --port 3000 --host',
    cwd: '/home/seu-usuario/brisa-azul',
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

Salve com `Ctrl + X`, depois `Y`, depois `Enter`

## Passo 8: Ajustar o vite.config.js para produção
```bash
nano vite.config.js
```

Certifique-se de que está assim:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000
  },
  preview: {
    host: true,
    port: 3000
  }
})
```

## Passo 9: Iniciar aplicação com PM2
```bash
pm2 start ecosystem.config.js
```

## Passo 10: Configurar PM2 para iniciar automaticamente no boot
```bash
pm2 startup
# Execute o comando que aparecer (geralmente algo como: sudo env PATH=...)
pm2 save
```

## Passo 11: Verificar status
```bash
pm2 status
pm2 logs brisa-azul
```

## Comandos úteis do PM2:
```bash
# Ver logs em tempo real
pm2 logs brisa-azul

# Reiniciar aplicação
pm2 restart brisa-azul

# Parar aplicação
pm2 stop brisa-azul

# Deletar aplicação do PM2
pm2 delete brisa-azul

# Ver informações detalhadas
pm2 info brisa-azul

# Monitorar recursos
pm2 monit
```

## Configuração de Firewall (se necessário)
```bash
# Permitir porta 3000
sudo ufw allow 3000/tcp
sudo ufw reload
```

## Alternativa: Usar porta 3002 (se 3000 estiver ocupada)
Se a porta 3000 estiver ocupada, você pode usar 3002. Basta alterar no `ecosystem.config.js` e no `vite.config.js`:

**ecosystem.config.js:**
```javascript
args: 'preview --port 3002 --host',
env: {
  NODE_ENV: 'production',
  PORT: 3002
}
```

**vite.config.js:**
```javascript
preview: {
  host: true,
  port: 3002
}
```

## Nota importante:
- Certifique-se de que as portas escolhidas (3000, 3002, etc.) estão abertas no firewall da Hostinger
- O acesso será via: `http://seu-ip:3000` ou `http://seu-dominio:3000`
- Para usar na porta 80 (HTTP padrão), você precisará configurar um proxy reverso com Nginx


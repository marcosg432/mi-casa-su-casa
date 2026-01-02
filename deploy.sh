#!/bin/bash

# Script de Deploy para Hostinger com PM2
# Porta padrão: 3000
# Portas bloqueadas: 3001, 3002, 3003, 3004, 3005
# Alternativa: 3006 (se 3000 estiver ocupada)

echo "🚀 Iniciando deploy do Brisa Azul na Hostinger..."

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: package.json não encontrado. Execute este script na raiz do projeto."
    exit 1
fi

# Instalar dependências
echo -e "${YELLOW}📦 Instalando dependências...${NC}"
npm install

# Fazer build
echo -e "${YELLOW}🔨 Fazendo build do projeto...${NC}"
npm run build

# Verificar se o build foi bem-sucedido
if [ ! -d "dist" ]; then
    echo "❌ Erro: Build falhou. Diretório 'dist' não foi criado."
    exit 1
fi

# Criar diretório de logs se não existir
mkdir -p logs

# Parar PM2 se já estiver rodando
echo -e "${YELLOW}🛑 Parando instâncias anteriores do PM2...${NC}"
pm2 delete brisa-azul 2>/dev/null || true

# Iniciar com PM2
echo -e "${YELLOW}▶️  Iniciando aplicação com PM2 na porta 3000...${NC}"
pm2 start ecosystem.config.cjs

# Salvar configuração do PM2
echo -e "${YELLOW}💾 Salvando configuração do PM2...${NC}"
pm2 save

# Mostrar status
echo -e "${GREEN}✅ Deploy concluído!${NC}"
echo ""
echo "📊 Status do PM2:"
pm2 status

echo ""
echo "📝 Para ver os logs:"
echo "   pm2 logs brisa-azul"
echo ""
echo "🌐 Aplicação rodando em: http://seu-ip:3000"
echo ""


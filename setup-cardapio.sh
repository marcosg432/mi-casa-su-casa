#!/bin/bash

# Script de Setup do Cardápio Next.js

echo "🚀 Configurando o Cardápio Next.js..."

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erro: Execute este script na raiz do projeto mi-casa-su-casa${NC}"
    exit 1
fi

# Ir para a pasta do cardápio
cd cardapio

if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erro: Pasta cardapio não encontrada${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Instalando dependências do cardápio...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao instalar dependências${NC}"
    exit 1
fi

echo -e "${YELLOW}🔨 Fazendo build do cardápio...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao fazer build${NC}"
    exit 1
fi

# Voltar para a raiz
cd ..

# Criar diretório de logs se não existir
mkdir -p logs

# Parar cardápio se já estiver rodando
echo -e "${YELLOW}🛑 Parando instâncias anteriores do cardápio...${NC}"
pm2 delete cardapio 2>/dev/null || true

# Iniciar com PM2
echo -e "${YELLOW}▶️  Iniciando cardápio com PM2 na porta 3001...${NC}"
pm2 start ecosystem-cardapio.config.cjs

# Salvar configuração do PM2
echo -e "${YELLOW}💾 Salvando configuração do PM2...${NC}"
pm2 save

# Mostrar status
echo -e "${GREEN}✅ Setup do cardápio concluído!${NC}"
echo ""
echo "📊 Status do PM2:"
pm2 status

echo ""
echo "📝 Para ver os logs:"
echo "   pm2 logs cardapio"
echo ""
echo "🌐 Cardápio rodando em: http://193.160.119.67:3001"
echo ""


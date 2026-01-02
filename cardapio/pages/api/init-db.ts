import type { NextApiRequest, NextApiResponse } from 'next';
import { run } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // Criar tabela de usuários
    await run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Criar tabela de categorias
    await run(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        order_index INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Criar tabela de pratos
    await run(`
      CREATE TABLE IF NOT EXISTS dishes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        mini_presentation TEXT,
        full_description TEXT,
        image_url TEXT,
        category_id INTEGER,
        price REAL DEFAULT 0,
        display_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      )
    `);
    
    // Adicionar coluna updated_at se não existir (migração)
    try {
      await run(`ALTER TABLE dishes ADD COLUMN updated_at DATETIME`);
    } catch (e: any) {
      // Ignorar se a coluna já existe
      if (!e.message?.includes('duplicate column')) {
        console.log('Coluna updated_at já existe ou erro ao adicionar:', e.message);
      }
    }

    // Criar tabela de bebidas
    await run(`
      CREATE TABLE IF NOT EXISTS beverages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        category_id INTEGER,
        price REAL DEFAULT 0,
        display_order INTEGER DEFAULT 0,
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      )
    `);
    
    // Adicionar coluna updated_at se não existir (migração)
    try {
      await run(`ALTER TABLE beverages ADD COLUMN updated_at DATETIME`);
    } catch (e: any) {
      // Ignorar se a coluna já existe
      if (!e.message?.includes('duplicate column')) {
        console.log('Coluna updated_at já existe ou erro ao adicionar:', e.message);
      }
    }

    // Criar tabela de fichas de pedidos
    await run(`
      CREATE TABLE IF NOT EXISTS order_sheets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        table_number TEXT NOT NULL,
        customer_name TEXT,
        status TEXT DEFAULT 'active',
        total REAL DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        finalized_at DATETIME
      )
    `);

    // Criar tabela de itens dos pedidos
    await run(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sheet_id INTEGER NOT NULL,
        item_type TEXT NOT NULL,
        item_id INTEGER NOT NULL,
        quantity INTEGER DEFAULT 1,
        price REAL NOT NULL,
        observations TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sheet_id) REFERENCES order_sheets(id)
      )
    `);

    // Criar tabela de vias (receipts)
    await run(`
      CREATE TABLE IF NOT EXISTS receipts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT UNIQUE NOT NULL,
        sheet_id INTEGER NOT NULL,
        table_number TEXT NOT NULL,
        customer_name TEXT,
        total REAL NOT NULL,
        items TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sheet_id) REFERENCES order_sheets(id)
      )
    `);

    return res.status(200).json({ success: true, message: 'Banco de dados inicializado com sucesso' });
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
    return res.status(500).json({ error: 'Erro ao inicializar banco de dados', details: String(error) });
  }
}


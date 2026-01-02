import type { NextApiRequest, NextApiResponse } from 'next';
import { run } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // Adicionar coluna updated_at na tabela dishes se não existir
    try {
      await run(`ALTER TABLE dishes ADD COLUMN updated_at DATETIME`);
      console.log('Coluna updated_at adicionada à tabela dishes');
    } catch (e: any) {
      if (e.message?.includes('duplicate column')) {
        console.log('Coluna updated_at já existe na tabela dishes');
      } else {
        throw e;
      }
    }

    // Adicionar coluna updated_at na tabela beverages se não existir
    try {
      await run(`ALTER TABLE beverages ADD COLUMN updated_at DATETIME`);
      console.log('Coluna updated_at adicionada à tabela beverages');
    } catch (e: any) {
      if (e.message?.includes('duplicate column')) {
        console.log('Coluna updated_at já existe na tabela beverages');
      } else {
        throw e;
      }
    }

    return res.status(200).json({ success: true, message: 'Migração concluída com sucesso' });
  } catch (error) {
    console.error('Erro ao executar migração:', error);
    return res.status(500).json({ error: 'Erro ao executar migração', details: String(error) });
  }
}


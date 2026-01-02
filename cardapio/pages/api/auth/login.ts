import type { NextApiRequest, NextApiResponse } from 'next';
import { loginUser, generateToken, hashPassword } from '@/lib/auth';
import { get, run } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    // Credenciais fixas
    const CORRECT_EMAIL = 'micasasucasaben@gmail.com';
    const CORRECT_PASSWORD = 'mi casa su casa';

    // Verificar credenciais
    if (email !== CORRECT_EMAIL || password !== CORRECT_PASSWORD) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Garantir que o usuário existe no banco
    const existing = await get('SELECT * FROM users WHERE email = ?', [CORRECT_EMAIL]);
    
    if (!existing) {
      const hashedPasswordValue = await hashPassword(CORRECT_PASSWORD);
      await run(
        `INSERT INTO users (email, password) VALUES (?, ?)`,
        [CORRECT_EMAIL, hashedPasswordValue]
      );
    }

    // Buscar usuário após garantir que existe
    const user = await get('SELECT * FROM users WHERE email = ?', [CORRECT_EMAIL]);

    if (!user) {
      return res.status(401).json({ error: 'Erro ao autenticar usuário' });
    }

    const token = generateToken({ id: user.id, email: user.email });

    res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`);
    
    return res.status(200).json({ token, user: { id: user.id, email: user.email } });
  } catch (error: any) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: `Erro interno: ${error.message || 'Erro desconhecido'}` });
  }
}

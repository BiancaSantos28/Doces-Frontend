import { FastifyInstance } from 'fastify';
import { db } from '../src/database';

export async function produtosRoutes(fastify: FastifyInstance) {
  // Listar todos
  fastify.get('/produtos', async () => {
    const [rows] = await db.query(`
      SELECT produtos.*, categorias.nome AS categoria_nome
      FROM produtos
      LEFT JOIN categorias ON produtos.categoria_id = categorias.id
    `);
    return rows;
  });

  // Buscar por ID
  fastify.get('/produtos/:id', async (req) => {
    const { id } = req.params as any;
    const [rows] = await db.query('SELECT * FROM produtos WHERE id = ?', [id]);
    return (rows as any)[0];
  });

  // Criar
  fastify.post('/produtos', async (req) => {
    const { nome, descricao, preco, estoque, categoria_id } = req.body as any;
    const [result] = await db.query(
      'INSERT INTO produtos (nome, descricao, preco, estoque, categoria_id) VALUES (?, ?, ?, ?, ?)',
      [nome, descricao, preco, estoque, categoria_id]
    );
    return { id: (result as any).insertId };
  });

  // Atualizar
  fastify.put('/produtos/:id', async (req) => {
    const { id } = req.params as any;
    const { nome, descricao, preco, estoque, categoria_id } = req.body as any;
    await db.query(
      'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, estoque = ?, categoria_id = ? WHERE id = ?',
      [nome, descricao, preco, estoque, categoria_id, id]
    );
    return { message: 'Produto atualizado' };
  });

  // Deletar
  fastify.delete('/produtos/:id', async (req) => {
    const { id } = req.params as any;
    await db.query('DELETE FROM produtos WHERE id = ?', [id]);
    return { message: 'Produto deletado' };
  });
}

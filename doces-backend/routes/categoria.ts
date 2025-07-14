import { FastifyInstance } from 'fastify';
import { db } from '../src/database';

export default async function categoriasRoutes(app: FastifyInstance) {
  // Listar todas as categorias
  app.get('/', async () => {
    const [rows] = await db.query('SELECT * FROM categorias');
    return rows;
  });

  // Cadastrar nova categoria
  app.post('/', async (request, reply) => {
    const { nome } = request.body as { nome: string };

    if (!nome) {
      return reply.status(400).send({ erro: 'O nome da categoria é obrigatório.' });
    }

    await db.query('INSERT INTO categorias (nome) VALUES (?)', [nome]);
    return reply.status(201).send({ mensagem: 'Categoria criada com sucesso!' });
  });

  // Atualizar categoria
  app.put('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { nome } = request.body as { nome: string };

    const [result] = await db.query('UPDATE categorias SET nome = ? WHERE id = ?', [nome, id]);

    if ((result as any).affectedRows === 0) {
      return reply.status(404).send({ erro: 'Categoria não encontrada.' });
    }

    return { mensagem: 'Categoria atualizada com sucesso.' };
  });

  // Deletar categoria
  app.delete('/:id', async (request, reply) => {
    const { id } = request.params as { id: string };

    const [result] = await db.query('DELETE FROM categorias WHERE id = ?', [id]);

    if ((result as any).affectedRows === 0) {
      return reply.status(404).send({ erro: 'Categoria não encontrada.' });
    }

    return { mensagem: 'Categoria deletada com sucesso.' };
  });
}

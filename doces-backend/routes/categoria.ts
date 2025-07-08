import { FastifyInstance } from 'fastify';
import { db } from '../database';

export async function categoriasRoutes(fastify: FastifyInstance) {
  fastify.get('/categorias', async (req, reply) => {
    const [rows] = await db.query('SELECT * FROM categorias');
    return rows;
  });
}

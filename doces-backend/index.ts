import Fastify from 'fastify';
import cors from '@fastify/cors';
import { produtosRoutes } from './routes/produtos';
import { categoriasRoutes } from './routes/categoria';

const app = Fastify();

app.register(cors, { origin: true });
app.register(produtosRoutes);
app.register(categoriasRoutes);

app.listen({ port: 8000 }, (erro, endereco) => {
    if (erro) {
        console.log("ERRO: Fastify não iniciou")
    }
    console.log(`Fastify iniciado na porta: ${endereco}`)
});


import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Produto {
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  categoria_id: number; 
}

function FormularioProduto() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [produto, setProduto] = useState<Produto>({
    nome: '',
    descricao: '',
    preco: 0,
    estoque: 0,
    categoria_id: 1,
  });

  const carregarProduto = async (id: string) => {
    const resposta = await fetch(`http://localhost:3000/produtos/${id}`);
    const dados = await resposta.json();
    setProduto(dados);
  };

  useEffect(() => {
    if (id) {
      carregarProduto(id);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const metodo = id ? 'PUT' : 'POST';
      const url = id
        ? `http://localhost:3000/produtos/${id}`
        : 'http://localhost:3000/produtos';

      await fetch(url, {
        method: metodo,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(produto),
      });

      navigate('/');
    } catch (erro) {
      alert('Erro ao salvar o produto.');
    }
  };

  return (
    <div>
      <h1>{id ? 'Editar Produto' : 'Cadastrar Novo Doce'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={produto.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Descrição:</label>
          <textarea
            name="descricao"
            value={produto.descricao}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Preço:</label>
          <input
            type="number"
            name="preco"
            value={produto.preco}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>

        <div>
          <label>Estoque:</label>
          <input
            type="number"
            name="estoque"
            value={produto.estoque}
            onChange={handleChange}
            required
          />
        </div>

        {/* Se usar categorias:
        <div>
          <label>Categoria:</label>
          <input
            type="number"
            name="categoria_id"
            value={produto.categoria_id}
            onChange={handleChange}
          />
        </div>
        */}

        <button type="submit">
          {id ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}

export default FormularioProduto;

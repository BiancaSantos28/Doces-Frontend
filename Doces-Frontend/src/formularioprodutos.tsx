import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Produto {
  nome: string;
  preco: number;
  estoque: number;
  descricao: string;
  categoria_id: number;
}

interface Categoria {
  id: number;
  nome: string;
}

export default function FormularioProduto() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [produto, setProduto] = useState<Produto>({
    nome: '',
    preco: 0,
    estoque: 0,
    descricao: '',
    categoria_id: 1
  });

  const buscarCategorias = async () => {
    const res = await fetch('http://localhost:8000/categorias');
    const data = await res.json();
    setCategorias(data);
  };

  const buscarProduto = async () => {
    const res = await fetch(`http://localhost:8000/produtos`);
    const data = await res.json();
    const item = data.find((p: any) => p.id === Number(id));
    if (item) {
      setProduto(item);
    } else {
      alert('Produto não encontrado.');
      navigate('/');
    }
  };

  useEffect(() => {
    buscarCategorias();
    if (id) buscarProduto();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduto(prev => ({
      ...prev,
      [name]: name === 'preco' || name === 'estoque' || name === 'categoria_id' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const metodo = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:8000/produtos/${id}` : `http://localhost:8000/produtos`;

    try {
      await fetch(url, {
        method: metodo,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
      });

      alert(id ? 'Produto atualizado!' : 'Produto criado!');
      navigate('/');
    } catch (err) {
      alert('Erro ao salvar produto.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{id ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label><br />
          <input type="text" name="nome" value={produto.nome} onChange={handleChange} required />
        </div>

        <div>
          <label>Preço:</label><br />
          <input type="number" name="preco" value={produto.preco} onChange={handleChange} required />
        </div>

        <div>
          <label>Estoque:</label><br />
          <input type="number" name="estoque" value={produto.estoque} onChange={handleChange} required />
        </div>

        <div>
          <label>Descrição:</label><br />
          <textarea name="descricao" value={produto.descricao} onChange={handleChange} />
        </div>

        <div>
          <label>Categoria:</label><br />
          <select name="categoria_id" value={produto.categoria_id} onChange={handleChange}>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
        </div>

        <button type="submit" style={{ marginTop: 10 }}>
          {id ? 'Salvar Alterações' : 'Cadastrar Produto'}
        </button>
      </form>
    </div>
  );
}


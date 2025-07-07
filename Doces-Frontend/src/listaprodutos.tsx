import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
}

function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filtro, setFiltro] = useState('');

  const carregarProdutos = async () => {
    const resposta = await fetch('http://localhost:3000/produtos');
    const dados = await resposta.json();
    setProdutos(dados);
  };

  const deletarProduto = async (id: number) => {
    await fetch(`http://localhost:3000/produtos/${id}`, {
      method: 'DELETE',
    });
    carregarProdutos();
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div>
      <h1>Lista de Doces</h1>
      <Link to="/produtos/novo">Cadastrar novo doce</Link>

      <br /><br />
      <input
        type="text"
        placeholder="Buscar por nome..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <ul>
        {produtosFiltrados.map((produto) => (
          <li key={produto.id}>
            <strong>{produto.nome}</strong> - R${produto.preco.toFixed(2)}
            <br />
            <small>{produto.descricao}</small>
            <br />
            <Link to={`/produtos/editar/${produto.id}`}>Editar</Link>
            <button onClick={() => deletarProduto(produto.id)}>Excluir</button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaProdutos;

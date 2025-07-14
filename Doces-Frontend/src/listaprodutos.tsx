import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  descricao: string;
  categoria_id: number;
}

export default function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filtro, setFiltro] = useState('');

  const fetchProdutos = async () => {
    try {
      const res = await fetch(`http://localhost:8000/produtos?nome=${filtro}`);
      const data = await res.json();
      setProdutos(data);
    } catch (err) {
      alert('Erro ao carregar produtos');
    }
  };

  const deletarProduto = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      await fetch(`http://localhost:8000/produtos/${id}`, {
        method: 'DELETE'
      });
      fetchProdutos(); // atualiza lista
    } catch (err) {
      alert('Erro ao deletar produto');
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, [filtro]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Lista de Produtos</h2>

      <input
        type="text"
        placeholder="Filtrar por nome"
        value={filtro}
        onChange={e => setFiltro(e.target.value)}
        style={{ marginBottom: 10, padding: 5 }}
      />

      <table border={1} cellPadding={8} cellSpacing={0}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>R$ {produto.preco.toFixed(2)}</td>
              <td>{produto.estoque}</td>
              <td>
                <Link to={`/produto/editar/${produto.id}`} style={{ marginRight: 8 }}>
                  Editar
                </Link>
                <button onClick={() => deletarProduto(produto.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

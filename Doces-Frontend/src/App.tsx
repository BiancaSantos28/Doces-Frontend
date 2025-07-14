import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListaProdutos from '../src/listaprodutos';
import FormularioProduto from '../src/formularioprodutos';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListaProdutos />} />
        <Route path="/produto/novo" element={<FormularioProduto />} />
        <Route path="/produto/editar/:id" element={<FormularioProduto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import HomeColic from './Pages/Home-Colic/home-colic';
import ListaServidor from './Pages/Setores/lista';
import CadastrarServidor from './Pages/Setores/cadastro';
import ListaAquisicoes from './Pages/Aquisicoes/ListaAquisicoes';
import CadastrarAquisicao from './Pages/Aquisicoes/NovaAquisicao';

function Rotas() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomeColic/>} />
            <Route path="/aquisicoes" element={<ListaAquisicoes/>} />
            <Route path="/cadastraraquisicao" element={<CadastrarAquisicao/>} />
            
            <Route path="/setores" element={<ListaServidor/>} />
            <Route path="/cadastrarsetor" element={<CadastrarServidor/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
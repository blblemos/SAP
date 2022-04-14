import {BrowserRouter, Routes, Route} from 'react-router-dom';
import StoreProvider from './Components/Store/Provider';
import RoutesPrivate from './Components/Routes/Private';

import NotFound from './Pages/NotFound/404';
import HomeColic from './Pages/Home-Colic/home-colic';
import ListaSetor from './Pages/Setores/lista';
import CadastrarSetor from './Pages/Setores/cadastro';
import EditarSetor from './Pages/Setores/editar';
import VizualizarSetor from './Pages/Setores/vizualizar';
import ListaAquisicoes from './Pages/Aquisicoes/ListaAquisicoes';
import CadastrarAquisicao from './Pages/Aquisicoes/cadastro';
import VizualizarAquisicao from './Pages/Aquisicoes/aquisicoes';
import EditarAquisicao from './Pages/Aquisicoes/editar';
import AddEmpenho from './Pages/Empenho/cadastrar';
import EditEmpenho from './Pages/Empenho/editar';
import CadastrarFornecedor from './Pages/Fornecedores/cadastro';
import ListaFornecedor from './Pages/Fornecedores/lista';
import EditarFornecedor from './Pages/Fornecedores/editar';
import VizualizarFornecedor from './Pages/Fornecedores/vizualizar';
import ListaServidor from './Pages/Servidor/lista';
import Cadastrarservidor from './Pages/Servidor/cadastro';
import EditarServidor from './Pages/Servidor/editar';
import VizualizarServidor from './Pages/Servidor/vizualizar';
import CadastrarItem from './Pages/Itens/cadastro';
import EditarItem from './Pages/Itens/editar';
import VizualizarItem from './Pages/Itens/vizualizar';
import ListaItem from './Pages/Itens/lista';
import SignUp from './Pages/Login/login';

function Rotas() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Routes>
          <Route path="" element={<RoutesPrivate />} >
            <Route path="/colic/aquisicoes" element={<ListaAquisicoes/>} />
            <Route path="/colic/setores" element={<ListaSetor/>} />
            <Route path="/colic/fornecedores" element={<ListaFornecedor/>} />
            <Route path="/colic/servidores" element={<ListaServidor/>} />
            <Route path="/colic/itens" element={<ListaItem/>} />
            <Route path="/colic/aquisicoes/:id" element={<VizualizarAquisicao/>} />
            <Route path="/colic/setor/:id" element={<VizualizarSetor/>} />
            <Route path="/colic/servidor/:id" element={<VizualizarServidor/>} />
            <Route path="/colic/item/:id" element={<VizualizarItem/>} />
            <Route path="/colic/vizualizar/fornecedor/:id" element={<VizualizarFornecedor/>} />
            <Route path="/colic/cadastrar/aquisicao" element={<CadastrarAquisicao/>} />
            <Route path="/colic/cadastrar/setor" element={<CadastrarSetor/>} />
            <Route path="/colic/cadastrar/fornecedor" element={<CadastrarFornecedor/>} />
            <Route path="/colic/cadastrar/item" element={<CadastrarItem/>} />
            <Route path="/colic/cadastrar/servidor" element={<Cadastrarservidor/>} />
            <Route path="/colic/cadastrar/empenho/:id" element={<AddEmpenho/>} />
            <Route path="/colic/editar/servidor/:id" element={<EditarServidor/>} />
            <Route path="/colic/editar/aquisicoes/:id" element={<EditarAquisicao/>} />
            <Route path="/colic/editar/fornecedor/:id" element={<EditarFornecedor/>} />
            <Route path="/colic/editar/empenho/:idAquisicao/:idEmpenho" element={<EditEmpenho/>} />
            <Route path="/colic/editar/setor/:id" element={<EditarSetor/>} />
            <Route path="/colic/editar/item/:id" element={<EditarItem/>} />
            <Route path="/colic/home" element={<HomeColic/>} />
            <Route path="/" element={<HomeColic/>} />
          </Route>
          <Route path="/*" element={<NotFound/>} />
          <Route path="/signUp" element={<SignUp/>} />
          </Routes>
      </StoreProvider>
      
    </BrowserRouter>
  );
}

export default Rotas;
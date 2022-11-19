import {BrowserRouter, Routes, Route} from 'react-router-dom';
import StoreProvider from './Components/Store/Provider';
import RoutesPrivate from './Components/Routes/Private';

import NotFound from './Pages/NotFound/404';
import HomeColic from './Pages/Home-Colic/home-colic';
import Alertas from './Pages/Alertas/alertas';
import ListaSetor from './Pages/Setores/lista';
import CadastrarSetor from './Pages/Setores/cadastro';
import EditarSetor from './Pages/Setores/editar';
import VizualizarSetor from './Pages/Setores/vizualizar';
import ListaAquisicoes from './Pages/Aquisicoes/ListaAquisicoes';
import Aquisicao from './Pages/Aquisicoes/aquisicao';
import VizualizarAquisicao from './Pages/Aquisicoes/aquisicoes';
import Empenho from './Pages/Empenho/empenho';
import Servidor from './Pages/Servidor/servidor';
import AddCobranca from './Pages/Cobranca/cadastrar';
import VizualizarEmpenho from './Pages/Empenho/vizualizar';
import CadastrarFornecedor from './Pages/Fornecedores/cadastro';
import EditarEntrega from './Pages/Entrega/editar';
import EditarPagamento from './Pages/Pagamento/pagamento';
import ListaFornecedor from './Pages/Fornecedores/lista';
import EditarFornecedor from './Pages/Fornecedores/editar';
import VizualizarFornecedor from './Pages/Fornecedores/vizualizar';
import ListaServidor from './Pages/Servidor/lista';
import VizualizarServidor from './Pages/Servidor/vizualizar';
import Item from './Pages/Itens/item';
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
            <Route path="/colic/empenho/:idAquisicao/:idEmpenho/:numeroEmpenho" element={<VizualizarEmpenho/>} />
            <Route path="/colic/vizualizar/fornecedor/:id" element={<VizualizarFornecedor/>} />
            <Route path="/colic/cadastrar/aquisicao" element={<Aquisicao/>} />
            <Route path="/colic/cadastrar/setor" element={<CadastrarSetor/>} />
            <Route path="/colic/cadastrar/fornecedor" element={<CadastrarFornecedor/>} />
            <Route path="/colic/cadastrar/item" element={<Item/>} />
            <Route path="/colic/cadastrar/servidor" element={<Servidor/>} />
            <Route path="/colic/cadastrar/empenho/:idAquisicao" element={<Empenho/>} />
            <Route path="/colic/cadastrar/cobranca/:id/:aquisicao" element={<AddCobranca/>} />
            <Route path="/colic/cadastrar/cobranca/:id/:aquisicao/:idCobranca" element={<AddCobranca/>} />
            <Route path="/colic/editar/servidor/:id" element={<Servidor/>} />
            <Route path="/colic/editar/aquisicoes/:id" element={<Aquisicao/>} />
            <Route path="/colic/editar/fornecedor/:id" element={<EditarFornecedor/>} />
            <Route path="/colic/editar/empenho/:idAquisicao/:idEmpenho" element={<Empenho/>} />
            <Route path="/colic/editar/setor/:id" element={<EditarSetor/>} />
            <Route path="/colic/editar/entrega/:idAquisicao/:idEmpenho/:idEntrega" element={<EditarEntrega/>} />
            <Route path="/colic/editar/pagamento/:idAquisicao/:idEmpenho/:idPagamento" element={<EditarPagamento/>} />
            <Route path="/colic/editar/item/:id" element={<Item/>} />
            <Route path="/colic/home" element={<HomeColic/>} />
            <Route path="/colic/alertas" element={<Alertas/>} />
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
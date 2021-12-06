import {BrowserRouter, Routes, Route} from 'react-router-dom';
import StoreProvider from './Components/Store/Provider';
import RoutesPrivate from './Components/Routes/Private';

import NotFound from './Pages/NotFound/404';
import HomeColic from './Pages/Home-Colic/home-colic';
import ListaSetor from './Pages/Setores/lista';
import CadastrarSetor from './Pages/Setores/cadastro';
import EditarSetor from './Pages/Setores/editar';
import Setor from './Pages/Setores/setor';
import ListaAquisicoes from './Pages/Aquisicoes/ListaAquisicoes';
import CadastrarAquisicao from './Pages/Aquisicoes/NovaAquisicao';
import SignUp from './Pages/Login/login';

function Rotas() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Routes>
          <Route path="" element={<RoutesPrivate />} >
            <Route path="/colic/home" element={<HomeColic/>} />
            <Route path="/colic/cadastraraquisicao" element={<CadastrarAquisicao/>} />
            <Route path="/colic/aquisicoes" element={<ListaAquisicoes/>} />
            <Route path="/colic/setores" element={<ListaSetor/>} />
            <Route path="/colic/editarsetor/:id" element={<EditarSetor/>} />
            <Route path="/colic/cadastrarsetor" element={<CadastrarSetor/>} />
            <Route path="/colic/setor/:id" element={<Setor/>} />
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
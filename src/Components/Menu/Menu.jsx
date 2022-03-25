import { useState , useContext} from 'react';
import {CgMenuRound, CgCloseO} from 'react-icons/cg';
import {RiEditBoxFill} from 'react-icons/ri';
import {IoExit} from 'react-icons/io5';
import StoreContext from '../Store/Context';

import './Menu.css';

import ItemMenu from '../Item-Menu/item-menu';

function Menu() {
  const [menu,setMenu] = useState(false);
  const { setToken } = useContext(StoreContext);

  function stateMenu() {
    setMenu(!menu);
  }

  function setarToken() {
    setToken(null);
  }
  
  return (
    <div className="container-menu" style={menu ? { height: "auto"} : { height: "80px"}} >
      <div 
        className="img-open-menu"
        onClick={() => stateMenu()}
      >
        <CgMenuRound size={40} color="#CE1218"/>
      </div>

      <div 
        className="menu"
        style={menu ? { left: "0"} : { left: "-100vw"}}
      >
        <div
          className="menu-close"
          onClick={() => stateMenu()} 
        >
          <CgCloseO size={30} color="white"/>
        </div>
        
        <div className="menu-container-itens">
          <ItemMenu
            nome='Aquisições'
            itens={[
              {nomelink:'Nova Aquisição', link: '/colic/cadastrar/aquisicao'},
              {nomelink:'Lista de Aquisições', link: '/colic/aquisicoes'}]}
          />

          <ItemMenu
            nome='Fornecedores'
            itens={[
              {nomelink:'Cadastrar Fornecedor', link: '/colic/cadastrar/fornecedor'},
              {nomelink:'Lista de Fornecedores', link: '/colic/fornecedores'}]}
          />

          <ItemMenu
            nome='Servidores'
            itens={[
              {nomelink:'Cadastrar Servidor', link: '/colic/cadastrar/servidor'},
              {nomelink:'Lista de Servidores', link: '/colic/servidores'}]}
          />
          <ItemMenu
            nome='Setores'
            itens={[
              {nomelink:'Cadastrar Setores', link: '/colic/cadastrar/setor'},
              {nomelink:'Lista de Setores', link: '/colic/setores'}]}
          />
          <ItemMenu
            nome='Itens'
            itens={[
              {nomelink:'Cadastrar Itens', link: '/colic/cadastrar/item'},
              {nomelink:'Lista de Itens', link: '/colic/itens'}]}
          />
        </div>

        <div className='menu-container-user'>
          <div className='menu-container-user-img'></div>

          <div className='menu-container-user-text'>
            <p>Bruno Lemos</p>
          </div>

          <div className='menu-container-user-icon'>
            <RiEditBoxFill size={21} color="white"/>
          </div>

          <div className='menu-container-user-icon' onClick={() => setarToken()}>
            <IoExit size={21} color="white"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;

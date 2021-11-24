import { useState } from 'react';
import {CgMenuRound, CgCloseO} from 'react-icons/cg';
import {RiEditBoxFill} from 'react-icons/ri';
import {IoExit} from 'react-icons/io5';

import './Menu.css';

import ItemMenu from '../Item-Menu/item-menu';

function Menu() {
  const [menu,setMenu] = useState(false);

  function stateMenu() {
    setMenu(!menu);
  }

  return (
    <div className="container-menu">
      <div 
        className="img-open-menu"
        onClick={() => stateMenu()}
      >
        <CgMenuRound size={40} color="#CE1218"/>
      </div>

      <div 
        className="menu"
        style={menu ? { left: "0"} : { left: "-300px"}}
      >
        <div
          className="menu-close"
          onClick={() => stateMenu()} 
        >
          <CgCloseO size={40} color="white"/>
        </div>
        
        <div className="menu-container-itens">
          <ItemMenu
            nome='Aquisições'
            itens={[
              {nomelink:'Nova Aquisição', link: '/cadastraraquisicao'},
              {nomelink:'Lista de Aquisições', link: '/aquisicoes'}]}
          />

          <ItemMenu
            nome='Fornecedores'
            itens={[
              {nomelink:'Cadastrar Fornecedor', link: ''},
              {nomelink:'Lista de Fornecedores', link: ''}]}
          />

          <ItemMenu
            nome='Servidores'
            itens={[
              {nomelink:'Cadastrar Servidor', link: ''},
              {nomelink:'Lista de Servidores', link: ''}]}
          />

          <ItemMenu
            nome='Setores'
            itens={[
              {nomelink:'Cadastrar Setores', link: '/cadastrarsetor'},
              {nomelink:'Lista de Setores', link: '/setores'}]}
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

          <div className='menu-container-user-icon'>
            <IoExit size={21} color="white"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;

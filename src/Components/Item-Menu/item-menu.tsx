import { useState } from 'react';
import { Link } from 'react-router-dom';

import {IoMdArrowDropdownCircle} from 'react-icons/io';

import './item-menu.css';

type props = {
    nome: string;
    itens: item[];
}

interface item {
    nomelink: string
    link: string
}

function ItemMenu({nome, itens}: props) {
  const [menu,setMenu] = useState(true);

  function stateMenu() {
    setMenu(!menu);
  }

  return (
    <div >
        <div className="menu-itens">
            <div className="menu-itens-title">
              <h1>{nome}</h1>
              <IoMdArrowDropdownCircle 
                size={24} 
                color="white" 
                className="menu-itens-container-arrow"
                onClick={() => stateMenu()}
                style={menu ? { transform: "rotateX(-180deg)"} : { transform: "rotateX(0deg)" }}
              />
            </div>
            
            <ul
              style={menu ? { display: "block"} : { display: "none" }}
            >
              {
                  itens.map(item => {
                      return(
                        <li key={item.nomelink}><Link to={item.link}>{item.nomelink}</Link></li>
                      );
                  })
              }
            </ul>

          </div>
    </div>
  );
}

export default ItemMenu;

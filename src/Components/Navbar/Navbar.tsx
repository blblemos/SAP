import { Link } from 'react-router-dom';
import {IoAlertCircleSharp} from 'react-icons/io5'

import Menu from '../../Components/Menu/Menu';

import './Navbar.css';

function NavbarMenu() {
  return (
    <div className="container-navbar">
      <Menu />
      <div className="navbarmenu-txt-title">
        <Link to="/"><h1>SISTEMA DE ACOMPANHAMENTO DE PROCESSOS<b>|SAP</b></h1></Link>
      </div>

      <div className="navbarmenu-container-alert">
      <Link to="/colic/alertas">
        <IoAlertCircleSharp size={40} color="#CE1218" />
        </Link>
        
      </div>

      <Link to="/home" className="navbarmenu-container-logo">

      </Link>
    </div>
  );
}

export default NavbarMenu;

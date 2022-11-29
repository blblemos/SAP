import { Link } from 'react-router-dom';
import {FaUserCircle} from 'react-icons/fa'

import './Navbar.css';

function NavbarExterno() {
  return (
    <div className="container-navbar">
      <div className="navbarmenu-txt-title">
        <Link to="/home"><h1>SISTEMA DE ACOMPANHAMENTO DE PROCESSOS<b>|SAP</b></h1></Link>
      </div>

      <div className="navbarmenu-container-alert">
      <Link to="/colic/home">
        <FaUserCircle size={40} color="#2B9F3F" />
        </Link>
        
      </div>

      <div className="navbarmenu-container-logo">

      </div>
    </div>
  );
}

export default NavbarExterno;

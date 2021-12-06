import { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarMenu from '../../Components/Navbar/Navbar';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import * as ReactBootStrap from 'react-bootstrap';
import {RiEditBoxFill} from 'react-icons/ri';
import {MdOutlineOpenInNew} from 'react-icons/md';

import '../../Styles/table.css';

const { SearchBar } = Search;

function ListaSetor(){
  const [setores,setSetores] = useState([
    {id: '0',name: 'Coordenação de Laboratórios ', sigla: 'COLAB', ramal:'216'},
    {id: '1',name: 'Coordenação de Compras', sigla: 'COLIC', ramal:'210'},
    {id: '2',name: 'Departamento Administrativo', sigla: 'DEPAD', ramal:'211'}]);

    const columns = [
      {
        dataField: 'name',
        text: 'Setor'
      },
      {
        dataField: 'sigla',
        text: 'Sigla'
      },
      {
        dataField: 'ramal',
        text: 'Ramal'
      },
      {
        dataField: 'id',
        text: '',
        formatter: (row) => (
          <div>
            <Link className='sap-table-link-icon' to={'/colic/editarsetor/'+row}><RiEditBoxFill size={25} color="#09210E"/></Link>
            <Link className='sap-table-link-icon' to={'/colic/setor/'+row}><MdOutlineOpenInNew size={25} color="#09210E"/></Link>
            <br />
          </div>
        ),
      }
    ];

    const pageButtonRenderer = ({
      page,
      active,
      onPageChange
    }) => {
      const handleClick = (e) => {
        e.preventDefault();
        onPageChange(page);
      };
      const activeStyle = {};
      if (active) {
        activeStyle.backgroundColor = '#09210E';
        activeStyle.color = 'white';
      } else {
        activeStyle.backgroundColor = '#2B9F3F';
        activeStyle.color = 'black';
      }
      if (typeof page === 'string') {
        activeStyle.backgroundColor = '#2B9F3F';
        activeStyle.color = 'black';
      }
      return (
        <li className="page-item">
          <a href="#" onClick={ handleClick } style={ activeStyle }>{ page }</a>
        </li>
      );
    };
    
    const options = {
      sizePerPage: 8,
      hideSizePerPage: true,
      pageButtonRenderer
    };
    return (
        <div className="sap-container">
        <NavbarMenu />
        <div className='sap-container-page'>
          <div className='table-container'>
            <div className='table-top'>
            </div>
            <div className='table-table'>
              <ToolkitProvider
                keyField ='id'
                data={setores}
                columns={columns}
                search
              >
                {
                  props => (
                      <div>
                        <SearchBar 
                          placeholder='🔍'
                          { ...props.searchProps } />
                        <BootstrapTable
                          bodyClasses="sap-table-td" 
                          striped 
                          bordered={ true }
                          pagination={paginationFactory(options)} 
                          { ...props.baseProps }
                        />
                      </div>
                    )
                }
              </ToolkitProvider>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default ListaSetor;


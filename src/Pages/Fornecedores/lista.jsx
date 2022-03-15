import { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavbarMenu from '../../Components/Navbar/Navbar';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {RiEditBoxFill} from 'react-icons/ri';
import {MdOutlineOpenInNew} from 'react-icons/md';
import {BsStarFill, BsStar} from 'react-icons/bs';

import {api, Config, SetarTokenNull} from '../../Services/api';

import '../../Styles/table.css';

const { SearchBar } = Search;

function ListaFornecedor(){
  const [setores,setSetores] = useState([]);
  const config = Config();
  
  useEffect(() => {
    api.get('fornecedores', config).then(response => {
      setSetores(response.data); 
    }).catch(function(error){
      if (error.response.status = 403) {
        SetarTokenNull();
      }
    })
}, []); 
    const columns = [
      {
        dataField: 'razaoSocial',
        text: 'RAZÃO SOCIAL'
      },
      {
        dataField: 'cnpj',
        text: 'CNPJ'
      },
      {
        dataField: 'avaliacao',
        text: 'AVALIAÇÃO',
        formatter: (row) => {
            switch (row) {
              case 0:
                return (
                  <div>
                    <BsStar size={25} color="#09210E"/>
                    <BsStar size={25} color="#09210E"/>
                    <BsStar size={25} color="#09210E"/>
                  </div>
                );
              case 1:
                return (
                  <div>
                    <BsStarFill size={25} color="#09210E"/>
                    <BsStar size={25} color="#09210E"/>
                    <BsStar size={25} color="#09210E"/>
                  </div>
                );
                
              case 2:
                return(
                  <div>
                    <BsStarFill size={25} color="#09210E"/>
                    <BsStarFill size={25} color="#09210E"/>
                    <BsStar size={25} color="#09210E"/>
                  </div>
                );
              case 3:
                return (
                  <div>
                    <BsStarFill size={25} color="#09210E"/>
                    <BsStarFill size={25} color="#09210E"/>
                    <BsStarFill size={25} color="#09210E"/>
                  </div>
                );      
              default:
                break;
            }
        }
      },
      {
        dataField: 'id',
        text: '',
        formatter: (row) => (
          <div>
            <Link className='sap-table-link-icon' to={'/colic/editar/fornecedor/'+row}><RiEditBoxFill size={25} color="#09210E"/></Link>
            <Link className='sap-table-link-icon' to={'/colic/vizualizar/fornecedor/'+row}><MdOutlineOpenInNew size={25} color="#09210E"/></Link>
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
  
  export default ListaFornecedor;



import { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavbarMenu from '../../Components/Navbar/Navbar';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {RiEditBoxFill} from 'react-icons/ri';
import {MdOutlineOpenInNew} from 'react-icons/md';

import useApi from '../../Services/useApi';
import axios from 'axios';

import '../../Styles/table.css';
import './home-colic.css';

const { SearchBar } = Search;

function HomeColic() {
  const [aquisicoes,setAquisicoes] = useState([]);

  /*useEffect(() => {
    api.get('posts').then(response => {
      setSetores(response.data);
    })
}, []);*/

const[load] = useApi({
  url: '/views/home',
  method: 'get',
  onCompleted: (response) => {
    setAquisicoes(response.data);
  }
}
); 

useEffect(() => {
  load();
}, []);

    const columns = [
      {
        dataField: 'numero_processo',
        text: 'PROCESSO',
        formatter: (row, rowIndex) => (
          <a className='sap-table-link' href={rowIndex.linkProcesso} target="_blank">{row}</a>
        ),
      },
      {
        dataField: 'razao_social',
        text: 'FORNECEDOR'
      },
      {
        dataField: 'objeto',
        text: 'OBJETO',
      },
      {
        dataField: 'numero_empenho',
        text: 'EMPENHO',
      },
      {
        dataField: 'status_entrega',
        text: 'ENTREGA',
      },
      {
        dataField: 'status_pagamento',
        text: 'PAGAMENTO',
      },
      {
        dataField: 'aquisicao',
        text: '',
        formatter: (row) => (
          <div>
            <Link className='sap-table-link-icon' to={'/colic/aquisicoes/'+row} title='Visualizar'><MdOutlineOpenInNew size={25} color="#09210E"/></Link>
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
              data={aquisicoes}
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

export default HomeColic;

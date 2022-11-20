
import { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavbarExterno from '../../Components/Navbar/NavbarExterno';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {MdOutlineOpenInNew} from 'react-icons/md';

import useApiExterno from '../../Services/useApiExterno';

import '../../Styles/table.css';

const { SearchBar } = Search;

function HomeExterno() {
  const [aquisicoes,setAquisicoes] = useState([]);

const[load] = useApiExterno({
  url: '/views/aquisicoes',
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
          <a className='sap-table-link' href={rowIndex.link_processo} target="_blank">{row}</a>
        ),
      },
      {
        dataField: 'numero_aquisicao',
        text: 'AQUISIÇÂO'
      },
      {
        dataField: 'objeto',
        text: 'OBJETO',
      },
      {
        dataField: 'valor_total',
        text: 'VALOR',
      },
      {
        dataField: 'status',
        text: 'STATUS',
      },
      {
        dataField: 'aquisicao',
        text: '',
        formatter: (row) => (
          <div>
            <Link className='sap-table-link-icon' to={'/externo/aquisicoes/'+row} title='Visualizar'><MdOutlineOpenInNew size={25} color="#09210E"/></Link>
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
      <NavbarExterno />
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

export default HomeExterno;

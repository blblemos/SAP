
import { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavbarMenu from '../../Components/Navbar/Navbar';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import {MdOutlineOpenInNew} from 'react-icons/md';

import useApi from '../../Services/useApi';

import '../../Styles/table.css';
import '../Home-Colic/home-colic.css';


function Alertas() {
  const [entrega,setEntrega] = useState([]);
  const [ateste,setAteste] = useState([]);
  const [pagamento,setPagamento] = useState([]);
//Set de entrega
const[loadEntrega] = useApi({
  url: '/views/alertaentrega',
  method: 'get',
  onCompleted: (response) => {
    setEntrega(response.data);
  }
}
);
//Set de ateste
const[loadAteste] = useApi({
  url: '/views/alertaateste',
  method: 'get',
  onCompleted: (response) => {
    setAteste(response.data);
  }
}
); 
//Set de pagamento
const[loadPagamento] = useApi({
  url: '/views/alertapagamento',
  method: 'get',
  onCompleted: (response) => {
    setPagamento(response.data);
  }
}
); 

useEffect(() => {
  loadEntrega();
  loadAteste();
  loadPagamento();
}, []);

    const columns = [
      {
        dataField: 'numero_aquisicao',
        text: 'AQUISIÇÃO',
        formatter: (row, rowIndex) => (
          <a className='sap-table-link' href={rowIndex.linkProcesso} target="_blank">{row}</a>
        ),
      },
      {
        dataField: 'numero_empenho',
        text: 'EMPENHO'
      },
      {
        dataField: 'status_entrega',
        text: 'STATUS',
      },
      {
        dataField: 'data_contagem',
        text: 'DATA',
      },{
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
          {//Tabela Entrega
                entrega.length > 0 && 
                <div className='sap-div-table-aquisicao'>
                  <div className="sap-table-title">
                    <h1>ATRASOS DE ENTREGA</h1>
                  </div>
                  <ToolkitProvider
                    keyField ='id'
                    data={entrega}
                    columns={columns}
                  >
                    {
                      props => (
                          <div>
                            <BootstrapTable
                              bodyClasses="sap-table-td" 
                              striped 
                              bordered={ true }
                              { ...props.baseProps }
                            />
                          </div>
                        )
                    }
                </ToolkitProvider>
              </div>
              }
              
              {//Tabela Ateste
                ateste.length > 0 && 
                <div className='sap-div-table-aquisicao'>
                  <div className="sap-table-title">
                    <h1>ATRASO DE ATESTE</h1>
                  </div>
                  <ToolkitProvider
                    keyField ='id'
                    data={ateste}
                    columns={columns}
                  >
                    {
                      props => (
                          <div>
                            <BootstrapTable
                              bodyClasses="sap-table-td" 
                              striped 
                              bordered={ true }
                              { ...props.baseProps }
                            />
                          </div>
                        )
                    }
                </ToolkitProvider>
              </div>
              }

              {//Tabela Pagamento
                pagamento.length > 0 && 
                <div className='sap-div-table-aquisicao'>
                  <div className="sap-table-title">
                    <h1>ATRASO DE PAGAMENTO</h1>
                  </div>
                  <ToolkitProvider
                    keyField ='id'
                    data={pagamento}
                    columns={columns}
                  >
                    {
                      props => (
                          <div>
                            <BootstrapTable
                              bodyClasses="sap-table-td" 
                              striped 
                              bordered={ true }
                              { ...props.baseProps }
                            />
                          </div>
                        )
                    }
                </ToolkitProvider>
              </div>
              }
        </div>
      </div>
    </div>
  );
}

export default Alertas;

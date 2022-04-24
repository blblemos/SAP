import {useState, useEffect} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {RiEditBoxFill} from 'react-icons/ri';
import { MdDelete} from 'react-icons/md';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import NavbarMenu from '../../Components/Navbar/Navbar';
import Status from '../../Components/Status/status';
import Anotacoes from '../../Components/Anotacoes/anotacoes';
import {api, Config, SetarTokenNull} from '../../Services/api';

import '../../Styles/form.css';
import './style.css';
import '../../Styles/table.css';


function VizualizarAquisicao(){
  const navigateTo = useNavigate();
  const {id} = useParams();
  const [rec_Extra, setRec_Extra] = useState(true);
  const config = Config();
  const [aquisicao,setAquisicao] = useState({});
  const [servidor,setServidor] = useState({});
  const [setor,setSetor] = useState({});
  const [empenhos,setEmpenhos] = useState([]);
  {/*Definir Set de modal*/}
  const [modal, setModal] = useState('');
  {/*Selecionar Modal ativa*/}
  let divModal; 
  switch (modal) {
    case 'status':
      divModal =
      <Status
          aquisicao={aquisicao}
          status={aquisicao.status}
          onChangeModal={setModal}
        />
      break;
    case 'anotacoes':
    divModal =
      <Anotacoes
          aquisicao={aquisicao}
          anotacao={aquisicao.anotacoes}
          onChangeModal={setModal}
        />
    break;
  
    default:
      break;
  }
  //Deleta Empenho
  function onClickDeleteEmpenho(idEmpenho){
    let thisEmpenho = '';
    //Busca o numero do empenho
    empenhos.map(empenho => {
      if (empenho.id === idEmpenho) {
        thisEmpenho = empenho.numeroEmpenho;
      }
    });
    if (window.confirm("Tem certeza que deseja deletar o empenho "+thisEmpenho+"?") == true) {
      api.delete(`empenhos/${idEmpenho}`, config).then(response => { 
        alert("Empenho deletado com sucesso!!");
        window.location.reload();
      }).catch(function(error){
        alert("O processo ainda não possui empenhos");
      });
    }
  }
  
  //Setando colunas da tabela em referência a API 
  const columns = [
    {
      dataField: 'numeroEmpenho',
      text: 'Empenho',
      formatter: (row, rowIndex) => (
        <Link className='sap-table-link'  to={'/colic/empenho/'+id+'/'+rowIndex.id}>{row}</Link>
      ),
    },
    {
      dataField: 'valorTotalNE',
      text: 'Valor'
    },
    {
      dataField: 'fornecedor.razaoSocial',
      text: 'Fornecedor',
      formatter: (row, rowIndex) => (
        <Link className='sap-table-link'  to={'/colic/vizualizar/fornecedor/'+rowIndex.fornecedor.id}>{row}</Link>
      ),
    },
    {
      dataField: 'id',
      text: '',
      formatter: (row) => (
        <div className='sap-div-table-link-icon'>
          <Link className='sap-table-link-icon'  to={'/colic/editar/empenho/'+id+'/'+row}><RiEditBoxFill size={25} color="#09210E"/></Link>
          <div className='sap-table-link-icon'onClick={() => onClickDeleteEmpenho(row)}><MdDelete size={25} color="#09210E"/></div>
          <br />
        </div>
      ),
    }
  ];

  //Pegando dados da API 
  useEffect(() => {
    //Pegando dados da aquisição
    api.get(`aquisicoes/${id}`, config).then(response => {
      setAquisicao(response.data);
      setServidor(response.data.servidor);
      setSetor(response.data.servidor.setor);
      setRec_Extra(response.data.recExtraOrc); 
    //Pegando empenhos relacionados a aquisição
      api.get(`empenhos/search?aquisicao=${response.data.numeroAquisicao}`, config).then(response => { 
        setEmpenhos(response.data);
      }).catch(function(error){
        alert("O processo ainda não possui empenhos");
      });
    });
    
  }, []);
  return (
    <div className="sap-container">
      <NavbarMenu />
      {/*Abrir Modal Selecionado*/
        divModal
      }
      <div className='sap-container-page'>
          <div className="sap-container-div-with-menu-title">
            <h1>Aquisição {aquisicao.numeroAquisicao}</h1>
          </div>
          <div className='sap-container-div-with-menu'>
            <div className='sap-container-div-with-menu-w80'>
              <form className="sap-form-container-noform">
                <label>Solicitante</label>
                <input
                  className="form-input form-input-w100 sap-form-input-disabled" 
                  type="text"
                  value={servidor.nome+' | '+setor.sigla}
                  disabled 
                />
                <div className="form-elements">
                  <div className="form-elements-column">
                    
                    <label>Objeto</label>
                    <input
                      className="form-input form-input-w100 sap-form-input-disabled" 
                      type="text"
                      value={aquisicao.objeto}
                      disabled 
                    />
                    <label>Processo SEI</label>
                    <a
                        className="form-input form-input-w100 sap-form-input-disabled form-input-a"
                        href={aquisicao.linkProcesso}
                        target="_blank"
                      >{aquisicao.numeroProcesso}</a>

                    <label>Tipo</label>
                    <input
                      className="form-input form-input-w100 sap-form-input-disabled"
                      type="text"
                      value={aquisicao.tipo}
                      disabled 
                    />
                    <label>Orçamento</label>
                    <input
                      className="form-input form-input-w100 sap-form-input-disabled"
                      type="text"
                      
                      disabled 
                    />
                  </div>
                  <div className="form-elements-column">
                    <label>Valor Total</label>
                    <input
                      className="form-input form-input-w100 sap-form-input-disabled" 
                      type="text"
                      value={aquisicao.valorTotal}
                      disabled 
                    />
                    <label>Data de abertura</label>
                    <input
                      className="form-input form-input-w100 sap-form-input-disabled"
                      type="text"
                      value={aquisicao.data}
                      disabled 
                    />
                    <label>Modalidade</label>
                    <input
                      className="form-input form-input-w100 sap-form-input-disabled"
                      type="text"
                      name="modalidade"
                      value={aquisicao.modalidade}
                      disabled 
                    />
                    <div className='sap-form-container-input-row'>
                      <div className='sap-form-container-input-column sap-form-container-input-column-w60 '>
                        <label>Pac</label>
                          <input
                          className="form-input form-input-w100 sap-form-input-disabled"
                          type="text"
                          value={aquisicao.pac}
                          disabled
                          />
                      </div>
                      <div className='sap-form-container-input-column sap-form-container-input-column-w40'>
                        <label>Recursos Extraorçamentários</label>
                        <div className="sap-form-button-select">
                          <button 
                            type="button" 
                            className={rec_Extra ? 'sap-form-button sap-form-button-active sap-form-button-active-green' : 'sap-form-button sap-form-input-disabled'}
                            disabled
                          >
                            Sim
                          </button>
                          <button 
                            type="button"
                            className={!rec_Extra ? 'sap-form-button sap-form-button-active sap-form-button-active-red' : 'sap-form-button sap-form-input-disabled'}
                            disabled
                          >
                            Não
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              {
                empenhos.length > 0 && 
                <div className='sap-div-table-aquisicao'>
                  <div className="sap-table-title">
                    <h1>Nota de Empenho</h1>
                  </div>
                  <ToolkitProvider
                    keyField ='id'
                    data={empenhos}
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
            <div className='sap-container-div-with-menu-w20'>
              <div className='sap-btn-menu-sidebar'>
                <Link className='sap-btn-menu-sidebar-link' to={'/colic/editar/aquisicoes/'+id}>Editar Aquisição</Link>
              </div>
              <div className='sap-btn-menu-sidebar' onClick={() => navigateTo('/colic/cadastrar/empenho/'+id)}>
                <span>Adicionar Nota de Empenho</span>
              </div>
              <div className='sap-btn-menu-sidebar' onClick={() => navigateTo('/colic/editar/empenho/')}>
                <span>Adicionar Cobrança</span>
              </div>
              <div className='sap-btn-menu-sidebar' onClick={() => setModal('status')}>
                <span>Definir Status</span>
              </div>
              <div className='sap-btn-menu-sidebar' onClick={() => setModal('anotacoes')}>
                <span>Anotações</span>
              </div>
              <div className='sap-btn-menu-sidebar sap-btn-menu-sidebar-red' onClick={() => navigateTo('/colic/editar/empenho/')}>
                <span>Deletar Processo</span>
              </div>
            </div>
          </div>
      </div>
      
    </div>
  );
}

export default VizualizarAquisicao;
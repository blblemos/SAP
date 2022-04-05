import {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';

import NavbarMenu from '../../Components/Navbar/Navbar';
import {api, Config} from '../../Services/api';
import AddEmpenho from '../../Components/Add-Empenho/add-empenho';

import '../../Styles/form.css';
import './style.css';

function VizualizarAquisicao(){
  const [modal, setModal] = useState('');
  const {id} = useParams();
  const [rec_Extra, setRec_Extra] = useState(true);
  const config = Config();
  const [aquisicao,setAquisicao] = useState({});
  const [servidor,setServidor] = useState({});
  const [setor,setSetor] = useState({});
  function openModal() {
    switch (modal) {
      case 'Nota de Empenho': 
        return(
          <AddEmpenho onChangeModal={setModal} />
        );
        
      case 'Entrega': 
        console.log('Entrega');
        break;
        
      default:
        return(
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
                    <input
                      className="form-input form-input-w100 sap-form-input-disabled"
                      type="text"
                      value={aquisicao.numeroProcesso}
                      disabled 
                    />
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
            </div>
            <div className='sap-container-div-with-menu-w20'>
              <div className='sap-btn-menu-sidebar'>
                <Link className='sap-btn-menu-sidebar-link' to={'/colic/editar/aquisicoes/'+id}>Editar Aquisição</Link>
              </div>
              <div className='sap-btn-menu-sidebar' onClick={() => setModal('Nota de Empenho')}>
                <span>Adicionar Nota de Empenho</span>
              </div>
              <div className='sap-btn-menu-sidebar' onClick={() => setModal('Entrega')}>
                <span>Adicionar Entrega</span>
              </div>
            </div>
          </div>
      </div>
        );
    }
  } 
  useEffect(() => {
    api.get(`aquisicoes/${id}`, config).then(response => {
      setAquisicao(response.data);
      setServidor(response.data.servidor);
      setSetor(response.data.servidor.setor);
      setRec_Extra(response.data.recExtraOrc);
    });
  }, [id]);
  
  return (
    <div className="sap-container">
      <NavbarMenu />
      {openModal()};
      
    </div>
  );
}

export default VizualizarAquisicao;
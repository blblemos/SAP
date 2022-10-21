import {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import {RiEditBoxFill} from 'react-icons/ri';

import NavbarMenu from '../../Components/Navbar/Navbar';
import useApi from '../../Services/useApi';

import '../../Styles/form.css';

//Setando valores iniciais para servidor(Não percisa alterar pq nao tem função, só não conseguir fazer funcionar sem)
const initialValue = {
  nome: '',
  email: '',
  celular: '',
  foto: '',
  setor: 0,
  cargo: ''
}

function VizualizarServidor(){
  const {id} = useParams();
  const [colic, setColic] = useState(false);
  const [servidor,setServidor] = useState(initialValue);
  //carregando servidor da API
  const [loadServidor] = useApi({
    url: `/servidores/${id}`,
    method: 'get',
    onCompleted: (response) => { 
      setServidor(response.data);
      setColic(response.data.colic);
    }
  });

  //Chamando funções de carregamento
  useEffect(() => {
    loadServidor();
  }, [id]);
  
  return (
    <div className="sap-container">
      <NavbarMenu />
      <div className='sap-container-page'>
        <form
                className="sap-form-container"
              >
                <div className="form-title">
                  <h1>{servidor.nome+' | '+servidor.setor.nome}
                    <Link className='' to={'/colic/editar/servidor/'+id}>
                      <RiEditBoxFill 
                        size={25} 
                        color="#09210E"
                        className="sap-form-icon-title"
                      />
                    </Link>
                  </h1>
                </div>
                <div className="form-elements">
                  <div className="form-elements-column">
                    <label>Cargo</label>
                    <input
                      className="form-input form-input-w100 sap-form-input-disabled" 
                      type="text"
                      name='CargoServidor'
                      value={servidor.nome}
                      disabled 
                    />
                    <label>Função</label>
                    <input
                      className="form-input form-input-w100 sap-form-input-disabled" 
                      type="text"
                      name='CargoServidor'
                      value={servidor.funcao}
                      disabled 
                    />
                  </div>
                  <div className="form-elements-column">
                    <div className='sap-form-container-input-row'>
                        <div className='sap-form-container-input-column sap-form-container-input-column-w40'>
                          <label>Servidor da COLIC</label>
                          <div className="sap-form-button-select">
                            <button 
                              type="button"
                              disabled 
                              className={colic ? 'sap-form-button sap-form-button-active sap-form-button-active-green' : 'sap-form-button sap-form-input-disabled'}
                              onClick={() => setColic(true)}
                            >
                              Sim
                            </button>
                            <button 
                              type="button"
                              className={!colic ? 'sap-form-button sap-form-button-active sap-form-button-active-red' : 'sap-form-button'}
                              onClick={() => setColic(false)}
                            >
                              Não
                            </button>
                          </div>
                        </div>
                    </div>
                    <label>E-mail</label>
                    <input
                      className="form-input form-input-w100 sap-form-input-disabled"
                      type="text"
                      name='EmailServidor'
                      disabled 
                      value={servidor.email}
                    />
                    <label>Celular</label>
                    <input
                      className="form-input form-input-w100 sap-form-input-disabled"
                      type="text"
                      name='CelularServidor' 
                      value={servidor.celular}
                      disabled
                    />
                  </div>
                </div>
        </form>
      </div>
    </div>
  );
}

export default VizualizarServidor;
import {useState, useEffect} from 'react';
import {Formik, Field, Form} from 'formik';
import { Link, useParams } from 'react-router-dom';
import { mask as masker, unMask } from "remask";
import {RiEditBoxFill} from 'react-icons/ri';

import NavbarMenu from '../../Components/Navbar/Navbar';
import Schema from '../../Utils/ShemaServidor';
import {api, Config} from '../../Services/api';

import '../../Styles/form.css';

function VizualizarServidor(){
  const {id} = useParams();
  const config = Config();
  const [colic, setColic] = useState(false);
  const [setor,setSetor] = useState([]);
  const [servidor,setServidor] = useState({
    NomeServidor: '',  
    EmailServidor:'',
    CelularServidor: '',
    FotoServidor: '',
    SetorServidor: 0,
    CargoServidor: '',
  });  
  useEffect(() => {
    api.get(`setores`, config).then(response => {
      setSetor(response.data);
    });
    api.get(`servidores/${id}`, config).then(response => {
      setServidor({
        NomeServidor: response.data.nome,  
        EmailServidor: response.data.email,
        CelularServidor: response.data.celular,
        FotoServidor: response.data.foto,
        SetorServidor: response.data.setor.sigla,
        CargoServidor: response.data.cargo,
      });
      setColic(response.data.colic);
    });
  }, []);
  
  return (
    <div className="sap-container">
      <NavbarMenu />
      <div className='sap-container-page'>
        <Formik
          validationSchema={Schema}
          initialValues={servidor}
          enableReinitialize
        >
          {({errors,touched,values}) => {
            return(
              <Form
                className="sap-form-container"
              >
                <div className="form-title">
                  <h1>{servidor.NomeServidor+' | '+servidor.SetorServidor}
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
                    <Field
                      className="form-input form-input-w100 sap-form-input-disabled" 
                      type="text"
                      name='CargoServidor'
                      disabled 
                    />
                    <label>E-mail</label>
                    <Field
                      className="form-input form-input-w100 sap-form-input-disabled"
                      type="text"
                      name='EmailServidor'
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
                      <label>Celular</label>
                      <Field
                        className="form-input form-input-w100 sap-form-input-disabled"
                        type="text"
                        name='CelularServidor' 
                        maxLength = {15}
                        value={masker(unMask(values.CelularServidor),["(99) 9999-9999","(99)9 9999-9999"])}
                        disabled
                      />
                  </div>
                </div>
              </Form>
          )}
          }
        </Formik>
      </div>
    </div>
  );
}

export default VizualizarServidor;
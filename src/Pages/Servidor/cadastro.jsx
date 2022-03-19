import {useState, useEffect} from 'react';
import {Formik, Field, Form} from 'formik';
import { useNavigate } from 'react-router-dom';
import { mask as masker, unMask } from "remask";

import NavbarMenu from '../../Components/Navbar/Navbar';
import Schema from '../../Utils/ShemaServidor';
import {api, Config} from '../../Services/api';

import '../../Styles/form.css';

function CadastrarServidor(){
  const navigateTo = useNavigate();
  const config = Config();
  const [colic, setColic] = useState(false);
  const [setor,setSetor] = useState([]);
  const [user,setUser] = useState({
    UserName: '',
    UserPassword: '',
  },
  );  
  useEffect(() => {
    api.get(`setores`, config).then(response => {
      setSetor(response.data);
    })
  }, []);
  function onSubmit(values) { console.log(values.SetorServidor); 
    const bodyParameters = {
      nome: values.NomeServidor,
      colic: colic,
      email: values.EmailServidor,
      celular: values.CelularServidor,
      foto: '1',
      setor: {
        id: values.SetorServidor
      }
    };
      api.post('servidores',bodyParameters, config).then(function (response) {
        alert(values.NomeServidor+' Cadastrado Com Sucesso!');
        navigateTo('/colic/servidores');
      }).catch(function (error) {
        let msgError = '';
        for (var index = 0; index < error.response.data.length; index++) {
          msgError = msgError+error.response.data[index].message+'\n';
        }
        alert(msgError);
      });
  }
  return (
    <div className="sap-container">
      <NavbarMenu />
      <div className='sap-container-page'>
        <Formik
          validationSchema={Schema}
          onSubmit={onSubmit}
          initialValues={{
            NomeServidor: '',  
            EmailServidor:'',
            CelularServidor: '',
            FotoServidor: '',
            SetorServidor: 0,
            CargoServidor: '',
          }}
        >
          {({errors,touched,values}) => {
            return(
              <Form
                className="sap-form-container"
              >
                <div className="form-title">
                  <h1>CADASTRO DE SERVIDOR</h1>
                </div>
                <div className="form-elements">
                  <div className="form-elements-column">
                    <label>Nome</label>
                    <Field
                      className={errors.NomeServidor && touched.NomeServidor ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "} 
                      type="text"
                      name='NomeServidor'
                    />
                    <label>Cargo</label>
                    <Field
                      className={errors.CargoServidor && touched.CargoServidor ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='CargoServidor' 
                    />
                    <label>E-mail</label>
                    <Field
                      className={errors.EmailServidor && touched.EmailServidor ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='EmailServidor' 
                    />
                  </div>
                  <div className="form-elements-column">
                    <div className='sap-form-container-input-row'>
                        <div className='sap-form-container-input-column sap-form-container-input-column-w40'>
                          <label>Servidor da COLIC</label>
                          <div className="sap-form-button-select">
                            <button 
                              type="button" 
                              className={colic ? 'sap-form-button sap-form-button-active sap-form-button-active-green' : 'sap-form-button'}
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
                      <label>Setor</label>
                      <div className="sap-form-button-select sap-form-button-select-margin-bot">
                      <Field
                        className={errors.SetorServidor && touched.SetorServidor ? 'sap-form-select sap-form-select-error' : 'sap-form-select'} 
                        name="SetorServidor" 
                        as="select">
                        <option value="null"></option>
                        {setor.map(setores => {
                          return (
                            <option value={setores.id}>{setores.sigla}</option>
                          )
                        })
                        }
                      </Field>
                      </div>
                      <label>Celular</label>
                      <Field
                        className={errors.CelularServidor && touched.CelularServidor ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                        type="text"
                        name='CelularServidor' 
                        maxLength = {15}
                        value={masker(unMask(values.CelularServidor),["(99) 9999-9999","(99)9 9999-9999"])}
                      />
                  </div>
                </div>
                <div className="form-footer">
                  <button 
                    type='submit' 
                    className="form-btn">
                      Cadastrar
                  </button>
                  <div className="clear"></div>
                </div>
              </Form>
          )}
          }
        </Formik>
      </div>
    </div>
  );
}

export default CadastrarServidor;
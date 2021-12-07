import {useState} from 'react';
import {Formik, Field, Form} from 'formik';
import { useNavigate } from 'react-router-dom';

import NavbarMenu from '../../Components/Navbar/Navbar';
import Schema from '../../Utils/Shema';

import '../../Styles/form.css';

function CadastrarServidor(){
  const navigateTo = useNavigate();
  const [colic, setColic] = useState(false); 

  function onSubmit(values) {
    alert(values.nome+' Cadastrado Com Sucesso!');
    navigateTo('/colic/setores');
  }


  return (
    <div className="sap-container">
      <NavbarMenu />
      <div className='sap-container-page'>
        <Formik
          validationSchema={Schema}
          onSubmit={onSubmit}
          initialValues={{
            nome: '', 
            cargo: '',
            email: '',
            setor: 'vazio',
            celular: ''
          }}
        >
          {({errors,touched}) => {
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
                      className={errors.nome && touched.nome ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "} 
                      type="text"
                      name='nome'
                    />
                    <label>Cargo</label>
                    <Field
                      className={errors.cargo && touched.cargo ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='cargo' 
                    />
                    <label>E-mail</label>
                    <Field
                      className={errors.email && touched.email ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='email' 
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
                        className='sap-form-select' 
                        name="setor" 
                        as="select">
                        <option value="vazio"></option>
                        <option value="colic">COLIC</option>
                        <option value="depad">DEPAD</option>
                        <option value="COLAB">COLAB</option>
                      </Field>
                      </div>
                      <label>Celular</label>
                      <Field
                        className={errors.celular && touched.celular ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                        type="text"
                        name='celular' 
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
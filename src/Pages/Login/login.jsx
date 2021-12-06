import { useState, useContext } from 'react';
import {Formik, Field, Form} from 'formik';
import { Link , useNavigate  } from 'react-router-dom';
import StoreContext from '../../Components/Store/Context';

import './login.css';

function loginFake({ user, login }) {
  if (user === 'adm' && login === 'adm') {
    return { token: '1234' };
  }
  return { error: 'Usuário ou senha inválido' };
}

export default function Login(){
  const navigateTo = useNavigate();
  const { setToken } = useContext(StoreContext);
  
  function onSubmit(values, actions) {
    const { token } = loginFake(values); 

    if (token) {
      setToken(token);
      return navigateTo('/colic/home');
    }
    
    actions.resetForm({});
  }
  return (
    <div className="sap-login-container">
      <Formik
          onSubmit={onSubmit}
          initialValues={{
            user: '', 
            login: '',
          }}
        >
          {({}) => {
            return (
              <Form className="sap-form-login">
                <div className="sap-login-top">
                  <h1>SAP
                    <span>SISTEMA DE ACOMPANHAMENTO DE PROCESSOS</span>
                  </h1>
                  <div className="sap-login-logo-img"></div>
                </div>
                <div className='sap-form-container-input'>
                  <label>Usuário</label>
                  <Field
                    className="sap-form-input" 
                    type="text"
                    name="user"
                  />
                </div>
                <div className='sap-form-container-input'>
                  <label>Senha</label>
                  <Field 
                    className="sap-form-input" 
                    type="password"
                    name="login"
                  />
                  <Link to="/"><span>Esqueci a Senha</span></Link>
                </div>
                  <button 
                    type='submit' 
                    className="sap-form-login-btn">
                      Entrar
                  </button>
              </Form>
            );
          }
          }
        </Formik>
    </div>
  );
}
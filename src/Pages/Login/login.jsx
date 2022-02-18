import { useState, useContext,useEffect } from 'react';
import {Formik, Field, Form, validateYupSchema} from 'formik';
import { Link , useNavigate  } from 'react-router-dom';
import StoreContext from '../../Components/Store/Context';

import api from '../../Services/api';


import './login.css';

export default function Login(){
  const navigateTo = useNavigate();
  const { setToken } = useContext(StoreContext);
  
  async function onSubmit(values, actions) {

    api.post('/login',{
      username: values.user,
      password: values.login
    }).then(function (response) {
      console.log(response.headers.authorization);
      if (response.headers.authorization) {
        setToken(response.headers.authorization);
        return navigateTo('/colic/home');
      }
    }).catch(function (error) {
      console.log(error);
      alert('Error: ' + error.message);
    });

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
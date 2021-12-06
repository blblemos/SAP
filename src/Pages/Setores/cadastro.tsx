import {Formik, Field, Form} from 'formik';
import { useNavigate } from 'react-router-dom';

import NavbarMenu from '../../Components/Navbar/Navbar';
import Schema from '../../Utils/Shema';

import '../../Styles/form.css';

function CadastrarServidor(){
  const navigateTo = useNavigate();

  function onSubmit(values: any) {
    alert(values.name+' Cadastrado Com Sucesso!');
    navigateTo('/setores');
  }


  return (
    <div className="sap-container">
      <NavbarMenu />
      <div className='sap-container-page'>
        <Formik
          validationSchema={Schema}
          onSubmit={onSubmit}
          initialValues={{
            name: '', 
            ramal: '',
            sigla: '',
            email: '',
          }}
        >
          {({errors,touched}) => {
            return(
              <Form
                className="sap-form-container"
              >
                <div className="form-title">
                  <h1>CADASTRO DE SETORES</h1>
                </div>
                <div className="form-elements">
                  <div className="form-elements-column">
                    <label>Nome</label>
                    <Field
                      className={errors.name && touched.name ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "} 
                      type="text"
                      name='name'
                    />
                    <label>Ramal</label>
                    <Field
                      className={errors.ramal && touched.ramal ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='ramal' 
                    />
                  </div>
                  <div className="form-elements-column">
                    <label>Sigla</label>
                    <Field
                      className={errors.sigla && touched.sigla ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='sigla'
                    />
                    <label>E-mail</label>
                    <Field
                      className={errors.email && touched.email ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='email' 
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
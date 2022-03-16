import {Formik, Field, Form} from 'formik';
import { useNavigate } from 'react-router-dom';

import NavbarMenu from '../../Components/Navbar/Navbar';
import Schema from '../../Utils/ShemaSetor';
import {api, Config} from '../../Services/api';

import '../../Styles/form.css';

function CadastrarSetor(){
  const navigateTo = useNavigate();
  const config = Config();
  function onSubmit(values) { 
    const bodyParameters ={
      nome: values.NomeSetor,
      sigla: values.SiglaSetor,
      ramal: values.RamalSetor,
      email: values.EmailSetor,
    }
    api.post('setores', bodyParameters, config).then(function (response) { 
      alert(values.NomeSetor+' Cadastrado Com Sucesso!');
      navigateTo('/colic/setores');
    }).catch(function (error) {
      let msgError = '';
        for (var index = 0; index < error.response.data.length; index++) {
          msgError = msgError+error.response.data[index].message+'\n';
        }
        alert(msgError);
    })
  }
  return (
    <div className="sap-container">
      <NavbarMenu />
      <div className='sap-container-page'>
        <Formik
          validationSchema={Schema}
          onSubmit={onSubmit}
          initialValues={{
            NomeSetor: '', 
            SiglaSetor: '',
            RamalSetor: '',
            EmailSetor: '',
          }}
        >
          {({errors,touched,values}) => {
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
                      className={errors.NomeSetor && touched.NomeSetor ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "} 
                      type="text"
                      name='NomeSetor'
                    />
                    <label>Ramal</label>
                    <Field
                      className={errors.RamalSetor && touched.RamalSetor ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="number"
                      name='RamalSetor'
                      maxLength = {15}  
                    />
                  </div>
                  <div className="form-elements-column">
                    <label>Sigla</label>
                    <Field
                      className={errors.SiglaSetor && touched.SiglaSetor ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='SiglaSetor'
                    />
                    <label>E-mail</label>
                    <Field
                      className={errors.EmailSetor && touched.EmailSetor ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='EmailSetor' 
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

export default CadastrarSetor;
import { useEffect, useState } from "react";
import {Formik, Field, Form} from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

import NavbarMenu from '../../Components/Navbar/Navbar';
import Schema from '../../Utils/ShemaSetor';
import {api, Config} from '../../Services/api';

import '../../Styles/form.css';

function EditarSetor(){
  const navigateTo = useNavigate();
  const {id} = useParams();
  const config = Config();
  const [setor,setSetor] = useState({
    NomeSetor: '', 
    SiglaSetor: '', 
    RamalSetor:'',
    EmailSetor: ''
  },
  );
  useEffect(() => {
    api.get(`setores/${id}`, config).then(response => {
      setSetor({
        NomeSetor: response.data.nome,
        SiglaSetor: response.data.sigla, 
        RamalSetor: response.data.ramal,
        EmailSetor: response.data.email,
      })
    });
  }, [id]);
  async function onSubmit(values) {
    await api.put(`setores/${id}`, {
      id: parseInt(id),
      nome: values.NomeSetor,
      sigla: values.SiglaSetor, 
      ramal: values.RamalSetor,
      email: values.EmailSetor,
    }, config)
    .then(function () {
      alert(values.NomeSetor+' Editado Com Sucesso!');
      navigateTo('/colic/setores');
    })
    .catch(function (error) {console.log(error.response)
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
          initialValues={setor}
          enableReinitialize
        >
          {({errors,touched,values}) => {
            return(
              <Form
                className="sap-form-container"
              >
                <div className="form-title">
                  <h1>Editar {values.NomeSetor}</h1>
                </div>
                <div className="form-elements">
                  <div className="form-elements-column">
                    <label>Nome</label>
                    <Field
                      className={errors.name && touched.name ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "} 
                      type="text"
                      name='NomeSetor'
                    />
                    <label>Ramal</label>
                    <Field
                      className={errors.ramal && touched.ramal ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='RamalSetor' 
                    />
                  </div>
                  <div className="form-elements-column">
                    <label>Sigla</label>
                    <Field
                      className={errors.sigla && touched.sigla ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='SiglaSetor'
                    />
                    <label>E-mail</label>
                    <Field
                      className={errors.email && touched.email ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
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

export default EditarSetor;
import { useEffect, useState } from "react";
import {Formik, Field, Form} from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

import NavbarMenu from '../../Components/Navbar/Navbar';
import Schema from '../../Utils/Shema';

import '../../Styles/form.css';

interface Setor {
    id: number;
    name: string;
    sigla: string;
    email: string;
    ramal: string;
  }

function EditarSetor(){
  const navigateTo = useNavigate();
  const {id} = useParams();
  const [setor,setSetor] = useState<Setor>(
    {id: 0,name: 'Coordenação de Laboratórios ', sigla: 'COLAB', ramal:'216',email: 'colab.ire@ifba.edu.br'},
  );
  function onSubmit(values: any) {
    if (window.confirm("Editar "+setor.sigla+" ?")) {
      alert(values.name+' Editado Com Sucesso!');
      navigateTo('/colic/setores');
    }
    
  }


  return (
    <div className="sap-container">
      <NavbarMenu />
      <div className='sap-container-page'>
        <Formik
          validationSchema={Schema}
          onSubmit={onSubmit}
          initialValues={{
            name: setor.name, 
            ramal: setor.ramal,
            sigla: setor.sigla,
            email: setor.email,
          }}
        >
          {({errors,touched}) => {
            return(
              <Form
                className="sap-form-container"
              >
                <div className="form-title">
                  <h1>EDITAR SETOR</h1>
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
                      Editar
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
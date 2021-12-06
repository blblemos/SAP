import { useEffect, useState } from "react";
import {Formik, Field, Form} from 'formik';
import { useParams } from 'react-router-dom';


import NavbarMenu from '../../Components/Navbar/Navbar';
import Schema from '../../Utils/Shema';

import '../../Styles/form.css';
import { parse } from "path";

interface Setor {
  id: number;
  name: string;
  sigla: string;
  email: string;
  ramal: string;
}

function Setor(){
  const {id} = useParams();
  const [setor,setSetor] = useState<Setor>(
    {id: 0,name: 'Coordenação de Laboratórios ', sigla: 'COLAB', ramal:'216',email: 'colab.ire@ifba.edu.br'},
  );

  function onSubmit(){

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
                  <h1>{setor.name+' | '+setor.sigla}</h1>
                </div>
                <div className="form-elements">
                  <div className="form-elements-column">
                   
                    <label>Ramal</label>
                    <Field
                      className="form-input form-input-w100 sap-form-input-disabled"  
                      type="text"
                      name='ramal'
                      disabled
                      value={setor.ramal} 
                    />
                  </div>
                  <div className="form-elements-column ">
                   
                    <label>E-mail</label>
                    <Field
                      className="form-input form-input-w100 sap-form-input-disabled "
                      type="text"
                      name='email' 
                      disabled
                      value={setor.email}
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

export default Setor;
import { useEffect, useState } from "react";
import {Formik, Field, Form} from 'formik';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {RiEditBoxFill} from 'react-icons/ri';

import NavbarMenu from '../../Components/Navbar/Navbar';
import {api, Config} from '../../Services/api';

import '../../Styles/form.css';

function VizualizarSetor(){
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
  return (
    <div className="sap-container">
      <NavbarMenu />
      <div className='sap-container-page'>
        <Formik
          initialValues={setor}
          enableReinitialize
        >
          {() => {
            return(
              <Form
                className="sap-form-container"
              >
                <div className="form-title">
                  <h1>
                    {setor.NomeSetor+' | '+setor.SiglaSetor}
                    <Link className='' to={'/colic/editar/setor/'+id}>
                      <RiEditBoxFill 
                        size={25} 
                        color="#09210E"
                        className="sap-form-icon-title"
                      />
                    </Link>
                  </h1>
                </div>
                <div className="form-elements">
                  <div className="form-elements-column ">
                    <label>Ramal</label>
                    <Field
                      className="form-input form-input-w100 sap-form-input-disabled"  
                      type="text"
                      name='RamalSetor'
                      disabled
                    />
                  </div>
                  <div className="form-elements-column ">
                    <label>E-mail</label>
                    <Field
                      className="form-input form-input-w100 sap-form-input-disabled "
                      type="text"
                      name='EmailSetor' 
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

export default VizualizarSetor;
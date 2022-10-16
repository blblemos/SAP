import {useState, useEffect} from 'react';
import {Formik, Field, Form} from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { mask as masker, unMask } from "remask";

import NavbarMenu from '../../Components/Navbar/Navbar';
import Schema from '../../Utils/ShemaServidor';
import useApi from '../../Services/useApi';

import '../../Styles/form.css';

//Setando valores iniciais para servidor(Quando é cadastro)
const initialValue = {
  nome: '',
  email: '',
  celular: '',
  foto: '',
  setor: 0,
  cargo: '',
  funcao: ''
}

function Servidor(){
  const {id} = useParams();
  const navigateTo = useNavigate();
  const [servidor,setServidor] = useState(initialValue);
  const [colic, setColic] = useState(false);
  const [setor,setSetor] = useState([]);
  const [user,setUser] = useState({
    UserName: '',
    UserPassword: '',
  },
  );
  //Carregando servidor se houver
  const [loadServidor] = useApi({
    url: `/servidores/${id}`,
    method: 'get',
    onCompleted: (response) => { 
      setServidor(response.data);
      setColic(response.data.colic);
    }
  });
  
  //Carregando setores
  const [loadSetor] = useApi({
    url: `/setores`,
    method: 'get',
    onCompleted: (response) => {
      setSetor(response.data);
    }
  });

  //Salvando servidor
  const [save] = useApi({
    url: id ? `/servidores/${id}` : `/servidores`,
    method: id ? 'put' : 'post',
    onCompleted: (response) => {
      if (!response.error){
        id ? alert(' Editado Com Sucesso!') : alert(' Cadastrado Com Sucesso!');
        navigateTo('/colic/servidores');
      }
    }
  });

  // Chamando carregamento do servidor
  useEffect(() => {
    if (id) {
      loadServidor();
    }
    loadSetor();
  }, []);

   //Função de envio de formulário 
  function onSubmit(values) {
    const bodyParameters = {
      nome: values.nome,
      colic: colic,
      email: values.email,
      cargo: values.cargo,
      celular: values.celular,
      foto: '1',
      funcao: values.funcao,
      setor: {
        id: values.setor.id
      }
    };
    save({
      data: id ? {...bodyParameters, id: id} : bodyParameters
    });
  }
  return (
    <div className="sap-container">
      <NavbarMenu />
      <div className='sap-container-page'>
        <Formik
          validationSchema={Schema}
          onSubmit={onSubmit}
          initialValues={servidor}
          enableReinitialize
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
                    <label>Função</label>
                    <Field
                      className={errors.cargo && touched.cargo ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='funcao' 
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
                      className={errors.setor && touched.setor ? 'sap-form-select sap-form-select-error' : 'sap-form-select'} 
                      name="setor.id" 
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
                    <label>E-mail</label>
                    <Field
                      className={errors.email && touched.email ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='email' 
                    />
                    <label>Celular</label>
                    <Field
                      className={errors.celular && touched.celular ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='celular' 
                      maxLength = {15}
                      value={masker(unMask(values.celular),["(99) 9999-9999","(99)9 9999-9999"])}
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

export default Servidor;
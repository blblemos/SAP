import {useEffect, useState} from 'react';
import {Formik, Field, Form} from 'formik';
import { useNavigate , useParams } from 'react-router-dom';

import NavbarMenu from '../../Components/Navbar/Navbar';
import Schema from '../../Utils/Shema';
import {api, Config} from '../../Services/api';

import '../../Styles/form.css';

function EditarFornecedor(){
  const navigateTo = useNavigate();
  const {id} = useParams();
  const [avaliacao, setAvaliacao] = useState(0);
  const [whatsapp, setWhatsapp] = useState(false);
  const config = Config();

  const [fornecedor, setFornecedor] = useState({
    fantasia: '', 
    cnpj: '',
    telefone: '',
    email: '',
    razaoSocial: '',
    nomeResponsavel: '',
    cidade: '',
    estado: '',
  });

  useEffect(() => {
    api.get(`fornecedores/${id}`, config).then(response => {console.log(response.data);
      setAvaliacao(parseInt(response.data.avaliacao));
      setFornecedor({
        fantasia: response.data.fantasia, 
        cnpj: response.data.cnpj,
        telefone: response.data.telefone,
        email: response.data.email,
        razaoSocial: response.data.razaoSocial,
        nomeResponsavel: response.data.nomeResponsavel,
        cidade: response.data.cidade,
        estado: response.data.estado,
      })
    });
  }, [id]);

  async function onSubmit(values) {
    await api.put(`fornecedores/${id}`, 
      {
        id: parseInt(id),
        fantasia: values.fantasia, 
        cnpj: values.cnpj,
        telefone: values.telefone,
        email: values.email,
        razaoSocial: values.razaoSocial,
        nomeResponsavel: values.nomeResponsavel,
        cidade: values.cidade,
        estado: values.estado,
        avaliacao: parseInt(avaliacao)
      }, config)
      .then(function () {
        alert(values.fantasia+' Editado Com Sucesso!');
        navigateTo('/colic/fornecedores');
      })
      .catch(function (error) {
        alert('Error: ' + error.message);
      });
  }

  return (
    <div className="sap-container">
      <NavbarMenu />
      <div className='sap-container-page'>
        <Formik

          onSubmit={onSubmit}
          initialValues={fornecedor}
          enableReinitialize

        >
          {({errors,touched}) => {
            return(
              <Form
                className="sap-form-container"
              >
                <div className="form-title">
                  <h1>Editar  {fornecedor.fantasia}</h1>
                </div>
                <div className="form-elements">
                  <div className="form-elements-column">
                    <label>Nome Fantasia</label>
                    <Field
                      className={errors.fantasia && touched.fantasia ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "} 
                      type="text"
                      name='fantasia'
                    />
                    <label>cnpj</label>
                    <Field
                      className={errors.cnpj && touched.cnpj ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='cnpj' 
                    />
                    <label>Telefone Fixo</label>
                    <Field
                      className={errors.telefone && touched.telefone ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='telefone'
                    />
                    <label>E-mail</label>
                    <Field
                      className={errors.email && touched.email ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='email' 
                    />
                    <label>Endereço</label>
                    <Field
                      className={errors.endereco && touched.endereco ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='endereco' 
                    />
                  </div>
                  <div className="form-elements-column">
                    <label>Razão Social</label>
                    <Field
                      className={errors.razaoSocial && touched.razaoSocial ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='razaoSocial' 
                    />
                    <label>Nome do(a) responsável</label>
                    <Field
                      className={errors.nomeResponsavel && touched.nomeResponsavel ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='nomeResponsavel' 
                    />
                    
                    <div className='sap-form-container-input-row'>
                        <div className='sap-form-container-input-column sap-form-container-input-column-w60'>
                          <label htmlFor='Celular'>Celular</label>
                            <Field
                            className={errors.Celular && touched.Celular ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                            type="text"
                            name='Celular'
                            />
                        </div>
                        <div className='sap-form-container-input-column sap-form-container-input-column-w40'>
                          <label>Whatsapp</label>
                          <div className="sap-form-button-select">
                            <button 
                              type="button" 
                              className={whatsapp ? 'sap-form-button sap-form-button-active sap-form-button-active-green' : 'sap-form-button'}
                              onClick={() => setWhatsapp(true)}
                            >
                              Sim
                            </button>

                            <button 
                              type="button"
                              className={!whatsapp ? 'sap-form-button sap-form-button-active sap-form-button-active-red' : 'sap-form-button'}
                              onClick={() => setWhatsapp(false)}
                            >
                              Não
                            </button>

                          </div>
                        </div>
                    </div>
                    <div className="sap-form-container-input-row">

                    </div>
                    <div className='sap-form-container-input-row'>
                        <div className='sap-form-container-input-column sap-form-container-input-column-w60'>
                          <label htmlFor='cidade'>Cidade</label>
                            <Field
                            className={errors.cidade && touched.cidade ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                            type="text"
                            name='cidade'
                            />
                        </div>
                        <div className='sap-form-container-input-column sap-form-container-input-column-w40'>
                          <label>Estado</label>
                          <div className="sap-form-button-select">
                          <Field
                            className='sap-form-select' 
                            name="estado" 
                            as="select">
                            <option value="estado">estado</option>
                            <option value="AC">AC</option>
                            <option value="AL">AL</option>
                            <option value="AP">AP</option>
                            <option value="AM">AM</option>
                            <option value="BA">BA</option>
                            <option value="CE">CE</option>
                            <option value="ES">ES</option>
                            <option value="GO">GO</option>
                            <option value="MA">MA</option>
                            <option value="MT">MT</option>
                            <option value="MS">MS</option>
                            <option value="MG">MG</option>
                            <option value="PA">PA</option>
                            <option value="PB">PB</option>
                            <option value="PR">PR</option>
                            <option value="PE">PE</option>
                            <option value="PI">PI</option>
                            <option value="RJ">RJ</option>
                            <option value="RN">RN</option>
                            <option value="RS">RS</option>
                            <option value="RO">RO</option>
                            <option value="RR">RR</option>
                            <option value="SC">SC</option>
                            <option value="SP">SP</option>
                            <option value="SE">SE</option>
                            <option value="TO">TO</option>
                            <option value="DF">DF</option>
                          </Field>

                          </div>
                        </div>
                    </div>
                    
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

export default EditarFornecedor;
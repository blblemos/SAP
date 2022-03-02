import {useState,useEffect,useContext} from 'react';
import {Formik, Field, Form} from 'formik';
import { useNavigate } from 'react-router-dom';

import NavbarMenu from '../../Components/Navbar/Navbar';
import Schema from '../../Utils/Shema';
import StoreContext from '../../Components/Store/Context';
import {api} from '../../Services/api';

import '../../Styles/form.css';

function CadastrarFornecedor(){
  const navigateTo = useNavigate();
  const { token } = useContext(StoreContext);
  const [whatsapp, setWhatsapp] = useState(false); 

  function onSubmit(values) {alert("entrou");

    const config = {
      headers: { Authorization: token }
    };

    const bodyParameters = {
      razaoSocial: values.RazaoSocial,
      fantasia: values.NomeFantasia,
      cnpj: values.CNPJ,
      cidade: values.cidade,
      estado: values.uf,
      telefone: values.TelefoneFixo,
      email: values.email,
      nomeResponsavel: values.responsavel,
      avaliacao: 0
    };
  
    
      api.post('fornecedores',bodyParameters, config).then(function (response) {
        alert(values.NomeFantasia+' Cadastrado Com Sucesso!');
        navigateTo('/colic/fornecedores');
      }).catch(function (error) {
        alert('Error: ' + error.message);
      });
    
  }


  return (
    <div className="sap-container">
      <NavbarMenu />
      <div className='sap-container-page'>
        <Formik
          
          onSubmit={onSubmit}
          initialValues={{
            NomeFantasia: '', 
            CNPJ: '',
            TelefoneFixo: '',
            email: '',
            Endereco: '',
            RazaoSocial: '',
            responsavel: '',
            Celular: '',
            Endereco: '',
            cidade: '',
            uf: 'UF'
          }}
        >
          {({errors,touched}) => {
            return(
              <Form
                className="sap-form-container"
              >
                <div className="form-title">
                  <h1>CADASTRO DE FORNECEDORES</h1>
                </div>
                <div className="form-elements">
                  <div className="form-elements-column">
                    <label>Nome Fantasia</label>
                    <Field
                      className={errors.NomeFantasia && touched.NomeFantasia ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "} 
                      type="text"
                      name='NomeFantasia'
                    />
                    <label>CNPJ</label>
                    <Field
                      className={errors.CNPJ && touched.CNPJ ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='CNPJ' 
                    />
                    <label>Telefone Fixo</label>
                    <Field
                      className={errors.TelefoneFixo && touched.TelefoneFixo ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='TelefoneFixo'
                    />
                    <label>E-mail</label>
                    <Field
                      className={errors.email && touched.email ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='email' 
                    />
                    <label>Endereço</label>
                    <Field
                      className={errors.Endereco && touched.Endereco ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='Endereco' 
                    />
                  </div>
                  <div className="form-elements-column">
                    <label>Razão Social</label>
                    <Field
                      className={errors.RazaoSocial && touched.RazaoSocial ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='RazaoSocial' 
                    />
                    <label>Nome do(a) responsável</label>
                    <Field
                      className={errors.responsavel && touched.responsavel ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='responsavel' 
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
                            className={errors.Celular && touched.Celular ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                            type="text"
                            name='cidade'
                            />
                        </div>
                        <div className='sap-form-container-input-column sap-form-container-input-column-w40'>
                          <label>Estado</label>
                          <div className="sap-form-button-select">
                          <Field
                            className='sap-form-select' 
                            name="uf" 
                            as="select">
                            <option value="UF">UF</option>
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

export default CadastrarFornecedor;
import {useState} from 'react';
import {Formik, Field, Form} from 'formik';
import { useNavigate } from 'react-router-dom';
import { mask as masker, unMask } from "remask";

import NavbarMenu from '../../Components/Navbar/Navbar';
import {api, Config} from '../../Services/api';
import Schema from '../../Utils/ShemaFornecedores';

import '../../Styles/form.css';

function CadastrarFornecedor(){
  const navigateTo = useNavigate();
  const [whatsapp, setWhatsapp] = useState(false);
  const config = Config(); 
  function onSubmit(values) {
    const bodyParameters = {
      razaoSocial: values.RazaoSocial,
      nomeFantasia: values.NomeFantasia,
      cnpj: values.Cnpj,
      endereco: values.Endereco,
      cidade: values.Cidade,
      estado: values.Uf,
      telefoneFixo: values.TelefoneFixo,
      email: values.Email,
      cel: values.Celular,
      nomeResponsavel: values.Responsavel,
      wpp: whatsapp,
      obsOpen:values.Observacoes,
      avaliacaoPrazo: 0,
      avaliacaoEntrega: 0,
      avaliacaoContato: 0,
    };
      api.post('fornecedores',bodyParameters, config).then(function (response) {
        alert(values.NomeFantasia+' Cadastrado Com Sucesso!');
        navigateTo('/colic/fornecedores');
      }).catch(function (error) {
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
          initialValues={{
            RazaoSocial: '',
            NomeFantasia: '', 
            Cnpj: '',
            Endereco: '',
            Cidade: '',
            Uf: 'UF',
            TelefoneFixo: '',
            Email: '',
            Celular: '',
            Responsavel: '',
            Observacoes: '',
          }}
        >
          {({errors,touched,values}) => {
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
                    <label>Cnpj</label>
                    <Field
                      className={errors.Cnpj && touched.Cnpj ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='Cnpj'
                      maxLength = {18}
                      value={masker(unMask(values.Cnpj),["99.999.999/9999-99"])} 
                    />
                    <label>Telefone Fixo</label>
                    <Field
                      className={errors.TelefoneFixo && touched.TelefoneFixo ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='TelefoneFixo'
                      maxLength = {15}
                      value={masker(unMask(values.TelefoneFixo),["(99) 9999-9999" , "(99)9 9999-9999"])} 
                    />
                    <label>E-mail</label>
                    <Field
                      className={errors.Email && touched.Email ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='Email' 
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
                      className={errors.Responsavel && touched.Responsavel ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='Responsavel' 
                    />
                    
                    <div className='sap-form-container-input-row'>
                        <div className='sap-form-container-input-column sap-form-container-input-column-w60'>
                          <label htmlFor='Celular'>Celular</label>
                            <Field
                            className={errors.Celular && touched.Celular ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                            type="text"
                            name='Celular'
                            maxLength = {15}
                            value={masker(unMask(values.Celular),["(99) 9999-9999","(99)9 9999-9999"])} 
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
                            className={errors.Cidade && touched.Cidade ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                            type="text"
                            name='Cidade'
                            />
                        </div>
                        <div className='sap-form-container-input-column sap-form-container-input-column-w40'>
                          <label>Estado</label>
                          <div className="sap-form-button-select">
                          <Field
                            className={errors.Uf && touched.Uf ? 'sap-form-select sap-form-select-error' : 'sap-form-select'} 
                            name="Uf" 
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
                <label>Observações</label>
                    <Field
                      as='textarea'
                      className={errors.Observacoes && touched.Observacoes ? "form-input form-input-w100 form-input-error form-input-textarea" : "form-input form-input-textarea form-input-w100 "} 
                      type="textarea"
                      name='Observacoes'
                    />
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
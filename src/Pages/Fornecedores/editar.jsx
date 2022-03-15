import {useEffect, useState} from 'react';
import {Formik, Field, Form} from 'formik';
import { useNavigate , useParams } from 'react-router-dom';
import { mask as masker, unMask } from "remask";

import NavbarMenu from '../../Components/Navbar/Navbar';
import Schema from '../../Utils/ShemaFornecedores';
import {api, Config} from '../../Services/api';

import '../../Styles/form.css';

function EditarFornecedor(){
  const navigateTo = useNavigate();
  const {id} = useParams();
  const [whatsapp, setWhatsapp] = useState(false);
  const config = Config();

  const [fornecedor, setFornecedor] = useState({
    RazaoSocial: '',
    NomeFantasia: '', 
    Cnpj: '',
    Endereco: '',
    Cidade: '',
    Uf: '',
    TelefoneFixo: '',
    Email: '',
    Celular: '',
    Responsavel: '',
    Observacoes: '',
    avaliacao_prazo: 0,
    avaliacao_entrega: 0,
    avaliacao_contato: 0
  });

  useEffect(() => {
    api.get(`fornecedores/${id}`, config).then(response => {
      setWhatsapp(response.data.wpp);
      setFornecedor({
        RazaoSocial: response.data.razaoSocial,
        NomeFantasia: response.data.nomeFantasia, 
        Cnpj: response.data.cnpj,
        Endereco: response.data.endereco,
        Cidade: response.data.cidade,
        Uf: response.data.estado,
        TelefoneFixo: response.data.telefoneFixo,
        Email: response.data.email,
        Celular: response.data.cel,
        Responsavel: response.data.nomeResponsavel,
        Observacoes: response.data.obsOpen,
        avaliacao_prazo: response.data.avaliacaoPrazo,
        avaliacao_entrega: response.data.avaliacaoEntrega,
        avaliacao_contato: response.data.avaliacaoContato
      })
    });
  }, [id]);

  async function onSubmit(values) {
    await api.put(`fornecedores/${id}`, 
      {
        id: parseInt(id),
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
        obsOpen: values.Observacoes,
        avaliacaoPrazo: values.avaliacao_prazo,
        avaliacaoEntrega: values.avaliacao_entrega,
        avaliacaoContato: values.avaliacao_contato,
      }, config)
      .then(function () {
        alert(values.NomeFantasia+' Editado Com Sucesso!');
        navigateTo('/colic/fornecedores');
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
          initialValues={fornecedor}
          enableReinitialize
        >
          {({errors,touched,values}) => {
            return(
              <Form
                className="sap-form-container"
              >
                <div className="form-title">
                  <h1>Editar  {fornecedor.NomeFantasia}</h1>
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
                      value={masker(unMask(values.Cnpj),["99.999.999/9999-99"])}
                      maxLength={18} 
                    />
                    <label>TelefoneFixo Fixo</label>
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
                            value={masker(unMask(values.Celular),["(99) 9999-9999" , "(99)9 9999-9999"])} 
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
                          <label htmlFor='Cidade'>Cidade</label>
                            <Field
                            className={errors.Cidade && touched.Cidade ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                            type="text"
                            name='Cidade'
                            />
                        </div>
                        <div className='sap-form-container-input-column sap-form-container-input-column-w40'>
                          <label>Uf</label>
                          <div className="sap-form-button-select">
                          <Field
                            className='sap-form-select' 
                            name="Uf" 
                            as="select">
                            <option value="Uf">Uf</option>
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

export default EditarFornecedor;
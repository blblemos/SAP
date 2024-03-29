import {useEffect, useState} from 'react';
import {Formik, Field, Form} from 'formik';
import { useParams, Link } from 'react-router-dom';
import {RiEditBoxFill} from 'react-icons/ri';
import {BsStarFill, BsStar} from 'react-icons/bs';

import NavbarMenu from '../../Components/Navbar/Navbar';
import AvaliarFornecedor from '../../Components/Avaliar-Fornecedor/avaliar-fornecedor';

import {api, Config} from '../../Services/api';

import '../../Styles/form.css';

function VizualizarFornecedor(){
  window.scrollTo(0, 0);
  const {id} = useParams();
  const [whatsapp, setWhatsapp] = useState(false);
  const config = Config();
  const [modalAv, setModalAv] = useState(false);
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
    avaliacao_contato: 0,
    avaliacao: 0,
  });
  let av;
  switch (fornecedor.avaliacao) {
    case 0:
      av = 
        <div className='form-title-av'>
          <BsStar size={25} color="#09210E"/>
          <BsStar size={25} color="#09210E"/>
          <BsStar size={25} color="#09210E"/>
        </div>
    break
    case 1:
      av = 
        <div className='form-title-av'>
          <BsStarFill size={25} color="#09210E"/>
          <BsStar size={25} color="#09210E"/>
          <BsStar size={25} color="#09210E"/>
        </div>
    break
    case 2:
      av =
        <div className='form-title-av'>
          <BsStarFill size={25} color="#09210E"/>
          <BsStarFill size={25} color="#09210E"/>
          <BsStar size={25} color="#09210E"/>
        </div>
        break
    case 3:
      av =
        <div className='form-title-av'>
          <BsStarFill size={25} color="#09210E"/>
          <BsStarFill size={25} color="#09210E"/>
          <BsStarFill size={25} color="#09210E"/>
        </div>
      break      
    default:
      break;
  }


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
        avaliacao_contato: response.data.avaliacaoContato,
        avaliacao: response.data.avaliacao,
        avaliacao: response.data.avaliacao
      })
    });
  }, []);
  return (
    <div className="sap-container">
      <NavbarMenu />
      {modalAv &&
        <AvaliarFornecedor
          id={id}
          onChangeModal={setModalAv}
        />
      };
      <div className='sap-container-page'>
        <Formik
          initialValues={fornecedor}
          enableReinitialize
        >
          {() => {
            return(
              <Form
                className="sap-form-container"
              >
                <div className="form-title">
                  <h1>
                    {fornecedor.NomeFantasia}
                    {av}
                    <Link className='form-title-link-edit' to={'/colic/editar/fornecedor/'+id}>
                      <RiEditBoxFill 
                        size={25} 
                        color="#09210E"
                        className="sap-form-icon-title"
                      />
                    </Link>
                    </h1>
                    <div className="clear"></div>
                </div>
                <div className="form-elements">
                  <div className="form-elements-column">
                    <label>Cnpj</label>
                    <Field
                      className="form-input form-input-w100 sap-form-input-disabled"
                      type="text"
                      name='Cnpj'
                      disabled 
                    />
                    <label>TelefoneFixo Fixo</label>
                    <Field
                      className="form-input form-input-w100 sap-form-input-disabled"
                      type="text"
                      name='TelefoneFixo'
                      disabled
                    />
                    <label>E-mail</label>
                    <Field
                      className="form-input form-input-w100 sap-form-input-disabled"
                      type="text"
                      name='Email' 
                      disabled
                    />
                    <label>Endereço</label>
                    <Field
                      className="form-input form-input-w100 sap-form-input-disabled"
                      type="text"
                      name='Endereco'
                      disabled 
                    />
                  </div>
                  <div className="form-elements-column">
                    <label>Razão Social</label>
                    <Field
                      className="form-input form-input-w100 sap-form-input-disabled"
                      type="text"
                      name='RazaoSocial'
                      disabled 
                    />
                    <label>Nome do(a) responsável</label>
                    <Field
                      className="form-input form-input-w100 sap-form-input-disabled"
                      type="text"
                      name='Responsavel'
                      disabled 
                    />
                    
                    <div className='sap-form-container-input-row'>
                        <div className='sap-form-container-input-column sap-form-container-input-column-w60'>
                          <label htmlFor='Celular'>Celular</label>
                            <Field
                            className="form-input form-input-w100 sap-form-input-disabled"
                            type="text"
                            name='Celular'
                            disabled
                            />
                        </div>
                        <div className='sap-form-container-input-column sap-form-container-input-column-w40'>
                          <label>Whatsapp</label>
                          <div className="sap-form-button-select">
                            <button 
                              type="button"
                              disabled 
                              className={whatsapp ? 'sap-form-button sap-form-button-active sap-form-button-active-green' : 'sap-form-button sap-form-input-disabled'}
                              onClick={() => setWhatsapp(true)}
                            >
                              Sim
                            </button>
                            <button 
                              type="button"
                              disabled
                              className={!whatsapp ? 'sap-form-button sap-form-button-active sap-form-button-active-red' : 'sap-form-button sap-form-input-disabled'}
                              onClick={() => setWhatsapp(false)}
                            >
                              Não
                            </button>
                          </div>
                        </div>
                    </div>
                    
                    <div className='sap-form-container-input-row'>
                        <div className='sap-form-container-input-column sap-form-container-input-column-w60'>
                          <label htmlFor='Cidade'>Cidade</label>
                            <Field
                            className="form-input form-input-w100 sap-form-input-disabled"
                            type="text"
                            name='Cidade'
                            disabled
                            />
                        </div>
                        <div className='sap-form-container-input-column sap-form-container-input-column-w40'>
                          <label>Uf</label>
                          <div className="sap-form-button-select">
                          <Field
                            className='sap-form-select sap-form-input-disabled' 
                            name="Uf"
                            disabled 
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
                  className="form-input-textarea form-input form-input-w100 sap-form-input-disabled"
                  type="textarea"
                  name='Observacoes'
                  disabled
                />
                <div className="form-footer">
                  <div onClick={() => setModalAv(true)} className="div-form-btn form-btn">
                    Avaliar
                  </div>
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

export default VizualizarFornecedor;
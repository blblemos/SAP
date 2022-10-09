import {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Formik, Field, Form} from 'formik';

import {AiFillCloseCircle, AiOutlineLink} from 'react-icons/ai';
import useApi from '../../Services/useApi';
import AddLink from '../../Components/Add-Link/add-link';

//Setando valores iniciais para cobrança(Quando é cadastro)
const initialValue = {
  Empenho: 0,
  via: '',
  contato: '',
  dataResposta: '',
  dataHora: '',
  comprovacao: '',
  observacao: '',
  linkcomprovacao: ''
}

function AddCobranca() {
  const {id, aquisicao, idCobranca} = useParams();
  const navigateTo = useNavigate();
  const [empenhos,setEmpenhos] = useState([]);
  const [cobranca,setCobranca] = useState(initialValue);
  const [respostaEmpresa,setRespostaEmpresa] = useState(false);
  const [modalLink, setModalLink] = useState(false);
  const [linkComprovacao, setLinkComprovacao] = useState('');
  //Carregando Empenhos do processo
  const [loadEmpenho] = useApi({
    url: `/empenhos/search?aquisicao=${aquisicao}`,
    method: 'get',
    onCompleted: (response) => {
      setEmpenhos(response.data);
    }
  });
  //Carregando cobrança(se houver)
  const [loadCobranca] = useApi({
    url: `/cobrancas/${idCobranca}`,
    method: 'get',
    onCompleted: (response) => {
      setCobranca(response.data);
      setRespostaEmpresa(response.data.resposta);
      setLinkComprovacao(response.data.linkcomprovacao);
    }
  });
  //Salvando cobranca
  const [save] = useApi({
    url: idCobranca ? `/cobrancas/${idCobranca}` : `/cobrancas`,
    method: idCobranca ? 'put' : 'post',
    onCompleted: (response) => {
      if (!response.error){
        idCobranca ? alert(' Editado Com Sucesso!') : alert(' Cadastrado Com Sucesso!');
        navigateTo('/colic/aquisicoes/'+aquisicao)
      }
    }
  });
  //Chamando carregamentos de empenhos e cobrança(editar)
  useEffect(() => {
    loadEmpenho();
    if (idCobranca) {
      loadCobranca();
    };
  }, []);

  function onSubmit(values){
    var fornecedor;
    empenhos.map(empenho => {
      if (empenho.id == values.empenho) {
        fornecedor =  empenho.fornecedor.id;
      }
    });
    const bodyParameters ={
      via: values.via,
      dataHora: values.dataHora,
      contato: values.contato,
      resposta: respostaEmpresa,
      dataResposta: values.dataResposta,
      observacao: values.observacao,
      linkcomprovacao: linkComprovacao,
      empenho: {
        id: values.empenho
      },
      fornecedor: {
        id: fornecedor
      }
    }
    save({
      data: idCobranca ? {...bodyParameters, id: idCobranca} : bodyParameters
    });
  }
  return (
    <div className="sap-container-modal">
      <AiFillCloseCircle className="sap-close-modal" size={30} color="#09210E" onClick={() => navigateTo('/colic/aquisicoes/'+id)}/>
      <div className="sap-div-modal">
      <Formik
          onSubmit={onSubmit}
          initialValues={cobranca}
          enableReinitialize
        >
          {({errors,touched,values}) => {
            return(
              <Form
                className="sap-form-container"
              >
                {modalLink &&
                //Carregando modal de Link
                  <AddLink
                    link={linkComprovacao}
                    onChangeLink={setLinkComprovacao}
                    onChangeModalLink={setModalLink}
                  />
                }
                <label>Empenho</label>
                  <div className="sap-form-button-select sap-form-button-select-margin-bot">
                    <Field
                      className={errors.Fornecedor && touched.Fornecedor ? 'sap-form-select sap-form-select-error' : 'sap-form-select'} 
                      name="empenho" 
                      as="select">
                      <option value="null"></option>
                      {empenhos.map(empenhos => {
                        return (
                          <option value={empenhos.id}>{empenhos.numeroEmpenho}</option>
                        )
                      })
                      }
                    </Field>
                  </div>
                <div className="form-elements">
                  <div className="form-elements-column">
                    <label>Via</label>
                    <div className="sap-form-button-select sap-form-button-select-margin-bot">
                      <Field
                        className={errors.TipoEmpenho && touched.TipoEmpenho ? 'sap-form-select sap-form-select-error' : 'sap-form-select'} 
                        name="via" 
                        as="select">
                        <option value="null"></option>
                        <option value="LIGAÇÃO TELEFÔNICA">LIGAÇÃO TELEFÔNICA</option>
                        <option value="E-MAIL"> E-MAIL</option>
                        <option value="CORREIO">CORREIO</option>
                        <option value="APLICATIVO DE MENSAGEM">APLICATIVO DE MENSAGEM</option>
                      </Field>
                    </div>
                    <label>Contato Utilizado</label>
                    <Field
                    className={errors.DataEmissao && touched.DataEmissao ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                    type="text"
                    name='contato'
                    />
                    <div className='sap-form-container-input-row'>
                      <div className='sap-form-container-input-column sap-form-container-input-column-w60 '>
                        <label ><span>Recebimento Confirmado?</span></label>
                        <div className="sap-form-button-select">
                          <button 
                            type="button" 
                            className={respostaEmpresa ? 'sap-form-button sap-form-button-active sap-form-button-active-green' : 'sap-form-button'}
                            onClick={() => setRespostaEmpresa(true)}
                          >
                            Sim
                          </button>
                          <button 
                            type="button"
                            className={!respostaEmpresa ? 'sap-form-button sap-form-button-active sap-form-button-active-red' : 'sap-form-button'}
                            onClick={() => setRespostaEmpresa(false)}
                          >
                            Não
                          </button>
                        </div>
                      </div>
                      <Field
                        className={errors.DataEmissao && touched.DataEmissao ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                        type="date"
                        name='dataResposta'
                        />
                    </div>
                  </div>
                  
                  <div className="form-elements-column">
                    <label>Data e Hora</label>
                    <Field
                    className={errors.DataEmissao && touched.DataEmissao ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                    type="datetime-local"
                    name='dataHora'
                    />
                    <label>Comprovação</label>
                    <div className="form-div-input-link">
                      <Field
                      className={errors.DataEmissao && touched.DataEmissao ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='comprovacao'
                      />
                      <AiOutlineLink className="form-icon-link" size={30} color="#09210E" onClick={() => setModalLink(true)}/>
                    </div>
                  </div>
                </div>
                <label>Observações</label>
                <Field
                  as='textarea'
                  className={errors.DescricaoItem && touched.DescricaoItem ? "form-input form-input-w100 form-input-error form-input-textarea" : "form-input form-input-textarea form-input-w100 "} 
                  type="textarea"
                  name='observacao'
                />
                
                <div className="form-footer">
                  <button 
                    type='submit' 
                    className="form-btn">
                      Salvar
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

export default AddCobranca;
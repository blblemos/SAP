import {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Formik, Field, Form} from 'formik';
import VMasker from "vanilla-masker";

import {AiFillCloseCircle} from 'react-icons/ai';
import {api, Config} from '../../Services/api';

function AddCobranca() {
  const {id, aquisicao} = useParams();
  const navigateTo = useNavigate();
  const [valorTotal, setValorTotal] = useState('');
  const config = Config();
  const [empenhos,setEmpenhos] = useState([]);
  const [respostaEmpresa,setRespostaEmpresa] = useState(false);
  useEffect(() => {
    api.get(`empenhos/search?aquisicao=${aquisicao}`, config).then(response => { 
      setEmpenhos(response.data);
    }).catch(function(error){
      alert("O processo ainda não possui empenhos");
    });
  }, []);
  function onChange(valor_total) {
    const valorT = VMasker.toMoney(valor_total, {
      precision: 2,
      separator: ",",
      delimiter: ".",
      unit: "R$"
    });
    setValorTotal(valorT);
  }
  function onSubmit(values){
    var fornecedor;
    empenhos.map(empenho => {
      if (empenho.id == values.Empenho) {
        fornecedor =  empenho.fornecedor.id;
      }
    });
    const bodyParameters ={
      via: values.Via,
      dataHora: values.DataHora,
      contato: values.ContatoUtilizado,
      comprovacao: values.Comprovacao,
      resposta: respostaEmpresa,
      dataResposta: values.DataResposta,
      observacao: values.Observacoes,
      empenho: {
        id: values.Empenho
      },
      fornecedor: {
        id: fornecedor
      }
    }
    api.post('cobrancas', bodyParameters, config).then(function () { 
      alert(values.NumeroEmpenho+' Cadastrado Com Sucesso!');
      navigateTo('/colic/aquisicoes/'+id)
    }).catch(function (error) {
      let msgError = '';
        for (var index = 0; index < error.response.data.length; index++) {
          msgError = msgError+error.response.data[index].message+'\n';
        }
        alert(msgError);
    })
  }
  return (
    <div className="sap-container-modal">
      <AiFillCloseCircle className="sap-close-modal" size={30} color="#09210E" onClick={() => navigateTo('/colic/aquisicoes/'+id)}/>
      <div className="sap-div-modal">
      <Formik
          onSubmit={onSubmit}
          initialValues={{
            Empenho: 0,
            Via: '',
            ContatoUtilizado: '',
            DataResposta: '',
            DataHora: '',
            Comprovacao: '',
            Observacoes: '',
          }}
          enableReinitialize
        >
          {({errors,touched,values}) => {
            return(
              <Form
                className="sap-form-container"
              >
                <div className="form-title">
                  <h1>Cobrança</h1>
                </div>
                <label>Empenho</label>
                  <div className="sap-form-button-select sap-form-button-select-margin-bot">
                    <Field
                      className={errors.Fornecedor && touched.Fornecedor ? 'sap-form-select sap-form-select-error' : 'sap-form-select'} 
                      name="Empenho" 
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
                        name="Via" 
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
                    name='ContatoUtilizado'
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
                        name='DataResposta'
                        />
                    </div>
                  </div>
                  
                  <div className="form-elements-column">
                    <label>Data e Hora</label>
                    <Field
                    className={errors.DataEmissao && touched.DataEmissao ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                    type="datetime-local"
                    name='DataHora'
                    />
                    <label>Comprovação</label>
                    <Field
                    className={errors.DataEmissao && touched.DataEmissao ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                    type="text"
                    name='Comprovacao'
                    />
                  </div>
                </div>
                <label>Observações</label>
                <Field
                  as='textarea'
                  className={errors.DescricaoItem && touched.DescricaoItem ? "form-input form-input-w100 form-input-error form-input-textarea" : "form-input form-input-textarea form-input-w100 "} 
                  type="textarea"
                  name='Observacoes'
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
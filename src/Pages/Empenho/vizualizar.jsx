import {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Formik, Field, Form} from 'formik';

import {AiFillCloseCircle} from 'react-icons/ai';
import {api, Config} from '../../Services/api';

function VizualizarEmpenho() {
  const {idAquisicao, idEmpenho} = useParams();
  const navigateTo = useNavigate();
  const [itens,setItens] = useState([]);
  const [cobrancas,setCobrancas] = useState([]);
  const [respostaEmpresa,setRespostaEmpresa] = useState(false);
  let config = {};
  var countCobranca = 0;
  config = Config();
  const [empenho,setEmpenho] = useState({
    NumeroEmpenho: '',
    DataEmissao: '',
    ValorTotalNE: '',
    TipoEmpenho: '',
    DataInclusao: '',
    DataEnvio: '',    
    Fornecedor: '',
    });
  useEffect(() => {
    api.get(`empenhos/${idEmpenho}`, config).then(response => {
      setEmpenho({
        NumeroEmpenho: response.data.numeroEmpenho,
        DataEmissao: response.data.dataEmissao,
        ValorTotalNE: response.data.valorTotalNE,
        TipoEmpenho: response.data.tipoEmpenho,
        DataInclusao: response.data.dataInclusao,
        DataEnvio: response.data.dataEnvio,    
        Fornecedor: response.data.fornecedor.nomeFantasia,
      });
      setItens(response.data.item);
    });
    api.get(`cobrancas/search?empenho=${empenho.NumeroEmpenho}`, config).then(response => {
      setCobrancas(response.data); 
    });
  }, []);
  return (
    <div className="sap-container-modal">
      <AiFillCloseCircle className="sap-close-modal" size={30} color="#09210E" onClick={() => navigateTo('/colic/aquisicoes/'+idAquisicao)}/>
      <div className="sap-div-modal">
        <form className="sap-form-container">
          <div className="form-title">
            <h1>Empenho Nº {empenho.NumeroEmpenho}</h1>
          </div>
          <div className="form-elements">
            <div className="form-elements-column">
              <label>Valor Total da NE</label>
              <input
                className="form-input form-input-w100 sap-form-input-disabled"
                type="text"
                value={empenho.ValorTotalNE}
                disabled 
              />
              <div className="sap-form-container-input-row">
              </div>
              <label>Data de Inclusão da NE pela COFIN no SEI</label>
              <input
                className="form-input form-input-w100 sap-form-input-disabled"
                type="date"
                value={empenho.DataInclusao}
                disabled 
              />
            </div>
            <div className="form-elements-column">
              <label>Data de emissão</label>
              <input
                className="form-input form-input-w100 sap-form-input-disabled"
                type="date"
                value={empenho.DataEmissao}
                disabled 
              />
              <label>Tipo do Empenho</label>
              <div className="sap-form-button-select sap-form-button-select-margin-bot">
                <input
                  className="form-input form-input-w100 sap-form-input-disabled"
                  type="text"
                  value={empenho.TipoEmpenho}
                  disabled 
                />
                
              </div>
              <label>Data de envio da NE pela COLIC ao Fornecedor</label>
              <input
                className="form-input form-input-w100 sap-form-input-disabled"
                type="date"
                value={empenho.DataEnvio}
                disabled 
              />
            </div>
          </div>
          <label>Fornecedor</label>
          <div className="sap-form-button-select sap-form-button-select-margin-bot">
            <input
              className="form-input form-input-w100 sap-form-input-disabled"
              type="text"
              value={empenho.Fornecedor}
              disabled />
          </div>
          <label>Item</label>{
            itens.map(item => {
              return (
                <div className="sap-form-button-select sap-form-button-select-margin-bot">
                  <input
                    className="form-input form-input-w100 sap-form-input-disabled"
                    type="text"
                    value={item.nome+' ('+item.catmat+')'}
                    disabled/>
                </div>
              );
            })
          }
          
        </form>
        {cobrancas.map(cobranca => {
          
          return ( 
          <Formik
          initialValues={{
            Via: cobranca.via,
            ContatoUtilizado: cobranca.contato,
            DataResposta: cobranca.dataResposta,
            DataHora: cobranca.dataHora,
            Comprovacao: cobranca.comprovacao,
            Observacoes: cobranca.observacao,
          }}
          enableReinitialize
        >
          {() => {
            return(
              <Form
                className="sap-form-container"
              >
                <div className="form-title">
                  <h1>Cobrança</h1>
                </div>
                <div className="form-elements">
                  <div className="form-elements-column">
                    <label>Via</label>
                    <div className="sap-form-button-select sap-form-button-select-margin-bot">
                      <Field
                        className={'sap-form-select sap-form-input-disabled'} 
                        disabled
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
                    className={"sap-form-input-disabled form-input form-input-w100 "}  
                    disabled
                    type="text"
                    name='ContatoUtilizado'
                    />
                    <div className='sap-form-container-input-row'>
                      <div className='sap-form-container-input-column sap-form-container-input-column-w60 '>
                        <label ><span>Recebimento Confirmado?</span></label>
                        <div className="sap-form-button-select ">
                          <button 
                            type="button" 
                            disabled
                            className={respostaEmpresa ? 'sap-form-button sap-form-button-active sap-form-button-active-green' : 'sap-form-button'}
                            onClick={() => setRespostaEmpresa(true)}
                          >
                            Sim
                          </button>
                          <button 
                            type="button"
                            disabled
                            className={!respostaEmpresa ? 'sap-form-button sap-form-button-active sap-form-button-active-red' : 'sap-form-button'}
                            onClick={() => setRespostaEmpresa(false)}
                          >
                            Não
                          </button>
                        </div>
                      </div>
                      <Field
                        className={"sap-form-input-disabled form-input form-input-w100 "}  
                        type="date"
                        name='DataResposta'
                        disabled
                        />
                    </div>
                  </div>
                  
                  <div className="form-elements-column">
                    <label>Data e Hora</label>
                    <Field
                    className={"form-input form-input-w100 sap-form-input-disabled"}  
                    type="datetime-local"
                    name='DataHora'
                    disabled
                    />
                    <label>Comprovação</label>
                    <Field
                    className={"sap-form-input-disabled form-input form-input-w100 "}  
                    type="text"
                    name='Comprovacao'
                    disabled
                    />
                  </div>
                </div>
                <label>Observações</label>
                <Field
                  as='textarea'
                  className={"sap-form-input-disabled form-input form-input-textarea form-input-w100 "} 
                  type="textarea"
                  name='Observacoes'
                  disabled
                />
              </Form>
          )}
          }
          </Formik>
          );
        })}
      
      </div>

    </div>
  );
}

export default VizualizarEmpenho;
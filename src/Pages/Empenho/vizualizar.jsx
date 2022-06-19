import {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {AiFillCloseCircle} from 'react-icons/ai';
import {api, Config} from '../../Services/api';

function VizualizarEmpenho() {
  const {idAquisicao, idEmpenho} = useParams();
  const navigateTo = useNavigate();
  const [itens,setItens] = useState([]);console.log(itens);
  let config = {};
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
      </div>
    </div>
  );
}

export default VizualizarEmpenho;
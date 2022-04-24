import {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Formik, Field, Form} from 'formik';
import VMasker from "vanilla-masker";

import {AiFillCloseCircle} from 'react-icons/ai';
import {api, Config} from '../../Services/api';

function EditEmpenho() {
  const {idAquisicao, idEmpenho} = useParams();
  const navigateTo = useNavigate();
  const [valorTotal, setValorTotal] = useState('');
  let config = {};
  config = Config();
  const [fornecedores,setFornecedores] = useState([]);
  const [itens,setItens] = useState([]);
  const [empenho,setEmpenho] = useState({
    NumeroEmpenho: '',
    DataEmissao: '',
    ValorTotalNE: '',
    TipoEmpenho: '',
    DataInclusao: '',
    DataEnvio: '',    
    Fornecedor: 0,
    Item: 0
    });
  useEffect(() => {
    api.get(`fornecedores`, config).then(response => {
      setFornecedores(response.data);
    });
    api.get(`itens`, config).then(response => {
      setItens(response.data);
    });
    api.get(`empenhos/${idEmpenho}`, config).then(response => {
      setEmpenho({
        NumeroEmpenho: response.data.numeroEmpenho,
        DataEmissao: response.data.dataEmissao,
        ValorTotalNE: response.data.valorTotalNE,
        TipoEmpenho: response.data.tipoEmpenho,
        DataInclusao: response.data.dataInclusao,
        DataEnvio: response.data.dataEnvio,    
        Fornecedor: response.data.fornecedor.id,
        Item: response.data.item.id
      });
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
  async function onSubmit(values){
    const bodyParameters ={
      id: idEmpenho,
      numeroEmpenho: values.NumeroEmpenho,
      /*dataEmissao: values.DataEmissao,*/
      valorTotalNE: valorTotal,
      tipoEmpenho: values.TipoEmpenho,
      dataInclusao: values.DataInclusao,
      dataEnvio: values.DataEnvio,
      fornecedor: {
        id: values.Fornecedor
      },
      item: {
        id: values.Item
      },
      aquisicao: {
        id: parseInt(idAquisicao)
      },
    }
    await api.put(`empenhos/${idEmpenho}`, bodyParameters, config).then(function () { 
      alert(values.NumeroEmpenho+' Editado Com Sucesso!');
      navigateTo('/colic/aquisicoes/'+idAquisicao);
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
      <AiFillCloseCircle className="sap-close-modal" size={30} color="#09210E" onClick={() => navigateTo('/colic/aquisicoes/'+idAquisicao)}/>
      <div className="sap-div-modal">
      <Formik

          onSubmit={onSubmit}
          initialValues={empenho}
          enableReinitialize
        >
          {({errors,touched,values}) => {
            return(
              <Form
                className="sap-form-container"
              >
                <div className="form-title">
                  <h1>Editar Nota de Empenho Nº {empenho.NumeroEmpenho}</h1>
                </div>
                <div className="form-elements">
                  <div className="form-elements-column">
                    <label>Nº da Nota de Empenho</label>
                    <Field
                      className={errors.NumeroEmpenho && touched.NumeroEmpenho ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "} 
                      type="text"
                      name='NumeroEmpenho'
                    />
                    <label>Valor Total da NE</label>
                    <div className="form-div-input-link">
                      <Field
                        className={errors.ValorTotalNE && touched.ValorTotalNE ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                        type="text"
                        name='ValorTotalNE'
                        value={valorTotal}
                        onBlur={onChange(values.ValorTotalNE)}
                      />
                    </div>
                    <label>Data de Inclusão da NE pela COFIN no SEI</label>
                    <Field
                    className={errors.DataInclusao && touched.DataInclusao ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                    type="date"
                    name='DataInclusao'
                    />
                    
                  </div>
                  <div className="form-elements-column">
                    <label>Data de emissão</label>
                    <Field
                    className={errors.DataEmissao && touched.DataEmissao ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                    type="date"
                    name='DataEmissao'
                    />
                    <label>Tipo do Empenho</label>
                    <div className="sap-form-button-select sap-form-button-select-margin-bot">
                      <Field
                        className={errors.TipoEmpenho && touched.TipoEmpenho ? 'sap-form-select sap-form-select-error' : 'sap-form-select'} 
                        name="TipoEmpenho" 
                        as="select">
                        <option value="null"></option>
                        <option value="Ordinário">Ordinário</option>
                        <option value="Estimativo">Estimativo</option>
                        <option value="Global">Global</option>
                      </Field>
                    </div>
                    <label>Data de envio da NE pela COLIC ao Fornecedor</label>
                    <Field
                    className={errors.DataEnvio && touched.DataEnvio ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                    type="date"
                    name='DataEnvio'
                    />
                  </div>
                </div>
                <label>Fornecedor</label>
                <div className="sap-form-button-select sap-form-button-select-margin-bot">
                  <Field
                    className={errors.Fornecedor && touched.Fornecedor ? 'sap-form-select sap-form-select-error' : 'sap-form-select'} 
                    name="Fornecedor" 
                    as="select">
                    <option value="null"></option>
                    {fornecedores.map(fornecedor => {
                      return (
                        <option value={fornecedor.id}>{fornecedor.razaoSocial+' ('+fornecedor.cnpj+')'}</option>
                      )
                    })
                    }
                  </Field>
                </div>
                <label>Item</label>
                <div className="sap-form-button-select sap-form-button-select-margin-bot">
                  <Field
                    className={errors.Item && touched.Item ? 'sap-form-select sap-form-select-error' : 'sap-form-select'} 
                    name="Item" 
                    as="select">
                    <option value="null"></option>
                    {itens.map(item => {
                      return (
                        <option value={item.id}>{item.nome+' ('+item.catmat+')'}</option>
                      )
                    })
                    }
                  </Field>
                </div>
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

export default EditEmpenho;
import {useState, useEffect} from 'react';
import {Formik, Field, Form} from 'formik';
import VMasker from "vanilla-masker";

import {AiFillCloseCircle} from 'react-icons/ai';
import {api, Config} from '../../Services/api';

type props = {
  onChangeModal: (link: string ) => void;
}

interface Fornecedores {
  id: number;
  razaoSocial: string
  cnpj: string
}

interface Itens {
  id: number;
  nome: string
  catmat: string
}

function AddEmpenho({onChangeModal} : props) {
  const [valorTotal, setValorTotal] = useState('');
  let config = {};
  config = Config();
  const [fornecedores,setFornecedores] = useState<Fornecedores[]>([]);
  const [itens,setItens] = useState<Itens[]>([]);
  useEffect(() => {
    api.get(`fornecedores`, config).then(response => {
      setFornecedores(response.data);
    });
    api.get(`itens`, config).then(response => {
      setItens(response.data);
    })
  }, []);
  function onChange(valor_total: string) {
    const valorT = VMasker.toMoney(valor_total, {
      precision: 2,
      separator: ",",
      delimiter: ".",
      unit: "R$"
    });
    setValorTotal(valorT);
  }
  function onSubmit(values: {}){

  }
  return (
    <div className="sap-container-modal">
      <AiFillCloseCircle className="sap-close-modal" size={30} color="#09210E" onClick={() => onChangeModal('')}/>
      <div className="sap-div-modal">
      <Formik

          onSubmit={onSubmit}
          initialValues={{
            NumeroEmpenho: '',
            DataEmissao: '',
            ValorTotalNE: '',
            TipoEmpenho: '',
            DataInclusao: '',
            DataEnvio: '',
            Fornecedor: '',
            Item: ''
          }}
          enableReinitialize
        >
          {({errors,touched,values}) => {
            return(
              <Form
                className="sap-form-container"
              >
                <div className="form-title">
                  <h1>Nota de Empenho</h1>
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
                        <option value="ordinario">Ordinário</option>
                        <option value="estimativo">Estimativo</option>
                        <option value="globa">Global</option>
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

export default AddEmpenho;
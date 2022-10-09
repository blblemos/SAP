import {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Formik, Field, Form, FieldArray} from 'formik';

import {AiFillCloseCircle, AiOutlineLink} from 'react-icons/ai';
import {MdDeleteForever} from 'react-icons/md';
import useApi from '../../Services/useApi';
import AddLink from '../../Components/Add-Link/add-link';
import{setValor} from '../../Utils/Function';

//Setando valores iniciais para empenho(Quando é cadastro)
const initialValue = {
  numeroEmpenho: '',
  dataEmissao: '',
  valorTotalNE: '',
  tipoEmpenho: '',
  dataInclusao: '',
  dataEnvio: '',
  fornecedor: 0,
  dataContagem: '',
  linkEmpenho: '',
  dataConfirmacao: '',
  dias: '',
  item: [{
    id: ''
  }]
}

function Empenho() {
  const {idAquisicao, idEmpenho} = useParams();
  const navigateTo = useNavigate();
  const [empenho,setEmpenho] = useState(initialValue);
  const [valorTotal, setValorTotal] = useState('');
  const [fornecedores,setFornecedores] = useState([]);
  const [itens,setItens] = useState([]);
  const [modalLink, setModalLink] = useState(false);
  const [linkEmpenho, setLinkEmpenho] = useState('');
  //Carregando Empenho se houver
  const [loadEmpenho] = useApi({
    url: `/empenhos/${idEmpenho}`,
    method: 'get',
    onCompleted: (response) => {
      setEmpenho(response.data);
      setLinkEmpenho(response.data.linkEmpenho);
    }
  });
  //Salvando empenho
  const [save] = useApi({
    url: idEmpenho ? `/empenhos/${idEmpenho}` : `/empenhos`,
    method: idEmpenho ? 'put' : 'post',
    onCompleted: (response) => {
      if (!response.error){
        idEmpenho ? alert(' Editado Com Sucesso!') : alert(' Cadastrado Com Sucesso!');
        navigateTo('/colic/aquisicoes/'+idAquisicao)
      }
    }
  });
  //Carregando fornecedor
  const[loadFornecedores] = useApi({
    url: '/fornecedores',
    method: 'get',
    onCompleted: (response) => {
      setFornecedores(response.data);
    }
  }
  );
  //Carregando Itens
  const[loadItens] = useApi({
    url: '/itens',
    method: 'get',
    onCompleted: (response) => {
      setItens(response.data);
    }
  }
  );
  // Chamando carregamento de Itens e Fornecedores
  useEffect(() => {
    loadFornecedores();
    loadItens();
    if (idEmpenho) {
      loadEmpenho();
    }
    
  }, [idEmpenho]);

  //Formatando Valor em Reais
  function onChange(valor_total) {
    setValorTotal(setValor(valor_total));
  }
  //Função de envio de formulário 
  function onSubmit(values){
    const bodyParameters ={
      numeroEmpenho: values.numeroEmpenho,
      dataEmissao: values.dataEmissao,
      valorTotalNE: valorTotal,
      tipoEmpenho: values.tipoEmpenho,
      dataInclusao: values.dataInclusao,
      dataEnvio: values.dataEnvio,
      linkEmpenho: linkEmpenho,
      dataContagem: values.dataContagem,
      dataConfirmacao: values.dataConfirmacao,
      dias: values.dias,
      fornecedor: {
        id: values.fornecedor.id
      },
      item: values.item ,
      aquisicao: {
        id: parseInt(idAquisicao)
      },
    };
    //Chamando função para salvar ou editar empenho
    save({
      data: idEmpenho ? {...bodyParameters, id: idEmpenho} : bodyParameters
    });
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
                {modalLink &&
                //Carregando modal de Link
                  <AddLink
                    link={linkEmpenho}
                    onChangeLink={setLinkEmpenho}
                    onChangeModalLink={setModalLink}
                  />
                };
                <div className="form-title">
                  <h1>Nota de Empenho</h1>
                </div>
                <div className="form-elements">
                  <div className="form-elements-column">
                    <label>Nº da Nota de Empenho</label>
                    <div className="form-div-input-link">
                      <Field
                        className={errors.numeroEmpenho && touched.numeroEmpenho ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "} 
                        type="text"
                        name='numeroEmpenho'
                      />
                      <AiOutlineLink className="form-icon-link" size={30} color="#09210E" onClick={() => setModalLink(true)}/>
                    </div>
                    <label>Valor Total da NE</label>
                    <div className="form-div-input-link">
                      <Field
                        className={errors.valorTotalNE && touched.valorTotalNE ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                        type="text"
                        name='valorTotalNE'
                        value={valorTotal}
                        onBlur={onChange(values.valorTotalNE)}
                      />
                    </div>
                    <label>Data de Inclusão da NE pela COFIN no SEI</label>
                    <Field
                    className={errors.dataInclusao && touched.dataInclusao ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                    type="date"
                    name='dataInclusao'
                    />
                    <label>Data Confirmação</label>
                    <Field
                      className={errors.dataConfirmacao && touched.dataConfirmacao ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="date"
                      name='dataConfirmacao'
                    />
                  </div>
                  <div className="form-elements-column">
                    <label>Data de emissão</label>
                    <Field
                      className={errors.dataEmissao && touched.dataEmissao ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="date"
                      name='dataEmissao'
                    />
                    <label>Tipo do Empenho</label>
                    <div className="sap-form-button-select sap-form-button-select-margin-bot">
                      <Field
                        className={errors.tipoEmpenho && touched.tipoEmpenho ? 'sap-form-select sap-form-select-error' : 'sap-form-select'} 
                        name="tipoEmpenho" 
                        as="select"
                      >
                        <option value="null"></option>
                        <option value="Ordinário">Ordinário</option>
                        <option value="Estimativo">Estimativo</option>
                        <option value="Global">Global</option>
                      </Field>
                    </div>
                    <label>Data de envio da NE pela COLIC ao Fornecedor</label>
                    <Field
                      className={errors.dataEnvio && touched.dataEnvio ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="date"
                      name='dataEnvio'
                    />
                    <label>Data Contagem</label>
                    <Field
                      className={errors.dataContagem && touched.dataContagem ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="date"
                      name='dataContagem'
                    />
                    <label>Dias para Contagem</label>
                    <Field
                      className={errors.dias && touched.dias ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="number"
                      name='dias'
                    />
                  </div>
                </div>
                <label>Fornecedor</label>
                <div className="sap-form-button-select sap-form-button-select-margin-bot">
                  <Field
                    className={errors.fornecedor && touched.fornecedor ? 'sap-form-select sap-form-select-error' : 'sap-form-select'} 
                    name={`fornecedor.id`} 
                    as="select"
                  >
                    <option value="null"></option>
                    {fornecedores.map(fornecedor => {
                      return (
                        <option  value={fornecedor.id}>{fornecedor.razaoSocial+' ('+fornecedor.cnpj+')'}</option>
                      )
                    })
                    }
                  </Field>
                </div>
                <label>Itens</label>
                  <FieldArray className="sap-form-button-select sap-form-button-select-margin-bot" name="item">
                    {({ remove, push }) => (
                      <div>
                        {values.item.length > 0 &&
                          values.item.map((empenhoItem, index) => (
                            <div className="sap-container-array-select" key={index}>
                              <Field
                                  className={errors.item && touched.item ? 'sap-form-select sap-form-select-error' : 'sap-form-select sap-form-select-array'}
                                  name={`item.${index}.id`}
                                  as="select">
                                  <option value="null"></option>
                                  {itens.map(item => {
                                    return (
                                      <option value={item.id}>{item.nome+' ('+item.catmat+')'}</option>
                                    )
                                  })
                                  }
                                </Field>
                                <button
                                  type="button"
                                  className="sap-remove-array-select"
                                  onClick={() => remove(index)}
                                >
                                <MdDeleteForever size={25}/>
                                </button>
                            </div>
                          ))}
                        <div 
                          className="sap-btn-add"
                          onClick={() => push({ id: ''})}
                          >
                            <p>Adicionar Item</p>
                        </div>
                      </div>
                    )}
                  </FieldArray>
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

export default Empenho;
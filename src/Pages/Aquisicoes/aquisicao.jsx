import {useState, useEffect} from 'react';
import {Formik, Field, Form} from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import {AiOutlineLink } from 'react-icons/ai';
import { mask as masker, unMask } from "remask";

import NavbarMenu from '../../Components/Navbar/Navbar';
import useApi from '../../Services/useApi';
import Schema from '../../Utils/ShemaAquisicao';
import AddLink from '../../Components/Add-Link/add-link';
import{setValor} from '../../Utils/Function';

import '../../Styles/form.css';

//Setando valores iniciais para aquisicao(Quando é cadastro)
const initialValue = {
  servidor: 0,
  objeto: '',
  valorTotal: '',
  numeroProcesso: '',
  data: '',
  tipo: '',
  modalidade: '',
  pac: '',
  recExtraOrc: false,
  anotacoes: '',
  orcamento: ''
};

function Aquisicao(){
  const navigateTo = useNavigate();
  const {id} = useParams();
  const [valorTotalThis, setValorTotalThis] = useState();
  const [servidor,setServidor] = useState([]);
  const [rec_Extra, setRec_Extra] = useState(false);
  const [modalLink, setModalLink] = useState(false);
  const [linkProcesso, setLinkProcesso] = useState('');
  const [aquisicao, setAquisicao] = useState(initialValue);

 //Carregando aquisicao se houver
  const [loadAquisicao] = useApi({
    url: `/aquisicoes/${id}`,
    method: 'get',
    onCompleted: (response) => { 
      setRec_Extra(response.data.recExtraOrc);
      setLinkProcesso(response.data.linkProcesso);
      setAquisicao(response.data);
    }
  });

 //Carregando servidor
  const [loadServidor] = useApi({
  url: `/servidores`,
  method: 'get',
  onCompleted: (response) => { 
    setServidor(response.data);
  }
  });

  //Salvando aquisicão
  const [save] = useApi({
    url: id ? `/aquisicoes/${id}` : `/aquisicoes`,
    method: id ? 'put' : 'post',
    onCompleted: (response) => {
      if (!response.error){
        id ? alert(' Editado Com Sucesso!') : alert(' Cadastrado Com Sucesso!');
        navigateTo('/colic/aquisicoes');
      }
    }
  });

  //Formatando Valor em Reais
  function onChange(valor_total) {
    setValorTotalThis(setValor(valor_total));
  };

  // Chamando carregamento do servidor
  useEffect(() => {
    loadServidor();

    if (id) {
      loadAquisicao();
    }
  }, []);

  function onSubmit(values) {
    if (linkProcesso === '') {
      alert('Coloque o link do processo para continuar!');
    }else{
      aquisicao.valorTotal = valorTotalThis;
      aquisicao.recExtraOrc = rec_Extra;
      aquisicao.objeto = values.objeto;
      aquisicao.numeroProcesso = values.numeroProcesso;
      aquisicao.tipo = values.tipo;
      aquisicao.orcamento = values.orcamento;
      aquisicao.data = values.data;
      aquisicao.modalidade = values.modalidade;
      aquisicao.pac = values.pac;
      aquisicao.anotacoes = values.anotacoes;
      aquisicao.servidor = {
        id: values.servidor.id
      }
      console.log(aquisicao);
      save({
        data: aquisicao
      });
    }
  };
  return (
    <div className="sap-container">
      <NavbarMenu />
      <div className='sap-container-page'>
        <Formik
          validationSchema={Schema}
          onSubmit={onSubmit}
          initialValues={aquisicao}
          enableReinitialize
        >
          {({errors,touched,values}) => {
            return(
              <Form
                className="sap-form-container"
              >
                {modalLink &&
                  <AddLink
                    link={linkProcesso}
                    onChangeLink={setLinkProcesso}
                    onChangeModalLink={setModalLink}
                  />
                }
                
                <div className="form-title">
                  <h1>{id ? 'Editar Aquisição' : 'Cadastrar Aquisição'}</h1>
                </div>
                <label>Solicitante</label>
                <div className="sap-form-button-select sap-form-button-select-margin-bot">
                  <Field
                    className={errors.solicitante && touched.solicitante ? 'sap-form-select sap-form-select-error' : 'sap-form-select'} 
                    name="servidor.id" 
                    as="select">
                    <option value="null"></option>
                    {servidor.map(servidor => {
                      return (
                        <option value={servidor.id}>{servidor.nome+' | '+servidor.setor.sigla}</option>
                      )
                    })
                    }
                  </Field>
                </div>
                <div className="form-elements">
                  <div className="form-elements-column">
                    <label>Objeto</label>
                    <Field
                      className={errors.objeto && touched.objeto ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "} 
                      type="text"
                      name='objeto'
                    />
                    <label>Processo SEI</label>
                    <div className="form-div-input-link">
                      <Field
                        className={errors.numeroProcesso && touched.numeroProcesso ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                        type="text"
                        name='numeroProcesso'
                        maxLength = {20}
                        value={masker(unMask(values.numeroProcesso),["99999.999999/9999-99"])}
                      />
                      <AiOutlineLink className="form-icon-link" size={30} color="#09210E" onClick={() => setModalLink(true)}/>
                    </div>
                    <label>Tipo</label>
                    <div className="sap-form-button-select sap-form-button-select-margin-bot">
                      <Field
                        className={errors.tipo && touched.tipo ? 'sap-form-select sap-form-select-error' : 'sap-form-select'} 
                        name="tipo" 
                        as="select">
                        <option value="null"></option>
                        <option value="Material">Material</option>
                        <option value="Serviço">Serviço</option>
                        <option value="Obra">Obra</option>
                      </Field>
                    </div>
                    <label>Orçamento</label>
                    <div className="sap-form-button-select sap-form-button-select-margin-bot">
                      <Field
                        className={errors.orcamento && touched.orcamento ? 'sap-form-select sap-form-select-error' : 'sap-form-select'} 
                        name="orcamento" 
                        as="select">
                        <option value="null"></option>
                        <option value="Custeio">Custeio</option>
                        <option value="Investimento">Investimento</option>
                      </Field>
                    </div>
                  </div>
                  <div className="form-elements-column">
                    <label>Valor Total</label>
                    <Field
                    className={errors.valorTotal && touched.valorTotal ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                    type="text"
                    name='valorTotal'
                    value={valorTotalThis}
                    onBlur={onChange(values.valorTotal)}
                    />
                    <label>Data de Abertura</label>
                    <Field
                      className={errors.data && touched.data ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="date"
                      name='data'
                    />
                    <label>Modalidade</label>
                    <div className="sap-form-button-select sap-form-button-select-margin-bot">
                      <Field
                        className={errors.modalidade && touched.modalidade ? 'sap-form-select sap-form-select-error' : 'sap-form-select'} 
                        name="modalidade" 
                        as="select">
                        <option value="null"></option>
                        <option value="Dispensa">Dispensa</option>
                        <option value="Inexigibilidade">Inexigibilidade</option>
                        <option value="Participação em Pregão">Participação em Pregão</option>
                        <option value="Adesão a Pregão">Adesão a Pregão</option>
                        <option value="Contrato">Contrato</option>
                      </Field>
                    </div>
                    <div className='sap-form-container-input-row'>
                      <div className='sap-form-container-input-column sap-form-container-input-column-w60'>
                        <label htmlFor='Celular'>Pac</label>
                        <Field
                        className={errors.pac && touched.pac ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                        type="text"
                        name='pac'
                        maxLength = {4}
                        value={masker(unMask(values.pac.toString()),["9999"])}
                        />
                      </div>
                      <div className='sap-form-container-input-column sap-form-container-input-column-w40'>
                        <label>Recursos Extraorçamentários</label>
                        <div className="sap-form-button-select">
                          <button 
                            type="button" 
                            className={rec_Extra ? 'sap-form-button sap-form-button-active sap-form-button-active-green' : 'sap-form-button'}
                            onClick={() => setRec_Extra(true)}
                          >
                            Sim
                          </button>
                          <button 
                            type="button"
                            className={!rec_Extra ? 'sap-form-button sap-form-button-active sap-form-button-active-red' : 'sap-form-button'}
                            onClick={() => setRec_Extra(false)}
                          >
                            Não
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <label>Anotações</label>
                    <Field
                      as='textarea'
                      className={errors.anotações && touched.anotações ? "form-input form-input-w100 form-input-error form-input-textarea" : "form-input form-input-textarea form-input-w100 "} 
                      type="textarea"
                      name='anotacoes'
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

export default Aquisicao;
import {useState, useEffect} from 'react';
import {Formik, Field, Form} from 'formik';
import { useNavigate } from 'react-router-dom';
import VMasker from "vanilla-masker";
import {AiOutlineLink } from 'react-icons/ai';
import { mask as masker, unMask } from "remask";

import NavbarMenu from '../../Components/Navbar/Navbar';
import {api, Config} from '../../Services/api';
import Schema from '../../Utils/ShemaAquisicao';
import AddLink from '../../Components/Add-Link/add-link';

import '../../Styles/form.css';

function CadastrarAquisicao(){
  const navigateTo = useNavigate();
  const config = Config();
  const [valorTotal, setValorTotal] = useState();
  const [servidor,setServidor] = useState([]);
  const [rec_Extra, setRec_Extra] = useState(false);
  const [modalLink, setModalLink] = useState(false);
  const [linkProcesso, setLinkProcesso] = useState('');
  function onChange(valor_total) {
    const valorT = VMasker.toMoney(valor_total, {
      precision: 2,
      separator: ",",
      delimiter: ".",
      unit: "R$"
    });
    setValorTotal(valorT);
  }
  useEffect(() => {
    api.get(`servidores`, config).then(response => {
      setServidor(response.data);
    })
  }, []);
  function onSubmit(values) {
    if (linkProcesso === '') {
      alert('Coloque o link do processo para continuar!');
    }else{
      const bodyParameters = {
        servidor: {
          id: parseInt(values.Solicitante)
        },
        valorTotal: valorTotal,
        numeroProcesso: values.NomeroProcesso,
        linkProcesso: linkProcesso,
        data: values.Data,
        objeto: values.Objeto,
        tipo: values.Tipo,
        modalidade: values.Modalidade,
        pac: parseInt(values.Pac),
        recExtraOrc: rec_Extra,
        anotacoes: values.Anotações,
        orcamento: values.Orcamento,
      }; 
      api.post('aquisicoes',bodyParameters, config).then(function () {
        alert('Cadastrado Com Sucesso!');
        navigateTo('/colic/aquisicoes');
      }).catch(function (error) {
        alert(error.response.data.message);
      });
    }
  }
  return (
    <div className="sap-container">
      <NavbarMenu />
      <div className='sap-container-page'>
        <Formik
          validationSchema={Schema}
          onSubmit={onSubmit}
          initialValues={{
            Solicitante: '',
            Objeto: '',
            ValorTotal: '',
            NomeroProcesso: '',
            Data: '',
            Tipo: '',
            Modalidade: '',
            Pac: '',
            RecExtraOrc: '',
            Anotações: '',
            Orcamento: ''
          }}
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
                };
                
                <div className="form-title">
                  <h1>CADASTRO DE AQUISIÇÃO</h1>
                </div>
                <label>Solicitante</label>
                <div className="sap-form-button-select sap-form-button-select-margin-bot">
                  <Field
                    className={errors.Solicitante && touched.Solicitante ? 'sap-form-select sap-form-select-error' : 'sap-form-select'} 
                    name="Solicitante" 
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
                      className={errors.Objeto && touched.Objeto ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "} 
                      type="text"
                      name='Objeto'
                    />
                    <label>Processo SEI</label>
                    <div className="form-div-input-link">
                      <Field
                        className={errors.NomeroProcesso && touched.NomeroProcesso ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                        type="text"
                        name='NomeroProcesso'
                        maxLength = {20}
                        value={masker(unMask(values.NomeroProcesso),["99999.999999/9999-99"])}
                      />
                      <AiOutlineLink className="form-icon-link" size={30} color="#09210E" onClick={() => setModalLink(true)}/>
                    </div>
                    <label>Tipo</label>
                    <div className="sap-form-button-select sap-form-button-select-margin-bot">
                      <Field
                        className={errors.Tipo && touched.Tipo ? 'sap-form-select sap-form-select-error' : 'sap-form-select'} 
                        name="Tipo" 
                        as="select">
                        <option value="null"></option>
                        <option value="Compra">Compra</option>
                        <option value="Serviço">Serviço</option>
                      </Field>
                    </div>
                    <label>Orçamento</label>
                    <div className="sap-form-button-select sap-form-button-select-margin-bot">
                      <Field
                        className={errors.Orcamento && touched.Orcamento ? 'sap-form-select sap-form-select-error' : 'sap-form-select'} 
                        name="Orcamento" 
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
                    className={errors.ValorTotal && touched.ValorTotal ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                    type="text"
                    name='ValorTotal'
                    value={valorTotal}
                    onBlur={onChange(values.ValorTotal)}
                    />
                    <label>Data de Abertura</label>
                    <Field
                    className={errors.Data && touched.Data ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                    type="date"
                    name='Data'
                    />
                    <label>Modalidade</label>
                    <div className="sap-form-button-select sap-form-button-select-margin-bot">
                      <Field
                        className={errors.Modalidade && touched.Modalidade ? 'sap-form-select sap-form-select-error' : 'sap-form-select'} 
                        name="Modalidade" 
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
                          className={errors.Pac && touched.Pac ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                          type="text"
                          name='Pac'
                          maxLength = {4}
                          value={masker(unMask(values.Pac),["9999"])}
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
                      className={errors.Anotações && touched.Anotações ? "form-input form-input-w100 form-input-error form-input-textarea" : "form-input form-input-textarea form-input-w100 "} 
                      type="textarea"
                      name='Anotações'
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

export default CadastrarAquisicao;
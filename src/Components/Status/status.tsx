import {AiFillCloseCircle} from 'react-icons/ai';
import {Formik, Field, Form} from 'formik';

import '../../Styles/form.css';
import {api, Config} from '../../Services/api';

//Propriedades do componente
type props = {
  aquisicao: {
    id: number
    status : string};
  status: string;
  onChangeModal: (modalLink: string ) => void;
}

function Status({ onChangeModal, aquisicao, status} : props) {
  //Setando configurações da API
  let config = {};
  config = Config();
  //Função Submit
  async function onSubmit(values: {StatusProcesso: string}){
    //Alterando status no objeto
    aquisicao.status = values.StatusProcesso;
    //Alterando status na API
    await api.put(`aquisicoes/${aquisicao.id}`,aquisicao, config).then(function () {
      alert('Status Editado Com Sucesso!');
      window.location.reload();
    }).catch(function (error) {
      let msgError = '';
      for (var index = 0; index < error.response.data.length; index++) {
        msgError = msgError+error.response.data[index].message+'\n';
      }
      alert(msgError);
    });
  }
  return (
    <div className="sap-container-modal">
      <AiFillCloseCircle className="sap-close-modal" size={30} color="#CE1218" onClick={() => onChangeModal('')}/>
      <div className="sap-div-modal-mini">
        <div className="form-elements-column w-100">
        <Formik
          onSubmit={onSubmit}
          initialValues={{
            StatusProcesso: status,
          }}
          enableReinitialize 
        >
          {() => {
            return(
              <Form
                className="sap-form-container"
              >
                <label>Status do Processo</label>
                <Field 
                  className="sap-form-select"
                  name='StatusProcesso'
                  as="select"
                  >
                  <option value="Processo Iniciado na COLIC">Processo Iniciado na COLIC</option>
                  <option value="Fase Planejamento">Fase Planejamento</option>
                  <option value="Enviado ao DEPAD">Enviado ao DEPAD</option>
                  <option value="Aguardando execução">Aguardando execução</option>
                  <option value="Entrega Realizada">Entrega Realizada</option>
                  <option value="Em processamento de almoxarifado">Em processamento de almoxarifado</option>
                  <option value="NF enviada ao Financeiro">NF enviada ao Financeiro</option>
                  <option value="Pagamento Efetuado">Pagamento Efetuado</option>
                  <option value="Concluído na Unidade COLIC.IRE e arquivado">Concluído na Unidade COLIC.IRE e arquivado</option>
                  <option value=" Processo ou empenho cancelado"> Processo ou empenho cancelado</option>
                </Field>
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
    </div>
  );
}

export default Status;
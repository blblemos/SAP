import {AiFillCloseCircle} from 'react-icons/ai';
import {Formik, Field, Form} from 'formik';

import '../../Styles/form.css';
import {api, Config} from '../../Services/api';

//Propriedades do componente
type props = {
  aquisicao: {
    id: number
    anotacoes : string};
  anotacao: string;
  onChangeModal: (modalLink: string ) => void;
}

function Anotacoes({ onChangeModal, aquisicao, anotacao} : props) {
  //Setando configurações da API
  let config = {};
  config = Config();
  //Função Submit
  async function onSubmit(values: {Anotacoes: string}){
    //Alterando anotação no objeto
    aquisicao.anotacoes = values.Anotacoes;
    //Alterando anotação na API
    await api.put(`aquisicoes/${aquisicao.id}`,aquisicao, config).then(function () {
      alert('Anotações salvas com sucesso!');
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
            Anotacoes: anotacao,
          }}
          enableReinitialize 
        >
          {() => {
            return(
              <Form
                className="sap-form-container"
              >
                <label>Anotações do Processo</label>
                <Field 
                  className="form-input form-input-w100 form-input-textarea-anotacoes"
                  name='Anotacoes'
                  as="textarea"
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
    </div>
  );
}

export default Anotacoes;
import {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Formik, Field, Form} from 'formik';

import {AiFillCloseCircle} from 'react-icons/ai';
import useApi from '../../Services/useApi';

//Setando valores iniciais para o pagamento
const initialValue = {
  id: '',
  envioNf: '',
  notaFiscal: '',
  dataNl: '',
  numeroNl: '',
  dataOrdem: '',
  numeroOrdem: '',
  status: '',
  empenho: {}
}

function EditarPagamento() {
  const {idAquisicao, idPagamento, idEmpenho} = useParams();
  const navigateTo = useNavigate();
  const [pagamento,setPagamento] = useState(initialValue);
  //Carregando Pagamento
  const [loadPagamento] = useApi({
    url: `/pagamentos/${idPagamento}`,
    method: 'get',
    onCompleted: (response) => {
      setPagamento(response.data);
      pagamento.id = idPagamento;
    }
  });
  //Salvando pagamento
  const [save] = useApi({
    url: `/pagamentos/${idPagamento}`,
    method: 'put',
    onCompleted: (response) => {
      if (!response.error){
        alert(' Editado Com Sucesso!');
        navigateTo('/colic/aquisicoes/'+idAquisicao)
      }
    }
  });

  // Chamando carregamento dos dados do pagamento
  useEffect(() => {
    if (idPagamento) {
      loadPagamento();
    }
    
  }, [idPagamento]);

  //Função de envio de formulário 
  function onSubmit(values){
    
    if ((values.envioNf == null && values.notaFiscal != null) || (values.envioNf != null && values.notaFiscal == null)) {
      alert("Envio da NF Para Pagamento e Nota Fiscal precisam ser preenchidos");
    }else if((values.dataNl != null && values.numeroNl == null) || (values.dataNl == null && values.numeroNl != null)){
      alert("Data da NL e N. da NL precisam ser preenchidos");
    }else if((values.dataOrdem != null && values.numeroOrdem == null) || (values.dataOrdem == null && values.numeroOrdem != null)){
      alert("Data de Emissão da Ordem Bancária e N. da Ordem Bancária precisam ser preenchidos");
    }else if(values.envioNf == null && values.dataNl != null){
      alert("Envio da NF Para Pagamento e Nota Fiscal precisam ser preenchidos");
    }else if(values.dataNl == null && values.dataOrdem != null){
      alert("Data da NL e N. da NL precisam ser preenchidos");
    }else{
      if (values.envioNf != null) {
        pagamento.envioNf = values.envioNf;
        pagamento.notaFiscal = values.notaFiscal;
        pagamento.empenho = {id: parseInt(idEmpenho)};
        pagamento.status = 'Enviado para o financeiro';
      }if(values.dataNl != null){
        pagamento.dataNl = values.dataNl;
        pagamento.numeroNl = values.numeroNl;
        pagamento.empenho = {id: parseInt(idEmpenho)};
        pagamento.status = 'Aguardando Recurso';
      }if(values.dataOrdem != null){
        pagamento.dataOrdem = values.dataOrdem;
        pagamento.numeroOrdem = values.numeroOrdem;
        pagamento.empenho = {id: parseInt(idEmpenho)};
        pagamento.status = 'Pagamento Efetuado';
      }
    }

    //Chamando função para salvar pagamento
    save({
      data: pagamento
    });
  }
  return (
    <div className="sap-container-modal">
      <AiFillCloseCircle className="sap-close-modal" size={30} color="#09210E" onClick={() => navigateTo('/colic/aquisicoes/'+idAquisicao)}/>
      <div className="sap-div-modal">
      <Formik
          onSubmit={onSubmit}
          initialValues={pagamento}
          enableReinitialize
        >
          {({errors,touched,values}) => {
            return(
              <Form
                className="sap-form-container"
              >
                <div className="form-title">
                  <h1>Pagamento</h1>
                </div>
                <div className="form-elements">
                  <div className="form-elements-column">
                    <label>Envio da NF Para Pagamento</label>
                    <Field
                      className={errors.envioNf && touched.envioNf ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="date"
                      name='envioNf'
                    />
                    <label>Data da NL</label>
                    <Field
                      className={errors.dataNl && touched.dataNl ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="date"
                      name='dataNl'
                    />
                    <label>Data de Emissão da Ordem Bancária</label>
                    <Field
                      className={errors.dataOrdem && touched.dataOrdem ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="date"
                      name='dataOrdem'
                    />
                  </div>
                  <div className="form-elements-column">
                    <label>Nota Fiscal</label>
                    <Field
                      className={errors.notaFiscal && touched.notaFiscal ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='notaFiscal'
                    />
                    <label>N. da NL</label>
                    <Field
                      className={errors.numeroNl && touched.numeroNl ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='numeroNl'
                    />
                    <label>N. da Ordem Bancária</label>
                    <Field
                      className={errors.numeroOrdem && touched.numeroOrdem ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='numeroOrdem'
                    />
                  </div>
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

export default EditarPagamento;
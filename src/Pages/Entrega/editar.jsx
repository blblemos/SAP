import {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Formik, Field, Form} from 'formik';

import {AiFillCloseCircle} from 'react-icons/ai';
import useApi from '../../Services/useApi';

//Setando valores iniciais para empenho(Quando é cadastro)
const initialValue = {
  id: '',
  recebimentoFornecedor: '',
  servidor: '',
  dataAteste: '',
  entregue: '',
  empenho: {}
}

function EditarEntrega() {
  const {idAquisicao, idEntrega, idEmpenho} = useParams();
  const navigateTo = useNavigate();
  const [servidor,setServidor] = useState([]);
  const [entrega,setEntrega] = useState(initialValue);
  //Carregando Entrega se houver
  const [loadEntrega] = useApi({
    url: `/entregas/${idEntrega}`,
    method: 'get',
    onCompleted: (response) => {
      setEntrega(response.data);
      entrega.id = idEntrega;
    }
  });
  //Salvando entrega
  const [save] = useApi({
    url: `/entregas/${idEntrega}`,
    method: 'put',
    onCompleted: (response) => {
      if (!response.error){
        alert(' Editado Com Sucesso!');
        navigateTo('/colic/aquisicoes/'+idAquisicao)
      }
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
  // Chamando carregamento dos dados da entrega
  useEffect(() => {
    if (idEntrega) {
      loadEntrega();
      loadServidor();
    }
    
  }, [idEntrega]);

  //Função de envio de formulário 
  function onSubmit(values){
    setEntrega(values);
    if (values.recebimentoFornecedor == null && values.dataAteste != null) {
      alert("A entrega precisa ser preenchida!");
    }else if((values.dataAteste != null && values.servidor == null) || (values.dataAteste == null && values.servidor != null)){
      alert("Os campos ATESTADO POR e  DATA DO ATESTE precisam ser preenchidos!");
    }else{
      if (values.recebimentoFornecedor == null) {
        entrega.entregue = 'Aguardando Entrega';
      }else if(values.recebimentoFornecedor != null && values.dataAteste == null){
        entrega.recebimentoFornecedor = values.recebimentoFornecedor;
        entrega.empenho = {id: parseInt(idEmpenho)};
        entrega.entregue = 'Aguardando Ateste';
      }else{
        entrega.recebimentoFornecedor = values.recebimentoFornecedor;
        entrega.servidor = values.servidor;
        entrega.dataAteste = values.dataAteste;
        entrega.empenho = {id: parseInt(idEmpenho)};
        entrega.entregue = 'Processo de Entrega finalizado';
      }
    }
    
    //Chamando função para salvar entrega
    save({
      data: entrega
    });
  }
  return (
    <div className="sap-container-modal">
      <AiFillCloseCircle className="sap-close-modal" size={30} color="#09210E" onClick={() => navigateTo('/colic/aquisicoes/'+idAquisicao)}/>
      <div className="sap-div-modal">
      <Formik
          onSubmit={onSubmit}
          initialValues={entrega}
          enableReinitialize
        >
          {({errors,touched,values}) => {
            return(
              <Form
                className="sap-form-container"
              >
                <div className="form-title">
                  <h1>Entrega</h1>
                </div>
                <div className="form-elements">
                  <div className="form-elements-column">
                    <label>Entregue</label>
                    <Field
                      className={errors.recebimentoFornecedor && touched.recebimentoFornecedor ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="date"
                      name='recebimentoFornecedor'
                    />
                  </div>
                  <div className="form-elements-column">
                    <label>Data do Ateste</label>
                    <Field
                      className={errors.dataAteste && touched.dataAteste ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="date"
                      name='dataAteste'
                    />
                    <label>Atestado Por:</label>
                    <div className="sap-form-button-select sap-form-button-select-margin-bot">
                      <Field
                        className={errors.servidor && touched.servidor ? 'sap-form-select sap-form-select-error' : 'sap-form-select'} 
                        name="servidor" 
                        as="select">
                        <option value="null"></option>
                        {servidor.map(servidor => {
                          return (
                            <option value={servidor.nome}>{servidor.nome+' | '+servidor.setor.sigla}</option>
                          )
                        })
                        }
                      </Field>
                    </div>
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

export default EditarEntrega;
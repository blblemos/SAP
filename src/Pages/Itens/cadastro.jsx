import {useState} from 'react';
import {Formik, Field, Form} from 'formik';
import { useNavigate } from 'react-router-dom';
import VMasker from "vanilla-masker";

import NavbarMenu from '../../Components/Navbar/Navbar';
import useApi from '../../Services/useApi';
import Schema from '../../Utils/ShemaItens';

import '../../Styles/form.css';

function CadastrarItem(){
  const navigateTo = useNavigate();
  const [valorMedio, setValorMedio] = useState();
  function onChange(vmed) {
    const valor_medio = VMasker.toMoney(vmed, {
      precision: 2,
      separator: ",",
      delimiter: ".",
      unit: "R$"
    });
    setValorMedio(valor_medio);
  }
  const [save] = useApi({
    url: `/itens`,
    method: 'post',
    onCompleted: (response) => {
      if (!response.error){
        navigateTo('/colic/itens');
      }
    }
  });
  function onSubmit(values) {
    var bodyParameters = {
      nome: values.nome,
      catmat: values.catmat,
      valorMed: valorMedio,
      descricao: values.descricao,
    };
    save({
      data: bodyParameters,
    });
    
  }
  return (
    <div className="sap-container">
      <NavbarMenu />
      <div className='sap-container-page'>
        <Formik
          validationSchema={Schema}
          onSubmit={onSubmit}
          initialValues={{
            nome: '',
            catmat: '', 
            valorMed: '',
            descricao: '',
          }}
          enableReinitialize
        >
          {({errors,touched,values}) => {
            return(
              <Form
                className="sap-form-container"
              >
                <div className="form-title">
                  <h1>CADASTRO DE ITENS</h1>
                </div>
                <div className="form-elements">
                  <div className="form-elements-column">
                    <label>Nome</label>
                    <Field
                      className={errors.nome && touched.nome ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "} 
                      type="text"
                      name='nome'
                    />
                    <label>Valor Médio</label>
                    <Field
                      className={errors.valorMed && touched.valorMed ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='valorMed'
                      value={valorMedio}
                      onBlur={onChange(values.valorMed)}
                    />
                  </div>
                  <div className="form-elements-column">
                    <label>CATMAT</label>
                    <Field
                      className={errors.catmat && touched.catmat ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='catmat' 
                    />
                  </div>
                </div>
                <label>Descrição</label>
                    <Field
                      as='textarea'
                      className={errors.descricao && touched.descricao ? "form-input form-input-w100 form-input-error form-input-textarea" : "form-input form-input-textarea form-input-w100 "} 
                      type="textarea"
                      name='descricao'
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

export default CadastrarItem;
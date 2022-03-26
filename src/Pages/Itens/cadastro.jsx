import {useState} from 'react';
import {Formik, Field, Form} from 'formik';
import { useNavigate } from 'react-router-dom';
import VMasker from "vanilla-masker";

import NavbarMenu from '../../Components/Navbar/Navbar';
import {api, Config} from '../../Services/api';
import Schema from '../../Utils/ShemaItens';

import '../../Styles/form.css';

function CadastrarItem(){
  const navigateTo = useNavigate();
  const config = Config();
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
  function onSubmit(values) {
    const bodyParameters = {
      nome: values.NomeItem,
      catmat: values.Catmat,
      valorMed: values.ValorMedio,
      descricao: values.DescricaoItem,
    };
      api.post('itens',bodyParameters, config).then(function () {
        alert(values.NomeItem+' Cadastrado Com Sucesso!');
        navigateTo('/colic/itens');
      }).catch(function (error) {
        let msgError = '';
        for (var index = 0; index < error.response.data.length; index++) {
          msgError = msgError+error.response.data[index].message+'\n';
        }
        alert(msgError);
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
            NomeItem: '',
            Catmat: '', 
            ValorMedio: '',
            DescricaoItem: '',
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
                      className={errors.NomeItem && touched.NomeItem ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "} 
                      type="text"
                      name='NomeItem'
                    />
                    <label>Valor Médio</label>
                    <Field
                      className={errors.ValorMedio && touched.ValorMedio ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='ValorMedio'
                      value={valorMedio}
                      onBlur={onChange(values.ValorMedio)}
                    />
                  </div>
                  <div className="form-elements-column">
                    <label>CATMAT</label>
                    <Field
                      className={errors.Catmat && touched.Catmat ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='Catmat' 
                    />
                  </div>
                </div>
                <label>Descrição</label>
                    <Field
                      as='textarea'
                      className={errors.DescricaoItem && touched.DescricaoItem ? "form-input form-input-w100 form-input-error form-input-textarea" : "form-input form-input-textarea form-input-w100 "} 
                      type="textarea"
                      name='DescricaoItem'
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
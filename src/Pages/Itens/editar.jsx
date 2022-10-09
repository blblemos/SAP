import {useState, useEffect} from 'react';
import {Formik, Field, Form} from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import VMasker from "vanilla-masker";

import NavbarMenu from '../../Components/Navbar/Navbar';
import Schema from '../../Utils/ShemaItens';
import useApi from '../../Services/useApi';

import '../../Styles/form.css';

function EditarItem(){
  const navigateTo = useNavigate();
  const {id} = useParams();
  const [valorMedio, setValorMedio] = useState();
  const [item, setItem] = useState({
    nome: '',
    catmat: '',
    valorMed: '',
    descricao: '',
  });
  const [save] = useApi({
    url: `/itens/${id}`,
    method: 'put',
    onCompleted: (response) => {
      if (!response.error){
        navigateTo('/colic/itens');
      }
    }
  });
  const [load] = useApi({
    url: `/itens/${id}`,
    method: 'get',
    onCompleted: (response) => {
      setItem(response.data);
    }
  }
  );

  function onSubmit(values) {
    var sendValues = {
      id: values.id,
      nome: values.nome,
      catmat: values.catmat,
      valorMed: valorMedio,
      descricao: values.descricao,
    };
    save({
      data: sendValues
    });
  };

  function onChange(vmed) {
    const valor_medio = VMasker.toMoney(vmed, {
      precision: 2,
      separator: ",",
      delimiter: ".",
      unit: "R$"
    });
    setValorMedio(valor_medio);
  };

  useEffect(() => {
    load();
  }, [id]);
  
  return (
    <div className="sap-container">
      <NavbarMenu />
      <div className='sap-container-page'>
        <Formik
          validationSchema={Schema}
          onSubmit={onSubmit}
          initialValues={item}
          enableReinitialize
        >
          {({errors,touched,values}) => {
            return(
              <Form
                className="sap-form-container"
              >
                <div className="form-title">
                  <h1>EDITAR {item.nome}</h1>
                </div>
                <div className="form-elements">
                  <div className="form-elements-column">
                    <label>Nome</label>
                    <Field
                      className={errors.nome && touched.nome ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "} 
                      type="text"
                      name='nome'
                    />
                    <label>Valor Unitário Médio</label>
                    <Field
                      className={errors.valorMed && touched.valorMed ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='valorMed'
                      value={valorMedio}
                      onBlur={onChange(values.valorMed)}
                    />
                  </div>
                  <div className="form-elements-column">
                    <label>CATMAT/CATSER</label>
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

export default EditarItem;
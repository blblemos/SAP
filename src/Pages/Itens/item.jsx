import {useState, useEffect} from 'react';
import {Formik, Field, Form} from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import{setValor} from '../../Utils/Function';

import NavbarMenu from '../../Components/Navbar/Navbar';
import Schema from '../../Utils/ShemaItens';
import useApi from '../../Services/useApi';

import '../../Styles/form.css';

//Setando valores iniciais para item(Quando é cadastro)
const initialValue = {
  nome: '',
  catmat: '',
  valorMed: '',
  descricao: '',
  unidadeMedida: ''
}

function Item(){
  const navigateTo = useNavigate();
  const {id} = useParams();
  const [valorMedio, setValorMedio] = useState();
  const [item, setItem] = useState(initialValue);
  //setando save de item
  const [save] = useApi({
    url: id ? `/itens/${id}` : `/itens`,
    method: id ? 'put' : 'post',
    onCompleted: (response) => {
      if (!response.error){
        id ? alert(' Editado Com Sucesso!') : alert(' Cadastrado Com Sucesso!');
        navigateTo('/colic/itens');
      }
    }
  });

  //setando carregamento iten se houver
  const [load] = useApi({
    url: `/itens/${id}`,
    method: 'get',
    onCompleted: (response) => {
      setItem(response.data);
    }
  }
  );

  //chamando carregando do itens
  useEffect(() => {
    if (id) {
      load();
    }
  }, [id]);
  
  function onSubmit(values) {
    var sendValues = {
      id: values.id,
      nome: values.nome,
      catmat: values.catmat,
      valorMed: valorMedio,
      unidadeMedida: values.unidadeMedida,
      descricao: values.descricao,
    };
    save({
      data: sendValues
    });
  };

  //Formatando Valor em Reais
  function onChange(valor_total) {
    setValorMedio(setValor(valor_total));
  }
  
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
                  <h1>{id ? 'Editar Item' : 'Cadastrar Item'}</h1>
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
                    <label>Unidade de Medida</label>
                    <Field
                      className={errors.unidadeMedida && touched.unidadeMedida ? "form-input form-input-w100 form-input-error" : "form-input form-input-w100 "}  
                      type="text"
                      name='unidadeMedida' 
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

export default Item;
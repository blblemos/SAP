import {useState, useEffect} from 'react';
import {Formik, Field, Form} from 'formik';
import {  useParams, Link } from 'react-router-dom';
import {RiEditBoxFill} from 'react-icons/ri';

import NavbarMenu from '../../Components/Navbar/Navbar';
import {api, Config, SetarTokenNull} from '../../Services/api';

import '../../Styles/form.css';

function VizualizarItem(){
  const {id} = useParams();
  const config = Config();
  const [item,setItem] = useState({
    NomeItem: '',
    Catmat: '', 
    ValorMedio: '',
    DescricaoItem: '',
  });
  useEffect(() => {
    api.get(`itens/${id}`, config).then((response) => {
      setItem({
        NomeItem: response.data.nome,
        Catmat: response.data.catmat, 
        ValorMedio: response.data.valorMed,
        DescricaoItem: response.data.descricao,
      });
    }).catch(function (error){
      if (error.response.status = 403) {
        SetarTokenNull();
      }
    });
  },[id]);
  return (
    <div className="sap-container">
      <NavbarMenu />
      <div className='sap-container-page'>
        <Formik
          initialValues={item}
          enableReinitialize
        >
          {() => {
            return(
              <Form
                className="sap-form-container"
              >
                <div className="form-title">
                  <h1>
                    {item.NomeItem}
                    <Link className='' to={'/colic/editar/item/'+id}>
                      <RiEditBoxFill 
                        size={25} 
                        color="#09210E"
                        className="sap-form-icon-title"
                      />
                    </Link>
                  </h1>
                </div>
                <div className="form-elements">
                  <div className="form-elements-column">
                    <label>Valor Médio</label>
                    <Field
                      className="form-input form-input-w100 sap-form-input-disabled"
                      type="text"
                      name='ValorMedio'
                      disabled
                    />
                  </div>
                  <div className="form-elements-column">
                    <label>CATMAT</label>
                    <Field
                      className="form-input form-input-w100 sap-form-input-disabled"
                      type="text"
                      name='Catmat' 
                      disabled
                    />
                  </div>
                </div>
                <label>Descrição</label>
                    <Field
                      as='textarea'
                      className="form-input-textarea form-input form-input-w100 sap-form-input-disabled"
                      type="textarea"
                      name='DescricaoItem'
                      disabled
                    />
              </Form>
          )}
          }
        </Formik>
      </div>
    </div>
  );
}

export default VizualizarItem;
import {Formik, Field, Form} from 'formik';

import NavbarMenu from '../../Components/Navbar/Navbar';

import '../../Styles/form.css';

function CadastrarAquisicao(){
  function submit(){
    alert('Enviado!');
  }
  return (
    <div className="sap-container">
      <NavbarMenu />
      <div className='sap-container-page'>
        <Formik
          onSubmit={() =>submit()}
          initialValues={{
            nome: ''
          }}
        >
          <Form
            className="sap-form-container"
          >
            <Field 
              type="text"
              name='nome' 
            />
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default CadastrarAquisicao;
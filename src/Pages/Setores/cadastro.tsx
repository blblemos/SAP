import {Formik, Field, Form} from 'formik';

import NavbarMenu from '../../Components/Navbar/Navbar';

import '../../Styles/form.css';

function CadastrarServidor(){
  function submit(){
    alert('Enviado!');
  }
  return (
    <div className="container">
      <NavbarMenu />
      <div className='container-page'>
        <Formik
          onSubmit={() =>submit()}
          initialValues={{
            nome: ''
          }}
        >
          <Form
            className="form-container"
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

export default CadastrarServidor;
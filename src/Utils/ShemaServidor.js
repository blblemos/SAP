import * as Yup from "yup";

Yup.addMethod(Yup.string, "verifyColic", function (errorMessage) {
  return this.test(errorMessage, function (value) {
    if(value === "null"){
      return false;
    }else{
      return true;
    }
  });
});

export default Yup.object().shape({
  nome: Yup.string().required(),
  email: Yup.string().email().required(),
  cargo: Yup.string().required(),
  celular: Yup.string().required(),
  /*FotoServidor: Yup.string().required(),*/
  /*setor: Yup.string().required().verifyColic(),*/
})
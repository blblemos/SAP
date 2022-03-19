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
  NomeServidor: Yup.string().required(),
  EmailServidor: Yup.string().email().required(),
  CargoServidor: Yup.string().required(),
  CelularServidor: Yup.string().required(),
  /*FotoServidor: Yup.string().required(),*/
  SetorServidor: Yup.string().required().verifyColic(),
})
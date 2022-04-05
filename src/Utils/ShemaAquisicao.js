import * as Yup from "yup";

Yup.addMethod(Yup.string, "verifySelect", function (errorMessage) {
  return this.test(errorMessage, function (value) {
    if(value === "null"){
      return false;
    }else{
      return true;
    }
  });
});

Yup.addMethod(Yup.string, "verifyValorTotal", function (errorMessage) {
  return this.test(errorMessage, function (value) {
    if(value === "R$ 0,00"){
      return false;
    }else{
      return true;
    }
  });
});

export default Yup.object().shape({
  Solicitante: Yup.string().verifySelect().required(),
  Objeto: Yup.string().required(),
  ValorTotal: Yup.string().verifyValorTotal().required(),
  NomeroProcesso: Yup.string().required().min(20).max(20),
  Data: Yup.date().required(),
  Tipo: Yup.string().verifySelect().required(),
  Modalidade: Yup.string().verifySelect().required(),
  Pac: Yup.string().min(4).max(4).required(),
  Anotações: Yup.string(),
  Orcamento: Yup.string().verifySelect().required(),
})
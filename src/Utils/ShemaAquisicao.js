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
  //Solicitante: Yup.string().verifySelect().required(),
  objeto: Yup.string().required(),
  valorTotal: Yup.string().verifyValorTotal().required(),
  numeroProcesso: Yup.string().required().min(20).max(20),
  data: Yup.date().required(),
  tipo: Yup.string().verifySelect().required(),
  modalidade: Yup.string().verifySelect().required(),
  pac: Yup.string().min(4).max(4).required(),
  anotacoes: Yup.string(),
  orcamento: Yup.string().verifySelect().required(),
})
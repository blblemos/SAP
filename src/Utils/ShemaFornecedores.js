import * as Yup from "yup";

Yup.addMethod(Yup.string, "verifyCidade", function (errorMessage) {
  return this.test(errorMessage, function (value) {
    if(value == "UF"){
      return false;
    }else{
      return true;
    }
  });
});

export default Yup.object().shape({
  RazaoSocial: Yup.string().required(),
  NomeFantasia: Yup.string().required(),
  Cnpj: Yup.string().min(18).max(18).required(),
  Endereco: Yup.string().required(),
  Cidade: Yup.string().required(),
  Uf: Yup.string().verifyCidade(),
  TelefoneFixo: Yup.string().min(14).max(15).required(),
  Email: Yup.string().email().required(),
  Celular: Yup.string().min(14).max(15),
  Responsavel: Yup.string().required(),
  Observacoes: Yup.string(),
})
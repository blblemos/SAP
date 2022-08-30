import * as Yup from "yup";

export default Yup.object().shape({
  nome: Yup.string().required(),
  catmat: Yup.string().required(),
  valorMed: Yup.string().required(),
  descricao: Yup.string().required(),
})
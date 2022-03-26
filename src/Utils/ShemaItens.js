import * as Yup from "yup";

export default Yup.object().shape({
  NomeItem: Yup.string().required(),
  Catmat: Yup.string().required(),
  ValorMedio: Yup.string().required(),
  DescricaoItem: Yup.string().required(),
})
import * as Yup from "yup";

export default Yup.object().shape({
  NomeSetor: Yup.string().required(),
  SiglaSetor: Yup.string().required(),
  RamalSetor: Yup.number().required(),
  EmailSetor: Yup.string().email().required(),
})
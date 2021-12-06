import * as Yup from "yup";

export default Yup.object().shape({
  name: Yup.string().required(),
  ramal: Yup.number(),
  email: Yup.string().email(),
  sigla: Yup.string().required(),
})
import {api, Config} from '../../Services/api';

const config = Config();

export  const getListaDeFornecedores = api.get('fornecedores', config);
 



export default {getListaDeFornecedores};

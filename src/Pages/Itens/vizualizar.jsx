import {useState, useEffect} from 'react';
import {  useParams, Link } from 'react-router-dom';
import {RiEditBoxFill} from 'react-icons/ri';

import NavbarMenu from '../../Components/Navbar/Navbar';
import useApi from '../../Services/useApi';

import '../../Styles/form.css';

//Setando valores iniciais para iten(Não percisa alterar pq nao tem função, só não conseguir fazer funcionar sem)
const initialValue = {
  nome: '',
  catmat: '',
  valorMed: '',
  descricao: '',
  unidadeMedida: ''
}

function VizualizarItem(){
  const {id} = useParams();
  const [item,setItem] = useState(initialValue);
  //setando carregamento iten
  const [load] = useApi({
  url: `/itens/${id}`,
  method: 'get',
  onCompleted: (response) => {
    setItem(response.data);
  }
  }
  );

   //chamando carregando do itens
  useEffect(() => {
    load();
  },[id]);

  return (
    <div className="sap-container">
      <NavbarMenu />
      <div className='sap-container-page'>
      <form
        className="sap-form-container"
      >
        <div className="form-title">
          <h1>
            {item.nome}
            <Link className='' to={'/colic/editar/item/'+id}>
              <RiEditBoxFill 
                size={25} 
                color="#09210E"
                className="sap-form-icon-title"
              />
            </Link>
          </h1>
        </div>
        <div className="form-elements">
          <div className="form-elements-column">
            <label>Valor Unitário Médio</label>
            <input
              className="form-input form-input-w100 sap-form-input-disabled"
              type="text"
              name='ValorMedio'
              disabled
              value={item.valorMed}
            />
            <label>Unidade de Medida</label>
            <input
              className="form-input form-input-w100 sap-form-input-disabled"
              type="text"
              name='ValorMedio'
              disabled
              value={item.unidadeMedida}
            />
          </div>
          <div className="form-elements-column">
            <label>CATMAT/CATSER</label>
            <input
              className="form-input form-input-w100 sap-form-input-disabled"
              type="text"
              name='Catmat' 
              disabled
              value={item.catmat}
            />
          </div>
        </div>
        <label>Descrição</label>
            <input
              as='textarea'
              className="form-input-textarea form-input form-input-w100 sap-form-input-disabled"
              type="textarea"
              name='DescricaoItem'
              disabled
              value={item.descricao}
            />
      </form>
      </div>
    </div>
  );
}

export default VizualizarItem;
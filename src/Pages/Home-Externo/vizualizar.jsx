import {useState, useEffect} from 'react';
import {  useParams } from 'react-router-dom';

import NavbarExterno from '../../Components/Navbar/NavbarExterno';
import useApiExterno from '../../Services/useApiExterno';
import InputDisabled from '../../Components/Input-Disabled/Input-Disabled';
import{FormataStringData} from '../../Utils/Function';

import '../../Styles/form.css';

//Setando valores iniciais para iten(Não percisa alterar pq nao tem função, só não conseguir fazer funcionar sem)
const initialValue = {
  servidor: {
    setor: {
    }
  },
  empenho: {
    fornecedor:{},
    item: {},
    entrega: {},
    pagamento: {},
  }
}

function VizualizarAquisicaoExterno(){
  const {id} = useParams();
  const [aquisicao,setAquisicao] = useState(initialValue);
  //setando carregamento aquisição
  const [load] = useApiExterno({
  url: `/aquisicoes/outside/${id}`,
  method: 'get',
  onCompleted: (response) => {
    setAquisicao(response.data);
  }
  }
  );
  console.log(aquisicao.empenho);
   //chamando carregando da aquisição
  useEffect(() => {
    load();
  },[id]);

  return (
    <div className="sap-container">
      <NavbarExterno />
      <div className='sap-container-page'>
      <form
        className="sap-form-container"
      >
        <div className="form-title">
          <h1>
          Aquisição {aquisicao.numeroAquisicao}
          </h1>
        </div>
        <div className="form-elements">
          <div className="form-elements-column">
            <InputDisabled name={'Objeto'} value={aquisicao.objeto}/>
            <InputDisabled name={'Solicitante'} value={aquisicao.servidor.nome}/>
            <label>Processo SEI</label>
            <a
                className="form-input form-input-w100 sap-form-input-disabled form-input-a"
                href={aquisicao.linkProcesso}
                target="_blank"
              >{aquisicao.numeroProcesso}</a>
            <InputDisabled name={'Tipo'} value={aquisicao.tipo}/>
            <InputDisabled name={'Orçamento'} value={aquisicao.orcamento}/>
          </div>
          <div className="form-elements-column">
            <InputDisabled name={'Valor Total'} value={aquisicao.valorTotal}/>
            <InputDisabled name={'Setor'} value={aquisicao.servidor.setor.nome}/>
            <InputDisabled name={'Data de abertura'} value={FormataStringData(aquisicao.data)}/>
            <InputDisabled name={'Modalidade'} value={aquisicao.modalidade}/>
            <InputDisabled name={'Recursos Extraorçamentários'} value={aquisicao.recExtraOrc ? 'SIM' : 'NÃO'}/>
            <InputDisabled name={'Pac'} value={aquisicao.pac}/>

          </div>
        </div>
        
          {
            aquisicao.empenho.length > 0 &&
            aquisicao.empenho.map(empenho => { 
              return (
                <div>
                  <div className="form-title"><h1> </h1></div>
                  <div className="form-elements">
                    <div className="form-elements-column">
                      <label>Empenho</label>
                      <a
                          className="form-input form-input-w100 sap-form-input-disabled form-input-a"
                          href={empenho.linkEmpenho}
                          target="_blank"
                        >{empenho.numeroEmpenho}</a>
                      <InputDisabled name={'Valor Total da NE'} value={empenho.valorTotalNE}/>
                    </div>
                    <div className="form-elements-column">
                      <InputDisabled name={'Data de emissão'} value={FormataStringData(empenho.dataEmissao)}/>
                      <InputDisabled name={'Tipo do Empenho'} value={empenho.tipoEmpenho}/>
                    </div>
                  </div>
                  <InputDisabled name={'Fornecedor'} value={empenho.fornecedor.razaoSocial}/>
                  {empenho.item.map(item => {
                    return(
                      <InputDisabled name={'Item'} value={item.nome}/>
                    );
                  })
                  }
                  <br/>
                  <h5 style={{'text-align': 'center'}} >Entrega</h5>
                  <br/>
                  <div className="form-elements">
                    <div className="form-elements-column">
                      <InputDisabled name={'Status da Entrega'} value={empenho.entrega.entregue}/>
                    </div>
                    <div className="form-elements-column">
                      <InputDisabled name={'Data da Entrega'} value={FormataStringData(empenho.entrega.recebimentoFornecedor)}/>
                    </div>
                  </div>
                  <InputDisabled name={'Ateste'} value={empenho.entrega.servidor+' | '+FormataStringData(empenho.entrega.dataAteste)}/>
                  <br/>
                  <h5 style={{'text-align': 'center'}} >Pagamento</h5>
                  <br/>
                  <div className="form-elements">
                    <div className="form-elements-column">
                      <InputDisabled name={'Envio da NF Para Pagamento'} value={FormataStringData(empenho.pagamento.envioNf)}/>
                      <InputDisabled name={'Data da NL'} value={FormataStringData(empenho.pagamento.dataNl)}/>
                      <InputDisabled name={'Data de Emissão da Ordem Bancária'} value={FormataStringData(empenho.pagamento.dataOrdem)}/>
                    </div>
                    <div className="form-elements-column">
                      <InputDisabled name={'Nota Fiscal'} value={empenho.pagamento.notaFiscal}/>
                      <InputDisabled name={'N. da NL'} value={empenho.pagamento.numeroNl}/>
                      <InputDisabled name={'N. da Ordem Bancária'} value={empenho.pagamento.numeroOrdem}/>
                    </div>
                  </div>
                </div>
                
              );
            })
          }
        
      </form>
      </div>
    </div>
  );
}

export default VizualizarAquisicaoExterno;
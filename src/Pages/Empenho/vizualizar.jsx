import {useState, useEffect} from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {RiEditBoxFill} from 'react-icons/ri';
import { MdDelete} from 'react-icons/md';
import {AiFillCloseCircle} from 'react-icons/ai';
import useApi from '../../Services/useApi';

//Setando valores iniciais para empenho(Não percisa alterar pq nao tem função, só não conseguir fazer funcionar sem)
const initialValue = {
  numeroEmpenho: '',
  dataEmissao: '',
  valorTotalNE: '',
  tipoEmpenho: '',
  dataInclusao: '',
  dataEnvio: '',
  fornecedor: 0,
  item: [{
    id: ''
  }]
}

function VizualizarEmpenho() {
  const {idAquisicao, idEmpenho, numeroEmpenho} = useParams();
  const navigateTo = useNavigate();
  const [cobrancas,setCobrancas] = useState([]);
  const [numeroAquisicao,setNumeroAquisicao] = useState('');
  const [empenho,setEmpenho] = useState(initialValue);
  //Carregando empenho da API
  const [loadEmpenho] = useApi({
    url: `/empenhos/${idEmpenho}`,
    method: 'get',
    onCompleted: (response) => {
      setEmpenho(response.data);
    }
  });
  //Carregando cobranças da API
  const [loadCobranca] = useApi({
    url: `cobrancas/search?empenho=${numeroEmpenho}`,
    method: 'get',
    onCompleted: (response) => {
      setCobrancas(response.data);
    }
  });
  //Carregando numero da aquisicao da API
  const [loadAquisicao] = useApi({
    url: `/aquisicoes/${idAquisicao}`,
    method: 'get',
    onCompleted: (response) => {
      setNumeroAquisicao(response.data.numeroAquisicao);
    }
  });
  //Carregando deletar cobrança
  const [deletarCobranca] = useApi({
    method: 'delete',
    onCompleted: (response) => {
      alert('Deletado com sucesso!');
      window.location.reload();
    }
  });
  //Chamando funções de carregamento
  useEffect(() => {
    loadEmpenho();
    loadCobranca();
    loadAquisicao(); 
  }, [idEmpenho]);

  //Deleta Cobrança
  function onClickDeleteCobranca(idCobranca){
    if (window.confirm("Tem certeza que deseja deletar a cobrança?") == true) {
      deletarCobranca({url: `/cobrancas/${idCobranca}`});
      };
    }
  
  return (
    <div className="sap-container-modal">
      <AiFillCloseCircle className="sap-close-modal" size={30} color="#09210E" onClick={() => navigateTo('/colic/aquisicoes/'+idAquisicao)}/>
      <div className="sap-div-modal">
        <form className="sap-form-container">
          <div className="form-title">
            <h1>Empenho</h1>
          </div>
          <div className="form-elements">
            <div className="form-elements-column">
              <label>Empenho Nº</label>
              <a
                className="form-input form-input-w100 sap-form-input-disabled form-input-a"
                href={empenho.linkEmpenho}
                target="_blank"
              >{empenho.numeroEmpenho}</a>
              <label>Valor Total da NE</label>
              <input
                className="form-input form-input-w100 sap-form-input-disabled"
                type="text"
                value={empenho.valorTotalNE}
                disabled 
              />
              <label>Data de Inclusão da NE pela COFIN no SEI</label>
              <input
                className="form-input form-input-w100 sap-form-input-disabled"
                type="date"
                value={empenho.dataInclusao}
                disabled 
              />
              <label>Data de Recebimento</label>
              <input
                className="form-input form-input-w100 sap-form-input-disabled"
                type="date"
                value={empenho.dataConfirmacao}
                disabled 
              />
            </div>
            <div className="form-elements-column">
              <label>Data de emissão</label>
              <input
                className="form-input form-input-w100 sap-form-input-disabled"
                type="date"
                value={empenho.dataEmissao}
                disabled 
              />
              <label>Tipo do Empenho</label>
              <div className="sap-form-button-select sap-form-button-select-margin-bot">
                <input
                  className="form-input form-input-w100 sap-form-input-disabled"
                  type="text"
                  value={empenho.tipoEmpenho}
                  disabled 
                />
                
              </div>
              <label>Data de envio da NE pela COLIC ao Fornecedor</label>
              <input
                className="form-input form-input-w100 sap-form-input-disabled"
                type="date"
                value={empenho.dataEnvio}
                disabled 
              />
              <label>Data Contagem</label>
              <input
                className="form-input form-input-w100 sap-form-input-disabled"
                type="date"
                value={empenho.dataContagem}
                disabled 
              />
              <label>Dias para Contagem</label>
              <input
                className="form-input form-input-w100 sap-form-input-disabled"
                type="number"
                value={empenho.dias}
                disabled 
              />
            </div>
          </div>
          <label>Fornecedor</label>
          <div className="sap-form-button-select sap-form-button-select-margin-bot">
            <input
              className="form-input form-input-w100 sap-form-input-disabled"
              type="text"
              value={empenho.fornecedor.razaoSocial}
              disabled />
          </div>
          <label>Item</label>{
            empenho.item.map(item => {
              return (
                <div className="sap-form-button-select sap-form-button-select-margin-bot">
                  <input
                    className="form-input form-input-w100 sap-form-input-disabled"
                    type="text"
                    value={item.nome+' ('+item.catmat+')'}
                    disabled/>
                </div>
              );
            })
          }
          
        </form>
        { 
          //Carregando cobranças(Se houver)
          cobrancas.length > 0 && 
          cobrancas.map(cobrancas => {
            return (
              <form className="sap-form-container">
                <div className="form-title">
                  <h1>
                    Cobrança
                    <Link className='' to={`/colic/cadastrar/cobranca/${idAquisicao}/${numeroAquisicao}/${cobrancas.id}`}>
                      <RiEditBoxFill 
                        size={25} 
                        color="#09210E"
                        className="sap-form-icon-title"
                      />
                    </Link>
                    <MdDelete className="sap-form-icon-title" size={25} color="#CE1218" onClick={() => onClickDeleteCobranca(cobrancas.id)}/>
                    
                  </h1>
                </div>
                <div className="form-elements">
                  <div className="form-elements-column">
                    <label>Via</label>
                    <input className="sap-form-input-disabled form-input form-input-w100" type="text" disabled value={cobrancas.via} />
                    <label>Contato Utilizado</label>
                    <input className="sap-form-input-disabled form-input form-input-w100" type="text" disabled value={cobrancas.contato} />
                    <div className='sap-form-container-input-row'>
                      <div className='sap-form-container-input-column sap-form-container-input-column-w60 '>
                        <label ><span>Recebimento Confirmado?</span></label>
                        <div className="sap-form-button-select ">
                          <button 
                            type="button" 
                            disabled
                            className={cobrancas.resposta ? 'sap-form-button sap-form-button-active sap-form-button-active-green' : 'sap-form-button'}
                          >
                            Sim
                          </button>
                          <button 
                            type="button"
                            disabled
                            className={!cobrancas.resposta ? 'sap-form-button sap-form-button-active sap-form-button-active-red' : 'sap-form-button'}
                          >
                            Não
                          </button>
                        </div>
                      </div>
                      <input className="sap-form-input-disabled form-input form-input-w100 " type="date" disabled value={cobrancas.dataResposta} />
                    </div>
                  </div>
                  <div className="form-elements-column">
                    <label>Data e Hora</label>
                    <input className="sap-form-input-disabled form-input form-input-w100" type="datetime-local" disabled value={cobrancas.dataHora} />
                    <label>Comprovação</label>
                    <a
                        className="form-input form-input-w100 sap-form-input-disabled form-input-a"
                        href={cobrancas.linkcomprovacao}
                        target="_blank"
                      >{cobrancas.comprovacao}</a>
                  </div>
                </div>
                <label>Observações</label>
                <input type="textarea" disabled className="sap-form-input-disabled form-input form-input-textarea form-input-w100 " value={cobrancas.observacao}/>
              </form>
            );
          })
        }
      </div>

    </div>
  );
}

export default VizualizarEmpenho;
import {AiFillCloseCircle} from 'react-icons/ai';
import {IoIosSave} from 'react-icons/io';
import {useEffect, useState} from 'react';

import Avaliar from './avaliar';
import {api, Config} from '../../Services/api';

import './style.css';

type props = {
  id: number;
  onChangeModal: (modalLink: boolean ) => void;
}

function AvaliarFornecedor({onChangeModal, id} : props) {
  const [prazo, setPrazo] = useState(0);
  const [entrega, setEntrega] = useState(0);
  const [contato, setContato] = useState(0);
  let config = {};
  config =  Config();
  const [fornecedor, setFornecedor] = useState({
    RazaoSocial: '',
    NomeFantasia: '', 
    Cnpj: '',
    Endereco: '',
    Cidade: '',
    Uf: '',
    TelefoneFixo: '',
    Email: '',
    Celular: '',
    Whatsapp: '',
    Responsavel: '',
    Observacoes: '',
  });

  useEffect(() => {
    api.get(`fornecedores/${id}`, config).then(response => {
      setFornecedor({
        RazaoSocial: response.data.razaoSocial,
        NomeFantasia: response.data.nomeFantasia, 
        Cnpj: response.data.cnpj,
        Endereco: response.data.endereco,
        Cidade: response.data.cidade,
        Uf: response.data.estado,
        TelefoneFixo: response.data.telefoneFixo,
        Email: response.data.email,
        Celular: response.data.cel,
        Whatsapp: response.data.wpp,
        Responsavel: response.data.nomeResponsavel,
        Observacoes: response.data.observacoes,
      });
      setPrazo(response.data.avaliacaoPrazo);
      setEntrega(response.data.avaliacaoEntrega);
      setContato(response.data.avaliacaoContato);
    });
  }, [onChangeModal]);

  async function avaliar() {
    await api.put(`fornecedores/${id}`, 
    {
      id: id,
      razaoSocial: fornecedor.RazaoSocial,
      nomeFantasia: fornecedor.NomeFantasia, 
      cnpj: fornecedor.Cnpj,
      endereco: fornecedor.Endereco,
      cidade: fornecedor.Cidade,
      estado: fornecedor.Uf,
      telefoneFixo: fornecedor.TelefoneFixo,
      email: fornecedor.Email,
      cel: fornecedor.Celular,
      nomeResponsavel: fornecedor.Responsavel,
      wpp: fornecedor.Whatsapp,
      obsOpen: fornecedor.Observacoes,
      avaliacaoPrazo: prazo,
      avaliacaoEntrega: entrega,
      avaliacaoContato: contato,
    }, config)
    .then(function () {
      window.location.reload();
    })
    .catch(function (error) {console.log(error.response)
      let msgError = '';
      for (var index = 0; index < error.response.data.length; index++) {
        msgError = msgError+error.response.data[index].message+'\n';
      }
      alert(msgError);
    });
  }
  return (
    <div className="sap-container-modal">
      <AiFillCloseCircle className="sap-close-modal" size={30} color="#CE1218" onClick={() => onChangeModal(false)}/>
      <div className="sap-div-modal-avaliacao">
        <h1>Prazo</h1>
        <Avaliar
          notaAtual={prazo}
          onChangeNota={setPrazo}
        />
        <h1>Entrega Material Correto</h1>
        <Avaliar
          notaAtual={entrega}
          onChangeNota={setEntrega}
        />
        <h1>Contato</h1>
        <Avaliar
          notaAtual={contato}
          onChangeNota={setContato}
        />
        <IoIosSave className="av-save-icon" size={30} color="#09210E" onClick={() => avaliar()}/>
      </div>
    </div>
  );
}

export default AvaliarFornecedor;
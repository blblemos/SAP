import {AiFillCloseCircle} from 'react-icons/ai';

type props = {
  link: string;
  onChangeLink: (link: string ) => void;
  onChangeModalLink: (modalLink: boolean ) => void;
}

function AddLink({onChangeLink, onChangeModalLink, link} : props) {
  return (
    <div className="sap-container-modal">
      <AiFillCloseCircle className="sap-close-modal" size={30} color="#CE1218" onClick={() => onChangeModalLink(false)}/>
      <div className="sap-div-modal-mini">
        <div className="form-elements-column w-100">
          <label>Link</label>
          <input
            className={"form-input form-input-w100"} 
            type="text"
            name='LinkProcesso'
            value={link}
            onChange={e => onChangeLink(e.target.value)}
          />
          <div className="form-footer">
            <button 
              onClick={() => onChangeModalLink(false)} 
              className="form-btn">
                Salvar
            </button>
            <div className="clear"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLink;
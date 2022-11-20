type props = {
  name: string;
  value: string
}

function InputDisabled({name,value} : props) {
  return (
    <div>
          <label>{name}</label>
          <input
            className={"form-input form-input-w100 sap-form-input-disabled"} 
            type="text"
            name={value}
            value={value}
            disabled
          />
    </div>
  );
}

export default InputDisabled;
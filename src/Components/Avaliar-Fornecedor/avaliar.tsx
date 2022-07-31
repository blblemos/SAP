import {BsStarFill, BsStar} from 'react-icons/bs';

type props = {
  notaAtual: number;
  onChangeNota: (nota: number ) => void;
}

function Avaliar({onChangeNota, notaAtual} : props) {

  let divNota;

  switch (notaAtual) {
    case 0:
      divNota = 
        <div className=''>
          <BsStar onClick={() => onChangeNota(1)} size={25} color="#09210E"/>
          <BsStar onClick={() => onChangeNota(2)} size={25} color="#09210E"/>
          <BsStar onClick={() => onChangeNota(3)} size={25} color="#09210E"/>
        </div>
      break
    case 1:
      divNota = 
        <div className=''>
          <BsStarFill onClick={() => onChangeNota(0)} size={25} color="#09210E"/>
          <BsStar onClick={() => onChangeNota(2)} size={25} color="#09210E"/>
          <BsStar onClick={() => onChangeNota(3)} size={25} color="#09210E"/>
        </div>
      break
    case 2:
      divNota =
        <div className=''>
          <BsStarFill onClick={() => onChangeNota(1)} size={25} color="#09210E"/>
          <BsStarFill onClick={() => onChangeNota(1)} size={25} color="#09210E"/>
          <BsStar onClick={() => onChangeNota(3)} size={25} color="#09210E"/>
        </div>
      break
    case 3:
      divNota =
        <div className=''>
          <BsStarFill onClick={() => onChangeNota(1)} size={25} color="#09210E"/>
          <BsStarFill onClick={() => onChangeNota(2)} size={25} color="#09210E"/>
          <BsStarFill onClick={() => onChangeNota(2)} size={25} color="#09210E"/>
        </div>
      break      
    default:
      break;
  }

  return (
    <div>
      {divNota}
    </div>
  );
}

export default Avaliar;
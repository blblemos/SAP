import {useState} from 'react';
import axios from 'axios';
import {useContext} from 'react';
import StoreContext from '../Components/Store/Context';

const initialRequestInfo = {
  error: null,
  data: null,
  loading: false
}

export default function useApi(config){
  const [requestInfo, setRequestInfo] = useState(initialRequestInfo);
  let { token , setToken} = useContext(StoreContext);
  async function call(localConfig) {
    setRequestInfo({
      ...initialRequestInfo,
      loading: true,
    });
    let response = null;
    
    try {
      response = await axios({
        baseURL: 'http://200.128.8.98:6731',
        headers: { Authorization: token },
        ...config,
        ...localConfig,
        
      });
      setRequestInfo({
        ...initialRequestInfo,
        data: response.data,
      });
    } catch (error) {
      if(error.response.status == 403){
        setToken(null);
      }
      setRequestInfo({
        ...initialRequestInfo,
        error,
      });
    }
    
    if (config.onCompleted){
      config.onCompleted(response);
    }
  }

  return [
    call,
    requestInfo
  ]
}

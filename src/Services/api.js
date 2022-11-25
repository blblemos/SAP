import axios from 'axios';
import {useContext} from 'react';
import StoreContext from '../Components/Store/Context';

export const api = axios.create({
    baseURL: 'http://200.128.8.98:6731'
});

export function Config(){
    const { token } = useContext(StoreContext);
    return {headers: { Authorization: token }};
}

export function ConfigTeste(){
    const { token } = useContext(StoreContext);
    return token;
}

export function SetarTokenNull(){
    const { setToken } = useContext(StoreContext);
    setToken(null);
}

export default {api, Config, SetarTokenNull};

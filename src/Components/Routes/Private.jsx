import  { useContext } from 'react';
import { Route, Navigate , Outlet  } from 'react-router-dom';
import StoreContext from '../Store/Context';

const RoutesPrivate = () => {
  const { token } = useContext(StoreContext);

    if (token) {
        return (<Outlet />);
    } else {
        return (<Navigate to="/signUp" />);
    };

}
export default RoutesPrivate;
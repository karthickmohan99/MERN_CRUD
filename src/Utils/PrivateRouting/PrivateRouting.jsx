import { Navigate } from 'react-router-dom';
import Token from '../../TokenService/Token';
const PrivateRouting = ({ children }) => {
    
    const auth = Token.getAccessToken();
    
    console.log(Object.keys(auth).length, 'privaterouting');
  
    return Object.keys(auth).length !== 0 ? children : <Navigate to="/login" />;


    

  };

export default PrivateRouting;



const setAccessToken = (user) => {
    localStorage.setItem('login', JSON.stringify(user));
  };
  const setRefreshToken = (user) => {
    localStorage.setItem('RefreshToken', JSON.stringify(user));
  };
  
  const getAccessToken = () => {
    return JSON.parse(localStorage.getItem('login') || '{}');
  };
  
  const getRefreshToken = () => {
    return JSON.parse(localStorage.getItem('RefreshToken') || '{}');
  };
  
  const updatedTokenService = (token) => {
    let user = JSON.parse(localStorage.getItem('login') || '{}');
    console.log('older access token', user);
    user = token;
    console.log('user new access token', user);
    localStorage.setItem('login', JSON.stringify(user));
  };
  
  const removeAccessToken = () => {
    localStorage.removeItem('login');
    //localStorage.removeItem("RefreshToken")
  };
  const removeRefreshToken = () => {
    localStorage.removeItem('RefreshToken');
    
  };
  
  const Token = {
    setAccessToken,
    setRefreshToken,
    getAccessToken,
    getRefreshToken,
    updatedTokenService,
    removeAccessToken,
    removeRefreshToken
  };
  export default Token;
  
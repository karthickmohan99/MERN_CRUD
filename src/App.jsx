import React from 'react';
import {Routes,Route,Navigate}from 'react-router-dom';
import './App.css';
import LazyLoader from '../../frontend/src/Utils/LazyLoading/LazyLoader';
import PrivateRouting from './Utils/PrivateRouting/PrivateRouting';
// import Home from './Pages/Home';
// import  CreateBook from'./Pages/CreateBook';
// import  ShowBook from './Pages/ShowBook';
// import  EditBook from './Pages/EditBook';
// import  DeleteBook from './Pages/DeleteBook';
// import Signup from './Pages/Signup';
// import Login from './Pages/Login';
const Home = LazyLoader(() => import('./Pages/Home'), <h1>loading..</h1>);
const CreateBook = LazyLoader(() => import('./Pages/CreateBook'), <h1>loading..</h1>);
const ShowBook = LazyLoader(() => import('./Pages/ShowBook'), <h1>loading..</h1>);
const EditBook = LazyLoader(() => import('./Pages/EditBook'), <h1>loading..</h1>);
const DeleteBook = LazyLoader(() => import('./Pages/DeleteBook'), <h1>loading..</h1>);
const Signup = LazyLoader(() => import('./Pages/Signup'), <h1>loading..</h1>);
const Login = LazyLoader(() => import('./Pages/Login'), <h1>loading..</h1>);

const App =()=>{
    return(
   <Routes>
    
      <Route 
      path='/home' 
      element=
      {
      <PrivateRouting> 
        <Home/>
      </PrivateRouting>
      } />

      <Route path='/create' element={ <CreateBook/>} />
      <Route path='/details/:id' element={ <ShowBook/>} />
      <Route path='/edit/:id' element={<EditBook/>} />
      <Route path='/delete/:id' element={<DeleteBook/> } />
      <Route path='/signup' element={<Signup/>}/>
      <Route path="/" element={<Navigate replace to="/signup" />} /> 
      <Route path="/login" element={<Login/>}/>
      
   </Routes>
   
     
    )
}

export default App;
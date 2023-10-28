import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import Spinner from '../Components/Spinner';

const CreateBook = () => {

    // const[title,setTitle]=useState('');
    // const[author,setAuthor]=useState('');
    // const[publisheYear,setPublishYear]=useState('');
    const[inputs,setInputs]=useState({
        title:'',
        author:'',
        publisheYear:''})
    const[loading,setLoading]=useState(false);

    const navigate = useNavigate();

    const handleChange=(evt)=>{
        console.log(evt.target.value);
        const{name,value}=evt.target;
        // setInputs({...inputs,[name]:value});
        // const value = evt.target.value;
        // const name = evt.target.name;
        setInputs((prev)=>{return{...prev,
            [name]: value}
          
        });

       
    }
    const handleSaveBook=()=>{
        // const data={
        //     title,
        //     author,
        //     publisheYear
        // };
        setLoading(true);
        axios.post('http://localhost:5555/books',inputs)
        .then(res=>{
            setLoading(false);
            navigate('/')
        }).catch((err)=>{
          console.log(err);
          setLoading(false);
          alert('An error occured,please check console')
            })
    };

  return (
    <div className='p-4'>

    <BackButton/>
    <h1 className='text-3xl my-4'>Craete Book</h1>
    {loading ?(<Spinner/>):''}
    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Tittle</label>
            <input type='text' name="title" value={inputs.title} onChange={handleChange} className='border-2 border-gray-500 px-4 py-2 w-full'/>

        </div>
        <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Author</label>
            <input type='text' name="author" value={inputs.author} onChange={handleChange} className='border-2 border-gray-500 px-4 py-2 w-full'/>

        </div>
        <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>PublishYear</label>
            <input type='text' name="publisheYear" value={inputs.publisheYear} onChange={handleChange} className='border-2 border-gray-500 px-4 py-2 w-full'/>

        </div>
     <button className='p-2 bg-sky-300  m-8 ' onClick={handleSaveBook}>Save</button>
    </div>
    </div>
  )
}

export default CreateBook
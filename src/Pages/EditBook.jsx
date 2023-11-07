import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../Components/BackButton";
import Spinner from "../Components/Spinner";

const EditBook = () => {
  // const[title,setTitle]=useState('');
  // const[author,setAuthor]=useState('');
  // const[publisheYear,setPublishYear]=useState('');
  const [inputs, setInputs] = useState({
    title: "",
    author: "",
    publisheYear: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/Books/${id}`)
      .then((res) => {
        console.log(res.data.book);
        setInputs(res.data.book);
        console.log(inputs, "book show");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("An error occured,please check console");
        setLoading(false);
      });
  }, []);

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleEditBook = () => {
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, inputs)
      .then((res) => {
        setLoading(false);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert("An error occured,please check console");
      });
  };

  return (
    <div className="p-4">
      <BackButton destination={"/home"} />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Tittle</label>
          <input
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            name="author"
            value={inputs.author}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">PublishYear</label>
          <input
            type="text"
            name="publisheYear"
            value={inputs.publisheYear}
            onChange={handleChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300  m-8 " onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;

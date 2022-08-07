import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Form = (props) => {
    const [data, setData] = useState()
    const [file, setFile] = useState()
    const navigate = useNavigate();
    const handleChange = (e) => {
        setData(e.target.value);
    }
    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        //const baseUrl = process.env.baseURL || "http://localhost:5000"
        const baseUrl = "https://resumeparserappps.herokuapp.com/"
        const url = `${baseUrl}/api/parser`
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('skill', data);
        await axios
            .post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            .then(function (response) {
                navigate(`/page/${response.data.data}`)
            })
            .catch((err) => {
                navigate('/page/500');
            });
        
    }
    return (
        <div className="container">
            <form method="post" action="" encType="multipart/form-data" onSubmit={submitHandler}>
                <div className="myName">
                    <label for="file"> Please upload the file:</label>
                    <input type="file" id="file" name="file" onChange={handleFile} /><label for="skill"> Enter skills and separate by space </label>
                    <input type="text" onChange={handleChange} value={data} name="skill" id="skill"/>
                    <div className="skills">{data}</div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default Form;

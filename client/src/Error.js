import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Error = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/');
    }
    return (
        <div>
            {params.id === '500' ? (<div className="resBox">
                <h1> OOPs, Internal Server Error </h1>
                <h2> We will be back shortly </h2>
                <button onClick={handleSubmit}>Go back to Home Page</button>
            </div>) : (<div className="resBox">
                    <h1> Your score is: </h1>
                    <h2> {params.id} % </h2>
                    <button onClick={handleSubmit}>Go back to Home Page</button>
            </div>)}
           
            </div>
        )
    
}
export default Error;
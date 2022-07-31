import React from 'react';
import Form from './Form.js'
import Footer from './Footer.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Error from './Error.js'


const App = () => {
    

    return (
               <BrowserRouter>
                <div>
                <h1 className="nameApp"> Resume Parser </h1>
                <Routes>
                    <Route exact path="/" element={<Form/>}></Route>
                    <Route exact path="/page/:id" element={<Error/>}></Route>
                </Routes>
                    <Footer />
            </div>
        </BrowserRouter>
          

        )
    }

export default App;
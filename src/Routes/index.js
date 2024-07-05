import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from '../pages/Main';
import Create from '../pages/Create';
import Page404 from '../pages/Page404';

export default function MyRoutes() {
return(
    <BrowserRouter>
    <Routes>
        <Route exact path='/' Component={Main}/>
        <Route exact path='/Create' Component={Create}/>
        <Route path='*' Component={Page404}/>
    </Routes>
    </BrowserRouter>
);
};
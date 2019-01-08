import React, { Component } from 'react';
import axios from 'axios';

const regularRequest = axios.create({
    baseURL: 'http://localhost:3500/',
});

class Edit extends Component {
     //this refers to the api path

    render() {
        return(

            <h1>Edit element page</h1>
        )
    }
}

export default Edit;
import React, { Component } from 'react';
import axios from 'axios';

const regularRequest = axios.create({
    baseURL: 'http://localhost:3500/',
});


class Show extends Component {
    //this refers to the api path
    modelPath = '/items/'

    state = {
        item: null,
        input: null
    }

    getItem = () => {
        const { id } = this.props.match.params;
        regularRequest.get(`${this.modelPath}${id}`)
            .then(response => {
                console.log('response.data', ': ', response.data);
                const item = response.data[0]
                return item
            })
            .then(item => {
                console.log('item', ': ', item);
                this.setState({ item })

            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        console.log("Component Did Mount");
        const { id } = this.props.match.params;
        console.log('id', ': ', id);

        this.getItem()

    }

    handleInputUpdate(e) {
        const { value } = e.target;
        this.setState({ input: value })
        console.log('value', ': ', value);

    }

    render() {
        const { item } = this.state
        if (item) {
            
            return(
                Object.keys(item).map(key=>{
                    return <p> {key} : {item[key]}  </p>
                })
            )
        } else {
            return (
                <div>
                    <h2>Loading.....</h2>
                </div>
            );
        }
    }
}

export default Show;
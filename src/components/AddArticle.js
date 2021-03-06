import React, {useState} from 'react';
import {Button, Form} from 'semantic-ui-react'
import axios from "axios";

const AddArticle = (props, user) => {

    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [price, setPrice] = useState(0);
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    const [stock, setStock] = useState(30);

    const options = [
        {key: 'book', text:'Livre', value:'book'},
        {key: 'music', text:'Musique', value:'music'},
        {key: 'photo', text:'Photo', value:'photo'},
        {key: 'video', text:'Video', value:'video'}
    ]

    const handleSubmit = () => {
        let article = {
            'title' : title,
            'year' : year,
            'price' : price,
            'type' : type,
            'image' : image,
            'user' : user._id,
            'stock' : stock
        };

        axios
            .post(`http://localhost:3002/article/`, article, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                console.log("createarticle / res.data", res.data);
            })
            .catch(err => console.error(err));
    };

    const setNewType = (e) => {
        let type = options.filter(option => {
            return e.target.querySelector('span').innerHTML === option.text
        });
        setType(type[0].value);
    }

    return (
        <>
            Ajouter un Article
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Title</label>
                    <input placeholder='title' value={title} onChange={(e) => {setTitle(e.target.value)}}/>
                </Form.Field>
                <Form.Field>
                    <label>Year</label>
                    <input placeholder='year' type='number' onChange={(e) => {setYear(e.target.value)}}/>
                </Form.Field>
                <Form.Field>
                    <label>Price</label>
                    <input placeholder='price' type='number' onChange={(e) => {setPrice(e.target.value)}}/>
                </Form.Field>
                <Form.Select fluid label='type' options={options} value={type} onChange={(e) => {setNewType(e)}} />
                <Form.Field>
                    <label>Image</label>
                    <input placeholder='url' onChange={(e) => {setImage(e.target.value)}}/>
                </Form.Field>
                <Form.Field>
                    <label>Stock</label>
                    <input placeholder='stock' value={stock} type='number' onChange={(e) => {setStock(e.target.value)}}/>
                </Form.Field>

                <Button type='submit'>Submit</Button>
            </Form>
        </>
    );

};

export default AddArticle;
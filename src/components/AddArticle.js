import React, {useState} from 'react';
import {Button, Form} from 'semantic-ui-react'
import axios from "axios";

const AddArticle = (props, user) => {

    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [price, setPrice] = useState(0);
    const [type, setType] = useState("");
    const [image, setImage] = useState("");

    const options = [
        {key: 'book', text:'Book', value:'book'},
        {key: 'music', text:'Music', value:'music'},
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
            'user' : user._id
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
                <Form.Select fluid label='type' options={options} onChange={(e) => {setType(e.target.value)}} />
                <Form.Field>
                    <label>Image</label>
                    <input placeholder='url' onChange={(e) => {setImage(e.target.value)}}/>
                </Form.Field>

                <Button type='submit'>Submit</Button>
            </Form>
        </>
    );

};

export default AddArticle;
import React, {useState} from 'react';
import {Button, Form} from 'semantic-ui-react'
import axios from "axios";

const AddArticle = () => {

    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [price, setPrice] = useState(0);
    const [type, setType] = useState("");
    const [image, setImage] = useState("");


    const handleSubmit = () => {
        let article = {
            'title' : title,
            'year' : year,
            'price' : price,
            'type' : type,
            'image' : image
        };

        console.log('article', article);
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
                    <input placeholder='year' type='date' onChange={(e) => {setYear(e.target.value)}}/>
                </Form.Field>
                <Form.Field>
                    <label>Price</label>
                    <input placeholder='price' type='number' onChange={(e) => {setPrice(e.target.value)}}/>
                </Form.Field>
                <Form.Field label='Type' control='select' onChange={(e) => {setType(e.target.value)}}>
                    <option value='male'>Book</option>
                    <option value='female'>Music</option>
                    <option value='female'>Photo</option>
                    <option value='female'>Video</option>
                </Form.Field>
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
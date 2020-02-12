import React ,{ useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from "axios";

export default function AddArticle({ props, user }) {
  constructor(props) {
    super(props)
		this.state = {
        title: '',
        year: '',
        price: '',
        type: '',
        image: '',
        user: user, 
      };
	}

  const onChange = (e) => {
    this.setState({ title: e.target.value });
    this.setState({ year: e.target.value });
    this.setState({ price: e.target.value });
    this.setState({ type: e.target.value });
    this.setState({ image: e.target.value });
  }

  const handleSubmit = article => {
    console.log('article', article);
    const config = {
      'Content-Type': 'application/json'
    };
    axios
      .post(`http://localhost:3002/article/`, article, config)
      .then(res => {
        console.log("createarticle / res.data", res.data);
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      Ajouter un article
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Title</label>
          <input placeholder='title' onChange={onChange} />
        </Form.Field>
        <Form.Field>
          <label>Year</label>
          <input placeholder='year' type='date' onChange={onChange} />
        </Form.Field>
        <Form.Field>
          <label>Price</label>
          <input placeholder='price' type='number' onChange={onChange} />
        </Form.Field>
        <Form.Field label='An HTML <select>' control='select' onChange={onChange}>
          <option value='male'>Book</option>
          <option value='female'>Music</option>
          <option value='female'>Photo</option>
          <option value='female'>Video</option>
        </Form.Field>
        <Form.Field>
          <label>Image</label>
          <input placeholder='url' onChange={onChange} />
        </Form.Field>

        <Button type='submit'>Submit</Button>
      </Form>
    </>
  );
}
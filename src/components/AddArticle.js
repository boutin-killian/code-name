import React from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from "axios";

export default class AddArticle extends React.Component {
  	state = {
        title: '',
        year: '',
        price: '',
        type: '',
        image: '',
        user: this.props.user, 
      };

  onChange = (e) => {
    this.setState({ title: e.target.value });
    this.setState({ year: e.target.value });
    this.setState({ price: e.target.value });
    this.setState({ type: e.target.value });
    this.setState({ image: e.target.value });
  }

  handleSubmit = article => {
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

  render() {
  
    return (
      <>
        Ajouter un Article
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Title</label>
            <input placeholder='title' onChange={this.onChange} />
          </Form.Field>
          <Form.Field>
            <label>Year</label>
            <input placeholder='year' type='date' onChange={this.onChange} />
          </Form.Field>
          <Form.Field>
            <label>Price</label>
            <input placeholder='price' type='number' onChange={this.onChange} />
          </Form.Field>
          <Form.Field label='An HTML <select>' control='select' onChange={this.onChange}>
            <option value='male'>Book</option>
            <option value='female'>Music</option>
            <option value='female'>Photo</option>
            <option value='female'>Video</option>
          </Form.Field>
          <Form.Field>
            <label>Image</label>
            <input placeholder='url' onChange={this.onChange} />
          </Form.Field>
    
          <Button type='submit'>Submit</Button>
        </Form>
      </>
    );
  }
}
import React, { useState } from "react";
import { Form, Segment } from "semantic-ui-react";

export default function Login({ props, login, register }) {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = e => {
    e.preventDefault();
    if (isLogin) {
        login(credentials);
    } else {
        register(credentials);
    }
    props.history.push("/profile");
    emptyFormFields();
  };

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const emptyFormFields = () => {
    setCredentials({
      name: "",
      email: "",
      password: ""
    });
  };

  return (
    <Segment>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
            {!isLogin &&
                <Form.Input
                    fluid
                    label="Nom"
                    placeholder="Nom"
                    name="name"
                    value={credentials.name}
                    onChange={handleChange}
                />
            }
          <Form.Input
            fluid
            label="Email"
            placeholder="Email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
          <Form.Input
            fluid
            type="password"
            label="Mot de passe"
            placeholder="Mot de passe"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group inline>
          <label>Se connecter / créer un compte</label>
          <Form.Radio
            label="Login"
            value="login"
            checked={isLogin === true}
            onChange={() => setIsLogin(true)}
          />
          <Form.Radio
            label="Créer un compte"
            value="register"
            checked={isLogin === false}
            onChange={() => setIsLogin(false)}
          />
        </Form.Group>
        <Form.Button>
          {isLogin ? "se connecter" : "créer un compte"}
        </Form.Button>
      </Form>
    </Segment>
  );
}
import React, { useState } from 'react';
import { Form , Segment } from 'semantic-ui-react';

export default function ProfileDetail({login, register}) {
    const [credentials, setCredentials] = useState({
        name: 'test',
        email: '',
        password: ''
    });

    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = e => {
        e.preventDefault();
        if (isLogin) {
            login(credentials);
        } else {
            register(credentials);
        }
        emptyFormFields();
    };

    const handleChange = e => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const emptyFormFields = () => {
        setCredentials({
            name: '',
            email: '',
            password: ''
        });
    };

    return (
        <Segment>
            <Form onSubmit={handleSubmit}>
                <Form.Group widths="equal">
                    <Form.Input
                        fluid
                        label='Nom'
                        placeholder="Nom"
                        name='Name'
                        value={credentials.name}
                        onChange={handleChange}
                    >
                    </Form.Input>
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
                </Form.Group>
                <Form.Button>
                    Enregistrer
                </Form.Button>
            </Form>
        </Segment>
    );
}
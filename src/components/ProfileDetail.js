import React, { useState } from 'react';
import { Form , Segment, Container, Button, Icon } from 'semantic-ui-react';

export default function ProfileDetail({ props, user, disconnect }) {
    const handleClick = e => {
        e.preventDefault();
        disconnect();
        props.history.push('/');
    }

    const handleSubmit = () => {
    }

    const handleChangeName = (e) => {
        user.fullname = e.target.value;
    }

    const handleChangeMail = (e) => {
        user.email = e.target.value;
    }

    return (
        <Segment>
            <h1>Bonjour {user.fullname} !</h1>
            <Form class='ui form' onSubmit={handleSubmit}>
                <Form.Group unstackable widths={2}>
                <Container>
                    <Form.Input
                        fluid
                        label='Nom'
                        placeholder="Nom"
                        name='Name'
                        value={user.fullname}
                        onChange={handleChangeName} />
                    <Form.Input
                        fluid
                        label="Email"
                        placeholder="Email"
                        name="email"
                        value={user.email}
                        onChange={handleChangeMail} />
                </Container>
                </Form.Group>
                <Form.Group inline>
                    <Form.Button>
                        Enregistrer
                    </Form.Button>
                    <Form.Button>
                        Annuler
                    </Form.Button>
                </Form.Group>
            </Form>
            <div>
              <Button animated onClick={handleClick}>
                <Button.Content visible>Se déconnecter</Button.Content>
                <Button.Content hidden>
                  <Icon name="user close" />
                </Button.Content>
              </Button>
            </div>
        </Segment>
    );
}
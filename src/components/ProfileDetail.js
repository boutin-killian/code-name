import React, {useEffect} from 'react';
import { Segment, Button, Icon } from 'semantic-ui-react';

const ProfileDetail = ({ props, user, disconnect }) => {

    useEffect(() => {
        console.log(user);
    });

    const handleClick = e => {
        e.preventDefault();
        disconnect();
        props.history.push('/');
    };

    return (
        <Segment>
            <h1>Bonjour {user.fullname} !</h1>

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
};
export default ProfileDetail;
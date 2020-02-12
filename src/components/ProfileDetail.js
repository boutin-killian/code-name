import React, { useContext } from "react";
import { Table, Icon, Button } from "semantic-ui-react";
import { ProfileContext } from "../App";

export default function ProfileDetail({ props, user, disconnect }) {

    const handleClick = e => {
      e.preventDefault();
      disconnect();
      props.history.push("/");
    };

    return (
        <>
          <h3>Bonjour {user.name}</h3>
          <div>
            <Button animated onClick={handleClick}>
              <Button.Content visible>Se déconnecter</Button.Content>
              <Button.Content hidden>
                <Icon name="user close" />
              </Button.Content>
            </Button>
          </div>
        </>
      );
}
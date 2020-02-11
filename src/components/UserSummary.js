import React from "react";
import { Button, Icon } from "semantic-ui-react";

export default function UserSummary({ user, disconnect }) {
  return (
    <>
      <h3>Bonjour {user.name}</h3>
      <div>
        <Button animated onClick={disconnect}>
          <Button.Content visible>Se déconnecter</Button.Content>
          <Button.Content hidden>
            <Icon name="user close" />
          </Button.Content>
        </Button>
      </div>
    </>
  );
}
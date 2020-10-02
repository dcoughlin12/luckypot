import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PresentButton.scss";
import { Button, ButtonGroup } from "react-bootstrap";

export default function PresentButton(props) {
  const { loggedUser, event, setUserPresent, userPresent } = props;

  // Get request to know value of whether user is attending //
  if (!userPresent) {
    axios
      .get(
        `http://localhost:3003/dashboard/present/${loggedUser.id}/${event.id}`
      )
      .then((result) => {
        setUserPresent(result.data[0].present);
        console.log(userPresent);
      });
  }

  // Put req to update whether user is attending //
  const updatePresentValue = (value) => {
    axios
      .put(`http://localhost:3003/dashboard/present/`, {
        present: value,
        user_id: loggedUser.id,
        event_id: event.id,
      })
      .then((result) => {
        setUserPresent(result.data[0].present);
        console.log(userPresent);
      });
  };

  return (
    <ButtonGroup aria-label="Basic example">
      <Button
        variant="secondary"
        onClick={() => {
          updatePresentValue(0);
        }}
      >
        NO
      </Button>
      <Button
        variant="warning"
        onClick={() => {
          updatePresentValue(1);
        }}
      >
        Maybe
      </Button>
      <Button
        variant="primary"
        onClick={() => {
          updatePresentValue(2);
        }}
      >
        YES
      </Button>
    </ButtonGroup>
  );
}
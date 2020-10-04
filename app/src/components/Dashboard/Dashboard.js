import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import "./Dashboard.scss";
import PresentButton from "./PresentButton";
import EventInfo from "./EventInfo";
import GuestList from "./GuestList";
import MealsContainer from "./MealsContainer";
import Messages from "./Messages";
import OthersContainer from "./OthersContainer";

export default function Dashboard(props) {
  const { loggedUser } = props;
  const { id } = useParams();
  let history = useHistory();

  const [isLoading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userPresent, setUserPresent] = useState(null);
  const [host, setHost] = useState({});

  function addMeal(item, category) {
    const input = {
      event_id: event.id,
      category_id: 1,
      name: item,
    };

    axios.post("http://localhost:3003/items/add", input).then((response) => {
      setItems([...items, response.data]);
    });
  }

  function isInPotluck(user, event) {
    axios
      .get(`http://localhost:3003/dashboard/check/${event}/${user}`)
      .then((response) => {
        const check = response.data;
        // console.log("DATA", check);
        if (check.length === 0) {
          const guest = {
            event_id: event,
            user_id: user,
          };
          return axios
            .post("http://localhost:3003/dashboard/addguest", guest)
            .then(() => {
              // console.log("new user");
              history.push(`/dashboard/${event}`);
            });
        } else {
          history.push(`/dashboard/${event}`);
          // console.log("existing user");
        }
      });
  }
  useEffect(() => {
    isInPotluck(loggedUser.id, id);
  }, []);

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:3003//dashboard/events/${id}`),
      axios.get(`http://localhost:3003//dashboard/guests/${id}`),
      axios.get(`http://localhost:3003//dashboard/items/${id}`),
      axios.get(`http://localhost:3003/dashboard/messages/${id}`),
    ]).then((all) => {
      setEvent(all[0].data[0]);
      if (all[1].data.length === 0) {
        setUsers([loggedUser]);
      } else {
        setUsers(all[1].data);
      }
      setItems(all[2].data);
      setMessages(all[3].data);
      setLoading(false);
      setHost({
        first_name: event.owner_first_name,
        last_name: event.owner_last_name,
      });
      console.log(host);
    });
  }, [userPresent]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mainDashboard">
      <Container fluid>
        <Col lg={{ span: 2, offset: 1 }} sm={6}>
          <div className="guestTitle">
            <h4>
              Let <strong>{host.first_name}</strong> know if you're going!
            </h4>
            <PresentButton
              userPresent={userPresent}
              setUserPresent={setUserPresent}
              event={event}
              users={users}
              loggedUser={loggedUser}
            />
          </div>
          <Row>
            <GuestList
              loggedUser={loggedUser}
              userPresent={userPresent}
              users={users}
            />
          </Row>
        </Col>
        <Col lg={{ span: 4, offset: 1 }} sm={6}>
          <Row>
            <MealsContainer
              userPresent={userPresent}
              event={event}
              items={items}
              users={users}
              loggedUser={loggedUser}
              addMeal={addMeal}
            />
            <OthersContainer />
          </Row>
        </Col>
        <Col lg={{ span: 3, offset: 1 }} sm={6}>
          <Row>
            <EventInfo event={event} users={users} host={host} />
            <Messages
              messages={messages}
              users={users}
              loggedUser={loggedUser}
              event={event}
            />
          </Row>
        </Col>
      </Container>
    </div>
  );
}

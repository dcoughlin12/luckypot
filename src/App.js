import React, { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
// import SignupForm from "./components/Sign-up/SignupForm";
import SignupContainer from "./components/Sign-up/SignupContainer";

export default function App() {
  const [state, setState] = useState({
    name: "",
    greetings: "",
  });

  const db_key = process.env.DB_HOST;
  console.log(db_key)
  const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
  console.log(API_KEY)

  const handleChange = (event) => {
    setState({ name: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("this works");
    fetch(`/api/greeting?name=${encodeURIComponent(state.name)}`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((state) => {
        console.log(state);
        return setState(state);
      });
  };

  return (
    <main>
      <NavBar />
      <section>
        <SignupContainer />
      </section>
    </main>
  );
}

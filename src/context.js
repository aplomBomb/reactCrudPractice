import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

// used to make changes to state, takes one state and gives you another
const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        // filter the state so that is no longer contains the item to delete
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case "ADD_CONTACT":
      // spread operator
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case "UPDATE_CONTACT":
      // spread operator
      return {
        ...state,
        contacts: state.contacts.map(
          contact =>
            contact.id === action.payload.id
              ? (contact = action.payload)
              : contact
        )
      };
    case "CONTACT_COUNT":
      // spread operator
      return {
        ...state,
        contacts: state.contacts.length()
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [],
    // action passed in the state that then calls reducer and passes the state and action to the reducer
    dispatch: action => this.setState(state => reducer(state, action)),

    contactsCheck() {
      this.setState(function(prevState, props) {
        return { numberOfContacts: this.contacts.length };
      });
    }
  };

  // lifecycle function...called before the component is actually mounted. perfect place to preload data etc
  async componentDidMount() {
    // make call to api to get place holder data...async/await
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      this.setState({ contacts: response.data });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      // this makes the entire state available to the application
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

// exporting like this will allow us to just use 'Consumer' in our code
// also exporting everything like we are doing will allow us to access 'global' functions as well as data
export const Consumer = Context.Consumer;

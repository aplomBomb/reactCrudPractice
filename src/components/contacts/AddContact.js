import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

export default class AddContact extends Component {
  // form objects are part of the state
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  onChange = event => {
    // allows us to change the values in the fields, does not update the state
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = async (dispatch, event) => {
    event.preventDefault();

    // get values from state
    const { name, email, phone } = this.state;

    // check for errors
    if (name === "") {
      this.setState({ errors: { name: "Name Is Required!" } });
      return;
    }
    if (email === "") {
      this.setState({ errors: { email: "Email Is Required!" } });
      return;
    }
    if (phone.length !== 10) {
      this.setState({ errors: { phone: "Phone Number Must Be 10 Digits" } });
      return;
    }

    const newContact = {
      name: name,
      email: email,
      phone: phone
    };

    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        newContact
      );

      dispatch({ type: "ADD_CONTACT", payload: response.data });
    } catch (error) {
      console.log(error);
    }

    // clear the fields
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });

    // redirect back to contacts pages to see new contact
    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      // if i want to use anything from the context i need to wrap it in a consumer tag, i can now call anything that is in context.js
      <Consumer>
        {value => {
          const { dispatch } = value;

          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                {/* on form submit call dispatch which is part of the consumer */}
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  {/* because value has been set for the fileds this now considered a controlled component. need to create event handler for change to make any changes to the fields */}
                  <TextInputGroup
                    label="Name:"
                    name="name"
                    value={name}
                    placeHolder="Enter Name ..."
                    type="text"
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email:"
                    name="email"
                    value={email}
                    placeHolder="Enter Email ..."
                    type="email"
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone:"
                    name="phone"
                    value={phone}
                    placeHolder="Enter Phone Number ..."
                    type="text"
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-dark btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

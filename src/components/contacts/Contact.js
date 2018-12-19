import React, { Component } from "react";
import PropTypes from "prop-types";
import { Consumer } from "../../context";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Contacts extends Component {
  state = {
    // determine initial display of contact info
    showContactInfo: false
  };

  onDeleteClick = async (id, dispatch, event) => {
    // api call to delete item from data
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

      // call the dispatch item in the state to remove contact
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { id, name, email, phone } = this.props.contact;

    const { showContactInfo } = this.state;

    return (
      // wrap everything inside consumer so we can access the state from context.api
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card">
              <div className="card-header">
                <h4>{name} </h4>
                <i
                  // this is pulling from local state
                  onClick={() => {
                    this.setState({
                      showContactInfo: !this.state.showContactInfo
                    });
                  }}
                  className="fas fa-arrow-alt-circle-down"
                  style={{ cursor: "pointer" }}
                />
                <i
                  className="fas fa-skull-crossbones"
                  style={{ cursor: "pointer", color: "red", float: "right" }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-hammer"
                    style={{
                      cursor: "pointer",
                      color: "black",
                      marginRight: "1rem",
                      float: "right"
                    }}
                  />
                </Link>
              </div>

              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">eMail: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

// prop types
Contacts.propTypes = {
  contact: PropTypes.object.isRequired
};

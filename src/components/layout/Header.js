import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { Consumer } from "../../context";

class Header extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          // pull contacts from the returned value from consumer
          const { contacts } = value;

          return (
            <React.Fragment>
              <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3 py-0">
                <div className="container">
                  <a
                    href="https://jsonplaceholder.typicode.com/users"
                    target="_blank"
                    className="navbar-brand"
                  >
                    C.R.U.D Contact Management Application
                  </a>
                </div>
              </nav>
              <div className="jumbotron">
                <h1>Contacts</h1>
                <h3
                  style={{
                    float: "right",
                    margingRight: "3rem"
                  }}
                >
                  Number of contacts{" "}
                  <span className="badge badge-secondary">
                    {contacts.length}
                  </span>
                </h3>
                {/* <h3
                  className="card"
                  style={{
                    float: "right",
                    margingRight: "3rem"
                  }}
                >
                  Number of contacts: {contacts.length}
                </h3> */}
                {/* <NumberOfContacts {...NumberOfContacts} /> */}

                <p className="lead">
                  This is a list of contacts provided by API
                </p>
                <hr className="my-4" />
                <div>
                  <ul className="nav nav-pills mb-3">
                    <li className="nav-item">
                      <NavLink
                        exact
                        to="/"
                        className="nav-link"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Go to homepage"
                      >
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/contact/add"
                        className="nav-link"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Add new contact"
                      >
                        Add
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/about"
                        className="nav-link"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="About this application"
                      >
                        About
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

// const NumberOfContacts = props => {
//   return (
//     <div>
//       <h3
//         style={{
//           float: "right",
//           marginRight: "10%"
//         }}
//       >
//         Number of contacts {props.totalContacts}
//       </h3>
//     </div>
//   );
// };

// default props values
Header.defaultProps = {
  branding: "C.R.U.D. Contact Management Application"
};

// prop types
Header.propTypes = {
  // declare that branding is a string and is required
  branding: PropTypes.string.isRequired
};

export default Header;

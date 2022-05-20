import React, { Component } from "react";
import { AuthContext } from "./useAuth";

function withLoggedIn(WrappedElement, props) {
  return class extends Component {
    render() {
      return (
        <AuthContext.Consumer>
          {({ isLoggedIn, userInfo }) => (
            <WrappedElement
              isLoggedIn={isLoggedIn}
              auth={userInfo}
              {...props}
            />
          )}
        </AuthContext.Consumer>
      );
    }
  };
}

export default withLoggedIn;

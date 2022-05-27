import React, { Component } from "react";
import { AuthContext } from "./useAuth";

function withLoggedIn(WrappedElement, props) {
  return class extends Component {
    render() {
      return (
        <AuthContext.Consumer>
          {({ isLoggedIn, userInfo, getUser, logout }) => (
            <WrappedElement
              isLoggedIn={isLoggedIn}
              auth={userInfo}
              fetch={getUser}
              logout={logout}
              {...props}
            />
          )}
        </AuthContext.Consumer>
      );
    }
  };
}

export default withLoggedIn;

import React from "react";
import { Redirect, Route } from "react-router-dom";
import Auth from "../auth/Auth";

export default function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (Auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/sign-in" />;
        }
      }}
    />
  );
}

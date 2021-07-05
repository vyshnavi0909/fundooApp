import React from "react";

import NotesContext from "./NotesContext";

export function withGetNotes(BaseComponent) {
  return class WithNotes extends React.Component {
    render() {
      return (
        <NotesContext.Consumer>
          {(value) => (
            <BaseComponent
              {...value}
              // archive={props.archive}
              {...this.props}
            />
          )}
        </NotesContext.Consumer>
      );
    }
  };
}

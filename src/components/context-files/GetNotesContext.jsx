import React, { createContext } from "react";

const GetNotesContext = createContext();


export function withGetNotes(BaseComponent) {
    return class WithNotes extends React.Component {
        render() {
            return (
                <GetNotesContext.Consumer>
                    {(props) => (
                        <BaseComponent
                            getNote={props.getNote}
                            notes={props.notes}
                            {...this.props}
                        />
                    )}
                </GetNotesContext.Consumer>
            )
        }
    }
}

export default GetNotesContext;

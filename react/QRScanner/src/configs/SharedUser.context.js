import React, {Component} from 'react';

const SharedUserContext = React.createContext();

export class SharedUserProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            message: '',
        };
    }

    openSnackbar = message => {
        this.setState({
            message,
            isOpen: true,
        });
    };

    closeSnackbar = () => {
        this.setState({
            message: '',
            isOpen: false,
        });
    };

    render() {
        const {
            children
        } = this.props;

        return ( <SharedUserContext.Provider value = {
                {
                    openSnackbar: this.openSnackbar,
                    closeSnackbar: this.closeSnackbar,
                    snackbarIsOpen: this.state.isOpen,
                    message: this.state.message,
                }
            } >
            // TODO:  Render Snackbar presentation component here

            {
                children
            } </SharedUserContext.Provider>
        );
    }
}

export const SharedUserConsumer = SharedUserContext.Consumer;
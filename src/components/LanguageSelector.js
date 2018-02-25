import React, { Component } from 'react';
import { Navbar, FormGroup, FormControl } from 'react-bootstrap';

class LanguageSelector extends Component {

    constructor(props) {
        super(props);

        this.state = { lang: 'EN' } // Default language

        this.handleSelector = this.handleSelector.bind(this);
    }

    handleSelector(event) {
        this.setState({ lang: event.target.value });
        this.props.onChangeLanguage(event.target.value);
    }

    render() {
        return (
            <Navbar.Form pullLeft>
                <FormGroup controlId="formControlsSelect">
                    <FormControl
                        componentClass="select"
                        onChange={this.handleSelector}
                    >
                        <option value="EN">English</option>
                        <option value="ES">Español</option>
                    </FormControl>
                </FormGroup>
            </Navbar.Form>
        );
    }
}

export default LanguageSelector;
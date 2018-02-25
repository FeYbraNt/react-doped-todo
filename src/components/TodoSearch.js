import React, { Component } from 'react';
import { Navbar, FormGroup, FormControl } from 'react-bootstrap';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

const messages = defineMessages({
    placeholder: {
        id: 'header.search.placeholder', defaultMessage: 'Search ...'
    }
});

class TodoSearch extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) { this.props.searchTodo(event); }

    render() {
        const { formatMessage } = this.props.intl;
        return (
            <Navbar.Form pullRight>
                <FormGroup>
                    <FormControl type="search"
                                 placeholder={formatMessage(messages.placeholder)}
                                 onChange={this.handleChange}
                    />
                </FormGroup>
            </Navbar.Form>
        )
    }
}

TodoSearch.propTypes = {
    intl: intlShape.isRequired
}

export default injectIntl(TodoSearch)
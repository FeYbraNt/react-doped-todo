import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Glyphicon, Button } from 'react-bootstrap';
import { injectIntl, intlShape, defineMessages } from 'react-intl';

const messages = defineMessages({
   placeholder: {
       id: 'footer.add.placeholder', defaultMessage: 'Enter a name ...'
   },
    option: [{ id: 'footer.add.priority0.text', defaultMessage: 'No priority'
        },{ id: 'footer.add.priority1.text', defaultMessage: 'Priority 1'
        },{ id: 'footer.add.priority2.text', defaultMessage: 'Priority 2'
        },{ id: 'footer.add.priority3.text', defaultMessage: 'Priority 3'
        }]
});

class TodoAdd extends Component {

    constructor(props) {
        super(props);

        this.state = { addName: '', addPriority: 0 };

        // bind functions in constructor instead of render
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSelector = this.handleSelector.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    handleUpdate(event) { this.setState({ addName: event.target.value }); }
    handleSelector(event) { this.setState({ addPriority: Number.parseInt(event.target.value) }); }

    addTask(event) {
        event.preventDefault();
        this.props.addTask( this.state.addName, this.state.addPriority );
        this.setState({ addName: '', addPriority: 0 });
    }

    render() {
        const { formatMessage } = this.props.intl;
        return (
                <Form inline>
                    <FormGroup controlId="formBasicText">
                        <FormControl
                            type="text"
                            value={this.state.addName}
                            placeholder={formatMessage(messages.placeholder)}
                            onChange={this.handleUpdate}
                        />
                        <FormControl.Feedback />
                        {' '}
                        <FormGroup controlId="formControlsSelect">
                            <FormControl
                                componentClass="select"
                                placeholder="Choose a priority ..."
                                onChange={this.handleSelector}
                            >
                                <option value="0">{formatMessage(messages.option[0])}</option>
                                <option value="1">{formatMessage(messages.option[1])}</option>
                                <option value="2">{formatMessage(messages.option[2])}</option>
                                <option value="3">{formatMessage(messages.option[3])}</option>
                            </FormControl>
                        </FormGroup>
                    </FormGroup>
                    {' '}
                    <Button type="submit" value="Submit" onClick={this.addTask}><Glyphicon glyph="glyphicon glyphicon-plus"/></Button>
                </Form>
        );
    }
}

TodoAdd.propTypes = {
    intl: intlShape.isRequired
}

export default injectIntl(TodoAdd);

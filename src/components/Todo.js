import React, { Component } from 'react';
import { Glyphicon, Button, Label } from 'react-bootstrap';
import PropTypes from 'prop-types';
import TodoModal from './TodoModal';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

const messages = defineMessages({
    priority: [{ id: 'todo.priority0.text', defaultMessage: 'No priority'
        },{ id: 'todo.priority1.text', defaultMessage: 'Priority 1'
        },{ id: 'todo.priority2.text', defaultMessage: 'Priority 2'
        },{ id: 'todo.priority3.text', defaultMessage: 'Priority 3'
        }]
}); 

const propTypes = {
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    priority: PropTypes.string.isRequired,
    description: PropTypes.string,
    intl: intlShape.isRequired
}

class Todo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            name: props.name,
            completed: props.completed,
            priority: props.priority,
            description: props.description || '',
            isModalOpen: false
        }

        // bind function in constructor instead of render
        this.removeTodo = this.removeTodo.bind(this);
        this.changeComplete = this.changeComplete.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    removeTodo() { this.props.removeTodo(this.state.name); }

    changeComplete() { 
        this.setState({ completed: !this.state.completed }); 
        this.props.updateComplete(this.state.name);
    }

    updateDescription(newDesc) { this.setState({ description: newDesc }); this.toggleModal(); }

    renderTextPriority(value) {
        const { formatMessage } = this.props.intl;
        switch (value) {
            case 0: return <Label>{formatMessage(messages.priority[0])}</Label>;
            case 1: return <Label bsStyle="info">{formatMessage(messages.priority[1])}</Label>;
            case 2: return <Label bsStyle="warning">{formatMessage(messages.priority[2])}</Label>;
            case 3: return <Label bsStyle="danger">{formatMessage(messages.priority[3])}</Label>;
            default: return <Label>{formatMessage(messages.priority[0])}</Label>;
        }
    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    render() {
        return (
            <tr key={this.state.id} className="text-center">
                <td className="text-left" onClick={this.toggleModal}>
                    {this.state.name}
                    <TodoModal isModalOpen={this.state.isModalOpen}
                               toggleModal={this.toggleModal}
                               name={this.state.name}
                               priority={this.renderTextPriority(this.state.priority)}
                               description={this.state.description}
                               updateDescription={this.updateDescription}
                    />
                </td>
                <td>{this.renderTextPriority(this.state.priority)}</td>
                <td>
                    <Button bsStyle={this.state.completed ? 'success' : 'default'} onClick={this.changeComplete}>
                        <Glyphicon glyph="glyphicon glyphicon-ok"/>
                    </Button>
                </td>
                <td>
                    <Button bsStyle="danger" onClick={this.removeTodo}>
                        <Glyphicon glyph="glyphicon glyphicon-remove"/>
                    </Button>
                </td>
            </tr>
        );
    }
}

Todo.PropTypes = propTypes;
export default injectIntl(Todo);
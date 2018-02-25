import React, { Component } from 'react';
import { Modal, Button, FormControl, FormGroup } from 'react-bootstrap';
import { FormattedMessage, defineMessages, intlShape, injectIntl } from 'react-intl';

const messages = defineMessages({
    placeholder: { id: 'modal.description.placeholder', defaultMessage: 'Write your description here ...'}
});

class TodoModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            description: props.description
        }

        this.saveDetail = this.saveDetail.bind(this);
        this.handleText = this.handleText.bind(this);
    }

    handleText(event) { this.setState({ description: event.target.value }); }

    saveDetail(event) {
        event.preventDefault();
        this.props.updateDescription(this.state.description);
    }

    render() {
        const { formatMessage } = this.props.intl;
        return (
            <Modal show={this.props.isModalOpen}>
                <Modal.Header>
                    <Modal.Title>{this.props.name}</Modal.Title>
                    {this.props.priority}
                </Modal.Header>
                <Modal.Body>
                    <FormGroup controlId="formControlsTextArea">
                        <FormControl componentClass="textarea"
                                     type="text"
                                     placeholder={formatMessage(messages.placeholder)}
                                     onChange={this.handleText}
                                     value={this.state.description}
                        />
                    </FormGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.props.toggleModal}>
                        <FormattedMessage id="modal.button.close" defaultMessage={'Close'} />
                    </Button>
                    <Button type="submit" bsStyle="primary" onClick={this.saveDetail}>
                        <FormattedMessage id="modal.button.save" defaultMessage={'Save'} />
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

}

TodoModal.propTypes = {
    intl: intlShape.isRequired
}

export default injectIntl(TodoModal);
import React, { Component } from 'react';
import Todo from './Todo';
import { Table, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

export default class TodoList extends Component {

    constructor(props) {
        super(props);

        // bind functions in constructor instead of render
        this.addTask = this.props.addTask;
    }

    renderTodo() {
        return this.props.pageOfItems.map(item =>
            <Todo key={item.id}
                  name={item.name}
                  completed={item.completed}
                  priority={item.priority}
                  description={item.description}
                  updateComplete={this.props.updateComplete}
                  removeTodo={this.props.removeTodo}
            />
        )
    }

    render() {
        return (
            <div className="container">
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th className="col-xs-8 text-left"><FormattedMessage id="todos.task.title" defaultMessage={'Task'} /></th>
                            <th className="col-xs-2 text-center"><Button bsStyle="primary" onClick={this.props.onChangePriorities}><FormattedMessage id="todos.priority.title" defaultMessage={'Priority'} /> &#8597;</Button></th>
                            <th className="col-xs-1 text-center"><FormattedMessage id="todos.status.title" defaultMessage={'Status'} /></th>
                            <th className="col-xs-1 text-center"><FormattedMessage id="todos.remove.title" defaultMessage={'Remove'} /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTodo()}
                    </tbody>
                </Table>
            </div>
        )
    }
}
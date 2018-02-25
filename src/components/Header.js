import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Badge } from 'react-bootstrap';
import TodoSearch from './TodoSearch';
import LanguageSelector from './LanguageSelector';
import logo from './../logo.svg';
import { FormattedMessage } from 'react-intl';

export default class Header extends Component {

    render() {
        const numActiveTodos = this.props.todos.filter((item) => !item.completed).length;
        const numCompletedTodos = this.props.todos.filter((item) => item.completed).length;
        return (
            <header>
                <Navbar default>
                    <Nav>
                        <NavItem onClick={this.props.showAll}>
                            <FormattedMessage id="header.main.all.text" defaultMessage={'All'} />
                        </NavItem>
                        <NavItem onClick={this.props.showActive}>
                            <FormattedMessage id="header.main.active.text" defaultMessage={'Active'} /> <Badge>{numActiveTodos}</Badge>
                        </NavItem>
                        <NavItem onClick={this.props.showCompleted}>
                            <FormattedMessage id="header.main.completed.text" defaultMessage={'Completed'} /> <Badge>{numCompletedTodos}</Badge>
                        </NavItem>
                    </Nav>
                    <LanguageSelector onChangeLanguage={this.props.onChangeLanguage} />
                    <TodoSearch searchTodo={this.props.searchTodo} />
                </Navbar>
                <div className="text-center">
                    <h2><img src={logo} className="App-logo" alt="logo" />
                        <FormattedMessage id="header.main.title" defaultMessage={'React helps you to improve yourself'} />
                        <img src={logo} className="App-logo" alt="logo" /></h2>
                </div>
            </header>
        )
    }

}
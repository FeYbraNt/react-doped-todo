import React, { Component } from 'react';
import TodoList from './TodoList';
import Header from './Header';
import Pagination from './Pagination';
import TodoAdd from './TodoAdd';

import { IntlProvider, addLocaleData } from 'react-intl';
import intlEN from 'react-intl/locale-data/en';
import intlES from 'react-intl/locale-data/es';
import intlMessagesES from './../i18n/locales/es.json';
import intlMessagesEN from './../i18n/locales/en.json';

addLocaleData([...intlEN, ...intlES]);

/* Define your default translations */
let i18nConfig = {
    locale: 'en',
    messages: intlMessagesEN
};

// an example array of massive items (150)
const example = Array.from(Array(150), (_,i) => 1 + i)
    .map(i => { return { id: i, name: 'Task ' + i, completed: false, priority: 0 };
    });

export default class TodoApp extends Component {

    constructor(props) {
        super(props);

        this.state = { todos: [], filter: '', order: false, pageOfItems: [], locale: 'en' }

        this.searchTodo = this.searchTodo.bind(this);
        this.addTask = this.addTask.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.onChangePriorities = this.onChangePriorities.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.showAll = this.showAll.bind(this);
        this.showActive = this.showActive.bind(this);
        this.showCompleted = this.showCompleted.bind(this);
        this.updateComplete = this.updateComplete.bind(this);
        this.onChangeLanguage = this.onChangeLanguage.bind(this);
    }

    // Load init values (ONLY IN DEVELOPMENT MODE);
    componentDidMount() { this.getTodoData('http://localhost:3001/todos'); }

    getTodoData(url) {
        console.log('INFO: Loading data...');
        return fetch(url)
            .then(res => res.json())
            .then(jsonData => {
                this.setState({ todos: jsonData }, () => this.refs.paginator.componentWillMount());
            })
            .catch(errormsg => console.error('Loading error: ' + errormsg));
    }

    onChangePriorities() {
        const order = this.state.order;
        let orderedList = (this.state.filter !== '') ? this.state.filter : this.state.todos;
        orderedList = orderedList.sort((i1, i2) => {
            if (order) return (i1.priority - i2.priority)
            else return (i2.priority - i1.priority)
        });
        this.setState({ filter: orderedList, order: !order }, () => this.refs.paginator.componentWillMount() );
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    searchTodo(event) {
        const updatedList = this.state.todos.filter((todo) => {
           return todo.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        });
        this.setState({ filter: updatedList }, () => this.refs.paginator.componentWillMount() );
    }

    addTask(addName, addPriority) {
        let newlist = this.state.todos.slice();
        newlist.push({ id: this.state.todos.length + 1, name: addName, completed: false, priority: addPriority });
        this.setState({ todos: newlist }, () => this.refs.paginator.componentWillMount() );
    }

    removeTodo(name) {
        const filteredTasks = this.state.todos.filter(item => {
            return item.name !== name;
        });
        this.setState({ todos: filteredTasks || [] }, () => { this.refs.paginator.componentWillMount() });
    }

    // All header filters
    showAll() { this.setState({ filter: '' }, () => this.refs.paginator.componentWillMount() ); }
    showActive() {
        const filteredTodos = this.state.todos.filter((todo) => !todo.completed);
        this.setState({ filter: filteredTodos }, () => this.refs.paginator.componentWillMount() );
    }
    showCompleted() {
        const filteredTodos = this.state.todos.filter((todo) => todo.completed);
        this.setState({ filter: filteredTodos }, () => this.refs.paginator.componentWillMount() );
    }

    updateComplete(name) {
        const newList = this.state.todos.map((todo) => 
            todo.name === name ? { ...todo, completed: !todo.completed } : todo);
        this.setState({ todos: newList }, () => this.refs.paginator.componentWillMount());
    }

    onChangeLanguage(lang) {
        switch (lang) {
            case 'ES': i18nConfig.messages = intlMessagesES; break;
            case 'EN': i18nConfig.messages = intlMessagesEN; break;
            default: i18nConfig.messages = intlMessagesEN; break;
        }
        this.setState({ locale: lang });
        i18nConfig.locale = this.state.locale;
    }

    render() {
        return (
            <IntlProvider key={ i18nConfig.locale } locale={ i18nConfig.locale }  messages={ i18nConfig.messages }>
                <div>
                    <Header todos={this.state.todos}
                            filter={this.state.filter}
                            searchTodo={this.searchTodo}
                            showAll={this.showAll}
                            showActive={this.showActive}
                            showCompleted={this.showCompleted}
                            onChangeLanguage={this.onChangeLanguage}
                    />
                    <TodoList todos={this.state.todos}
                              filter={this.state.filter}
                              onChangePriorities={this.onChangePriorities}
                              pageOfItems={this.state.pageOfItems}
                              removeTodo={this.removeTodo}
                              updateComplete={this.updateComplete}
                    />
                    <div className="container text-center">
                        <Pagination ref="paginator" items={this.state.filter || this.state.todos} onChangePage={this.onChangePage} />
                        <TodoAdd addTask={this.addTask} />
                    </div>
                </div>
            </IntlProvider>
        );
    }
}
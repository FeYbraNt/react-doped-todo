import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import Todo from '../components/Todo';

const setup = propOverrides => {
    const props = {
        id: 0,
        text: 'Task 1',
        completed: false
    }

    const renderer = createRenderer();

    renderer.render(
        <Todo {...props} />
    )

    const output = renderer.getRenderOutput();

    return {
        props: props,
        output: output,
        renderer: renderer
    }

}

describe('components', () => {
    describe('Todo', () => {

        it('initial render', () => {
            const { output } = setup();

            expect(output.type).toBe('tr');

            const [ td1, td2, td3, td4 ] = output.props.children;

            expect(td1.type).toBe('td');
            expect(td1.props.className).toBe('text-left');

            expect(td2.type).toBe('td');
            expect(td3.type).toBe('td');
            expect(td4.type).toBe('td');
        });

    });
});
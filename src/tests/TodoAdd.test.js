import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import TodoAdd from '../components/TodoAdd';

const setup = propOverrides => {
    const props = Object.assign({
        addName: 'New Task name',
        addPriority: 'Priority 1'
    }, propOverrides);

    const renderer = createRenderer();
    renderer.render(
        <TodoAdd {...props} />
    )

    const output = renderer.getRenderOutput();

    return {
        props: props,
        output: output,
        renderer: renderer
    }
}

describe('components', () => {
    describe('TodoAdd', () => {
        it('should render correctly', () => {
            const { output } = setup();
            //expect(output.type).toBe('[Function form]');
        });
    });
});
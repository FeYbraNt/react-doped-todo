import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import TodoSearch from '../components/TodoSearch';

const setup = propOverrides => {

    const renderer = createRenderer();
    renderer.render(<TodoSearch />);
    const output = renderer.getRenderOutput();

    return {
        output: output,
        renderer: renderer
    }

}

describe('components', () => {
    describe('TodoSearch', () => {

        it('should render correctly', () => {
            const { output } = setup();
            expect(output.type).toBe('Navbar.Form');
        });
    });
});
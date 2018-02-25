import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import Header from '../components/Header';

const setup = propOverrides => {

    const renderer = createRenderer();
    renderer.render(<Header />);
    const output = renderer.getRenderOutput();

    return {
        output: output,
        renderer: renderer
    }

}

describe('components', () => {
    describe('Header', () => {

        it('should render correctly', () => {
           const { output } = setup();
           expect(output.type).toBe('header');

           const [ Navbar, h1 ] = output.props.children;
           expect(h1.type).toBe('h1');
        });
    });
});
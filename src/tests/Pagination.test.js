import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import Pagination from '../components/Pagination';

const setup = propOverrides => {

    const props = {
        items: [],
        onChangePage: () => {},
        initialpage: 1
    }

    const renderer = createRenderer();
    renderer.render(
        <Pagination {...props} />
    )

    const output = renderer.getRenderOutput();

    return {
        props: props,
        output: output,
        renderer: renderer
    }

}

describe('components', () => {
    describe('Pagination', () =>
        it('should render correctly', () => {
            const { output } = setup();
            expect(output.type).toBe('ul');
            expect(output.props.className).toBe('pagination');
        })
    );
});
import type {MacroComponent} from '@enonic/react-components';
import type {RestProps} from '.';


import React from 'react';
import {FactBox} from './macros/FactBox';


export const Macro: MacroComponent<RestProps> = ({
                                                     config,
                                                     descriptor,
                                                     ...rest
                                                 }) => {
    if (descriptor === 'com.enonic.app.intro:factbox') {
        const props = {...rest, config};
        return <FactBox {...props} />;
    }
    throw new Error(`Macro not found: ${descriptor}`);
}

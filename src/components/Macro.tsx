import type {MacroComponent} from '@enonic/react-components';


import {FactBox} from './FactBox';


export const Macro: MacroComponent = ({
    config,
    descriptor,
    children,
    ...rest
}) => {
    if (descriptor === 'com.enonic.app.intro:factbox') {
        const props = {...rest, config: config as Record<string, any>};
        return <FactBox {...props}>{children}</FactBox>;
    }
    throw new Error(`Macro not found: ${descriptor}`);
}

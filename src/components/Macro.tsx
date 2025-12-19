import type {MacroComponent} from '@enonic/react-components';


import {FactBox} from './FactBox';


export const Macro: MacroComponent = ({
                                          component,
                                          data,
                                          children
                                      }) => {
    if (component.descriptor === 'com.enonic.app.intro:factbox') {
        return <FactBox header={data?.header as string[] | undefined}>{children}</FactBox>;
    }
    throw new Error(`Macro not found: ${component.descriptor}`);
}

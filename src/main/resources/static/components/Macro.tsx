import type {MacroComponent} from '@enonic/react-components';
import React from 'react';
import {Panel} from './Panel';


export const Macro: MacroComponent = ({
	config,
	descriptor
}) => {
	if (descriptor.startsWith('com.enonic.app.panelmacros:')) {
		return <Panel config={config} descriptor={descriptor} />;
	}
	throw new Error(`Macro not found: ${descriptor}`);
}

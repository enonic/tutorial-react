import type {MacroComponent} from '@enonic/react-components';
import type {RestProps} from '.';


import React from 'react';
import {Filmography} from './macros/Filmography';


export const Macro: MacroComponent<RestProps> = ({
	config,
	descriptor,
  ...rest
}) => {
	if (descriptor === 'com.enonic.app.intro:filmography') {
    const props = {...rest, config};
		return <Filmography {...props} />;
	}
	throw new Error(`Macro not found: ${descriptor}`);
}

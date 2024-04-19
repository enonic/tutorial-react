import type {ImageComponent} from '@enonic/react-components';


import React from 'react';
import {cssToReactStyle} from '@enonic/react-components/src';


export const Image: ImageComponent = ({
	alt,
	// image,
	// imageStyle,
	sizes,
	src,
	srcset,
	styleStr,
}) => {
	// const {
	// 	_id,
	// 	_name,
	// 	_path,
	// 	type,
	// 	imageUrl
	// } = image;
	// const {
	// 	aspectRatio,
	// 	filter,
	// 	name
	// } = imageStyle;
	return <img
		alt={alt}
		sizes={sizes}
		src={src}
		srcSet={srcset}
		style={cssToReactStyle(styleStr)}
	/>;
}

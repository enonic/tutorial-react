import type {ImageComponent} from '@enonic/react-components';


import React from 'react';


export const Image: ImageComponent = ({
	alt,
	// image,
	// imageStyle,
	sizes,
	src,
	srcSet,
	style,
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
		srcSet={srcSet}
		style={style}
	/>;
}

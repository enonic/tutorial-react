import React from 'react';


export function Panel({
  config: {
    body = '',
    header = ''
  } = {},
	descriptor
}: {
  config?: {
    body?: string
    header?: string
  },
  descriptor: string
}) {
  const name = descriptor.split(':').pop();
	const headerEl = header && header.trim().length > 0 ? (<strong>{header}</strong>) : '';
	return <div className={`macro-panel macro-panel-${name} macro-panel-styled`}>
		<i className="icon"></i>
		{headerEl}
		{body}
	</div>;
}

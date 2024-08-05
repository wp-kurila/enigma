import React, {useRef, useEffect} 	from 'react';
import ReactDOM 					from 'react-dom';

interface Props {
	children: React.ReactElement | React.ReactElement[];
}

const Portal: React.FC<Props> = (props: Props): React.ReactElement => {

	return ReactDOM.createPortal(props.children, document.body);
}

export default React.memo(Portal);
import React, {useCallback, useState} 	from 'react';
import cn from 'classnames';

import styles 	from './index.css';

interface Props {
	component?: string;
	name: string;
	className?: string;
	label: string;
}

const Field: React.FC<Props> = (props: Props): React.ReactElement => {

	const {name, component = 'input', className = '', label} = props;
	const [focused, setFocused] = useState(false);

	const handleFocus = useCallback(() => {
		setFocused(true);
	}, []);

	const handleBlurComp = useCallback(() => {
		setFocused(false);
	}, []);

	const inputCls = cn(styles.input, {
		[styles.input_active]: focused
	});

	const newComponentProps = {
		name,
		className: inputCls,
		id: name,
	}

	const child = React.createElement(component, newComponentProps);

	const labelCls = cn(styles.label, {
		[styles.label_active]: focused
	});

	const cls = cn(styles.field, className);

	return (
		<div className={cls} onFocus={handleFocus} onBlur={handleBlurComp}>
			{child}
			<label htmlFor={name} className={labelCls}>{label}</label>
		</div>
	)
}

export default Field;
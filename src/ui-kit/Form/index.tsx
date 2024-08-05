import React, {useCallback} 	from 'react';

interface Props {
	children: React.ReactElement | React.ReactElement[] | React.ReactNode;
	onSubmit: () => void;
}

const Form: React.FC<Props> = ({children, onSubmit}: Props): React.ReactElement => {

	const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		onSubmit && onSubmit();
	}, [onSubmit]);

	return (
		<form onSubmit={handleSubmit} method="post" noValidate>
			{children}
		</form>
	)
}

export default Form;
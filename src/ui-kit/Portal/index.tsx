import { FC, ReactElement, ReactNode, memo } from 'react';
import ReactDOM from 'react-dom';

interface Props {
	children: ReactNode;
}

const Portal: FC<Props> = (props: Props): ReactElement => {
	return ReactDOM.createPortal(props.children, document.body);
};

export default memo(Portal);

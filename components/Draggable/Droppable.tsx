import { ReactNode, ReactNodeArray, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes, Modal } from '../';

export function Droppable ({children, color, id}: { children: ReactNode | ReactNodeArray, color: string, id: string }) {
	
	const [hasDropped, setHasDropped] = useState(false);

	const [{ isOver, canDrop }, drop] = useDrop(() => ({
		accept: ItemTypes.TEST,
		canDrop: () => true,
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
			canDrop: !!monitor.canDrop()
		}),
		drop: () => {
			setHasDropped(true);
			console.log(hasDropped);
		}
	}), []);

	useEffect(() => {
		if (hasDropped) console.log('dropped');
	}, [hasDropped]);

	return (
		<div className={`droppable is-${color} ${(isOver && canDrop) ? 'is-hovered' : ''} ${hasDropped ? 'is-active' : ''}`} ref={drop}>
			{children}
		</div>
	);
}
import { ReactNode, ReactNodeArray, useState } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../';

export function Draggable ({children, color, id}: { children: ReactNode | ReactNodeArray, color: string, id: string }) {

	const [{isDragging}, drag] = useDrag(() => ({
		type: ItemTypes.TEST,
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging()
		})
	}));

	return (
		<div ref={drag} className={`draggable is-${color} ${isDragging ? 'is-active' : ''}`}>
			<h5 className="title is-5">{children}</h5>
		</div>
	);
}

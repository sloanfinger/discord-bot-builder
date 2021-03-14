import { Draggable } from './';
import djs from '../interfaces/djs.json';

export function Menu ({mobile}: { mobile?: boolean }) {
	return (
		<div className="menu" style={{ padding: '1.5rem 1rem', minHeight: (mobile ? 'unset' : '100vh'), margin: '0 auto' }}>
			
			<div className="field">
				<div className="control">
				</div>
			</div>

			{djs?.classes[1]?.events?.map((event) => <Draggable color="primary" id="action">Event: {event.name}</Draggable>)}
			
		</div>
	);
}
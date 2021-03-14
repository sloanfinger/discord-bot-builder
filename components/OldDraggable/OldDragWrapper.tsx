import { Component, ReactNode, ReactNodeArray, } from 'react';

export class DragWrapper extends Component {
	children: ReactNode | ReactNodeArray;
	private static staticState: boolean = false;
	private static instances: DragWrapper[] = [];

	constructor({children}: { children: ReactNode | ReactNodeArray }) {
		super({children});
		this.children = children;
		DragWrapper.instances.push(this);
	}

	static setState: ((state: boolean) => void) = (state: boolean) => {
		DragWrapper.staticState = state;
		alert(DragWrapper.staticState);
		DragWrapper.instances.forEach((instance) => {
			instance.forceUpdate();
		})
	}

	static getState: (() => boolean) = () => {
		return DragWrapper.staticState;
	}

	render() {
		return (
			<div>
				{this.children}
			</div>
		);
	}
}

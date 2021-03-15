import { ReactNode, ReactNodeArray } from 'react';

export function Menu ({children, mobile, vcentered}: { children: ReactNode | ReactNodeArray, mobile?: boolean, vcentered?: boolean }) {
	return (
		<aside className="column is-one-quarter is-hidden-touch has-background-dark is-shadowed" style={{ zIndex: 1 }}>
			<div className="menu" style={{ padding: '1.5rem 1rem', margin: '0 auto' }}>
				<div className={`columns ${vcentered ? 'is-vcentered' : ''}`} style={{minHeight: (mobile ? 'unset' : 'calc(100vh - 5.75rem)')}}>
					<div className="column">
						{children}
					</div>
				</div>
			</div>	
		</aside>
	);
}
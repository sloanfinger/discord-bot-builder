import { ReactNode, ReactNodeArray } from 'react';
import { useRouter } from 'next/router';
import ContentEditable from 'react-contenteditable';
import { Content, Draggable, Droppable, Main, Menu, Throw404, Title, useEventState, Wraparound, WraparoundBody, WraparoundHeader } from '~/components';
import { action as actionInterface, condition as conditionInterface, event as eventInterface, ExpandableObject } from '~/interfaces';
import djs from '~/interfaces/djs.json';

export default function IndexPage () {

	const router = useRouter();

	const [event, setEventState] = useEventState(router.asPath.split('/').filter(path => path !== '')[1], router.asPath.split('/').filter(path => path !== '')[3]);
	if (!event) return Throw404();

	let djsEvent = event.event in djs.classes.Client.events ? djs.classes.Client.events[event.event as keyof typeof djs.classes.Client.events] : { customEvent: true };
	
	return (
		<>
			<Title>Home</Title>

			<Content>

				<Main>

					<Wraparound color="primary">
						<WraparoundHeader>
							<ContentEditable 
								className="title is-3" 
								html={event.name} 
								onChange={e => setEventState('name', e.target.value)} 
								onPaste={e => { e.preventDefault(); document.execCommand('insertHTML', false, e.clipboardData.getData('text/plain')) }} 
								style={{ marginBottom: 'calc(1.5rem - 9px)' }} 
								tagName="h3" 
							/>
							<h5 className="subtitle is-6 has-text-weight-bold" style={{ marginBottom: 0 }}>
								<span className="has-text-primary has-text-darker" style={{ textShadow: 'none' }}>Event&nbsp;&nbsp;</span>
								{event.event}
								<span className="has-text-primary has-text-darker" style={{ textShadow: 'none' }}>&nbsp;&nbsp;emits&nbsp;&nbsp;</span>
								{('params' in djsEvent && djsEvent.params.length)
									? djsEvent.params.map((param: typeof djsEvent.params[0], index: number) => index + 1 !== djsEvent.params.length 
									? index + 2 === djsEvent.params.length 
									? <>{param.name}<span className="has-text-primary has-text-darker" style={{ textShadow: 'none' }}> ,&nbsp;&nbsp;and&nbsp;&nbsp;</span></>
									: <>{param.name}<span className="has-text-primary has-text-darker" style={{ textShadow: 'none' }}> ,&nbsp;&nbsp;</span></> 
									: param.name)
									: <span className="has-text-primary has-text-darker" style={{ textShadow: 'none' }}>nothing</span>
								}
							</h5>
						</WraparoundHeader>
						<WraparoundBody>

							{(() => {
								const renderAction = (action: (actionInterface | conditionInterface)) => {
									return action.discriminator === 'action' ? (
										<div className="notification is-success">
											<h3 className="title is-3">{action.name}</h3>
											<h5 className="subtitle is-6 has-text-weight-bold" style={{ marginBottom: 0 }}>
												<span className="has-text-success has-text-darker" style={{ textShadow: 'none' }}>Execute&nbsp;&nbsp;</span>
												{action.method}
												{action.arguments.map((argument) => (
													<>
														<span className="has-text-success has-text-darker" style={{ textShadow: 'none' }}>&nbsp;&nbsp;with&nbsp;&nbsp;</span>
														{typeof argument === 'string' ? `"${argument}"` : argument}
													</>	
												))}
												<span className="has-text-success has-text-darker" style={{ textShadow: 'none' }}>&nbsp;&nbsp;on&nbsp;&nbsp;</span>
												{action.target}
											</h5>
										</div>
									) : (
										<Wraparound color="info">
											<WraparoundHeader>
												<h3 className="title is-3">{action.name}</h3>
												<h5 className="subtitle is-6 has-text-weight-bold" style={{ marginBottom: 0 }}>
													<span className="has-text-warning has-text-darker" style={{ textShadow: 'none' }}>If&nbsp;&nbsp;</span>
													{action.target}
													<span className="has-text-warning has-text-darker" style={{ textShadow: 'none' }}>&nbsp;&nbsp;{action.operator}&nbsp;&nbsp;</span>
													{typeof action.comparison === 'string' ? `"${action.comparison}"` : action.comparison}
												</h5>
											</WraparoundHeader>
											<WraparoundBody>
												{action.actions.map(action => renderAction(action))}
												<button className="button is-dark is-dashed is-fullwidth is-medium has-text-dimmed is-hoverable">
													<b><i className="fas fa-plus"></i>&nbsp;&nbsp;Add action or condition</b>
												</button>
											</WraparoundBody>
										</Wraparound>
									)
								};

								return event.actions.map((action) => renderAction(action));
							})()}

							<button className="button is-dark is-dashed is-fullwidth is-medium has-text-dimmed is-hoverable">
								<b><i className="fas fa-plus"></i>&nbsp;&nbsp;Add action or condition</b>
							</button>

						</WraparoundBody>
					</Wraparound>

				</Main>
			
				<Menu><></></Menu>

			</Content>
		</>
	)
}
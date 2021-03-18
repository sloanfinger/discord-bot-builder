import { useState } from 'react';
import { useRouter } from 'next/router';
import ContentEditable from 'react-contenteditable';
import { Content, Draggable, Droppable, Main, Menu, Modal, Tab, Tabs, Throw404, Title, useEventState, Wraparound, WraparoundBody, WraparoundHeader } from '~/components';
import { action as actionInterface, condition as conditionInterface, event as eventInterface, ExpandableObject } from '~/interfaces';
import djs from '~/interfaces/djs.json';

export default function IndexPage() {

	const router = useRouter();

	const [globalModalState, setGlobalModalState] = useState(false);
	const [globalModalPageState, setGlobalModalPageState] = useState('action');
	const [targetSelectionState, setTargetSelectionState] = useState('channel');
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

							<button className="button is-dark is-dashed is-fullwidth is-medium has-text-dimmed is-hoverable" onClick={setGlobalModalState.bind(null, true)}>
								<b><i className="fas fa-plus"></i>&nbsp;&nbsp;Add action or condition</b>
							</button>

						</WraparoundBody>
					</Wraparound>

				</Main>
				<Menu><></></Menu>
			</Content>

			<Modal state={[globalModalState, setGlobalModalState]}>
				<Tabs seamless={true}>
					<Tab active={globalModalPageState === 'action'} onClick={setGlobalModalPageState.bind(null, 'action')}>
						<span className="icon">
							<i className="fas fa-play-circle"></i>
						</span>
						<span>Action</span>
					</Tab>
					<Tab active={globalModalPageState === 'condition'} onClick={setGlobalModalPageState.bind(null, 'condition')}>
						<span className="icon">
							<i className="fas fa-code-branch fa-rotate-90"></i>
						</span>
						<span>Condition</span>
					</Tab>
				</Tabs>
				<div className="notification is-dark" style={globalModalPageState === 'action' ? {borderTopLeftRadius: 0, padding: '1.25rem 1.75rem'} : {padding: '1.25rem 1.75rem'}}>
					<h3 className="title is-4 has-text-dimmed">Click to Edit Name</h3>
					{/* <div className="columns is-vcentered">
						<div className="column" style={{ flex: 'auto', width: 'calc(50% - 0.75rem - (7em / 12))' }}>
							<div className="notification is-black menu" style={{ maxHeight: '16rem', overflowY: 'auto' }}>
								<ul className="menu-list">
									{djsEvent.params?.map(param => <li><a>{param.name}</a></li>)}
								</ul>
							</div>
						</div>
						<div className="column is-narrow">
							<i className="fas fa-arrow-right"></i>
						</div>
						<div className="column" style={{ flex: 'auto', width: 'calc(50% - 0.75rem - (7em / 12))' }}>
							<div className="notification is-black menu" style={{ maxHeight: '16rem', overflowY: 'auto' }}>
								<ul className="menu-list">
									{djs.classes[djsEvent.params[0].type[0][0]].methods.map(method => <li><a>{method.name}</a></li>)}
								</ul>
							</div>
						</div>
					</div> */}

					<div className="field" style={{ marginBottom: '1.5rem' }}>
						<div className="control is-expanded">
							<label className="label has-text-white">Target:</label>
							<div className="select is-fullwidth">
								<select onChange={(e) => setTargetSelectionState(e.target.value)}>
									{djsEvent.params?.map(param => <option>{param.name}</option>)}
								</select>
							</div>
						</div>
					</div>

					<div className="field" style={{ marginBottom: '1.5rem' }}>
						<div className="control is-expanded">
							<label className="label has-text-white">Action:</label>
							<div className="select is-fullwidth">
								<select>
									{djs.classes[djsEvent.params.filter(param => param.name === targetSelectionState)[0].type[0][0]].methods.filter(method => !method.returns || method.returns[0]?.[0] === 'void' || method.returns[0]?.[0]?.[0] === 'Promise').map(method => <option>{method.name}</option>)}
								</select>
							</div>
						</div>
					</div>

					<div className="field" style={{ marginBottom: '1.5rem' }}>
						<div className="control is-expanded">
							<label className="label has-text-white">Action:</label>
							<div className="select is-fullwidth">
								<select disabled={true}>
									<option>Nothing to Select!</option>
								</select>
							</div>
						</div>
					</div>

					<div className="has-text-right" style={{ width: '100%' }}>
						<button className="button is-primary"><i className="fas fa-plus"></i><b>&nbsp;&nbsp;&nbsp;Add to Event</b></button>
					</div>
				</div>
			</Modal>

		</>
	)
}
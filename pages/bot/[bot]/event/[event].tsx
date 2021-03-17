// import { useState } from 'react';

import { useRouter } from 'next/router';
import { Draggable, Throw404, useClientState, useEventState, Wraparound, WraparoundBody, WraparoundHeader } from '~/components';
import { Content, Main, Menu, Title } from '~/components';
import djs from '~/interfaces/djs.json';

export default function IndexPage () {

	const router = useRouter();

	const [event, setEventState] = useEventState(router.asPath.split('/').filter(path => path !== '')[1], router.asPath.split('/').filter(path => path !== '')[3]);
	if (!event) return Throw404();

	const djsEvent = djs.classes.Client.events[event.event];

	console.log(djsEvent);

	return (
		<>
			<Title>Home</Title>

			<Content>

				<Main>

					<div className="notification is-dark has-text-centered">
						<h3 className="title is-2" style={{ marginBottom: '0.75rem' }}>{event.name}</h3>
						{event.asynchronous && 
							<span className="tag is-black has-text-weight-bold has-text-primary" style={{marginRight: 'calc(2rem / 3)'}}>
								<i className="fas fa-stream"></i>&nbsp;&nbsp;ASYNC
							</span>
						}
						<span className="tag is-black has-text-weight-bold has-text-primary" style={{marginRight: 'calc(2rem / 3)'}}>
							{(Object.keys(djs.classes.Client.events).indexOf(event.event) === -1) ? <><i className="fas fa-bolt"></i>&nbsp;&nbsp;EVENT</> : <><i className="fas fa-pen-alt"></i>&nbsp;&nbsp;CUSTOM EVENT</>}
						</span>
						<span className="tag is-black has-text-weight-bold has-text-primary">
							<i className="fas fa-rss"></i>&nbsp;&nbsp;{event.event}
						</span>
					</div>

					<Wraparound color="primary">
						<WraparoundHeader>
							<div className="columns is-vcentered">
								<div className="column is-narrow">
									<span className="is-size-4 has-text-weight-bold has-text-primary has-text-darker" style={{ textShadow: 'none' }}>
										Event
									</span>
								</div>
								<div className="column is-narrow" style={{ paddingLeft: '0', paddingRight: '0' }}>
									<span className="is-size-4 has-text-weight-bold">
										{event.event}
									</span>
								</div>
								<div className="column is-narrow">
									<span className="is-size-4 has-text-weight-bold has-text-primary has-text-darker" style={{ textShadow: 'none' }}>
										emits:
									</span>
								</div>
								{djsEvent.params.map((param) => (
									<div className="column is-narrow">
										<Draggable color="primary" id="test">
											{param.name}
										</Draggable>
									</div>
								))}
							</div>
						</WraparoundHeader>
						<WraparoundBody>
							<div className="notification is-dark"></div>
						</WraparoundBody>
					</Wraparound>

				</Main>
			
				<Menu><></></Menu>

			</Content>
		</>
	)
}
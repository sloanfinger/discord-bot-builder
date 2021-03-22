import { useState } from 'react';
import { useRouter } from 'next/router';

import djs from '~/interfaces/djs.json';
import { Content, Link, Main, Menu, Title, Throw404, useClientState, useEventState } from '~/components';

export default function IndexPage () {

	const [searchBar, setSearchBar] = useState('');
	const [syncFilter, setSyncFilter] = useState(true);
	const [asyncFilter, setAsyncFilter] = useState(true);
	const [eventsFilter, setEventsFilter] = useState(true);
	const [customEventsFilter, setCustomEventsFilter] = useState(true);

	const router = useRouter();

	const [client] = useClientState(router.asPath.split('/').filter(path => path !== '')[1]);
	if (!client) return Throw404();
	
	const djsEvents = Object.keys(djs.classes.Client.events);

	return (
		<>
			<Title>Home</Title>

			<Content>

				<Main>
					<div className="field" style={{ marginBottom: '1.5rem' }}>
						<div className="control has-icons-left">
							<input className="input is-medium is-black" placeholder="Search Events" onChange={(e) => setSearchBar(e.target.value)} />
							<span className="icon is-small is-left">
								<i className="fas fa-search"></i>
							</span>
						</div>
					</div>

					<fieldset className="notification columns is-light has-text-centered" style={{ margin: '0 0 1.5rem 0' }}>
						<div className="column">
							<div className="field">
								<div className="control">
									<input className="is-checkradio is-primary" type="checkbox" id="syncFilter" name="syncFilter" checked={syncFilter} onChange={(e) => setSyncFilter(e.target.checked)} />
									<label htmlFor="syncFilter">Synchronous</label>
								</div>
							</div>
						</div>
						<div className="column">
							<div className="field">
								<div className="control">
									<input className="is-checkradio is-primary" type="checkbox" id="asyncFilter" name="asyncFilter" checked={asyncFilter} onChange={(e) => setAsyncFilter(e.target.checked)} />
									<label htmlFor="asyncFilter">Asynchronous</label>
								</div>
							</div>
						</div>
						<div className="column">
							<div className="field">
								<div className="control">
									<input className="is-checkradio is-primary" type="checkbox" id="eventsFilter" name="eventsFilter" checked={eventsFilter} onChange={(e) => setEventsFilter(e.target.checked)} />
									<label htmlFor="eventsFilter">Events</label>
								</div>
							</div>
						</div>
						<div className="column">
							<div className="field">
								<div className="control">
									<input className="is-checkradio is-primary" type="checkbox" id="customEventsFilter" name="customEventsFilter" checked={customEventsFilter} onChange={(e) => setCustomEventsFilter(e.target.checked)}  />
									<label htmlFor="customEventsFilter">Custom Events</label>
								</div>
							</div>
						</div>
					</fieldset>

					{client.events
						.filter(event => 
							(event.name.toLowerCase().replace(/[^\w]/g, '').search(searchBar.toLowerCase().replace(/[^\w]/g, '')) !== -1) && (
								((djsEvents.indexOf(event.event) !== -1 ||  (eventsFilter && djsEvents.indexOf(event.event) === -1)) && 
								(djsEvents.indexOf(event.event) === -1 ||  (customEventsFilter && djsEvents?.indexOf(event.event) !== -1))) && 
								((event.asynchronous || (syncFilter && !event.asynchronous)) &&
								(!event.asynchronous || (asyncFilter && event.asynchronous)))
							)
						)
						.map(event => (

							<Link href={`/bot/${client.key}/event/${event.key}/`} className="notification is-primary" style={{display: 'block'}}>
								{event.asynchronous && 
									<span className="tag is-white has-text-weight-bold has-text-primary" style={{marginRight: 'calc(2rem / 3)'}}>
										<i className="fas fa-stream"></i>&nbsp;&nbsp;ASYNC
									</span>
								}
								<span className="tag is-white has-text-weight-bold has-text-primary" style={{marginRight: 'calc(2rem / 3)', marginBottom: '0.75rem'}}>
									{(djsEvents.indexOf(event.event) === -1) ? <><i className="fas fa-bolt"></i>&nbsp;&nbsp;EVENT</> : <><i className="fas fa-pen-alt"></i>&nbsp;&nbsp;CUSTOM EVENT</>}
								</span>
								<span className="tag is-white has-text-weight-bold has-text-primary">
									<i className="fas fa-rss"></i>&nbsp;&nbsp;{event.event}
								</span>
								<h4 className="title is-4">{event.name}</h4>
							</Link>

						))
					}

				</Main>
			
				<Menu vcentered={true}>
					{/* {djs?.classes[1]?.events?.map((event) => <Draggable color="primary" id="action">Event: {event.name}</Draggable>)} */}
					{/* <div className */}
					
					<div className="has-text-centered">

						{/* <figure className="image" style={{ marginLeft: 'calc(50% - (12.5% + 1rem))', marginBottom: '1.5rem', maxWidth: 'calc(25% + 2rem)' }}>
							<img className="is-rounded" src="/test_logo.jpg" style={{ boxShadow: '0px 0px 6px rgba(0, 0, 0, calc(2 / 3))' }} />
						</figure> */}

						<h3 className="title is-4 has-text-white" style={{ marginBottom: '1.5rem' }}>{client.name}</h3>

						<hr style={{ margin: '0 0 1.5rem 0' }} />

						<div className="notification is-primary is-hoverable">
							New Event&nbsp;&nbsp;&nbsp;<i className="fas fa-plus"></i>
						</div>

						<div className="notification is-danger is-hoverable">
							Create Custom Event&nbsp;&nbsp;&nbsp;<i className="fas fa-pen-alt"></i>
						</div>

						<div className="notification is-warning is-hoverable">
							Export Bot&nbsp;&nbsp;&nbsp;<i className="fas fa-rocket"></i>
						</div>

					</div>

				</Menu>

			</Content>
		</>
	)
}
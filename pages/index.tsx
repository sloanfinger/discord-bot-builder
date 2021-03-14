import { useState } from 'react'

import framework from '../interfaces/framework.json';
import djs from '../interfaces/djs.json';
import { Title, Droppable } from '../components';

export default function IndexPage () {

	const [searchBar, setSearchBar] = useState('');
	const [asyncFilter, setAsyncFilter] = useState(true);
	const [eventsFilter, setEventsFilter] = useState(true);
	const [customEventsFilter, setCustomEventsFilter] = useState(true);

	const djsEvents = djs.classes[1].events.map(event => event.name);
	const colors = ['primary', 'success', 'info', 'warning', 'danger'];

	return (
		<>
			<Title>Home</Title>

			<div className="field" style={{ marginBottom: '1.5rem' }}>
				<div className="control has-icons-left">
					<input className="input is-medium is-black" placeholder="Search Events" onChange={(e) => setSearchBar(e.target.value)} />
					<span className="icon is-small is-left">
						<i className="fas fa-search"></i>
					</span>
				</div>
			</div>

			<fieldset className="draggable columns is-dark has-text-centered" style={{ margin: '0 0 1.5rem 0' }}>
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

			{Object.entries(framework.clients[0].events)
				.filter(([event]) => (djsEvents.indexOf(event) !== -1 ||  (eventsFilter && djsEvents.indexOf(event) === -1)) && (djsEvents.indexOf(event) === -1 ||  (customEventsFilter && djsEvents.indexOf(event) !== -1)))
				.map(([event, callbacks]) => callbacks
					.filter(callback => (callback.name.toLowerCase().replace(/[^\w]/g, '').search(searchBar.toLowerCase().replace(/[^\w]/g, '')) !== -1) && (!callback.asynchronous || (asyncFilter && callback.asynchronous)))
					.map(callback => (

						<div className={`draggable is-`}>
							{callback.asynchronous && 
								<span className="tag is-white has-text-weight-bold has-text-primary" style={{marginRight: 'calc(2rem / 3)'}}>
									<i className="fas fa-stream"></i>&nbsp;&nbsp;ASYNC
								</span>
							}
							<span className="tag is-white has-text-weight-bold has-text-primary" style={{marginRight: 'calc(2rem / 3)', marginBottom: '0.75rem'}}>
								{(djsEvents.indexOf(event) === -1) ? <><i className="fas fa-bolt"></i>&nbsp;&nbsp;EVENT</> : <><i className="fas fa-pen"></i>&nbsp;&nbsp;CUSTOM EVENT</>}
							</span>
							<span className="tag is-white has-text-weight-bold has-text-primary">
								<i className="fas fa-rss"></i>&nbsp;&nbsp;{event}
							</span>
							<h4 className="title is-4">{callback.name}</h4>
						</div>

			)))}

		</>
	)
}
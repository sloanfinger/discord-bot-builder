import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useRouter } from 'next/router';
import { Content, Main, Menu, Throw404, Title, useEventState } from '~/components';
import { action as actionInterface, condition as conditionInterface, event as eventInterface, ExpandableObject, ValueOf } from '~/interfaces';
import djs from '~/interfaces/djs.json';

export default function ActionMutator () {

	const router = useRouter();

    const [createActionType, setCreateActionType] = useState('action');
    const [actionName, setActionName] = useState('');
    const [actionTarget, setActionTarget] = useState({});
    const [actionMethod, setActionMethod] = useState({});
    const [event, setEventState] = useEventState(router.query.bot, router.query.event);
    
	if (!event) return Throw404();

	// Throw 404 instead of handling custom event
	if (!(event.event in djs.classes.Client.events)) {
        return Throw404();
    }
    
    const djsEvent = djs.classes.Client.events[event?.event as keyof typeof djs.classes.Client.events] as ValueOf<typeof djs.classes.Client.events> ?? undefined;

    // const addActionToEvent = () => {
    //     setEventState('actions', event.actions.concat([{
    //         arguments: [],
    //         discriminator: 'action',
    //         key: uuid(),
    //         method: actionMethod.name,
    //         name: actionName,
    //         target: actionTarget.name
    //     }]));
    //     router.back();
    // }

    const actionQueries = Array.from(router.query.catchall ?? []).filter((query, i, fullQuery) => (
        fullQuery[i - 1] === 'action' 
        // && uuidValidate(query) 
        // && uuidVersion(query)
    ));

    // let currentAction = actionQueries.reduce((action, query) => {
    //     if (typeof action === 'boolean') return false;
    //     const subAction = action.actions.filter((action: (actionInterface | conditionInterface)) => action.key === query)?.[0];
    //     if (!subAction) return false;
    //     else return subAction;
    // }, event as (actionInterface | conditionInterface | eventInterface | boolean));

    // if (!currentAction) return Throw404();

    // const reducer = (recursions: number, reduced: ExpandableObject<any>, [key, value]: [key: string, value: any]) => {
    //     // console.log(key, recursions);

    //     if (key !== 'actions') reduced[key] = value;
    //     else {
    //         reduced.actions = value ?? [];
    //         console.log(value);
    //         if (recursions < actionQueries.length) {
    //             let index = reduced.actions.findIndex((item: (actionInterface | conditionInterface)) => item.key === actionQueries[recursions]);
    //             reduced.actions[index] = Object.entries(reduced.actions[index]).reduce(reducer.bind(null, recursions + 1), reduced);
    //         } else {
    //             console.log('end reached!');
    //         }
    //     }
    //     return reduced;
    // };

    // console.log(Array.from(Object.entries(event)).reduce(reducer.bind(null, 0), {} as ExpandableObject<any>));
    console.log(event);

    return (<p>page loaded</p>);

    // return (
    //     <>
    //         <Title>Home</Title>

    //         <Content>
    //             <Main>

    //                 <div className="spacer"></div>

    //                 <h2 className="title is-2">Create a new...</h2>

    //                 <section className="columns is-mobile">
    //                     <div className="column is-half">
    //                         <div className={`notification is-hoverable ${createActionType === 'action' ? 'is-success' : 'is-light'} has-text-centered`} onClick={() => { setCreateActionType('action') }}>
    //                             <b>Action</b>
    //                         </div>
    //                     </div>
    //                     <div className="column is-half">
    //                         <div className={`notification is-hoverable ${createActionType === 'condition' ? 'is-info' : 'is-light'} has-text-centered`} onClick={() => { setCreateActionType('condition') }}>
    //                             <b>Condition</b>
    //                         </div>
    //                     </div>
    //                 </section>

    //                 <section style={createActionType === 'action' ? {} : { display: 'none' }}>

    //                     <div className="spacer is-large"></div>

    //                     <h4 className="title is-4" style={{ marginBottom: '0.75rem' }}>Name Your Action:</h4>

    //                     <div className="field">
    //                         <div className="control has-icons-left has-icons-right">
    //                             <input className="input is-black is-medium" onChange={(e) => { setActionName(e.target.value) }} placeholder="My Amazing Action™" type="text" />
    //                             <span className="icon is-small is-left">
    //                                 <i className="fas fa-signature"></i>
    //                             </span>
    //                             <span className="icon is-small is-right">
    //                                 <i className="loader"></i>
    //                             </span>
    //                         </div>
    //                         <p className="help is-danger">
    //                             &nbsp;
    //                             {/* <i className="fas fa-exclamation-triangle"></i>&nbsp;&nbsp;asdf */}
    //                         </p>
    //                     </div>

    //                     <div className="spacer is-medium"></div>

    //                     <h4 className="title is-4" style={{ marginBottom: '0.75rem' }}>Select a Target:</h4>

    //                     <div className="columns is-multiline">
    //                         {djsEvent.params.map(param => (
    //                             <div className="column is-one-quarter">
    //                                 <div className={`notification is-hoverable ${actionTarget.name === param.name ? 'is-success' : 'is-light'} has-text-centered`} onClick={() => { setActionTarget(param) }}>
    //                                     <strong>{param.name}</strong><br />
    //                                     <span style={{ fontSize: '0.75rem'}}>{param.description}</span>
    //                                 </div>
    //                             </div>
    //                         ))}
    //                     </div>

    //                     <div className="spacer is-medium"></div>

    //                     <h4 className="title is-4" style={{ marginBottom: '0.75rem' }}>Select an Action:</h4>

    //                     <div className="columns is-multiline">
    //                         {/* Need to clean up this filter */}
    //                         {djs.classes[djsEvent.params.filter(param => param.name === (actionTarget.name || djsEvent.params[0].name))[0].type[0][0]].methods.filter(method => !method.returns || method.returns[0]?.[0] === 'void' || method.returns[0]?.[0]?.[0] === 'Promise').map(method => (
    //                             <div className="column is-one-quarter">
    //                                 <div className={`notification is-hoverable ${actionMethod.name === method.name ? 'is-success' : 'is-light'} has-text-centered`} onClick={() => { setActionMethod(method) }} style={{ height: '100%' }}>
    //                                     <strong>{method.name}</strong><br />
    //                                     <span style={{ fontSize: '0.75rem'}}>{method.description}</span>
    //                                 </div>
    //                             </div>
    //                         ))}
    //                     </div>
                        
    //                     {actionMethod.params && actionMethod.params.length ? (
    //                         <>
    //                             <div className="spacer is-medium"></div>
    //                             <h4 className="title is-4" style={{ marginBottom: '0.75rem' }}>Set Action Parameters:</h4>
    //                             <div className="notification is-light" style={{ padding: '1.25rem 1rem '}}>
    //                                 {actionMethod.params.map((param, index) => (
    //                                     <>
    //                                         <div className="field">
    //                                             <label className="label has-text-white">
    //                                                 <strong style={{ fontSize: '1rem' }}>{param.name}</strong><br />
    //                                                 <span style={{ fontSize: '0.75rem', fontWeight: 'normal' }}>{param.description}</span>
    //                                             </label>
    //                                             <div className="control has-icons-left has-icons-right">
    //                                                 <input className="input is-medium is-black is-normal" />
    //                                                 <span className="icon is-left">
    //                                                     <i className="fas fa-i-cursor"></i>
    //                                                 </span>
    //                                                 <span className="icon is-right">
    //                                                     <i className="loader"></i>
    //                                                 </span>
    //                                             </div>
    //                                         </div>
    //                                         {((index + 1) !== actionMethod.params.length) && <div className="spacer is-small"></div>}
    //                                     </>
    //                                 ))}
    //                             </div>
    //                         </>
    //                     ) : <></>}

    //                     <div className="spacer is-medium"></div>

    //                     <div className="buttons is-right">
    //                         <button className="button is-medium is-light" onClick={() => { router.back() }}>
    //                             <span className="icon"><i className="fas fa-ban"></i></span>
    //                             <strong>Cancel</strong>
    //                         </button>
    //                         <button className="button is-medium is-success" onClick={addActionToEvent}>
    //                             <span className="icon"><i className="fas fa-plus"></i></span>
    //                             <strong>Add to Event</strong>
    //                         </button>
    //                     </div>

    //                 </section>

    //                 <section style={createActionType === 'condition' ? {} : { display: 'none' }}>
    //                 </section>
 
    //             </Main>
    //             <Menu>
                    
    //             </Menu>
    //         </Content>
    //     </>
    // );
}
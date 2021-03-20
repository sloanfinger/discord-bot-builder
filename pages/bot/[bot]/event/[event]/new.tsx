import { useState } from 'react';
import { useRouter } from 'next/router';
import { Content, Main, Throw404, Title, useEventState } from '~/components';
import { action as actionInterface, condition as conditionInterface, event as eventInterface, ExpandableObject } from '~/interfaces';
import djs from '~/interfaces/djs.json';

export default function IndexPage() {

    const router = useRouter();

    const [targetSelectionState, setTargetSelectionState] = useState('channel');
    const [event, setEventState] = useEventState(router.asPath.split('/').filter(path => path !== '')[1], router.asPath.split('/').filter(path => path !== '')[3]);
    if (!event) return Throw404();

    let djsEvent = event.event in djs.classes.Client.events ? djs.classes.Client.events[event.event as keyof typeof djs.classes.Client.events] : { customEvent: true };
    return (
        <>
            <Title>Home</Title>

            <Content>
                <Main>
                    <div className="notification is-dark" style={{ padding: '1.25rem 1.75rem' }}>
                        <h3 className="title is-4 has-text-dimmed">Click to Edit Name</h3>

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

                </Main>
            </Content>
        </>
    );
}
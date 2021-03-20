import EventEmitter from 'events';
import { Component,  ReactNode, ReactNodeArray } from 'react'

export class ModalToggle extends EventEmitter {

    open () {
        this.emit('open');
    }

    close () {
        this.emit('close');
    }

}

export class Modal extends Component {
    key: number;
    private static instances: Modal[] = [];

    constructor(props: { children: ReactNode | ReactNodeArray, toggle: ModalToggle }) {
        super(props);

        this.state = {
            active: true
        };
        this.key = Modal.instances.length;
        Modal.instances.push(this);

        props.toggle.on('open', () => {
            this.open();
        });

        props.toggle.on('close', () => {
            this.close();
        });

    }

    close () {
        this.setState(() => ({ active: 'inactive' }), () => {
            Modals.instances.forEach(instance => {
                instance.forceUpdate();
            });
        });
    }

    open () {
        this.setState(() => ({ active: 'active' }), () => {
            Modals.instances.forEach(instance => {
                instance.forceUpdate();
            });
        });
    }

    render () {
        return (<></>);
    }

    static renderAll () {
        return Modal.instances.map(instance => [(

            <div className="hero is-fullheight-with-navbar is-black">
                <div className="hero-body" style={{ minHeight: 'calc(100vh - 3.25rem)' }}>
                    {instance.props.children}
                </div>
            </div>

        ), instance.state.active === 'active']).reduce((reduced, current) => {
            reduced[0].push(current[0]);
            reduced[1] = reduced[1] || current[1];
            return reduced;
        }, [[], false]);
    }

}

export class Modals extends Component {
    static instances: Modals[] = [];
    private modalState: boolean = false;
    key: number;

    constructor(props: { handleStateChange?: ((state: boolean) => void) }) {
        super(props);
        this.key = Modals.instances.length;
        Modals.instances.push(this);
    }

    render() {
        let [modals, state] = Modal.renderAll();
        if (this.modalState !== state) {
            this.modalState = state;
            this.props.handleStateChange?.(state);
        }
        return modals;
    }

}
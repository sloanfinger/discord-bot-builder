import { Component, createRef, MouseEvent, ReactNode, ReactNodeArray, Ref } from 'react';

export function WraparoundHeader({ children }: { children: ReactNode | ReactNodeArray }) {
    return <>{children}</>;
}

export function WraparoundBody({ children }: { children: ReactNode | ReactNodeArray }) {
    return <>{children}</>;
}

export class Wraparound extends Component {

    private children: [ReturnType<typeof WraparoundHeader>, ReturnType<typeof WraparoundBody>];
    private color?: ('primary' | 'success' | 'info' | 'warning' | 'danger' | 'white' | 'light' | 'dark' | 'black');
    private contentRef: Ref<any> = createRef();
    private index: number;

    private static instances: Wraparound[] = [];

    constructor(props: { children: [ReturnType<typeof WraparoundHeader>, ReturnType<typeof WraparoundBody>], color?: ('primary' | 'success' | 'info' | 'warning' | 'danger' | 'white' | 'light' | 'dark' | 'black')  }) {
        super(props);
        this.children = props.children;
        this.color = props.color;
        this.index = Wraparound.instances.length;
        this.state = {
            active: true,
            mouseOver: false
        }
        Wraparound.instances.push(this);
        console.log(Wraparound.instances);
    }

    // Still too jittery :'(
    private handleCollapseClick = () => {
        let target = this.contentRef.current;
        if (target) {
            if (this.state.active) {
                let height = target.offsetHeight;
                let transition = target.style.transition;
                target.style.transition = '';
                requestAnimationFrame(() => {
                    target.style.overflow = 'hidden';
                    target.style.height = height + 'px';
                    target.style.transition = transition;
                    requestAnimationFrame(() => {
                        target.style.height = '0px';
                        target.style.paddingTop = '0px';
                        target.style.paddingBottom = '0px';
                    });
                });
            } else {
                let transition = target.style.transition
                target.style.transition = 'none';
                requestAnimationFrame(() => {
                    target.style.paddingTop = '';
                    target.style.paddingBottom = '';
                    // target.style.height = null;
                    requestAnimationFrame(() => {
                        let height = target.scrollHeight;
                        console.log(height);
                        target.style.paddingTop = '0px';
                        target.style.paddingBottom = '0px';
                        target.style.transition = transition;
                        requestAnimationFrame(() => {
                            target.style.overflow = 'hidden';
                            target.style.height = height + 'px';
                            target.style.paddingTop = '';
                            target.style.paddingBottom = '';
                            setTimeout(function () {
                                target.style.height = null;
                                target.style.overflow = '';
                            }, 250);
                        });
                    });
                });
            }
            this.setState({ active: !this.state.active });
        }
    }

    private handleMouseOver = (e: MouseEvent) => {
        e.stopPropagation();
        this.setState({ mouseOver: true });
        Wraparound.instances.forEach((instance) => {
            if (instance.index !== this.index) instance.setState({ mouseOver: false });
            instance.forceUpdate();
        });
    }

    private handleMouseLeave = () => {
        Wraparound.instances.forEach((instance) => {
            instance.setState({ mouseOver: false });
            instance.forceUpdate();
        });
    }

    private stopPropagation = (e: MouseEvent) => {
        Wraparound.instances.forEach((instance) => {
            instance.setState({ mouseOver: false });
            instance.forceUpdate();
        });
        e.stopPropagation();
    }

    render () {
        return (
            <div className={`wraparound is-${this.color}`} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} style={{ cursor: 'pointer', paddingBottom: this.state.active ? '' : '0.75rem', transform: this.state.mouseOver ? 'scale(1.0125)' : 'scale(1)', transition: 'transform .25s' }}>

                <div className="columns is-mobile" style={{ marginBottom: '0', paddingBottom: this.state.active ? '' : '0px', transition: 'padding .25s' }}>
                    <div className="column" style={{ paddingBottom: this.state.active ? '' : '0px', transition: 'padding .25s' }}>
                        {this.children[0]}
                    </div>
                    <div className="column is-narrow" style={{ paddingBottom: this.state.active ? '' : '0px', paddingRight: '1.5rem', transition: 'padding .25s' }}>
                        <button className={`collapse ${this.state.active ? 'is-active' : ''} is-medium`} onClick={this.handleCollapseClick}>
                            <i className="fas fa-chevron-down"></i>
                        </button>
                    </div>
                </div>

                <div className="wraparound-content is-black" onMouseOver={this.stopPropagation} style={{ cursor: 'default' }} ref={this.contentRef} >
                    <div style={{ transform: this.state.mouseOver ? 'scale(calc(1 / 1.0125))' : 'scale(1)', transition: 'transform .25s' }}>
                        {this.children[1]}
                    </div>
                </div>

            </div>
        );
    }
}
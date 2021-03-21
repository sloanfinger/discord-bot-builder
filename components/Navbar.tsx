import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Link, Logo } from '.';

import framework from '~/interfaces/defaultClientsState.json';

export function Navbar () {

    const router = useRouter();
    const [logoText, setLogoText] = useState('Discord Bot Builder');
    const logoTexts = ['Discord Bot Builder', 'Don\'t Botch Babies', 'Dubious Body Builders'];

    const burgerRef = useRef(null);
    const menuRef = useRef(null);

    const navbarToggle = function () {
        let burger = burgerRef.current as unknown as HTMLAnchorElement;
        let menu = menuRef.current as unknown as HTMLDivElement;

        if (burger.classList.contains('is-active')) {
            requestAnimationFrame(() => {
                menu.style.transition = 'none';
                menu.style.height = '';
                let height = menu.clientHeight;
                requestAnimationFrame(() => {
                    menu.style.height = height + 'px';
                    requestAnimationFrame(() => {
                        burger.classList.remove('is-active');
                        menu.style.transition = 'height .2s';
                        menu.style.height = '0px';
                        menu.style.overflowY = 'hidden';
                        (document.body.parentElement as HTMLHtmlElement).style.overflowY = 'auto';
                        setTimeout(() => {
                            menu.classList.remove('is-active');
                        }, 200);
                    });
                });
            });
        } else {
            requestAnimationFrame(() => {
                burger?.classList?.add?.('is-active');
                menu.classList.add('is-active');
                menu.style.transition = 'none';
                menu.style.height = '';
                let height = menu.clientHeight;
                menu.style.height = '0px';
                requestAnimationFrame(() => {
                    menu.style.transition = 'height .2s';
                    menu.style.height = height + 'px';
                    menu.style.overflowY = 'hidden';
                    setTimeout(() => {
                        menu.style.overflowY = 'auto';
                        (document.body.parentElement as HTMLHtmlElement).style.overflowY = 'hidden';
                        menu.style.transition = 'none';
                        menu.style.height = '';
                    }, 200);
                });
            });
        }
    }

	return (
        <nav className="navbar is-black is-fixed-top is-shadowed" role="navigation" aria-label="main navigation">

            {/* Navbar Brand */}
            <div className="navbar-brand">

                {/* Logo */}
                <a className="navbar-item" onClick={() => { setLogoText(logoTexts[Math.floor(Math.random() * logoTexts.length)]) }}>
                    <Logo logoText={logoText} />
                </a>

                {/* Burger Icon (Mobile Only) */}
                <a role="button" className="navbar-burger" aria-label="menuRef" ref={burgerRef} onClick={navbarToggle} aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>

            </div>

            {/* Navbar Menu (Desktop)*/}
            <div className="navbar-menu">
                <div className="navbar-end">

                    {/* Bot Selector */}
                    <div className="navbar-item has-dropdown is-hoverable">

                        <a className="navbar-link has-text-white has-text-font-bold">
                            {framework.clients.filter(client => client.key == router.asPath.split('/').filter(path => path.length > 0)[1])[0]?.name}
                        </a>

                        <div className="navbar-dropdown is-right" style={{ borderTopWidth: '3px' }}>
                            {framework.clients.map(client => (
                                <Link href={`/bot/${client.key}`} className="navbar-item has-text-white has-text-weight-bold">
                                    {client.name}
                                </Link>
                            ))}
                            <hr className="navbar-divider" />
                            <a className="navbar-item has-text-success has-text-weight-bold">
                                New Bot&nbsp;&nbsp;<i className="fas fa-plus"></i>
                            </a>
                        </div>

                    </div>

                </div>
            </div>

            {/* Navbar Menu (Mobile)*/}
            <div className="navbar-menu has-background-dark is-hidden-desktop" ref={menuRef} style={{ padding: 0 }}>
                <div className="navbar-end">    

                    <a className="navbar-link has-text-white has-text-weight-bold">
                        {framework.clients.filter(client => client.key == router.asPath.split('/').filter(path => path.length > 0)[1])[0]?.name}
                    </a>

                    <div className="navbar-dropdown is-right" style={{ borderTopWidth: '3px' }}>
                        {framework.clients.map(client => (
                            <Link href={`/bot/${client.key}`} className="navbar-item has-text-weight-bold">
                                {client.name}
                            </Link>
                        ))}
                        <hr className="navbar-divider" />
                        <a className="navbar-item has-text-success has-text-weight-bold">
                            New Bot&nbsp;&nbsp;<i className="fas fa-plus"></i>
                        </a>
                    </div>

                </div>
            </div>
        </nav>
	)
}
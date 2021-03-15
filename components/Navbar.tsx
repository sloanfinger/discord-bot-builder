import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Link, Logo, Menu } from '.';

import framework from '~/interfaces/framework.json';

export function Navbar () {

    const router = useRouter();
    const [changesToSave, setChangesToSave] = useState(false);
    const [logoText, setLogoText] = useState('Discord Bot Builder');
    const logoTexts = ['Discord Bot Builder', 'Don\'t Botch Babies', 'Dubious Body Builders'];

    const burger = useRef(null);
    const menu = useRef(null);

    const navbarToggle = function () {
        if (burger.current.classList.contains('is-active')) {
            requestAnimationFrame(() => {
                menu.current.style.transition = 'none';
                menu.current.style.height = '';
                let height = menu.current.clientHeight;
                requestAnimationFrame(() => {
                    menu.current.style.height = height + 'px';
                    requestAnimationFrame(() => {
                        burger.current.classList.remove('is-active');
                        menu.current.style.transition = 'height .2s';
                        menu.current.style.height = '0px';
                        menu.current.style.overflowY = 'hidden';
                        document.body.parentElement.style.overflowY = 'auto';
                        setTimeout(() => {
                            menu.current.classList.remove('is-active');
                        }, 200);
                    });
                });
            });
        } else {
            requestAnimationFrame(() => {
                burger.current?.classList?.add?.('is-active');
                menu.current.classList.add('is-active');
                menu.current.style.transition = 'none';
                menu.current.style.height = '';
                let height = menu.current.clientHeight;
                menu.current.style.height = '0px';
                requestAnimationFrame(() => {
                    menu.current.style.transition = 'height .2s';
                    menu.current.style.height = height + 'px';
                    menu.current.style.overflowY = 'hidden';
                    setTimeout(() => {
                        menu.current.style.overflowY = 'auto';
                        document.body.parentElement.style.overflowY = 'hidden';
                        menu.current.style.transition = 'none';
                        menu.current.style.height = '';
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
                <a role="button" className="navbar-burger" aria-label="menu" ref={burger} onClick={navbarToggle} aria-expanded="false">
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
            <div className="navbar-menu has-background-dark is-hidden-desktop" ref={menu} style={{ padding: 0 }}>
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
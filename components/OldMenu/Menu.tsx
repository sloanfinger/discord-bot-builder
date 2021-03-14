import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MenuList, MenuItem } from '.';

let menuUsed: string = '';

export function Menu ({mobile}: { mobile?: boolean }) {

	const route = useRouter().pathname;

	const [generalMenu, setGeneralMenu]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(!!route.match(/^\/((?!(calendar|blog|newsletter|shop|analytics))|(calendar[\w]+|blog[\w]+|newsletter[\w]+|shop[\w]+|analytics[\w]+))[\w]*\/?$/) && !mobile);
	const [calendarMenu, setCalendarMenu]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(!!route.match(/^\/calendar(\/[\w]*)?\/?$/) && !mobile);
	const [blogMenu, setBlogMenu]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(!!route.match(/^\/blog(\/[\w]*)?\/?$/) && !mobile);
	const [newsletterMenu, setNewsletterMenu]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(!!route.match(/^\/newsletter(\/[\w]+)?\/?$/) && !mobile);
	const [shopMenu, setShopMenu]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(!!route.match(/^\/shop(\/[\w]*)?\/?$/) && !mobile);
	const [analyticsMenu, setAnalyticsMenu]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(!!route.match(/^\/analytics(\/[\w]*)?\/?$/) && !mobile);

	useEffect(() => {
		console.log(menuUsed);

		let activeStates: number = 0;
		([generalMenu, calendarMenu, blogMenu, newsletterMenu, shopMenu, analyticsMenu]).forEach((state) => {
			if (state) activeStates++;
		});

		if (activeStates > 1) {
			console.log(activeStates);
			if (menuUsed == 'generalMenu') setGeneralMenu(false);
			if (menuUsed == 'calendarMenu') setCalendarMenu(false);
			if (menuUsed == 'blogMenu') setBlogMenu(false);
			if (menuUsed == 'newsletterMenu') setNewsletterMenu(false);
			if (menuUsed == 'shopMenu') setShopMenu(false);
			if (menuUsed == 'analyticsMenu') setAnalyticsMenu(false);
		}

		if (generalMenu) menuUsed = 'generalMenu';
		if (calendarMenu) menuUsed = 'calendarMenu';
		if (blogMenu) menuUsed = 'blogMenu';
		if (newsletterMenu) menuUsed = 'newsletterMenu';
		if (shopMenu) menuUsed = 'shopMenu';
		if (analyticsMenu) menuUsed = 'analyticsMenu';

	}, [generalMenu, calendarMenu, blogMenu, newsletterMenu, shopMenu, analyticsMenu]);

	return (
		<div className="menu" style={{ padding: '1.5rem 1rem', minHeight: (mobile ? 'unset' : '100vh'), margin: '0 auto' }}>
			<hr />
			<MenuList title="General" state={[generalMenu, setGeneralMenu]}>
				<MenuItem href="/"><i className="fas fa-th-large"></i>&nbsp;&nbsp;&nbsp;Dashboard</MenuItem>
				<MenuItem href="/help"><i className="fas fa-question"></i>&nbsp;&nbsp;&nbsp;Help</MenuItem>
				<MenuItem href="/users"><i className="fas fa-users"></i>&nbsp;&nbsp;&nbsp;Your Team</MenuItem>
				<MenuItem href="/organization"><i className="fas fa-users-cog"></i>&nbsp;&nbsp;&nbsp;Team Settings</MenuItem>
				<MenuItem href="/server"><i className="fas fa-server"></i>&nbsp;&nbsp;&nbsp;Server Settings</MenuItem>
			</MenuList>
			<hr />
			<MenuList title="Calendar" state={[calendarMenu, setCalendarMenu]}>
				<MenuItem href="/calendar/events"><i className="fas fa-th-large"></i>&nbsp;&nbsp;&nbsp;Your Events</MenuItem>
				<MenuItem href="/calendar/create"><i className="fas fa-pen"></i>&nbsp;&nbsp;&nbsp;Create Event</MenuItem>
				<MenuItem href="/calendar/flows"><i className="fas fa-exchange-alt"></i>&nbsp;&nbsp;&nbsp;Flows</MenuItem>
				<MenuItem href="/calendar/settings"><i className="fas fa-cog"></i>&nbsp;&nbsp;&nbsp;Calendar Settings</MenuItem>
			</MenuList>
			<hr />
			<MenuList title="Blog" state={[blogMenu, setBlogMenu]}>
				<MenuItem href="/blog/posts"><i className="fas fa-th-large"></i>&nbsp;&nbsp;&nbsp;Your Posts</MenuItem>
				<MenuItem href="/blog/create"><i className="fas fa-pen"></i>&nbsp;&nbsp;&nbsp;Create Post</MenuItem>
				<MenuItem href="/blog/comments"><i className="fas fa-th-list"></i>&nbsp;&nbsp;&nbsp;Comments</MenuItem>
				<MenuItem href="/blog/settings"><i className="fas fa-cog"></i>&nbsp;&nbsp;&nbsp;Blog Settings</MenuItem>
			</MenuList>
			<hr />
			<MenuList title="Newsletter" state={[newsletterMenu, setNewsletterMenu]}>
				<MenuItem href="/newsletter/letters"><i className="fas fa-th-large"></i>&nbsp;&nbsp;&nbsp;Your Letters</MenuItem>
				<MenuItem href="/newsletter/create"><i className="fas fa-pen"></i>&nbsp;&nbsp;&nbsp;Create Letter</MenuItem>
				<MenuItem href="/newsletter/list"><i className="fas fa-th-list"></i>&nbsp;&nbsp;&nbsp;Mailing List</MenuItem>
				<MenuItem href="/newsletter/settings"><i className="fas fa-cog"></i>&nbsp;&nbsp;&nbsp;Newsletter Settings</MenuItem>
			</MenuList>
			<hr />
			<MenuList title="Shop" state={[shopMenu, setShopMenu]}>
				<MenuItem href="/shop/items"><i className="fas fa-th-large"></i>&nbsp;&nbsp;&nbsp;Your Items</MenuItem>
				<MenuItem href="/shop/create"><i className="fas fa-pen"></i>&nbsp;&nbsp;&nbsp;Create Item</MenuItem>
				<MenuItem href="/shop/transactions"><i className="fas fa-dollar-sign"></i>&nbsp;&nbsp;&nbsp;Transactions</MenuItem>
				<MenuItem href="/shop/settings"><i className="fas fa-cog"></i>&nbsp;&nbsp;&nbsp;Shop Settings</MenuItem>
			</MenuList>
			<hr />
			<MenuList title="Analytics" state={[analyticsMenu, setAnalyticsMenu]}>
				<MenuItem href="/analytics"><i className="fas fa-th-large"></i>&nbsp;&nbsp;&nbsp;Overview</MenuItem>
				<MenuItem href="/analytics/calendar"><i className="fas fa-calendar-alt"></i>&nbsp;&nbsp;&nbsp;Calendar Analytics</MenuItem>
				<MenuItem href="/analytics/blog"><i className="fas fa-rss-square"></i>&nbsp;&nbsp;&nbsp;Blog Analytics</MenuItem>
				<MenuItem href="/analytics/newsletter"><i className="fas fa-envelope"></i>&nbsp;&nbsp;&nbsp;Newsletter Analytics</MenuItem>
				<MenuItem href="/analytics/shop"><i className="fas fa-shopping-cart"></i>&nbsp;&nbsp;&nbsp;Shop Analytics</MenuItem>
				<MenuItem href="/analytics/users"><i className="fas fa-users"></i>&nbsp;&nbsp;&nbsp;Team Analytics</MenuItem>
				<MenuItem href="/analytics/settings"><i className="fas fa-cog"></i>&nbsp;&nbsp;&nbsp;Analytics Settings</MenuItem>
			</MenuList>
			<hr />
		</div>
	)
}

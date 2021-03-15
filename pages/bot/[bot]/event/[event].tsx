// import { useState } from 'react';

import { useRouter } from 'next/router';
import { Throw404, useClientState, useEventState } from '~/components';
import { Content, Main, Menu, Title } from '~/components';

export default function IndexPage () {

	const router = useRouter();

	const [client] = useClientState(router.asPath.split('/').filter(path => path !== '')[1]);
	if (!client) return Throw404();
	const event = useEventState(client, router.asPath.split('/').filter(path => path !== '')[3]);
	if (!event) return Throw404();

	return (
		<>
			<Title>Home</Title>

			<Content>

				<Main>
                    {JSON.stringify(client)}
				</Main>
			
				<Menu><></></Menu>

			</Content>
		</>
	)
}
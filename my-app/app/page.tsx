"use client";

import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';

export default function Home() {
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		const fetchSession = async () => {
			const sess = await getSession();
			setSession(sess);
		};
		fetchSession();
	}, []);

	return (
		<div>
			hello homepage
			{session ? <pre>{JSON.stringify(session, null, 2)}</pre> : 'No session'}
			<span className="loading loading-spinner loading-xl"></span>
		</div>
	);
}

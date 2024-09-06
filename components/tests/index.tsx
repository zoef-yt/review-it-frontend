'use client';

import { getClientInfo } from '@/actions/getClientInfo';
import { useEffect, useState } from 'react';

export const TestComponent = () => {
	const [state, setState] = useState(null);
	const getData = async () => {
		const navigator = window.navigator.userAgent;
		const date = new Date();
		const data = await getClientInfo(navigator, date);
		setState(data as any);
	};
	useEffect(() => {
		getData();
	}, []);

	return <div>Test Component {JSON.stringify(state)}</div>;
};

'use server';

function formatDateTime() {
	const date = new Date();
	const time = date
		.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
		})
		.toLowerCase();
	const day = date.getDate();
	const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th';
	const month = date.toLocaleDateString('en-US', { month: 'long' });
	const year = date.getFullYear();
	return `${time}, ${day}${suffix} ${month} ${year}`;
}

export async function getClientInfo(userAgent: string) {
	let device;
	if (userAgent.match(/Android/i)) {
		device = 'Android';
	} else if (userAgent.match(/iPhone/i)) {
		device = 'iPhone';
	} else if (userAgent.match(/iPad/i)) {
		device = 'iPad';
	} else if (userAgent.match(/Windows/i)) {
		device = 'Windows PC';
	} else if (userAgent.match(/Macintosh/i)) {
		device = 'Mac';
	} else {
		device = 'Unknown Device';
	}
	const ipResponse = await fetch('https://api64.ipify.org?format=json');
	const ipData = await ipResponse.json();
	return {
		device,
		ipAddress: ipData.ip,
		loginTime: formatDateTime(),
	};
}

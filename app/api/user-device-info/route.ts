import { NextRequest, NextResponse } from 'next/server';
import { userAgent } from 'next/server';

export async function GET(request: NextRequest) {
	const { device, browser, os } = userAgent(request);
	return NextResponse.json({
		device,
		browser,
		os,
	});
}

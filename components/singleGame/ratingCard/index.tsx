'use client';
import { Card } from '@/components/ui/card';
import React from 'react';

export const CustomRatingCard = ({ rating }: { rating: number }) => {
	const outoff = 5;
	const percentage = (rating / outoff) * 100;
	const customKeyframes = `
    @keyframes slideRight {
      0% { width: 0%; }
      100% { width: ${percentage}%; }
    }
  `;

	let backgroundColor;
	if (percentage <= 30) backgroundColor = '#ef4444';
	else if (percentage <= 75) backgroundColor = '#facc15';
	else backgroundColor = '#4ade80';

	return (
		<Card className='p-4 text-center relative overflow-hidden justify-center hover:shadow-2xl transition-all'>
			<style>{customKeyframes}</style>
			<h2 className='text-2xl font-semibold mb-2 relative z-10 mix-blend-difference text-white'>Rating</h2>
			{rating && outoff ? (
				<div className='relative z-10 mix-blend-difference text-white'>
					<p className='text-4xl font-bold'>
						{rating} / {outoff}
					</p>
				</div>
			) : (
				<p className='text-gray-700 relative z-10'>Not Rated</p>
			)}
			{rating && outoff ? (
				<div
					className='absolute inset-0 transition-all'
					style={{
						animation: `slideRight 0.5s ease-out forwards`,
						backgroundColor: backgroundColor,
					}}
				/>
			) : null}
		</Card>
	);
};

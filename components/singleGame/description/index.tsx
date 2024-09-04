'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';

interface DescriptionDrawerProps {
	description: string;
}

export function DescriptionDrawer({ description }: DescriptionDrawerProps) {
	const truncatedDescription = description ? description : 'No description available.';
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<p className='text-gray-500 line-clamp-4 cursor-pointer text-sm'>{truncatedDescription}</p>
			</DrawerTrigger>
			<DrawerContent>
				<div className='mx-auto w-full p-6'>
					<DrawerHeader>
						<DrawerTitle>Description</DrawerTitle>
						<DrawerDescription>{description}</DrawerDescription>
					</DrawerHeader>
					<DrawerFooter className='mt-4'>
						<DrawerClose asChild>
							<Button variant='outline'>Close</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}

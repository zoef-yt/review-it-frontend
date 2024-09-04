'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export function SingleGameToast() {
	const { toast } = useToast();
	useEffect(() => {
		toast({
			variant: 'destructive',
			title: 'Error fetching game data',
			description: 'There was an error fetching the game data.',
		});
	}, [toast]);
	return <main>Error fetching game data</main>;
}

'use client';

import React, { useEffect, useState, useCallback, useRef, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import Image from 'next/image';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import debounce from 'lodash/debounce';
import { makeRequest } from '@/actions/makeRequest';
import type { GameList } from '@/types/gameList';
import { Skeleton } from './ui/skeleton';

const searchSchema = z.object({
	search: z.string().min(1, 'Please enter a search term'),
});

function SearchBarComponent() {
	const searchParams = useSearchParams();
	const [isSticky, setIsSticky] = useState(false);
	const [searchResults, setSearchResults] = useState<GameList[] | null>(null);
	const [showResults, setShowResults] = useState(false);
	const router = useRouter();
	const searchBarRef = useRef<HTMLDivElement>(null);
	const form = useForm({
		resolver: zodResolver(searchSchema),
		defaultValues: {
			search: searchParams.get('search') || '',
		},
	});

	useEffect(() => {
		const initialSearch = searchParams.get('search');
		if (initialSearch) {
			debouncedSearch(initialSearch);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams]);

	useEffect(() => {
		const handleScroll = () => {
			setIsSticky(window.scrollY > 100);
		};

		const handleClickOutside = (event: MouseEvent) => {
			if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
				setShowResults(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedSearch = useCallback(
		debounce(async (term: string) => {
			if (!term) return;
			const response = await makeRequest<{ results: GameList[] }>({
				method: 'get',
				endpoint: 'api/games',
				auth: 'none',
				params: {
					search: term,
					page_size: 10,
				},
			});
			if (response.success) {
				const games = response.data.results;
				setSearchResults(games);
			}
		}, 300),
		[],
	);

	useEffect(() => {
		const subscription = form.watch((value, { name }) => {
			if (name === 'search' && value.search) {
				debouncedSearch(value.search);
			} else {
				setSearchResults(null);
			}
		});
		return () => subscription.unsubscribe();
	}, [form, debouncedSearch]);

	const onSubmit = (data: z.infer<typeof searchSchema>) => {
		router.push(`/game/search/?search=${encodeURIComponent(data.search.trim())}`);
		setShowResults(false);
	};

	return (
		<div className={`w-full z-50 transition-all duration-300 ease-in-out px-4 mt-4 ${isSticky ? 'sticky top-4' : ''}`}>
			<div className='relative' ref={searchBarRef}>
				<div className='flex items-center h-16 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg'>
					<div
						className={`absolute left-0 flex-shrink-0 flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-800 via-gray-900 to-black rounded-l-lg  transition-all duration-300 ease-in-out ${
							isSticky ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
						}`}
					>
						<Link href='/' className='flex items-center justify-center w-full h-full text-white text-2xl font-bold'>
							R I
						</Link>
					</div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
							<FormField
								control={form.control}
								name='search'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormControl>
											<Input
												placeholder='Search games...'
												className={`w-full rounded-none ring-transparent outline-none focus-within:ring-transparent focus-visible:ring-0 border-none shadow-none transition-all duration-300 ease-in-out text-lg font-bold ${
													isSticky ? 'pl-20' : 'pl-6'
												}`}
												{...field}
												onFocus={() => setShowResults(true)}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</form>
					</Form>
					<Button type='submit' className='rounded-none px-6 h-full rounded-r-lg' onClick={form.handleSubmit(onSubmit)}>
						<Search className='mr-2 h-4 w-4' />
						Search
					</Button>
				</div>
				{showResults ? (
					<div className='absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-y-auto z-10 max-h-[30dvh]'>
						{searchResults?.map((game) => (
							<SingleSearchGame key={game.id} game={game} searchTerm={form.getValues().search.trim()} setShowResults={setShowResults} />
						))}
					</div>
				) : null}
			</div>
		</div>
	);
}

function SingleSearchGame({ game, searchTerm, setShowResults }: { game: GameList; searchTerm: string; setShowResults: (show: boolean) => void }) {
	const outoff = 5;
	const percentage = (game.rating / outoff) * 100;
	let ratingNumberClassname;
	if (percentage <= 30) ratingNumberClassname = 'bg-[#ef4444]';
	else if (percentage <= 75) ratingNumberClassname = 'bg-[#facc15]';
	else ratingNumberClassname = 'bg-[#4ade80] text-white';
	const handleClick = () => {
		setShowResults(false);
	};
	return (
		<Link
			key={game.id}
			className='p-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-4'
			href={`/game/${game.slug}?search=${encodeURIComponent(searchTerm)}`}
			onClick={handleClick}
		>
			<Image src={game.backgroundImage} alt={game.name} className='w-16 h-16 object-cover rounded' width={120} height={120} />
			<div className='flex-grow'>
				<h3 className='text-lg font-bold'>{game.name}</h3>
				<p className='text-sm text-gray-500'>Released: {game.released}</p>
			</div>
			<p className={`text-lg rounded-full h-14 w-14 flex items-center justify-center ${ratingNumberClassname}`}>{game.rating}</p>
		</Link>
	);
}

function Loader() {
	return (
		<div className='w-full mb-4 flex h-16 z-50 sticky top-3 backdrop-blur-2xl focus:bg-black '>
			<div className='w-full'>
				<Skeleton className='h-16 rounded-lg w-full' />
			</div>
		</div>
	);
}

export function SearchBar() {
	return (
		<Suspense fallback={<Loader />}>
			<SearchBarComponent />
		</Suspense>
	);
}

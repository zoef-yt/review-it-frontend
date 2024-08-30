'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getSession } from '@/libs';

interface AuthContextType {
	isAuthorized: boolean;
	loading: boolean;
	recheckSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	const checkSession = async () => {
		setLoading(true);
		setIsAuthorized(false);
		try {
			const session = await getSession('accessToken');
			setIsAuthorized(!!session);
		} catch (error) {
			console.error('Failed to check session', error);
			setIsAuthorized(false);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		checkSession();
	}, []);

	return <AuthContext.Provider value={{ isAuthorized, loading, recheckSession: checkSession }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === null) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

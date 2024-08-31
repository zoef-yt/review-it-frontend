'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import jwt from 'jsonwebtoken';

import { getSession } from '@/libs';

interface AuthContextType {
	isAuthorized: boolean;
	loading: boolean;
	recheckSession: () => Promise<void>;
	user: { username: string; email: string } | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [user, setUser] = useState<null | { username: string; email: string }>(null);
	const checkSession = async () => {
		setLoading(true);
		setIsAuthorized(false);
		try {
			const session = await getSession('accessToken');
			setIsAuthorized(!!session);
			if (session) {
				const decodedToken = jwt.decode(session) as jwt.JwtPayload;
				setUser({ username: decodedToken.username, email: decodedToken.email });
			}
			if (!session) {
				setUser(null);
			}
		} catch (error) {
			console.error('Failed to check session', error);
			setIsAuthorized(false);
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		checkSession();
	}, []);

	return <AuthContext.Provider value={{ isAuthorized, loading, recheckSession: checkSession, user }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === null) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

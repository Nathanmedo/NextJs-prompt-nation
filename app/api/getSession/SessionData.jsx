"use client"

import React from 'react'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import axios from 'axios';

const SessionData = () => {

    const [session, setSession] = useState(null);
	const { data: nextAuthSession } = useSession();
	const token = Cookies.get('token');

    useEffect(() => {
		async function fetchSession(){
			if (nextAuthSession?.user) {
				setSession(nextAuthSession);
			}
			if (token) {
				try {
					const response = await axios.get('/helper');
					setSession(response.data);
				} catch (error) {
					console.error('Token verification failed:', error);
				}
			}
		}
		fetchSession();
	}, [nextAuthSession, token]);

    

  return session;
}

export default SessionData;

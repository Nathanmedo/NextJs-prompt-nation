"use client"

import PropTypes from 'prop-types'
import React, { Fragment, useEffect } from 'react'
import Link from 'next/link';
import { useState } from 'react'
import Image from 'next/image';
import { useSession, signIn, signOut, getProviders } from 'next-auth/react';



const NavMenu = ({ routes, providers, session}) => {
const [toggle, setToggle] = useState(false)


	return(
		<>
			{ session?.user ?
				<ul
				className="md:flex hidden justify-center items-center text-3xl gap-6 lg:text-base lg:gap-2 absolute h-screen w-screen top-0 left-full lg:left-0 lg:relative lg:h-auto lg:w-auto lg:bg-transparent"
				id="navbar"
			>
				{routes.map((route, i) => (
					<li key={i}>
						<Link
							className={`px-4 py-3 ${
								route.isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
							}`}
							href={route.href}
							>
							{route.name}
						</Link>
					</li>
				))}
				<button 
				className='rounded-sm py-2 hover:shadow-md w-[100px] hover:bg-white hover:text-black transition text-white bg-black'>
					SignOut
				</button>
				<Link
				className=' ' 
				href='/profile'>
					<Image
					width={32}
					height={32}
					src={session.user.image}
					alt='UserProfile'
					className='object-cover w-12 h-12 bg-blue-500 rounded-full'
					/>
				</Link>
			</ul> :
			<Fragment>
				{ providers && Object.values(providers).map((provider)=>(
					<button
					className='bg-white md:flex hidden text-black py-2 w-[30px]'
					key={provider.name}
					onClick={()=>signIn(provider.id)}>
						signIn
					</button>
				))}
			</Fragment>
}
		{/*mobile navigation */}
		{ session?.user ? 
			(<div className='lg:hidden relative'>
			<button
			onClick={()=> setToggle(prev => !prev)}>
				<Image
				src={session.user.image}
				width={42}
				height={42}
				alt='UserProfile'
				className='w-12 h-12 bg-blue-500 rounded-full object-cover'
				/>
				{toggle && 
				<ul className='bg-white py-6 flex items-end gap-2 flex-col shadow-md rounded-sm absolute top-10 right-[30%] w-[200px]'>
					{routes.map((route, i) => (
					<li key={i} className=' text-darkBg'>
						<Link
							onClick={()=> setToggle(false)}
							className={`px-4 ${
								route.isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
							}`}
							href={route.href}
							>
							{route.name}
						</Link>
					</li>
				))}
				<button 
				onClick={()=>setToggle(false)}
				className='rounded-sm mx-4 py-3 w-[100px] border-2 flex justify-center items-center border-black hover:bg-white hover:border-black hover:text-black transition text-white bg-black'>
				SignOut
				</button>
				</ul>
				}
			</button>

			
		</div>):
		(<>
		{ providers && Object.values(providers).map((provider)=>(
			<button
			className='bg-white lg:hidden flex text-darkBg py-2 gap-1 items-center justify-center w-[100px]'
			key={provider.name}
			onClick={()=>{signIn(provider.id),
				setToggle(false)
			}}>
				<span>{(provider.id).toLowerCase() == 'google' ? 'Google' : 'Github'}</span>
				signIn
			</button>
		))}
	</>)
		}
		</>
	)
};

NavMenu.propTypes = {
	routes: PropTypes.array.isRequired,
};

const Nav = () => {
	const [ providers, setProviders] = useState(null);


	const { data: session } = useSession();
	console.log(session);	


let routes;


if(session?.user){
	routes = [
		{ name: "Home", href: "/", isActive: true },
		{ name: "Profile", href: "/profile", isActive: false },
		{ name: "Features", href: "#", isActive: false },
		{ name: "Create Prompt", href: "/create-prompt", isActive: false },
	];
}


	useEffect(()=>{
		async function fetchProviders(){
			const response = await getProviders();
			console.log(response);
			
			setProviders(response)
		}

		fetchProviders();
	}, [session])

	console.log(providers);
	

	return (
		<div className="light z-50 py-6 bg-transparent absolute top-0 text-zinc-900 dark:text-white ">
			<nav>
				<div className="container">
					<div className="flex flex-row w-screen px-4 justify-between items-center">
						<div className='Nav_logo flex items-center justify-between w-[220px]'>
							<Link
							className="block cursor-pointer z-20"
							href='/'
						>
							<Image
							src="/assets/cursor icon.webp"
							alt='Prompt Nation Icon'
							width={25}
							height={25}
							className=' object-contain w-12 h-12 bg-blue-500 rounded-full'
							/>
						</Link>
						<Link	className=" no-underline font-bold text-white hidden md:block text-2xl" href="/">
							{" "}
							Prompt Nation{" "}
						</Link>
						</div>
						<NavMenu routes={routes} providers={providers} session={session}/>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Nav;
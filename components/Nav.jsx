"use client"

import PropTypes from 'prop-types'
import React, { Fragment, useEffect } from 'react'
import Link from 'next/link';
import { useState } from 'react'
import Image from 'next/image';
import { useSession, signIn, signOut, getProviders } from 'next-auth/react';
import { Montserrat} from 'next/font/google';
import gsap from 'gsap';
import { FaArrowRight} from 'react-icons/fa'


const montserrat = Montserrat({
	weight: ['500'],
	subsets: ['cyrillic']
})



const NavMenu = ({ routes, providers, session}) => {
const [toggle, setToggle] = useState(false)


	const handlePulse = () =>{
		gsap.to('#signIn_button', {
			scale: 1.1,
			repeat: -1,
			duration: .5,
			yoyo: true,
			yoyoEase: 'bounce.out',
			ease: 'power1.inOut'
		})
	}

	const handleStopPulse = () =>{
		gsap.killTweensOf('#signIn_button');
		gsap.to('#signIn_button', { scale: 1, duration: .2})
	}
	
	const handleActive = (link) =>{
		console.log('changing active target');
		
		//clear all active 
		for(let i = 0; i<routes.length; i++){
			routes[i].isActive = false;
		};

		//make link active 
		routes[link].isActive = true;
	}

	console.log(toggle);
	
	return(
		<>
			{ session?.user ?
				<ul
				className="md:flex hidden justify-center items-center text-3xl gap-6 lg:text-base lg:gap-2 absolute h-screen w-screen top-0 left-full lg:left-0 lg:relative lg:h-auto lg:w-auto lg:bg-transparent"
				id="navbar"
			>
				{routes.map((route, i) => (
					<li
					onClick={()=>handleActive(i)} 
					key={i}
					>
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
				onClick={()=>signOut()}
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
				{ providers && 
				<Link
				id='signIn_button'
				className={`bg-white ${montserrat.className} flex text-darkBg py-2 gap-1 items-center justify-center w-[100px]`}
				onClick={()=>setToggle(false)}
				onMouseEnter={handlePulse}
				onMouseLeave={handleStopPulse}
				href='/login'
				>
					signIn
					<FaArrowRight className='text-[16px]'/>
				</Link>
			}
			</Fragment>
}
		{/*mobile navigation */}

		{ session?.user &&
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
				<ul className='bg-white py-6 flex items-end gap-2 flex-col shadow-md rounded-sm absolute top-[100%] right-0 w-[200px]'>
					{routes.map((route, i) => (
					<li 
					onClick={()=>handleActive(i)}
					key={i} 
					className='text-darkBg'>
						<Link
							className={`px-4 ${
								route.isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
							}`}
							href={route.href}
							>
							{route.name}
						</Link>
					</li>
				))}
				<Link
				href={'/login'}
				onClick={()=>{setToggle(prev => !prev),
					signOut()
				}}
				className='rounded-sm mx-4 py-3 w-[100px] border-2 flex justify-center items-center border-black hover:bg-white hover:border-black hover:text-black transition text-white bg-black'>
				SignOut
				</Link>
				</ul>
				}
			</button>

			
		</div>)
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
		<div className="light z-50 py-6 bg-black/30 backdrop-blur-md w-screen px-2 absolute top-0 text-zinc-900 dark:text-white">
			<nav className='flex flex-row justify-between px-2 items-center'>
				<div className="container">
					<div className="px-4 items-center">
						<div className='Nav_logo flex items-center gap-2'>
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
					</div>
				</div>
				<div className='flex flex-row items-center '>
					<NavMenu routes={routes} providers={providers} session={session}/>
				</div>
			</nav>
		</div>
	);
};

export default Nav;
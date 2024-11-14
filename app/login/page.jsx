'use client'

import React, { useState, Fragment, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signIn } from "next-auth/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { RingLoader } from "react-spinners";
import { Toaster, toast } from "react-hot-toast";
import { WelcomeText } from "@styles/typeAnimations/Type";


const SocialLoginButton = () => (
	<Fragment>
		<button 
		onClick={()=>signIn('google', {callbackUrl: '/'})}
		className="bg-red-500 text-white py-3 px-6 rounded w-full flex items-center justify-center mt-4">
			<FontAwesomeIcon icon={faGoogle} className=" mr-2 text-white" />
			<span className="text-center">Continue with Google</span>
		</button>
		<button
		onClick={()=>signIn('github', {callbackUrl: '/'})} 
		className="bg-gray-800 text-white py-3 px-6 rounded w-full flex items-center justify-center mt-4">
			<FontAwesomeIcon icon={faGithub} className=" mr-2 text-white" />
			<span className="text-center">Continue with Github</span>
		</button>
	</Fragment>
);
const SignUpForm = () => {
	const [validated, setValidated] = useState({
		message:'',
		success:false
	});
	const [showPassword, setShowPassword] = useState(false);
	const [submit, setSubmit] = useState(false);
	const [signUpInfo, setSignUpInfo] = useState({
		username: '',
		email: '',
		password: '',
	});
	const router = useRouter();
	const [fetchError, setFetchError] = useState(null);
	const [signUpResponse, setSignUpResponse] = useState('');


	function validateForm(fieldName, value){
		// Validate email format
		if(fieldName === 'email'){
			
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(value.trim())) {
				
				setValidated({message: "Please enter a valid email address", success: false});
				setSubmit(false);
				return;
			}
		}else{
			setValidated({message:'Field Validated', success: true});
		}

	// Validate password
	if(fieldName === 'password'){
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
		if (!passwordRegex.test(value)) {
		setValidated({
			message: "Password must be 8-20 characters and contain at least one uppercase letter, one lowercase letter, one number and one special character",
			success: false
		});
		setSubmit(false);
			return;
		}else{
			setValidated({message:'Field Validated', success: true});
		}
	}
}


	const handleSignUp = async(event) => {
		event.preventDefault();

		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		setValidated(true);
		try {
			const response = await axios.post('/api/users/signup', signUpInfo);
			setSignUpResponse(response.message);
			toast.success(response.data.data);
			setSignUpInfo({
				username: '',
				email: '',
				password: '',
			});
			setFetchError(null);
		} catch(error) {
			toast(error.response.data.message);
			setFetchError(error);
		} finally {
			setSubmit(false);
		}
	}

	return (
		<form onSubmit={handleSignUp}>
			<div className="mb-4">
				<input
					type="text"
					value={signUpInfo.username}
					onChange={(e)=>setSignUpInfo({...signUpInfo, username: e.target.value.replace(/\s/g, '')})}
					className="w-full bg-blue-50 dark:bg-darkBg min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
					id="username"
					placeholder="Username"
					required
				/>
			</div>
			<div className="mb-4">
				<input
					type="email"
					value={signUpInfo.email}
					onChange={(e)=>{
						setSignUpInfo({...signUpInfo, email: e.target.value});
						validateForm('email', e.target.value);
					}}
					className="w-full bg-blue-50 dark:bg-darkBg min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
					id="email"
					placeholder="Email"
					required
				/>
			</div>
			<div className="mb-4 relative">
				<input
					type={showPassword ? "text" : "password"}
					value={signUpInfo.password}
					onChange={(e)=>{
						setSignUpInfo({...signUpInfo, password: e.target.value});
						validateForm('password', e.target.value);
					}}
					className="w-full bg-blue-50 dark:bg-darkBg min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
					id="password"
					placeholder="Password"
					required
				/>
				<button
					type="button"
					onClick={() => setShowPassword(!showPassword)}
					className="absolute right-3 top-1/2 transform -translate-y-1/2"
				>
					{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
				</button>
			</div>
			<button
				type="submit"
				disabled={submit}
				className="w-full bg-blue-600 text-white py-3 px-6 rounded"
			>
				Sign Up
			</button>
			{validated.message && <p className={`mt-2 px-4 py-2 min-h-[48px] bg-darkBg rounded-md outline outline-offset-[-4px] outline-2 ${validated.success ? 'outline-green-500 text-neonSecondary' : 'outline-red-500 text-red-500'}`}>{validated.message}</p>}
			
		</form>
	);
};

const SignInForm = () => {
	const [validated, setValidated] = useState({
		message:'',
		success:true
	});
	const [showPassword, setShowPassword ] = useState(false);
	const [submit, setSubmit] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [loginInfo, setLoginInfo] = useState({
		emailOrUsername: '',
		password: '',
	});
	const router = useRouter();
	const [fetchError, setFetchError] = useState(null)
	const [ loginResponse, setLoginResponse ] = useState('')



	const handleLogin = async(event) =>{
		event.preventDefault();

		setSubmit(true);

		try{
		const response = await axios.post('/api/users/signin', loginInfo);
		
		setLoginResponse(response.message);
		toast.success(response.message);
		setLoginInfo({
			emailOrUsername: '',
			password: '',
		});
		router.push('/')
		setFetchError(null)
		}catch(error){
			setFetchError(error.message);
			toast.error(error.message);
		}finally{
			setSubmit(false)
		}
	}

	

	return (
		<form>
			<div className="mb-4">
				<input
					type="text"
					value={loginInfo.emailOrUsername}
					onChange={(e)=>setLoginInfo({...loginInfo, emailOrUsername: e.target.value})}
					className="w-full bg-blue-50 dark:bg-darkBg min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
					id="email"
					placeholder="Email or Username"
				/>
			</div>
			<div className="mb-4 relative">
				<input
					type={showPassword ? "text" : "password"}
					value={loginInfo.password}
					onChange={(e)=>setLoginInfo({...loginInfo, password: e.target.value})}
					className="w-full bg-blue-50 dark:bg-darkBg min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
					id="password"
					placeholder="Password"
					required
				/>
				<button
					type="button"
					onClick={() => setShowPassword(prev => !prev)}
					className="absolute right-3 top-1/2 transform -translate-y-1/2"
				>
					{showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
				</button>
			</div>
			<div className="mb-4">
				<input type="checkbox" className="mr-2" id="remember-me" checked={rememberMe} onChange={()=>setRememberMe(prev => !prev)} />
				<label className="font-normal" htmlFor="remember-me">
					Remember me
				</label>
			</div>
			<button 
			onClick={(e)=>handleLogin(e)}
			type="submit"
			className={`${submit ?? 'opacity-80'} bg-slate-800 flex items-center justify-center text-white py-3 px-6 rounded w-full`}>
				
				{submit ? <span className="flex items-center justify-center gap-1 w-full"><RingLoader color="#808080" size={20} /> Logging in</span> : <span className="flex justify-center w-full">Log in</span>}
			</button>
			<button className="hover:text-emerald-500 py-2 px-4 rounded-lg w-full">
				Forget your password?
			</button>
			<div className="relative">
				<hr className="my-8 border-t border-gray-300" />
				<span className="px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent backdrop-blur-sm">
					Or
				</span>
			</div>

			<SocialLoginButton />
		</form>
	);
};

const SignIn9 = () => {
	const [active, setActive] = useState("signIn");
	const formContainerRef = useRef(null);

	useEffect(() => {
		// Set initial states
		gsap.set("[data-form='signup']", { opacity: 0, x: 50 });
		gsap.set("[data-form='signin']", { opacity: 1, x: 0 });

		const tl = gsap.timeline();
		
		if (active === "signIn") {
			tl.to("[data-form='signup']", { opacity: 0, visibility: 'hidden', x: 50, duration: 0.3 })
			  .to("[data-form='signin']", { opacity: 1, visibility:'visible', x: 0, duration: 0.3, display: 'block' }, "-=0.3");
		} else {
			tl.to("[data-form='signin']", { opacity: 0, visibility:'hidden', x: -50, duration: 0.3 })
			  .to("[data-form='signup']", { opacity: 1, visibility:'visible', x: 0, duration: 0.3, display: 'block' }, "-=0.3");
		}
	}, [active]);

	return (
		<section className="ezy__signin9 login w-screen h-full bg-white text-zinc-900 dark:text-white overflow-hidden">
			<div className="container px-4 mx-auto">
				<div className="grid grid-cols-12 h-full">
					<div className="col-span-12 lg:col-span-6 lg:col-start-7 order-2">
						<div
							className="hidden lg:block fixed h-screen w-[50vw] right-0 bg-cover bg-center bg-no-repeat"
							style={{
								backgroundImage:
									"url(https://cdn.easyfrontend.com/pictures/sign-in-up/sign-in-up-4.png)",
							}}
						></div>
					</div>
					<Toaster />
					<div className="col-span-12 lg:col-span-4 lg:col-start-2 pt-32 pb-24">
						<div className="flex items-center justify-center h-full">
							<div className="w-full max-w-xl mx-auto">
								<div className="text-center mb-6 lg:mb-12">
									<div className="bg-blue-50 dark:bg-slate-700 w-64 flex justify-center mx-auto rounded-xl p-2">
										<button
											className={`${
												active === "signIn" &&
												"bg-white dark:bg-darkBg text-black dark:text-white rounded-xl"
											} py-3 w-1/2 h-full opacity-60`}
											onClick={() => setActive("signIn")}
										>
											Sign In
										</button>
										<button
											className={`${
												active === "signUp" &&
												"bg-white dark:bg-darkBg text-black dark:text-white rounded-xl"
											} py-3 w-1/2 h-full opacity-60`}
											onClick={() => setActive("signUp")}
										>
											Sign Up
										</button>
									</div>
								</div>
								<WelcomeText textStyle={"text-indigo-900 dark:text-white text-2xl font-bold mb-3 lg:mt-24"} />
								<div className="flex items-center mb-6 md:mb-12">
									{ active === 'signIn' ? <p className="mb-0 mr-2 opacity-50">Don't have an account?</p> : <p className="mb-0 mr-2 opacity-50">Already have an account?</p>}
									<a href="#!" onClick={()=>setActive(prev => prev === 'signIn' ? 'signUp' : 'signIn')}>{ active === 'signIn' ? 'Create Account' : 'Sign In'}</a>
								</div>

								<div className="form-container relative w-full min-h-[400px]" ref={formContainerRef}>
									<div key="signin" className="form-wrapper absolute inset-0" data-form="signin">
										<SignInForm />
									</div>
									<div key="signup" className="form-wrapper absolute inset-0 " data-form="signup">
										<SignUpForm /> 
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SignIn9;
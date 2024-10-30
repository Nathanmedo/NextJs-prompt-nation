import React, { useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";

const SocialLoginButton = () => (
	<Fragment>
		<button className="bg-blue-600 text-white py-3 px-6 rounded w-full flex items-center justify-center mt-4">
			<FontAwesomeIcon icon={faFacebook} className=" mr-2 text-white" />
			<span className="text-center">Continue with Facebook</span>
		</button>
		<button className="bg-red-500 text-white py-3 px-6 rounded w-full flex items-center justify-center mt-4">
			<FontAwesomeIcon icon={faGoogle} className=" mr-2 text-white" />
			<span className="text-center">Continue with Google</span>
		</button>
	</Fragment>
);

const SignInForm = () => {
	const [validated, setValidated] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();

		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		setValidated(true);
	};

	return (
		<form noValidate validated={validated} onSubmit={handleSubmit}>
			<div className="mb-4">
				<input
					type="text"
					className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
					id="email"
					placeholder="Email"
				/>
			</div>
			<div className="mb-4">
				<input
					type="password"
					className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
					id="password"
					placeholder="Password"
				/>
			</div>
			<div className="mb-4">
				<input type="checkbox" className="mr-2" id="remember-me" checked />
				<label className="font-normal" htmlFor="remember-me">
					Remember me
				</label>
			</div>
			<button className="bg-indigo-900 text-white py-3 px-6 rounded w-full">
				Log In
			</button>
			<button className="hover:text-blue-600 py-2 px-4 rounded-lg w-full">
				Forget your password?
			</button>
			<div className="relative">
				<hr className="my-8 border-t border-gray-300" />
				<span className="px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#0b1727]">
					Or
				</span>
			</div>

			<SocialLoginButton />
		</form>
	);
};

const SignIn9 = () => {
	const [active, setActive] = useState("signIn");
	return (
		<section className="ezy__signin9 light bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white overflow-hidden">
			<div className="container px-4 mx-auto">
				<div className="grid grid-cols-12 h-full">
					<div className="col-span-12 lg:col-span-6 lg:col-start-7 order-2">
						<div
							className="hidden lg:block h-full w-full lg:w-[50vw] bg-cover bg-center bg-no-repeat float-left"
							style={{
								backgroundImage:
									"url(https://cdn.easyfrontend.com/pictures/sign-in-up/sign-in-up-4.png)",
							}}
						></div>
					</div>
					<div className="col-span-12 lg:col-span-4 lg:col-start-2 py-14 lg:py-24 lg:pb-32">
						<div className="flex items-center justify-center h-full">
							<div className="w-full max-w-xl mx-auto">
								<div className="text-center mb-6 lg:mb-12">
									<div className="bg-blue-50 dark:bg-slate-700 w-64 flex justify-center mx-auto rounded-xl p-2">
										<button
											className={`${
												active === "signIn" &&
												"bg-white dark:bg-slate-800 text-black dark:text-white rounded-xl"
											} py-3 w-1/2 h-full opacity-60`}
											onClick={() => setActive("signIn")}
										>
											Sign In
										</button>
										<button
											className={`${
												active === "signUp" &&
												"bg-white dark:bg-slate-800 text-black dark:text-white rounded-xl"
											} py-3 w-1/2 h-full opacity-60`}
											onClick={() => setActive("signUp")}
										>
											Sign Up
										</button>
									</div>
								</div>
								<h2 className="text-indigo-900 dark:text-white text-2xl font-bold mb-3 lg:mt-24">
									Welcome to Easy Frontend
								</h2>
								<div className="flex items-center mb-6 md:mb-12">
									<p className="mb-0 mr-2 opacity-50">Don't have an account?</p>
									<a href="#!">Create Account</a>
								</div>

								<SignInForm active={active} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};


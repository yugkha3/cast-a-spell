import { googleOAuth } from "../utils/googleOAuth"
import LoginImage from '../images/hero.jpg'

export default function SignIn() {	  
	return (
			<section className="min-h-screen flex items-stretch text-white ">
				<div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center" style={{ backgroundImage: `url(${LoginImage})` }}>
					<div className="absolute bg-black opacity-60 inset-0 z-0"></div>
				</div>
				<div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0" >
					<div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center" style={{ backgroundImage: `url(${LoginImage})` }}>
						<div className="absolute bg-black opacity-60 inset-0 z-0"></div>
					</div>
					<div className="w-full py-6 z-20">
						<h1 className="text-9xl text-center mt-10 text-neutral font-extrabold mb-5 font-gloock">cast a spell</h1>
						<p className="text-2xl">
							Train your face on the Stable Diffusion 1.5 Model to generate AI avatars.
						</p>
						<button type="button" className="mt-8 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
							<svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
							<a
								role="button"
								href={googleOAuth()}
							>
								Continue with Google
							</a>
						</button>
					</div>
				</div>
			</section>
	)
}
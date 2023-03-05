import { useState, useEffect } from "react"
import { toast } from "react-hot-toast";
import { useContext } from "react";

import { Navbar } from "../components/Navbar"
import Spinner from "../components/Spinner";
import AuthContext from "../contexts/AuthContext";

function Home() {
	const [input, setInput] = useState('');
	const onInputChange = (event) => {
		setInput(event.target.value)
	}

	const [img, setImg] = useState('');

	const maxRetries = 20
	const [retry, setRetry] = useState(0);
	const [retryCount, setRetryCount] = useState(maxRetries)

	const [isGenerating, setIsGenerating] = useState(false);

	const [finalPrompt, setFinalPrompt] = useState('');
	const generate = async () => {
		if (input.trim() === '') {
			toast.error('Input is empty');
			return;
		}
		if (isGenerating && retry === 0) return;

		setIsGenerating(true);

		if (retry > 0) {
			setRetryCount((prevState) => {
				if (prevState === 0) {
					return 0;
				} else {
					return prevState - 1;
				}
			})

			setRetry(0);
		}

		try {
			const response = await fetch(`${import.meta.env.VITE_BASE_URL_SERVER}/generate`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ input })
			});

			const data = await response.json();
			if (response.status === 503) {
				toast('Model is still loading...', { icon: '⌚' });
				setRetry(data.estimated_time);
				return;
			}
			if (!response.ok) {
				toast.error('Something went wrong.');
				return;
			}

			setFinalPrompt(input);
			setInput('');
			setImg(data.image);
			setIsGenerating(false);

		} catch (error) {
			console.error(error);
		}
	};


	const sleep = (ms) => {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	};
	useEffect(() => {
		const runRetry = async () => {
			if (retryCount === 0) {
				toast.error(`Model is still loading after ${maxRetries} retries. Try again in 5 minutes.`)
				setRetryCount(maxRetries);
				setIsGenerating(false)
				return;
			}

			toast(`Trying again in ${retry} seconds.`, {
				icon: '⌚'
			})
			await sleep(retry * 1000);
			await generate();
		};

		if (retry === 0) {
			return;
		}
		runRetry();
	}, [retry]);

	const { userData } = useContext(AuthContext);
	return (
		<div>
			<Navbar />
			<div className="flex flex-col items-center justify-center p-2">
				<h1 className="text-8xl text-center mt-10 text-neutral font-extrabold font-gloock">cast a spell</h1>
				{userData.isTrained === false && <p className="text-xl text-center p-5">Your face is currently not trained on the model. <br />However, you can still use this app to generate other images. <br />For example, you can try writing a prompt like 'a dog as an astronaut flying in space'. Give it a try!</p>}
				{userData.isTrained === true && <p className="text-xl text-center p-5">Great news! Your face has been successfully trained on the model. <br />Your unique username is <b><u>{userData.username}</u></b>. Please do not share this username with anyone else. <br />You can use this username to generate ultra-realistic AI avatars of yourself. </p>}
				<div>

					{userData.isTrained === true && <input type="text" placeholder={`a portrait of ${userData.username} as Thor`} className="input input-bordered input-xl w-full max-w-xl" value={input} onChange={onInputChange} onKeyDown={
						(e) => {
							if(e.key === 'Enter') {
								generate();
								setIsGenerating(true)
							}
						}
					}/>}
					{userData.isTrained === false && <input type="text" placeholder="enter whatever you want to cast" className="input input-bordered input-xl w-full max-w-xl" value={input} onChange={onInputChange} onKeyDown={
						(e) => {
							if(e.key === 'Enter') {
								generate();
								setIsGenerating(true)
							}
						}
					}/>}

					<button className="btn btn-sm mt-2 btn-primary normal-case" onClick={generate} > {isGenerating ? <Spinner /> : "Cast 🪄"}</button>
					{/* <button className="btn btn-sm mt-2 btn-primary normal-case" onClick={generate}>Cast 🪄</button> */}
				</div>
				{img && (
					<div>
						<img src={img} width={512} height={512} alt={input} className="mt-5" />
						<p>{finalPrompt}</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default Home
import { useState } from "react"
import { Navbar } from "../components/Navbar";
import AuthContext from '../contexts/AuthContext'
import { useContext } from 'react'
import { toast } from "react-hot-toast";

function Upload() {
	const { imagesUploaded, setImagesUploaded } = useContext(AuthContext)

	const [images, setImages] = useState([]);
	const handleChange = (e) => {
		setImages(Array.from(e.target.files));
	};

	const [isSubmitting, setIsSubmitting] = useState(false);
	const handleSubmit = async () => {

		setIsSubmitting(true);
		if (images.length > 7 || images.length < 5) {
			toast.error('Please upload more than 4 and less than 8 images.')
			return;
		}

		let totalSize = 0;
		let isJpegJpg = true;
		images.forEach((image) => {
			totalSize += image.size;
			if (!image.type.startsWith('image/jpeg') && !image.type.startsWith('image/jpg')) {
				toast.error('Images of jpg/jpeg format are allowed.')
				isJpegJpg = false;
				return;
			}				
		})
		if(!isJpegJpg) {
			return;
		}
		
		if (totalSize > 3000000) {
			toast.error('Total size of files must be less than 3MB.')
			return;
		}


		const formData = new FormData();
		images.forEach(image => {
			formData.append('images', image)
		});

		const res = await fetch(`${import.meta.env.VITE_BASE_URL_SERVER}/upload`, {
			method: 'POST',
			credentials: 'include',
			body: formData
		})
		if (res.status === 200) {
			setImagesUploaded(true);
			toast.success('Images uploaded successfully!')
		}
	}
	return (
		<>
			<Navbar />
			<h1 className="text-7xl text-center mt-10 text-neutral font-extrabold font-gloock">Upload Images:</h1>
			<div className="flex justify-center">
				<p className="text-xl p-5 ">Here’s a few rules for your images:
					<ul className="list-disc p-5">
						<li>Upload atleast <b>5-7</b> images of format <b>jpg/jpeg</b>.</li>
						<li><b>Images should contain only you</b> - no friends, dogs, samosas, aunties.</li>
						<li><b>Clear backgrounds</b> - If you can’t get white backgrounds, use <a href="https://remove.bg/" className="link" target="_blank">https://remove.bg/</a> to remove them entirely.</li>
						<li><b>Image quality </b>- Pictures should be well lit.</li>
						<li><b>Image size </b>- At least 720p at the minimum. You can use laptop webcams but you need to be in a well-lit place (super important!).</li>
						<li><b>Image dimensions </b>- They must be of 512x512. Head over to <a href="https://www.birme.net/?target_width=512&target_height=512&utm_source=buildspace.so&utm_medium=buildspace_project" className="link" target="_blank">Birme</a> and resize all your pics to 512x512 (super important!).</li>
					</ul>
				</p>
			</div>
			<div className="flex justify-center">
				<input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs mr-5" multiple accept="image/jpg, image/jpeg" onChange={handleChange} />
				<input type="submit" value="Submit" className="btn" onClick={handleSubmit}   disabled={isSubmitting}/>
			</div>
		</>
	)
}
export default Upload
import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import { Loader } from "./Loader"
import styles from "../utils/utils.module.css"

type FileImageProps = {
	filePath: string
} & React.ImgHTMLAttributes<HTMLImageElement> // access the other props alongside filepath

export const FileImage = ({filePath, ...props}: FileImageProps) => {
	// image is the url that we can use on src tag
	const [ image, setImage ] = useState("")
	// set to true to avoid blinking of the loader for a few ms
	const [ loading, setLoading ] = useState(true)

	useEffect(() => {
		const downloadImage = async (filePath: string) => {
			setLoading(true);
			const {data} = await supabase.storage.from("images").download(filePath)
			if(data){
				const url = URL.createObjectURL(data)
				setImage(url)
				setLoading(false)
			}
		}
		if(filePath && filePath.length > 0){
			downloadImage(filePath)
		}
	}, [filePath])

	if(loading){
		return <div className={styles.centeredFlex}>
			<Loader/>
		</div>
	}

	return <img src={image} alt={filePath} {...props} />
}


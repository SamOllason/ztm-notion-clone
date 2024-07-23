import { useRef, ChangeEventHandler } from "react"
import styles from "./Cover.module.css"

export const Cover = () => {
    // we want an immutable ref here, so specify null as initial value
    const fileInputRef = useRef<HTMLInputElement>(null)

    const onChangeCoverImage = () => {
        console.log('onChangeCoverImage')
        // we use refs to store an reference to the input element
        // note use of optional chaning as the element may be null
        fileInputRef.current?.click()

    }

    const onCoverImageUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
        const target = event.target;
        console.log('onCoverImageUpload')
        console.log(target?.files?.[0])
    }

    return(
        <div className={styles.cover}>
        <img src="/ztm-notes.png" alt="Cover" className={styles.image}/>

        {/* When click on button want to trigger click event on the input element below */}
        <button onClick={onChangeCoverImage} className={styles.button}>Change cover</button>
        {/* we want an 'invisible' input to have a custom bottom to allow user */}
        {/* to upload images when user clicks on bottom */}
        <input onChange={onCoverImageUpload} ref={fileInputRef} style={{display: "none"}} type="file"></input>
        </div>
    )
}
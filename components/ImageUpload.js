import { useState } from "react"
import styles from "@/styles/Form.module.css"
import { API_URL } from "../config"

export default function ImageUpload({eventId, imageUpload}) {

    const [image, setImage] = useState(null)

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('files', image)
        formData.append('ref', 'events')
        formData.append('refId', eventId)
        formData.append('field', 'image')
        
        const res= await fetch(`${API_URL}/upload`,{
            method: 'POST',
            body: formData
        })
        if(res.ok){
            imageUpload()
        }else{
            console.log("ERROR")
        }
    }

    const handleFileChange = (e)=>{
        setImage(e.target.files[0])
        
    }

    return (
        <div className={styles.form}>
            <form onSubmit={handleSubmit}>
               
                <div className={styles.file}>
                    <label htmlFor="image">image</label>
                <input id="image" type="file" onChange={handleFileChange} />
                </div>
                <input type="submit" value="Upload Image" className="btn" />
            </form>
            {eventId}
        </div>
    )
}

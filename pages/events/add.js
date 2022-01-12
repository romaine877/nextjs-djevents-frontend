import Layout from "@/components/Layout";
import { useState } from "react";
import styles from "@/styles/Form.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";
import { getCookie } from "@/helpers/index";

export default function AddEventPage({token}) {

    const router = useRouter()


  const handleSubmit = async(e) => {
    e.preventDefault();
    

    const hasEmptyFields = Object.values(values).some((element) => 
      element === ""
    );

    if (hasEmptyFields){
        
        toast.error('Feilds are empty', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }else{
        const res = await fetch(`${API_URL}/events`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(values)
        })

        if(!res.ok){
          const {message} = await res.json()
            toast.error("error")
           
        }else{
            const evt = await res.json()
            router.push(`/events/${evt.slug}`)
        }
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const [values, setValues] = useState({
    name: "",
    venue: "",
    date: "",
    time: "",
    address: "",
    performers: "",
    description: "",
  });
  return (
    <Layout title="Add Event">
      <h1>Add Event</h1>
      <ToastContainer/>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name"> Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="performers"> Performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="venue"> Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="address"> Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="date"> Event Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={values.date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="time"> Event Time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description"> Description</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={values.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            className="btn"
            type="submit"
            name="submit"
            value="Add Event"
          />
        </div>
      </form>
    </Layout>
  );
}


export async function getServerSideProps({req}){
  const token = req.cookies.token
  if(!token){
    return{
      redirect:{
        destination: '/account/login',
        permanent: false
      }
    }
  }
  return {
    props: {token}
  }
}
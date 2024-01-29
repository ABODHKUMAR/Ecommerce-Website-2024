import React,{useState} from 'react'     
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from "axios"
import {useNavigate} from "react-router-dom";
import "./../../styles/AuthStyles.css"
const Login = () => {
  const[email,setEmail]=useState("");
  const [password,setPassword] = useState("");
 
  const navigate=useNavigate();
 

  //form function
  const handleSubmit=async(e)=>{

       e.preventDefault();
       try{
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password});

            if(res && res.data.success){

                toast.success(res.data && res.data.message);
                navigate('/');
                
            } else{
                toast.error(res.data.message);
            }

       }catch(error){
        console.log(error)
        toast.error('Something went wrong');
       }
    }
  return (
    <Layout title="Register Ecommerce App">
        <div className="form-container">
            
            <form onSubmit={handleSubmit}>
            <h1>LOGIN FORM</h1>
            <div className="mb-3">
                <input 
                    type="email" 
                    val={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="form-control" 
                    id="exampleInputEmail1"
                    placeholder="Enter Your Email" 
                    required

                />
            </div>
            <div className="mb-3">
                <input 
                    type="password" 
                    val={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="form-control" 
                    id="exampleInputEmail1" 
                    placeholder="Enter Your Password"
                    required
                    />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>

    </Layout>
  )
}

export default Login
import React,{useState} from 'react'     
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from "axios"
import {useNavigate} from "react-router-dom";
import "./../../styles/AuthStyles.css"

const ForgotPassword = () => {
  const[email,setEmail]=useState("");
  const [newPassword,setNewPassword] = useState("");
  const [answer,setAnswer] = useState("");

  const navigate=useNavigate();
 
  //form function
  const handleSubmit=async(e)=>{

       e.preventDefault();
       try{
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,{email,newPassword,answer});

            if(res && res.data.success){

                toast.success(res.data && res.data.message);
               
                navigate('/login');
                
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
            <h1>RESET PASSWORD</h1>
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
                    type="text" 
                    val={answer}
                    onChange={(e)=>setAnswer(e.target.value)}
                    className="form-control" 
                    id="exampleInputEmail1"
                    placeholder="Enter Your Best friend Name" 
                    required

                />
            </div>
            <div className="mb-3">
                <input 
                    type="password" 
                    val={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                    className="form-control" 
                    id="exampleInputEmail1" 
                    placeholder="Enter Your New Password"
                    required
                    />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>

    </Layout>
  )
}

export default ForgotPassword;

import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from "axios"
import {useNavigate} from "react-router-dom";
import "./../../styles/AuthStyles.css"
const Register = () => {
  const [name,setName] = useState("");
  const[email,setEmail]=useState("");
  const [password,setPassword] = useState("");
  const[phone,setPhone]=useState("");
  const [address,setAdress] = useState("");
  const [answer,setAnswer] = useState("");
  const navigate=useNavigate();
 

  //form function
  const handleSubmit=async(e)=>{
        e.preventDefault();
       try{
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address,answer});
        if(res.data.sucess){
            toast.success(res.data.message);
        
            navigate('/login');
        }else{
           
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
            <h1>REGISTER FORM</h1>
            <div className="mb-1">
                <input 
                    type="text" 
                    val={name}
                    onChange={(e)=>setName(e.target.value)}
                    className="form-control" 
                    id="exampleInputEmail1"
                    placeholder="Enter Your Name"
                    required
                     />
            </div>
            <div className="mb-1">
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
            <div className="mb-1">
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
            <div className="mb-1">
                <input type="text"
                       val={phone}
                       onChange={(e)=>setPhone(e.target.value)} 
                       className="form-control" 
                       id="exampleInputEmail1" 
                       placeholder="Enter You phone No"
                       required
                       />
            </div>
            <div className="mb-1">
                <input  type="text" 
                        val={address}
                        onChange={(e)=>setAdress(e.target.value)}
                        className="form-control" 
                        id="exampleInputPassword1"
                        placeholder="Enter Your Address"
                        required
                         />
            </div>
            <div className="mb-1">
                <input  type="text" 
                        val={answer}
                        onChange={(e)=>setAnswer(e.target.value)}
                        className="form-control" 
                        id="exampleInputPassword1"
                        placeholder="What is your Best Friend Name?"
                        required
                         />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>

    </Layout>
  )
}

export default Register

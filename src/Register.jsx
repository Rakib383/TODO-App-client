import { FaGoogle } from "react-icons/fa"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom" 
import Swal from "sweetalert2"
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useAxiosPublic } from './hooks/useAxiosPublic';

export const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }, reset
    } = useForm()
   const {createUser,updateUserProfile,setUser,signInWithGoogle} = useContext(AuthContext)
   const axiosPublic = useAxiosPublic()
   const navigate = useNavigate()


    const onSubmit = (data) => {
        const { email, password, name } = data
        
        createUser(email, password)
            .then((res) => {
                updateUserProfile(name)
                    .then(() => {
                        setUser(res.user)
                        const userInfo = { userID:res.user.uid,name,email}
                        axiosPublic.post('/users', userInfo)
                            .then(() => {

                                reset()
                                Swal.fire({
                                    title: "Signup successful!",
                                    icon: "success",
                                    showConfirmButton: false,
                                    timer: 1000
                                })

                                navigate("/")
                            })
                    })

            })
            .catch(err => {
                toast.error('Invalid Crediential!', {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",

                });
                console.log(err);

            })


    }

    const handleSignInWithGoogle = () => {
        signInWithGoogle()
            .then((res) => {
                const { displayName: name, email,uid:userID } = res.user
                setUser(res.user)
                const userInfo = {userID,name, email}
                // console.log(userInfo);
                axiosPublic.post('/users', userInfo)
                    .then(() => {
                        // console.log(res.data);
                        reset()
                        Swal.fire({
                            title: "Signup successful!",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1000
                        })
                        navigate("/")
                    })

            })

    }

    return (
        <div className="relative w-full h-screen   flex items-center justify-center gap-8 pt-8 md:pt-12 md:px-16 ">
            <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* <div className="hidden max-w-xl md:block flex-1">
                <img src={registerPic} alt="" />
            </div> */}

            <div className="relative w-[340px] md:w-[360px] h-auto bg-gray-600 backdrop-blur-md rounded-lg  shadow-lg p-7 pt-5">


                <h3 className="text-center text-PrimaryColor text-4xl font-thin font-fresh ">Sign Up </h3>

                <div className="flex justify-between mt-6">
                    <button onClick={handleSignInWithGoogle} className="w-full flex items-center justify-center gap-2 bg-white/30 hover:bg-white/40 text-white border text-center py-3 hover:cursor-pointer rounded-md">

                        <FaGoogle className="text-PrimaryColor" /> Continue With Google
                    </button>

                </div>

                <p className="text-white text-center mt-4 ">OR</p>
                {/* Form Container */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label
                        htmlFor="username"
                        className="block mt-1 text-white text-base font-medium"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        {...register("name", { required: true })}

                        placeholder="Enter Your Name "
                        className="w-full mt-2 h-12 bg-white/10 text-white text-sm font-light rounded-md px-3 focus:outline-none placeholder:text-white/50 border "
                    />
                    {errors.name && <span className="text-red-400 text-sm">This field is required</span>}
                    <label
                        htmlFor="username"
                        className="block mt-2 text-white text-base font-medium"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        {...register("email", { required: true })}

                        placeholder="Email "
                        className="w-full mt-2 h-12 bg-white/10 text-white text-sm font-light rounded-md px-3 focus:outline-none placeholder:text-white/50 border "
                    />
                    {errors.email && <span className="text-red-400 text-sm">This field is required</span>}
                    
                    <label
                        htmlFor="password"
                        className="block mt-2 text-white text-base font-medium"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        {...register("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/ })}
                        id="password"
                        placeholder="Password"
                        className="w-full mt-2 h-12 bg-white/10 text-white text-sm font-light rounded-md px-3 focus:outline-none placeholder:text-white/50 border"
                    />
                    {errors.password && <span className="text-red-400 text-sm">Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long.</span>}
                    <button
                        type="submit"
                        className="mt-5 w-full bg-white/40 text-white py-2.5 text-lg font-semibold rounded-md border hover:bg-white/50 cursor-pointer"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-white mt-2 text-base ">Already have an account? <Link className="text-PrimaryColor font-bold underline" to="/login">Login</Link></p>
            </div>


        </div>
    )
}

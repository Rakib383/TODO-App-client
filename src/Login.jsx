import { FaGoogle } from "react-icons/fa"
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { ToastContainer, toast } from 'react-toastify';
import { BsShieldFillExclamation } from "react-icons/bs";
export const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },  reset
    } = useForm()
   
    const navigate = useNavigate()
    const location = useLocation()


    const onSubmit = (data) => {
       
    }

   
    // const handleSignInWithGoogle = () => {
    //     signInWithGoogle()
    //         .then((res) => {
    //             const { displaName: name, email, photoURL } = res.user

    //             const userInfo = { name, email, Role: "Tourist", photoURL }
    //             axiosPublic.post('/users', userInfo)
    //                 .then(() => {
    //                     setUser(res.user)
    //                     reset()
    //                     Swal.fire({
    //                         title: "Signup successful!",
    //                         icon: "success",
    //                         showConfirmButton: false,
    //                         timer: 1000
    //                     })

    //                     location.state ? navigate(location.state) : navigate("/")
    //                 })

    //         })

    // }

    return (
        <div className="relative w-full h-screen  flex items-center bg-gray-200  justify-center gap-10 pt-2 md:pt-8 md:px-16">
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

            {/* <div className="hidden max-w-96 md:block flex-1">
                <img src={loginPic} alt="" />
            </div> */}

            <div >
            
              
                <div className="relative w-[340px]  bg-gray-600 backdrop-blur-md rounded-lg  shadow-lg p-7 pt-5">

                    <h3 className="text-center  text-5xl text-black  ">Login </h3>

                    <div className="flex justify-between mt-6">
                        {/* <button onClick={handleSignInWithGoogle} className="w-full flex items-center justify-center gap-2 bg-white/30 hover:bg-white/40 text-white border text-center py-3 hover:cursor-pointer rounded-md">

                            <FaGoogle className="text-PrimaryColor" /> Continue With Google
                        </button> */}

                    </div>
                    <p className="text-white text-center mt-4 ">OR</p>
                    {/* form  */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label
                            htmlFor="username"
                            className="block mt-2 text-white text-base font-medium"
                        >
                            Email
                        </label>
                        <input

                            type="text"
                            {...register("email", { required: true })}
                            placeholder="Email "
                            className="w-full mt-2 h-12 bg-white/10 text-white text-sm font-light rounded-md px-3 focus:outline-none placeholder:text-white/50 border "
                        />
                        {errors.email && <span className="text-red-400 text-sm">This field is required</span>}

                        <label
                            htmlFor="password"
                            className="block mt-3 text-white text-base font-medium"
                        >
                            Password
                        </label>
                        <input

                            type="password"
                            {...register("password", { required: true })}
                            id="password"
                            placeholder="Password"
                            className="w-full mt-2 h-12 bg-white/10 text-white text-sm font-light rounded-md px-3 focus:outline-none placeholder:text-white/50 border"
                        />
                        {errors.password && <span className="text-red-400 text-sm">This field is required</span>}
                        {/* <p className="">
                            <Link to="/reset" className="mt-1 text-[14px] text-PrimaryColor hover:underline ">Forgot password?</Link>
                        </p> */}
                        <button
                            type="submit"
                            className="mt-8 w-full bg-white/40 text-white py-2 text-lg font-semibold rounded-md border hover:bg-white/50 "
                        >
                            Log In
                        </button>
                    </form>
                    <p className="text-white mt-2 text-base ">Don’t Have An Account ? <Link className="text-PrimaryColor font-bold underline" to="/register">Register</Link></p>

                </div>
            </div>


        </div>
    )
}

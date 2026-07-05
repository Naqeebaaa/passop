import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])


    //jab bhi website khul ke load hogi look for passwords if prsent
    //load them and populate them in password array else do nothing
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
            //hamne objects ko strings bana kar save kiya tha ab agr react ko array
            //chahiye then we use  JSON.parse(...)
        }
    }, [])



    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"

        }
    }
    //local storage Ye browser ke andar permanently data save karta hai.
    //lekin localstorage sirf strings hi store karta hai Array aur object directly save nahi kar sakta.
    //to make objects strings we use JSON.stringify(...)
    const savePassword = () => {
        setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
        console.log([...passwordArray, form])
        setform({ site: "", username: "", password: "" })
    }

    const deletePassword = (id) => {
        console.log("Deleting Passwords with id", id)
        let c = confirm("Do you really want to Delete?")
        if (confirm) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))

        }

    }
    const editPassword = (id) => {
        console.log("Editing Passwords with id", id)
        setform(passwordArray.filter(i => i.id === id)[0])
        setpassswordArray(passwordArray.filter(item => item.id !== id))
    }

    //Suppose user username wale input mein likhta hai Ali Browser event bhejta hai.
    //Us event ko hum e bolte hain. Usme bohot information hoti hai. Jaise e.target.value matlab Ali
    //...form Ye purani values copy karta hai.
    //form ={
    //site:"google.com",
    //username:"",
    //password:"123"
    // }Ab username change hua.React karega:
    /*{
    ...form,
    username:"Ali"
    }       Result ---> {
    site:"google.com",
    username:"Ali",
    password:"123"
    }
    */

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>
            <div className="absolute top-0 -z-10 h-full w-full bg-white">
               <div className="absolute right-0 top-0 h-[250px] w-[250px] sm:h-[350px] sm:w-[350px] md:h-[500px] md:w-[500px]"></div></div>

            <div className="bg-slate-50 mycontainer px-4 sm:px-6 md:px-10 lg:px-20">
                <h1 className='text-3xl sm:text-4xl md:text-5xl text-blue-900 font-bold text-center'>                
                        <span className="text-blue-600">&lt;</span>
                    Pass
                    <span className='text-blue-600'>OP/&gt;</span>
                </h1>
                <p className='text-blue-900 text-sm sm:text-base md:text-lg text-center'>Your Own Password Manager</p>
                <div className=' flex flex-col p-4  text-black gap-8 items-center '>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-blue-500 w-full px-4 py-1' type="text" name="site" id="" />
                    <div className="flex flex-col md:flex-row w-full gap-4 md:gap-8">

                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-blue-500 w-full px-4 py-2' type="text" name="username" />

                        <div className="relative w-full">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-blue-500 w-full px-4 py-2' type="password" name="password" />
                            <span className='absolute right-[4px] top-[5px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={25} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center text-white bg-blue-900 hover:bg-blue-800 rounded-full px-6 py-2 w-full sm:w-fit'>
                        <lord-icon
                            src="https://cdn.lordicon.com/vjgknpfx.json"
                            trigger="hover"
                            colors="primary:white,secondary:white"
                        >
                        </lord-icon>Save password </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'> Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <div className="overflow-x-auto">
                            <table className="table-auto min-w-[650px] w-full rounded-md overflow-hidden">
                                <thead className=' bg-blue-800 text-white'>
                                    <tr>
                                        <th className='py-2'>Site</th>
                                        <th className='py-2'>Username</th>
                                        <th className='py-2'>Password</th>
                                        <th className='py-2'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-blue-50'>
                                    {passwordArray.map((item, index) => {
                                        console.log(item)
                                        return <tr key={index}>
                                          <td className='py-2 px-2 border border-white text-center whitespace-nowrap'>{item.site}</td>
                                           <td className='py-2 px-2 border border-white text-center whitespace-nowrap'>{item.username}</td>
                                            <td className='py-2 px-2 border border-white text-center whitespace-nowrap'>{item.password}</td>

                                           <td className='py-2 border border-white text-center whitespace-nowrap'>
                                                <span className='cursor-pointer mx-2' onClick={() => editPassword(item.id)} ><lord-icon
                                                    src="https://cdn.lordicon.com/exymduqj.json"
                                                    trigger="hover"
                                                    style={{ width: "25px", height: "25px" }}
                                                ></lord-icon></span>
                                                <span className='cursor-pointer mx-2' onClick={() => deletePassword(item.id)} >
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/jzinekkv.json"
                                                        trigger="hover"
                                                        style={{ width: "25px", height: "25px" }}>
                                                    </lord-icon></span>
                                            </td>
                                        </tr>
                                    })}

                                </tbody>
                           </table>
</div>}
                            
                        </div>
            </div>


            </>

            )

}

            export default Manager

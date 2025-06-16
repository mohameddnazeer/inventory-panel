'use client'

import { motion } from "framer-motion"


const Page = () => {
    
  return (
    <motion.div initial={{y:100 , opacity :0}} animate={{y:0 , opacity:1}} 
    className="text-base lg:text-xl flex justify-center items-center w-screen h-screen">
      <p  className="bg-zinc-800 text-white p-3 rounded-lg ">
        لقد حدث خطأ غير متوقع </p>
    </motion.div>
  )
}

export default Page
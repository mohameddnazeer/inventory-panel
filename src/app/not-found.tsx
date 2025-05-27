'use client';
import React from 'react'
import {motion} from 'framer-motion'
const notFoundPage = () => {
  return (
    <motion.div initial={{opacity:0  ,y:100}} animate={{opacity:1 , y:0}} className='w-[90vw] h-[90vh] flex justify-center items-center'>
        <p className='py-2  px-6 bg-zinc-900 rounded-xl text-zinc-300 text-base md:text-lg lg:text-xl font-bold '>  لا يوجد صفحة بهذا الرابط</p>
    </motion.div>
  )
}

export default notFoundPage
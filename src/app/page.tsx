"use client";
import Form from "@/components/Form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (token) {
      console.log("token tessssssssssst"  , token )
      router.push("./dashboard");
    }
  }, [token , router]);
  return (
    <main className="text-black w-full  h-[88vh] flex px-[30px] md:px-[50px]  lg:px-[100px] justify-center items-center gap-x-2">
      <div className="  drop-shadow-amber-700 shadow-2xl rounded-4xl bg-white backdrop-blur-md w-[500px]">
        <div>
          <Image
            src={"/images/foeLogo.png"}
            className="m-auto"
            alt="image"
            width={300}
            height={300}
          />
        </div>
        <Form />
      </div>
      {/* <div className='hidden sm:block'>
        <Image src={'/images/logo2.png'} alt="image" width={400} height={400} />
      </div> */}
    </main>
  );
};

export default Page;

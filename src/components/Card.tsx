"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface CardProps {
  title: string;
  totalNumber: number;
  to: string;
  isLoading?: boolean;
}

const Card = ({ title, totalNumber, to, isLoading = false }: CardProps) => {
  const count = useMotionValue(getTotalNumber(totalNumber)); // start 10 before total
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    if (!isLoading) {
      const controls = animate(count, totalNumber, {
        duration: 1, // seconds
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [count, totalNumber, isLoading]);
  function getTotalNumber(totalNumber: number) {
    if (totalNumber >= 20) {
      return totalNumber - 10;
    }
    return 0;
  }
  return (
    <div className="max-w-xs p-6 bg-white dark:bg-slate-900 border border-gray-200 rounded-lg shadow-sm ">
      <div className="flex gap-2 justify-center items-center text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-7 h-7 text-black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
          />
        </svg>

        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-black ">
          {title}
        </h5>
      </div>
      <p className="mb-3 font-normal text-center text-3xl text-gray-500 dark:text-gray-">
        <motion.span>{rounded}</motion.span>
      </p>
      <Link
        href={to}
        className="inline-flex font-medium items-center text-right text-blue-600 hover:underline"
      >
        إذهب إلى الصفحة
        <svg
          className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
          />
        </svg>
      </Link>
    </div>
  );
};

export default Card;

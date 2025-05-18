"use client";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

interface CardProps {
  title: string;
  totalNumber: number;
  to: string;
  isLoading?: boolean;
}

export default function Card({ title, totalNumber, to, isLoading = false }: CardProps) {
  const count = useMotionValue(Math.max(0, totalNumber - 10)); // start 10 before total, minimum 0
  const rounded = useTransform(count, latest => Math.floor(latest));

  useEffect(() => {
    if (!isLoading) {
      const controls = animate(count, totalNumber, {
        duration: 1, // seconds
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [count, totalNumber, isLoading]);

  return (
    <Link href={to}>
      <div className="bg-white relative p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <div className="flex justify-center items-center text-center gap-2">
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
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>

        {isLoading ? (
          <div className="h-8 w-20 mx-auto bg-gray-200 animate-pulse rounded"></div>
        ) : (
          <p className="text-3xl text-center font-bold text-blue-600 my-3">
            <motion.span>{rounded}</motion.span>
          </p>
        )}

        <div className="flex items-center justify-center gap-2 text-blue-600 font-bold">
          <span>إذهب إلى الصفحة</span>
          <svg
            className="w-5 h-5 rtl:rotate-[270deg]"
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
        </div>
      </div>
    </Link>
  );
}

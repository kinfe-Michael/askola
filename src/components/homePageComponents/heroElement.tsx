import { initThemeParams } from "@telegram-apps/sdk";
import Link from "next/link";
import React from "react";

interface Element {
  title: String;
  description: string;
  variant?: string;
  route:string;
  children: React.ReactNode
}

function HeroElement(props: Element) {
  const variantspecifier = `p-2  mr-4 rounded-md h-full text-sm ${
    props.variant === "primary"
      ? "text-white  bg-green-400"
      : "bg-gray-100 text-blue-300"
  }`;

  return (
    <Link href={`/${props.route}`} className="flex items-center   bg-gradient-to-r  from-white via-gray-100 to-white mt-2 w-full rounded-md h-12 ">
      <div className={`w-12 h-12 m-2 flex items-center  bg-white justify-center text-2xl  text-gray-400 border-gray-400 rounded-full  border`}>
        {props.children}
      </div>
      <div className="flex flex-col flex-grow  h-full">
        <p className=" ">{props.title}</p>
        <p className=" text-xs w-max px-2 rounded-lg  text-[--tg-theme-subtitle-text-color]">
          {props.description}
        </p>
      </div>

      <button className={variantspecifier}>See</button>
    </Link>
  );
}

export default HeroElement;

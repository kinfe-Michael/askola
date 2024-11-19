import Image from "next/image";
import React from "react";

function PageNotFound() {
  return (
    <div className="flex flex-col min-h-dvh items-center justify-center">
      <Image
        className=" w-32 m-2 h-32 rounded-full "
        alt="Lomi Learn"
        src="/logo.jpg"
        width={100}
        height={100}
      />
      <h1 className="text-2xl font-medium"> PAGE NOT FOUND!!</h1>
      <h1>Stay in your lane buddy!</h1>
    </div>
  );
}

export default PageNotFound;

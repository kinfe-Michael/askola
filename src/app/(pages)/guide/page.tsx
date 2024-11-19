import Image from "next/image";
import React from "react";

function GuidePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-white items-center justify-center">
      <Image
        className=" w-32 m-2 h-32 rounded-full "
        alt="Lomi Learn"
        src="/logo.jpg"
        width={100}
        height={100}
      />
      <h1 className="text-2xl font-medium">COMEING SOON!!</h1>
      <h1>Stay with us till then!</h1>
    </div>
  );
}

export default GuidePage;

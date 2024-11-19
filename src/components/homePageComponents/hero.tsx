import { getUserAction } from "@/controllers/actions/getUserAction";
import { useQuery } from "@tanstack/react-query";
import { useInitDataRaw } from "@telegram-apps/sdk-react";
import Image from "next/image";
import { HiOutlineCash } from "react-icons/hi";

function Hero() {
  const user = useInitDataRaw();

  const id = user.result?.user?.id;
  let userData;

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => id && (await getUserAction(id)),
  });
  userData = data?.user[0];
  return (
    <div className="flex bg-white h-56 w-full justify-center mb-4 items-center">
      <Image
        className="w-32 m-2 h-32 rounded-full"
        alt="Lomi Learn"
        src="/logo.jpg"
        width={100}
        height={100}
      />

      <div className="flex flex-col">
        <h1 className="font-sans   font-semibold  text-2xl">Lomi-school</h1>
        <h1 className="font-sans flex-grow  text-gray-400">
          Community of Eliets
        </h1>
        <div className="flex gap-2 items items-center">
          <HiOutlineCash className="text-green-400 w-4" />
          <h2 className="font-medium">{userData?.lemons || "0"} lms</h2>
        </div>
      </div>
    </div>
  );
}

export default Hero;

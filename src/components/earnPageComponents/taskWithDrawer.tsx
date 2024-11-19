"use client";
import { PropsWithChildren, useState } from "react";
import {
  Drawer,
  DrawerPortal,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "../ui/drawer";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { HiOutlineDuplicate } from "react-icons/hi";
import { BiCheckDouble } from "react-icons/bi";
import { TaskData } from "@/lib/types";
import { initInitData } from "@telegram-apps/sdk";
import { updateLemonsAction } from "@/controllers/actions/updateLemonsAction";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function TaskWithDrawer(props: TaskData) {
  const [isCoppied, setIsCoppied] = useState(false);
  const router = useRouter()
  const updateData = {
    userId: initInitData()?.user?.id,
    add: props.secondaryInfo,
    subs: 0,
  };

  return (
    <Drawer>
      <DrawerTrigger
        onClick={async () => {
          if (props.linkType === "share") return;

          if (
            typeof updateData?.userId === "number" &&
            typeof props.secondaryInfo === "number"
          ) {
            const res = await updateLemonsAction(updateData);
            if (res?.error) {
              toast.error("somthing went wrong! try again later");
              return;
            }
            router.refresh()
          }

          return;
        }}
        className="bg-gradient-to-r from-white via-gray-100 to-white  rounded-md flex p-2 justify-between text-sm items-center"
      >
        <p className="font-medium">{props.taskName}</p>
        <div className="flex items-center gap-2">
          <p className="text-gray-400">+{props.secondaryInfo}</p>
          <p className="border min-w-20 rounded-md text-white text-sm py-1 bg-green-400">
            {props.actionText}
          </p>
        </div>
      </DrawerTrigger>
      {props.linkType === "share" && (
        <DrawerPortal>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Invite a friend</DrawerTitle>
              <DrawerDescription>
                Copy the link to share with friends
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col w-full items-center h-min-52 p-2 gap-2">
              <Input className="h-16 text-lg" value={props.link} readOnly />
              <Button
                onClick={() => {
                  setIsCoppied(true);
                }}
                className="hover:bg-green-400 hover:text-white"
                variant="secondary"
              >
                {isCoppied ? (
                  <BiCheckDouble className="text-2xl text-gray-600" />
                ) : (
                  <HiOutlineDuplicate className="text-2xl text-gray-600" />
                )}
              </Button>
            </div>
            <DrawerFooter>Shere this with friends</DrawerFooter>
          </DrawerContent>
        </DrawerPortal>
      )}
    </Drawer>
  );
}

export default TaskWithDrawer;

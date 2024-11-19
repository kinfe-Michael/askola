"use server";

import { connectDB } from "@/lib/db";
import UserModel from "@/models/userModel";

export async function updateLemonsAction({
  userId,
  add,
  subs,
}: {
  userId?: number;
  add: number;
  subs: number;
}) {
  if (typeof userId !== "number") return { error: true, lowLemons: false };
  if (typeof add !== "number") return { error: true, lowLemons: false };
  if (typeof subs !== "number") return { error: true, lowLemons: false };
  try {
    const db = await connectDB();
    if (!db) return { error: true, lowLemons: false };
    return UserModel.findOne({ userId: userId }).then((user) => {

      if (user.lemons >= subs) {
        user.lemons = user.lemons - subs + add;
        return user.save().then(() => {
          return { error: false, lowLemons: false };
        });
      } else {
        return { error: false, lowLemons: true };
      }
    });
  } catch (error) {
    return { error: true, lowLemons: false };
  }
}

"use server";

import { connectDB } from "@/lib/db";
import InviteModel from "@/models/inviteModel";
import UserModel from "@/models/userModel";

export async function inviteAction({ inviteeId, inviteeName, inviterId }: any) {
  inviterId = +inviterId;
  if (
    typeof inviteeId !== "number" ||
    typeof inviterId !== "number" ||
    typeof inviteeName !== "string"
  ) {
    return;
  }

  try {
    const db = await connectDB();
    if (!db) return;
    const isInvitationNew = await InviteModel.findOne({ inviteeId: inviteeId });
    if (!!isInvitationNew) return;
    const newInvitation = new InviteModel({
      inviteeId: inviteeId,
      inviteeName: inviteeName,
      inviterId: inviterId,
    });

    await newInvitation.save().catch((error: any) => {
    });

    return UserModel.findOne({ userId: inviterId }).then((user) => {
      user.lemons = user.lemons + 5000;

      return user.save();
    });
  } catch (error) {
    return;
  }
}

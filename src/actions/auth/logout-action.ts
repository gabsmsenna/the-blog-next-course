import { deleteLoginSession } from "@/lib/post/login/manage-login";
import { redirect } from "next/navigation";

export async function logoutAction() {
    await deleteLoginSession();
    redirect('/');
}
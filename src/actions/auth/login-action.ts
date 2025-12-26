'use server';

import { createLoginSession, verifyPassword } from "@/lib/post/login/manage-login";
import { asyncDelay } from "@/utils/async-delay";
import { redirect } from "next/navigation";

type LoginActionState = {
    username: string,
    error: string
};

export async function loginAction(state: LoginActionState, formData: FormData) {
    const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

    if (!allowLogin) {
        return {
            username: '',
            error: 'Login não permitido'
        };
    }

    if (!(formData instanceof FormData)) {
        return {
            username: '',
            error: 'Dados inválidos'
        };
    }

    const usernameForm = formData.get('username')?.toString().trim() || '';
    const passwordForm = formData.get('password')?.toString().trim() || '';
    
    if (!usernameForm || !passwordForm) {
        return {
            usernameForm,
            error: 'Digite usuário e senha'
        };
    }

    const isUsernameValid = usernameForm === process.env.LOGIN_USER;
    const isPasswordValid = await verifyPassword(passwordForm, process.env.LOGIN_PASSWORD || '');

    if (!isUsernameValid || !isPasswordValid) {
        return {
            usernameForm,
            error: 'Usuário ou senha inválidos'
        };
    }

    await createLoginSession(usernameForm);
    redirect('/admin/post');
}
import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { useLoginMutation } from "@/services/authApi"

export default function Login() {
    const [login] = useLoginMutation();
    const [errors, setErrors] = useState(null);

    const handleLogin = async (credentials) => {
        try {
            setErrors(null);
            const response = await login(credentials).unwrap();

            window.localStorage.setItem('accessToken', response.access);
            window.localStorage.setItem('refreshToken', response.refresh);

            window.location.href = "/dashboard";
        } catch (error) {
            let messages = [];

            if (error.status === 'FETCH_ERROR') {
                messages.push("Server is unreachable.");
            } else {
                messages.push(error.data?.message || error.data?.details || "Login failed. Please try again.");
            }

            setErrors(messages);
        }
    };

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm onSubmit={handleLogin} errors={errors} />
            </div>
        </div>
    )
}

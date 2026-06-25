import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { useLoginMutation } from "@/services/authApi"

export default function Login() {
    const [login] = useLoginMutation();
    const [error, setError] = useState(null);

    const handleLogin = async (credentials) => {
        try {
            setError(null);
            const response = await login(credentials).unwrap();

            window.localStorage.setItem('accessToken', response.access);
            window.localStorage.setItem('refreshToken', response.refresh);

            // window.location.href = "/dashboard";
        } catch (error) {
            console.error("Login failed:", error);

            let message;

            if (error.status === 'FETCH_ERROR') {
                message = "Server is unreachable.";
            } else {
                message = error.data?.message || error.data?.details || "Login failed. Please try again.";
            }

            setError(message);
        }
    };

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm onSubmit={handleLogin} error={error} />
            </div>
        </div>
    )
}

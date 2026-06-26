import { useState } from "react";
import { GalleryVerticalEnd } from "lucide-react"
import { useRegisterMutation } from "@/services/authApi";

import { SignupForm } from "@/components/signup-form"

export default function Signup() {
    const [errors, setErrors] = useState(null);
    const [register] = useRegisterMutation();

    const handleSignup = async (credentials) => {
        try {
            setErrors(null);
            const response = await register(credentials).unwrap();

            window.localStorage.setItem('accessToken', response.access);
            window.localStorage.setItem('refreshToken', response.refresh);

            window.location.href = "/dashboard";
        } catch (error) {
            console.error("Signup failed:", error);

            let messages = [];

            if (error.status === 'FETCH_ERROR') {
                messages.push("Server is unreachable.");
            } else {
                messages = Object.values(error.data).flat();
            }

            setErrors(messages);
        }
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    PineVox Inc.
                </a>
                <SignupForm onSubmit={handleSignup} errors={errors} />
            </div>
        </div>
    )
}

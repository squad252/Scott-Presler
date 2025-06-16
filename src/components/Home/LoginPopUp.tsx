/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { account } from "@/config/appwrite";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { getUserData } from "@/services/databaseService.service";

export default function LoginPopUp() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [checkingSession, setCheckingSession] = useState(true); // flag to control UI rendering

    // 1. Run this on initial load to prevent showing login if already logged in
    useEffect(() => {
        const checkIfLoggedIn = async () => {
            try {
                const sessionUser = await account.get();

                // fetch user data for session (optional if not needed right now)
                console.log("Session User:", sessionUser);
                const userData = await getUserData(sessionUser.$id);
                console.log("User Data:", userData);

                // Admin shortcut
                if (
                    sessionUser.email === "agananojoshua001@gmail.com" ||
                    sessionUser.email === "squadron0099@gmail.com"
                ) {
                    navigate("/dashboard", { replace: true });
                }

                // For all logged-in users: reload or move to home
                window.location.reload(); // this kills the need to show login at all
            } catch {
                // Not logged in, show the form
                setCheckingSession(false);
            }
        };

        checkIfLoggedIn();
    }, [navigate]);

    // 2. Handle Login Submission
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await account.createEmailPasswordSession(email, password);
            const sessionUser = await account.get();
            console.log("Session User:", sessionUser);
            const userData = await getUserData(sessionUser.$id);
            console.log("User Data:", userData);

            if (
                sessionUser.email === "agananojoshua001@gmail.com" ||
                    sessionUser.email === "squadron0099@gmail.com"
            ) {
                navigate("/dashboard", { replace: true });
            }

            window.location.reload();
        } catch (err: any) {
            console.error("Login failed:", err);
            setError(err?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // 3. Don’t render login form until session check completes
    if (checkingSession) return null;

    return (
        <div className="w-full max-w-lg mx-auto bg-white rounded-lg">
            <Card className="w-full border-none shadow-none">
                <CardContent>
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="your@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && <div className="text-sm text-center text-red-600">{error}</div>}

                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                className="rounded-none px-8 py-6 bg-[#CD0C0C] text-white text-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-200"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

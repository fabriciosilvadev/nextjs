import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const user = await res.json();

    localStorage.setItem("token", user.token);

    if (res.ok) {
      router.push("/platform/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded shadow-md space-y-4"
      >
        <h1 className="text-2xl">Acesse sua conta</h1>
        <input
          className="border p-2 w-full"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}

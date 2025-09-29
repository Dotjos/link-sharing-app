import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function VerifyPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");

    if (!email || !token) {
      setStatus("error");
      setMessage("Invalid verification link.");
      return;
    }

    async function verify() {
      try {
        const res = await fetch(
          `http://localhost:5000/auth/verify?email=${email}&token=${token}`
        );

        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setMessage(data.message);

          // redirect after 3 seconds
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          setStatus("error");
          setMessage(data.error || "Verification failed.");
        }
      } catch (err) {
        setStatus("error");
        setMessage("Something went wrong. Please try again later.");
      }
    }

    verify();
  }, [searchParams, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <img src="/logo-devlinks-large.svg" alt="Logo" className="mb-8" />
      {status === "loading" && (
        <p className="text-blue-500 text-lg font-semibold">
          Verifying your email...
        </p>
      )}

      {status === "success" && (
        <p className="text-green-600 text-lg font-semibold">
          ✅ {message} <br />
          <span className="text-gray-500 text-sm">
            Redirecting to login page...
          </span>
        </p>
      )}

      {status === "error" && (
        <p className="text-red-600 text-lg font-semibold">❌ {message}</p>
      )}
    </div>
  );
}

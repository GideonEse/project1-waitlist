// // src/app/page.js
// export default function Home() {
//   return (
//     <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
//       <div className="max-w-4xl w-full text-center">
//         <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
//           Launching Soon
//         </h1>
//         <p className="text-xl md:text-2xl text-gray-200 mb-12">
//           Get notified when we launch. Zero spam.
//         </p>

//         <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
//           <input
//             type="email"
//             name="email"
//             placeholder="your@email.com"
//             className="flex-1 px-6 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             required
//           />
//           <button
//             type="submit"
//             className="px-10 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition shadow-lg text-lg"
//           >
//             Notify Me
//           </button>
//         </form>

//         <p className="text-sm text-gray-400 text-center mt-8">
//           Zero spam. Unsubscribe anytime.
//         </p>
//       </div>
//     </main>
//   );
// }

// src/app/page.js
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // idle, loading, success, error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase
      .from("emails")
      .insert({ email: email.trim() });

    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
      setEmail("");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
          Launching Soon
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-12">
          Get notified when we launch. Zero spam.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-6 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            disabled={status === "loading" || status === "success"}
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="px-10 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 disabled:opacity-70 transition"
          >
            {status === "loading" ? "Saving..." : status === "success" ? "✓ Done" : "Notify Me"}
          </button>
        </form>

        {status === "success" && (
          <p className="text-green-300 mt-6 text-lg">You're in! Check your inbox on launch day.</p>
        )}
        {status === "error" && (
          <p className="text-red-400 mt-6">Something went wrong. Try again.</p>
        )}

        <p className="text-sm text-gray-400 text-center mt-8">
          Zero spam. Unsubscribe anytime.
        </p>
      </div>
    </main>
  );
}
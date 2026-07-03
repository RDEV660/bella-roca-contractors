"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginAction, type ActionResult } from "@/app/admin/actions";

export function AdminLogin() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<
    ActionResult | undefined,
    FormData
  >(loginAction, undefined);

  useEffect(() => {
    if (state?.ok) router.refresh();
  }, [state, router]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4">
      <h1 className="font-display text-3xl text-white sm:text-4xl">
        Photo Manager
      </h1>
      <p className="mt-3 text-sm text-zinc-400">
        Enter your password to add or remove photos on the website.
      </p>

      <form action={formAction} className="mt-8 space-y-4">
        <div>
          <label htmlFor="password" className="text-sm text-zinc-300">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            autoFocus
            className="mt-2 text-lg"
          />
        </div>

        {state?.error && (
          <p className="text-sm text-red-400" role="alert">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          className="btn-primary w-full text-center text-lg"
          disabled={pending}
        >
          {pending ? "Checking…" : "Log In"}
        </button>
      </form>
    </div>
  );
}

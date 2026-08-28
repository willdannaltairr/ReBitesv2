"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Leaf, Mail } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.45, ease: EASE },
  },
};

function FieldBox({
  id,
  label,
  icon: Icon,
  children,
}: {
  id: string;
  label: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-stone"
      >
        {label}
      </label>
      <div className="group flex items-center gap-2 rounded-lg border border-hairline bg-white px-3 py-2 transition-colors duration-200 focus-within:border-green-700 focus-within:ring-1 focus-within:ring-green-700/15">
        <Icon className="h-3.5 w-3.5 shrink-0 text-stone/55 transition-colors duration-200 group-focus-within:text-green-700" />
        {children}
      </div>
    </div>
  );
}

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      const { supabase } = await import("@/lib/supabase");
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(
            "/auth/buat-sandi-baru",
          )}`,
        },
      );
      if (resetError) throw resetError;
      setSent(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      if (message.includes("Supabase env")) {
        setError(
          "Fitur ini belum aktif. Atur NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY.",
        );
      } else if (message.includes("Email not found")) {
        setError("Email tidak terdaftar.");
      } else {
        setError(message || "Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex h-full min-h-0 flex-col overflow-hidden">
      <motion.div variants={itemVariants} className="mb-3 flex-shrink-0">
        <Link
          href="/auth/login"
          className="group inline-flex items-center gap-1.5 rounded-full py-1 pr-2 font-sans text-[13px] font-medium text-stone transition-colors duration-200 hover:text-green-700"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
          Kembali
        </Link>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mb-5 flex items-center justify-center gap-2 lg:hidden flex-shrink-0"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-700 text-cream">
          <Leaf className="h-[15px] w-[15px]" strokeWidth={1.75} />
        </span>
        <span className="font-display text-lg font-semibold tracking-tight text-green-700">
          ReBites
        </span>
      </motion.div>

      {sent ? (
        <motion.div
          variants={itemVariants}
          className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-hairline bg-cream-50 px-6 py-8 text-center"
        >
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-green-700 text-white"
          >
            <CheckCircle2 className="h-6 w-6" />
          </motion.span>
          <h1 className="mt-4 font-display text-[22px] font-bold tracking-[-0.02em] text-charcoal-900">
            Cek Email Kamu
          </h1>
          <p className="mt-2 font-sans text-[13px] leading-relaxed text-stone">
            Kami sudah mengirimkan tautan reset kata sandi ke{" "}
            <span className="font-semibold text-green-700">{email}</span>. Ikuti
            tautan tersebut untuk membuat kata sandi baru.
          </p>
          <Link
            href="/auth/login"
            className="mt-6 inline-flex items-center gap-2 font-sans text-[13px] font-semibold text-green-700 underline underline-offset-4 transition-colors hover:text-forest-800"
          >
            Kembali ke halaman login
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      ) : (
        <>
          <motion.h1
            variants={itemVariants}
            className="font-display text-[22px] font-bold leading-[1.1] tracking-[-0.02em] text-charcoal-900 flex-shrink-0"
          >
            Lupa Kata
            <br />
            Sandi?
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-1.5 font-sans text-[13px] leading-relaxed text-stone flex-shrink-0"
          >
            Masukkan email yang terdaftar. Kami akan mengirimkan tautan untuk
            mengatur ulang kata sandimu.
          </motion.p>

          <motion.form
            variants={itemVariants}
            className="mt-6 flex flex-1 flex-col gap-4 overflow-hidden min-h-0"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="grid gap-4 overflow-y-auto overscroll-contain pr-1.5 -mr-1.5 pb-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-hairline [&::-webkit-scrollbar-track]:bg-transparent min-h-0">
              <FieldBox id="email" label="Email Address" icon={Mail}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent py-1 font-sans text-[14px] leading-none text-forest-800 outline-none placeholder:text-stone"
                />
              </FieldBox>

              {error && (
                <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-sans text-[12px] leading-relaxed text-red-700">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg bg-forest-dark px-5 py-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm transition-colors duration-200 hover:bg-forest-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 disabled:cursor-not-allowed disabled:opacity-70 flex-shrink-0"
            >
              {loading ? "Mengirim..." : "Kirim Tautan Reset"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.form>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-center font-sans text-[13px] text-stone flex-shrink-0"
          >
            Ingat kata sandi?{" "}
            <Link
              href="/auth/login"
              className="font-semibold text-green-700 underline underline-offset-4 transition-colors hover:text-forest-800"
            >
              Masuk
            </Link>
          </motion.p>
        </>
      )}
    </motion.div>
  );
}

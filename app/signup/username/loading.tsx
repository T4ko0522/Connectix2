import { Logo } from "@/components/logo"

export default function UsernameSetupLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black">
      <Logo size={48} className="mb-8 animate-pulse" />
      <div className="h-2 w-48 animate-pulse rounded-full bg-white/20"></div>
      <div className="mt-4 h-2 w-64 animate-pulse rounded-full bg-white/10"></div>
    </div>
  )
}

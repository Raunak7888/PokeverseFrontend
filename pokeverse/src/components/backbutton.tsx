"use client";
import { useRouter,usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

    if (pathname === "/") return null;

  return (
    <button
      onClick={() => router.back()}
      className="absolute top-20 left-4 z-50 h-13 bg-[#2e2e2e] text-white px-4 py-2 rounded-full shadow hover:bg-[#fff] hover:text-black transition-all flex items-center gap-2"
    >
      <ArrowLeft size={20} />
      
    </button>
  );
}

import { Inter } from "next/font/google";
import MainLayout from "@/components/MainLayout";
import { Toaster } from "sonner";
import LeftAside from "@/components/LeftAside";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
  <>
    <Toaster position="bottom-right"/>
    <MainLayout>
      <div className="w-full md:grid grid-cols-[1fr,2fr] lg:grid-cols-[1fr,2fr,1fr] mt-8 bg-zinc-100">
        <LeftAside className="hidden md:flex bg-zinc-100"/>
        <div className="bg-yellow-300">Main</div>
        <div className="bg-green-400 hidden lg:flex">Aside right</div>
      </div>
    </MainLayout>
  </>);
}

import Link from "next/link"
import { BrainCircuit } from "lucide-react"


export default function FooterSection(){

    return (
        <footer className="py-10 md:py-12 bg-surface-950 text-surface-300 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-white/10 p-2 rounded-xl text-white">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter">
              inteleek<span className="text-brand-400">.ai</span>
            </span>
          </Link>
          <p className="text-xs sm:text-sm font-medium">© 2026 inteleek Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm font-semibold">
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    )
}
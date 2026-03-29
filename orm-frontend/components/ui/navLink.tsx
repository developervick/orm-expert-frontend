import Link from "next/link";
function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link href={href} className="px-4 py-2 rounded-lg text-sm font-semibold text-surface-800 hover:text-brand-700 hover:bg-brand-50 transition-all">
      {children}
    </Link>
  );
}

export default NavLink
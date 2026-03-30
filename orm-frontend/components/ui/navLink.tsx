import Link from "next/link";
function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link href={href} className="px-4 py-2 rounded-lg text-sm font-semibold text-surface-800 hover:text-brand-700 hover:bg-brand-50 transition-all">
      {children}
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string, onClick: () => void, children: React.ReactNode }) {
  return (
    <Link href={href} onClick={onClick} className="px-4 py-3 rounded-xl text-base font-semibold text-surface-800 hover:text-brand-700 hover:bg-brand-50 transition-all w-full">
      {children}
    </Link>
  );
}

export { NavLink, MobileNavLink}
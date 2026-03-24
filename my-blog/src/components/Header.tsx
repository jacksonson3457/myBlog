import Link from "next/link";

export default function Header() {
  return (
    <header
      className="fixed top-0 z-20 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl"
    >
      <div className="content-wrap flex items-center justify-between px-1 py-4">
        <h1 className="text-lg font-semibold tracking-[0.18em] text-stone-100 sm:text-xl">
          JACKSON BLOG
        </h1>
        <nav className="space-x-5 text-sm text-stone-300">
          <Link href="/" className="hover:text-stone-100">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}

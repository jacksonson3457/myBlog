import Link from "next/link";

export default function Header() {
  return (
    <header
      className="flex fixed top-0 w-full items-center 
    justify-center p-4 bg-gray-800 text-white z-10"
    >
      <h1 className="text-xl font-bold flex-1">Jackson Blog</h1>
      <nav className="space-x-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>

        {/* <Link href="/1" className="hover:underline">
          Blog
        </Link> */}
      </nav>
    </header>
  );
}

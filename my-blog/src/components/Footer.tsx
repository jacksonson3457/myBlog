import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-100 text-sm py-6 px-4">
      <div className="max-w-screen-lg mx-auto flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0">
        <p className="text-sm mt-4 sm:mt-0">© 2025 Jackson Blog</p>
      </div>
    </footer>
  );
}

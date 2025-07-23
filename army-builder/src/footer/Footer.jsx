import Link from "next/link";

export default function Footer() {
  return (
    <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      <Link
        href="/"
        className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100"
      >
        Home
      </Link>
      <Link
        href="/character-creation"
        className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100"
      >
        Character Creation
      </Link>
      <Link
        href="/rules"
        className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-100"
      >
        Rules
      </Link>
    </footer>
  );
}

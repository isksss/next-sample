import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="bg-yellow-500 text-white p-4">
        <h1 className="text-2xl font-bold">Sample Page</h1>
        <ul className="flex gap-4 mt-2">
          <li>
            <Link href="/login" className="text-white hover:underline">
              login
            </Link>
          </li>
        </ul>
      </header>
    </>
  );
}

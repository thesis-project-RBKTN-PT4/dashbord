import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <h1>Hello</h1>
      <button>
        <Link href="/users">Users</Link>
      </button><br />
      <button>
        <Link href="/doctors">Doctors</Link>
      </button>
      <br />
      <button>
        <Link href="/patients">Patients</Link>
      </button>
      <br />
    </main>
  );
}

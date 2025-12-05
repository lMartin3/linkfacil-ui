import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Linkfacil</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">
        Easily create pages with links to all your social media profiles
      </p>
      <div className="mt-6">
        <Button>
          <Link href="/pages">Try it out</Link>
        </Button>
      </div>
    </main>
  );
}

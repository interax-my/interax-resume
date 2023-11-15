"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

export default function MainNav() {
  const pathname = usePathname()

  return (
    <header className="w-full z-50 sticky top-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <nav
          className="flex items-center align-middle w-full justify-between space-x-4 lg:space-x-6"
        >
          <Link href="/">
            <div className="logo font-semibold text-primary text-lg">
              InteraxResume
            </div>
          </Link>
          <div className="flex space-x-4">
            {/* <Link
              href="/page-1"
              className={cn("text-sm font-medium transition-colors hover:text-primary", pathname == "/login" ? "text-foreground" : "text-muted-foreground")}
            >
              Page 1
            </Link>
            <Link
              href="/page-2"
              className={cn("text-sm font-medium transition-colors hover:text-primary", pathname == "/register" ? "text-foreground" : "text-muted-foreground")}
            >
              Page 2
            </Link> */}
            <ModeToggle></ModeToggle>
          </div>
        </nav>
      </div>
    </header>
  )
}
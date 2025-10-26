import { Activity } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card h-16 flex items-center px-6 lg:px-8">
      <div className="flex items-center gap-3 flex-1">
        <Activity className="h-6 w-6 text-primary" data-testid="icon-logo" />
        <h1 className="text-xl font-semibold" data-testid="text-app-title">
          Algorithm Complexity
        </h1>
      </div>
      <ThemeToggle />
    </header>
  );
}

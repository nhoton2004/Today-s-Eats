import { ChefHat } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-4 shadow-lg sticky top-0 z-20">
      <div className="max-w-md mx-auto flex items-center justify-center">
        <div className="flex items-center gap-2">
          <ChefHat size={28} />
          <h1 className="text-xl font-bold font-headline">Hôm Nay Ăn Gì?</h1>
        </div>
      </div>
    </header>
  );
}

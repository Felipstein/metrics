import { PieChart } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex select-none items-center gap-2 text-white">
      <PieChart className="mt-0.5 h-7 w-7" strokeWidth={3} />

      <h1 className="text-3xl font-bold">metrics</h1>
    </div>
  );
}

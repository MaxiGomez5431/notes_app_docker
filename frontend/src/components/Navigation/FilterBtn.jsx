import { ListFilterPlus  } from 'lucide-react';


export default function FilterBtn({ onClick }) {

  return (
      <div 
        onClick={onClick}
        className="flex items-center justify-center gap-1
        py-4 pl-3.5 pr-4 rounded-[var(--rounded-standard)]
        bg-white text-text-color font-semibold
        cursor-pointer transition active:translate-y-0.5 
        w-full lg:w-[var(--note-width)] lg:min-w-[calc(var(--note-width)/2)]
        border border-gray-300
        hover:bg-brand-orange/20 hover:border-brand-orange hover:text-brand-orange"
      >
        <ListFilterPlus />
        Filter notes
      </div>
  );
}
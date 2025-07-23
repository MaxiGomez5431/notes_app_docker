import { X } from 'lucide-react';

export default function TagFilterPills({tagFilters, setTagFilters}) {

  const deleteTag = (tag) => {
    const updatedTags = tagFilters.filter((t) => t !== tag);
    setTagFilters(updatedTags);
  }

  return (
    <>
    {
      tagFilters.length > 0 &&
      <div className="flex justify-baseline gap-5 mb-5">
        {tagFilters.map((tag, index) => (
          <Tag key={index} name={tag} deleteTag={deleteTag} />
        ))}
      </div>
    }
    </>
  )
}

function Tag({ name, deleteTag }) {

  

  return (
    <span className="flex justify-around items-center gap-2 
      bg-brand-orange/15 text-brand-orange
      px-4 py-1 rounded-[var(--rounded-standard)]
      border-2 border-transparent
      group hover:border-red-600
      transition-all cursor-pointer"

      onClick={() => { deleteTag(name) }}
    >
      {name}
      <X className='w-5 h-5 group-hover:text-red-600 transition-colors'></X>
    </span>
  );
}
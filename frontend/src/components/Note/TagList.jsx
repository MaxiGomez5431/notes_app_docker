
export default function TagList({ tags }) {
  const maxTags = 2;
  const visibleTags = tags.slice(0, maxTags);
  const hiddenCount = tags.length - maxTags;

  return (
    <div className="flex justify-center gap-3 w-full items-center overflow-hidden whitespace-nowrap">
      {visibleTags.map((tag, index) => (
        <span
          key={index}
          className="inline-block bg-brand-orange text-white px-4 py-1 rounded-[var(--rounded-standard)]"
        >
          {tag}
        </span>
      ))}
      {hiddenCount > 0 && (
        <span className="inline-block text-gray-600 text-sm px-3 py-1 rounded-full bg-gray-200">
          + {hiddenCount}
        </span>
      )}
    </div>
  );
}

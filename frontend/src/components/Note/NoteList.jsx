import Note from "./Note";

export default function NoteList({ notes, searchQuery }) {
  const filteredData = notes
    .filter((note) => {
      if (searchQuery.length === 0) return true;

      const noteText = (
        note.title + " " + note.body + " " + note.tags.join(" ")
      ).toLowerCase();

      return searchQuery.some((term) => noteText.includes(term.toLowerCase()));
    });

  if (filteredData.length === 0) {
    return (
      <div className="empty-notes-message text-center py-10 text-text-color text-2xl">
        {notes.length === 0
          ? "No notes available, try creating one!"
          : "No notes match your search"}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(var(--note-width),1fr))] gap-5">
      {filteredData.map((note, index) => (
        <Note key={index} data={note} />
      ))}
    </div>
  );
}
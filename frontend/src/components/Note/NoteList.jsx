import { useEffect } from "react";
import Note from "./Note";

export default function NoteList({ notes, textFilters, tagFilters }) {
  const filteredData = notes.filter((note) => {
    const noteText = (note.title + " " + note.body).toLowerCase();
    
    // Check text filters (if any exist)
    const textMatch = textFilters.length === 0 || 
                    noteText.includes(textFilters.toLowerCase())
    
    const tagMatch = tagFilters.length === 0 ||
                    tagFilters.some(filterTag => 
                      note.tags.some(noteTag => 
                        noteTag.toLowerCase() === filterTag.toLowerCase()
                      )
                    );
    
    return textMatch && tagMatch;
  });

  useEffect(() => {
    console.log(notes);
  }, [notes]);

  if (filteredData?.length === 0) {
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
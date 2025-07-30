import { useState } from "react";
import { Edit } from "lucide-react";
import TagList from "./TagList";
import NoteModal from "./NoteModal";
import { useNotes } from '../../context/NoteContext';

export default function Note({ data }) {
  const [open, setOpen] = useState(false);
  const { updateNote, deleteNote } = useNotes();

  return ( //min-w-[var(--note-width)]
    <>
      <div className="relative flex flex-col items-start justify-start 
        border-gray-300 border rounded-[var(--rounded-standard)] 
        //// min-h-[var(--note-height)]
        shadow-custom-size shadow-gray-300 bg-white"
      >
        {/* Title and Ellipsis */}
        <div className="flex items-center justify-between 
          border-b border-b-gray-300 text-title-color w-full"
        >
          <h1 className="text-2xl truncate p-3.5">{data.title}</h1>
          <div className="relative">
            <Edit
              onClick={() => setOpen(true)}
              className="min-h-[24px] min-w-[24px] hover:text-brand-orange m-3.5 cursor-pointer"
            />
          </div>
        </div>

        {/* Body and tags */}
        <div className="flex flex-col items-start justify-between p-3.5 text-text-color flex-1 w-full">
          <p className="max-h-72 line-clamp-[4]">{data.body}</p>
          <TagList tags={data.tags} />
        </div>
      </div>

      {open && (
          <NoteModal
            isEditing={true}
            note={data}
            onClose={() => setOpen(false)}
            onSave={(updatedNote) => {
              updateNote(data.id, updatedNote)
              setOpen(false);
            }}
            onDelete={() => {
              deleteNote(data.id)
              setOpen(false);
            }}
          />
        )}
    </>
  );
}
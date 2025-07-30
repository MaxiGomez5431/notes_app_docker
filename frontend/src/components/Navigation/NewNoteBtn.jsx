import { Plus } from 'lucide-react';
import {useState} from 'react'
import NoteModal from "../Note/NoteModal";
import { useNotes } from '../../context/NoteContext';

export default function NewNoteBtn() {
  const [open, setOpen] = useState(false);
  const { createNote } = useNotes();
  return (
    <>
    <button
      onClick={() => {setOpen(true)}}
      className="flex items-center justify-center gap-1
        py-4 pl-3.5 pr-4 rounded-[var(--rounded-standard)]
        bg-brand-orange text-white font-semibold hover:bg-brand-orange-hover
        cursor-pointer transition active:translate-y-0.5 
        w-full lg:w-[var(--note-width)] lg:min-w-[calc(var(--note-width)/2)]
        "
    >
      <Plus />
      Create New Note
    </button>

    {open && (
        <NoteModal
          isEditing={false}
          onClose={() => setOpen(false)}
          onSave={(updatedNote) => {
            createNote(updatedNote)
            setOpen(false)
          }}
        />
      )}
    </>
  );
}
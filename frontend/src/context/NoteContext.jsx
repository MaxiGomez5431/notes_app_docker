import { createContext, useContext, useEffect, useState } from 'react';
import { getNotesAPI } from '../api/generated';

const NoteContext = createContext();

export function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);

  const {
    noteControllerFindAll,
    noteControllerFindArchived,
    noteControllerCreate,
    noteControllerUpdate,
    noteControllerRemove,
  } = getNotesAPI();

  const fetchNotes = async () => {
    const res = await noteControllerFindAll();
    setNotes(res.data.data);
  };

  const fetchArchivedNotes = async () => {
    const res = await noteControllerFindArchived();
    setArchivedNotes(res.data.data);
  };

  const createNote = async (data) => {
    await noteControllerCreate(data);
    fetchNotes();
    fetchArchivedNotes();
  };

  const updateNote = async (id, data) => {
    await noteControllerUpdate(id, data);
    fetchNotes();
    fetchArchivedNotes();
  };

  const deleteNote = async (id) => {
    await noteControllerRemove(id);
    fetchNotes();
    fetchArchivedNotes();
  };

  useEffect(() => {
    fetchNotes();
    fetchArchivedNotes();
  }, []);

  return (
    <NoteContext.Provider
      value={{
        notes,
        archivedNotes,
        fetchNotes,
        fetchArchivedNotes,
        createNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

export const useNotes = () => useContext(NoteContext);

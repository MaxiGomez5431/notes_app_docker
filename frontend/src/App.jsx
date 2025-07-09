import { useState } from "react";
import { Navigate, Routes, Route } from "react-router";
import Searchbar from "./components/Searchbar";
import NavigationBtns from "./components/Navigation/NavigationBtns";
import NoteList from "./components/Note/NoteList";
import { useNotes } from "./context/NoteContext";


function App() {
  const [searchQuery, setSearchQuery] = useState([]);
  const { notes, archivedNotes } = useNotes();

  return (
    <div className="flex flex-col min-h-screen w-full bg-grey-bg">
      
      <div className="mx-[120px]">
        <NavigationBtns />
      </div>

      <main className="flex-1 mx-[120px]">
        {notes && archivedNotes && (
          <Routes>
            <Route
              path="/notes/active"
              element={<NoteList notes={notes} searchQuery={searchQuery} />}
            />
            <Route
              path="/notes/archived"
              element={<NoteList notes={archivedNotes} searchQuery={searchQuery} />}
            />
            <Route path="*" element={<Navigate to="/notes/active" replace />} />
          </Routes>
        )}

      </main>
    </div>
  );
}

export default App;


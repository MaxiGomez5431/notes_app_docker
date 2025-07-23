import { useState } from "react";
import { Navigate, Routes, Route } from "react-router";
import Searchbar from "./components/Searchbar";
import NavigationBtns from "./components/Navigation/NavigationBtns";
import NoteList from "./components/Note/NoteList";
import { useNotes } from "./context/NoteContext";


function App() {
  const [textFilters, setTextFilters] = useState("");
  const [tagFilters, setTagFilters] = useState([]);
  const { notes, archivedNotes } = useNotes();

  return (
    <div className="flex flex-col min-h-screen w-full bg-grey-bg">
      
      <div className="mx-[120px]">
        <NavigationBtns setTextFilters={setTextFilters} tagFilters={tagFilters} setTagFilters={setTagFilters} />
      </div>

      <main className="flex-1 mx-[120px]">
        {notes && archivedNotes && (
          <Routes>
            <Route
              path="/notes/active"
              element={<NoteList notes={notes} textFilters={textFilters} tagFilters={tagFilters} />}
            />
            <Route
              path="/notes/archived"
              element={<NoteList notes={archivedNotes} textFilters={textFilters} tagFilters={tagFilters} />}
            />
            <Route path="*" element={<Navigate to="/notes/active" replace />} />
          </Routes>
        )}

      </main>
    </div>
  );
}

export default App;


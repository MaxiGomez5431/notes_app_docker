import { FormProvider } from "react-hook-form";
import FormInput from "../common/FormInput";
import FilterBtn from "./FilterBtn";
import NewNoteBtn from "./NewNoteBtn"
import NotesDisplayBtn from "./NotesDisplayBtn"
import { File } from 'lucide-react';
import { Archive  } from 'lucide-react';
import { useState } from 'react';

export default function NavigationBtns({setTextFilters, tagFilters, setTagFilters}) {
  const [openFilter, setOpenFilter] = useState(false);
  const [actualTag, setActualTag] = useState("");
  const [actualText, setActualText] = useState("");

  const addTag = (tag) => {
    if (tag.trim() === "") return;
    setTagFilters([...tagFilters, tag]);
    setActualTag("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTag(actualTag);
    setTextFilters(actualText);

    console.log("Text Filters:", actualText);
    console.log("Tag Filters:", tagFilters);
  };
  return (
    <>
      <div className="flex items-center justify-between my-5">

        <FilterBtn onClick={() => setOpenFilter(!openFilter)}/>

        <nav className="flex items-center justify-start gap-[10px] min-w-[var(--note-width)]">
          <NotesDisplayBtn route={"/notes/active"}>
            Active notes
            <File />
          </NotesDisplayBtn>

          <NotesDisplayBtn route={"/notes/archived"}>
            Archived notes
            <Archive />
          </NotesDisplayBtn>
        </nav>

        <NewNoteBtn/>
      </div>

      {openFilter && (
        <div className="flex items-center justify-center 
          bg-white w-full h-full border-gray-300 border rounded-[var(--rounded-standard)] mb-5"
        >
          <form
            className="flex flex-col justify-between gap-4 w-full px-6 py-4"
            onSubmit={handleSubmit} 
          >

            <div className="flex items-center justify-between gap-2 w-full">
              
              <input
              className="w-2/3 h-12 px-3 border bg-grey-bg border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange" 
              placeholder="Filter by Title or Body"
              onChange={(e) => setActualText(e.target.value)}></input>

              <input
              className="w-2/3 h-12 px-3 border bg-grey-bg border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange" 
              placeholder="Filter by Tags"
              onChange={(e) => setActualTag(e.target.value)}></input>

              <button 
                type="submit"
                className="w-1/4 h-12 px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-grand-orange-hover transition"
                onClick={handleSubmit}
              >
                Apply filters
              </button>

            </div>
          </form>
        </div>
      )}

    </>
  );
}
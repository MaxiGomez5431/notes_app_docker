import FilterBtn from "./FilterBtn";
import NewNoteBtn from "./NewNoteBtn"
import NotesDisplayBtn from "./NotesDisplayBtn"
import { File, Archive, X } from 'lucide-react';
import { useState } from 'react';

export default function NavigationBtns({textFilters, setTextFilters, tagFilters, setTagFilters}) {
  const [openFilter, setOpenFilter] = useState(false);
  const [actualTag, setActualTag] = useState("");
  const [actualText, setActualText] = useState("");

  const addTag = (tag) => {
    if (tag.trim() === "" || tagFilters.includes(tag)){
      setActualTag("");
      return;
    } 
    setTagFilters([...tagFilters, tag]);
    setActualTag("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTag(actualTag);
    setTextFilters(actualText);
  };
  return (
    <>
      <div className="flex flex-col lg:flex-row-reverse items-center justify-between my-5 gap-5">

        <NewNoteBtn/>

        <nav className="flex items-center justify-start gap-5 w-full lg:min-w-[var(--note-width)] lg:max-w-[calc(var(--note-width)*2)]">
          <NotesDisplayBtn route={"/notes/active"}>
            Active notes
            <File />
          </NotesDisplayBtn>

          <NotesDisplayBtn route={"/notes/archived"}>
            Archived notes
            <Archive />
          </NotesDisplayBtn>
        </nav>

        <FilterBtn onClick={() => setOpenFilter(!openFilter)}/>
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
              {
                textFilters ? (

                  <div
                  className="w-2/3 h-12 px-3 border bg-brand-orange/10 border-brand-orange 
                  rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange
                  flex items-center justify-between
                  text-brand-orange
                  group hover:cursor-pointer transition-colors hover:border-2 hover:border-red-600"
                  onClick={() => setTextFilters("")} 
                  >
                    <p>{textFilters}</p>
                    <X className="group-hover:text-red-600"/>
                  </div>

                ) : (

                  <input
                  className="w-2/3 h-12 px-3 border bg-grey-bg border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange" 
                  placeholder="Filter by Title or Body"
                  onChange={(e) => setActualText(e.target.value)}></input>
                
                )
              }
              

              <input
              className="w-2/3 h-12 px-3 border bg-grey-bg border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange" 
              placeholder="Filter by Tags"
              value={actualTag}
              onChange={(e) => setActualTag(e.target.value)}></input>

              <button 
                type="submit"
                className="w-1/4 min-w-32 h-12 px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-grand-orange-hover transition
                cursor-pointer hover:bg-brand-orange-hover active:translate-y-0.5"
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
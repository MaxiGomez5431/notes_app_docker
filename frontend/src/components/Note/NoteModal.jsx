import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { X, Plus, Save, Archive, Trash2, ArchiveRestore } from "lucide-react";
import FormInput from "../common/FormInput";

export default function NoteModal({ isEditing, note, onClose, onSave, onDelete }) {
  const [tags, setTags] = useState(note?.tags || []);
  const [isArchived, setIsArchived] = useState(note?.is_archived || false);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      title: note?.title || "",
      body: note?.body || "",
    },
  });

  const { reset, handleSubmit, formState: { isValid } } = methods;

  useEffect(() => {
    reset({
      title: note?.title || "",
      body: note?.body || "",
    });
    setTags(note?.tags || []);
    setIsArchived(note?.is_archived || false);
  }, [note, reset]);

  const addTag = (tag) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  const onSubmit = (data) => {
    onSave({ ...note, ...data, tags, is_archived: isArchived });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-50 px-6 pb-6 rounded-xl shadow-xl w-full max-w-[600px] flex flex-col gap-4 mx-5"
          noValidate
        >
          <div className="flex w-full mt-3 items-center justify-between text-xl">
            <h1 className="text-text-color">
              {isEditing ? "Edit this note" : "Create a new note"}
            </h1>
            <X
              size={20}
              onClick={onClose}
              className="text-text-color hover:text-black cursor-pointer my-2"
            />
          </div>

          {/* Title input */}
          <FormInput
            name="title"
            label="Title"
            placeholder="Title"
            rules={{
              required: "Title is required",
              minLength: { value: 3, message: "Title must be at least 3 characters" },
            }}
          />

          {/* Body input */}
          <FormInput
            name="body"
            label="Body"
            type="textarea"
            placeholder="Body"
            rules={{
              required: "Body is required",
              minLength: { value: 5, message: "Body must be at least 5 characters" },
            }}
          />

          {/* Tags */}
          <TagInput tags={tags} addTag={addTag} removeTag={removeTag} />

          {/* Actions */}
          <NoteModalActions
            isEditing={isEditing}
            isArchived={isArchived}
            setIsArchived={setIsArchived}
            onDelete={() => onDelete(note)}
            onSave={handleSubmit(onSubmit)}
            saveDisabled={!isValid}
          />
        </form>
      </FormProvider>
    </div>
  );
}

export function TagInput({ tags, addTag, removeTag }) {
  const [inputTag, setInputTag] = useState("");

  const handleAddTag = () => {
    const trimmed = inputTag.trim();
    if (trimmed) {
      addTag(trimmed);
      setInputTag("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputTag.trim()) handleAddTag();
    }
  };

  const isDisabled = inputTag.trim().length === 0;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
          placeholder="Add a tag"
          value={inputTag}
          onChange={(e) => setInputTag(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={handleAddTag}
          disabled={isDisabled}
          className={`px-3 rounded-lg transition text-white ${
            isDisabled
              ? "bg-gray-300 cursor-default"
              : "bg-brand-orange hover:bg-grand-orange-hover cursor-pointer"
          }`}
        >
          <Plus size={18} />
        </button>
      </div>

      {tags.length === 0 && (
        <span className="text-sm text-gray-400 ml-0.5">
          Press <kbd className="px-1 py-0.5 bg-gray-200 rounded">Enter</kbd> or click{" "}
          <kbd className="text-brand-orange">+</kbd> to add tag
        </span>
      )}

      <div className="flex flex-wrap gap-2 mt-1">
        {tags.map((tag) => (
          <div
            onClick={() => removeTag(tag)}
            key={tag}
            className="flex items-center gap-1 bg-brand-orange text-white px-4 py-1 rounded-[var(--rounded-standard)] hover:bg-red-500 cursor-pointer"
          >
            {tag}
            <X size={15} className="text-white" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function NoteModalActions({ isEditing, isArchived, setIsArchived, onDelete, saveDisabled }) {
  return (
    <div
      className={`flex items-center mt-6 gap-2 ${isEditing ? "justify-between" : "justify-end"}`}
    >
      {isEditing && (
        <button
          onClick={() => setIsArchived(!isArchived)}
          className={`flex items-center gap-1 px-4 py-2 rounded-[var(--rounded-standard)] border cursor-pointer transition ${
            isArchived
              ? "border-brand-orange text-brand-orange"
              : "border-gray-300 text-text-color shadow-custom-size shadow-gray-300 hover:bg-brand-orange/20 hover:border-brand-orange hover:text-brand-orange"
          }`}
          type="button"
        >
          {!isArchived ? <Archive /> : <ArchiveRestore />}
          {!isArchived ? "Archive" : "Unarchive"}
        </button>
      )}

      <div className="flex gap-2">
        {isEditing && (
          <button
            onClick={onDelete}
            className="flex items-center gap-1 px-4 py-2 border rounded-[var(--rounded-standard)] text-red-600 border-red-300 hover:bg-red-100 cursor-pointer transition"
            type="button"
          >
            <Trash2 />
            Delete
          </button>
        )}

        <button
          type="submit"
          disabled={saveDisabled}
          className={`flex items-center gap-1 px-4 py-2 border rounded-[var(--rounded-standard)] transition ${
            saveDisabled ? "text-gray-600 border-gray-300 cursor-default" : "text-green-600 border-green-300 hover:bg-green-100 cursor-pointer"
          }`}
        >
          <Save />
          Save
        </button>
      </div>
    </div>
  );
}

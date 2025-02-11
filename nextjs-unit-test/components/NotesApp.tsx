"use client";
import { useState } from "react";

export default function NotesApp() {
  const [notes, setNotes] = useState<string[]>([]);
  const addNote = () => {
    const input = document.querySelector("input") as HTMLInputElement;
    if (input.value) {
      setNotes([...notes, input.value]);
      input.value = "";
    }
  };
  return (
    <div className="min-w-[500px] p-10 rounded-lg bg-gray-200 shadow">
      <h1 className="text-2xl font-bold mb-5">Notes App</h1>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Add a note"
          className="p-2 border border-gray-300 rounded w-full text-gray-700"
        />
        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={addNote}
        >
          Add
        </button>
      </div>
      <ul className="mt-5">
        {notes.map((note, index) => (
          <li
            key={index}
            className="flex flex-row justify-between items-center border-gray-300  text-gray-700"
          >
            <div className="p-2 border rounded mb-2">
              {note}
            </div>
            <button
              className="p-2 rounded"
              onClick={() => {
                setNotes(notes.filter((_, i) => i !== index));
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

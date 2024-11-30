import { ActionFunction, json, redirect } from "@remix-run/node";
import { getStoredNotes, storeNotes } from "~/server/data/notes";
import NewNote, { links as newNoteLinks } from "~/client/components/NewNote";
import { useLoaderData } from "@remix-run/react";
import NotesList, { links as notesListLinks } from "~/client/components/NoteList";

export const links = () => [...newNoteLinks(), ...notesListLinks()];

export default function Notes() {
  const notes = useLoaderData<typeof loader>();

  return (
    <main>
      <NewNote />
      <NotesList notes={notes} />
    </main>
  )
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);

  const title = noteData.title as string;
  if (title.trim().length < 5) {
    return {
      message: 'Invalid title - must be at least 5 characters long.',
    };
  }

  const note = {
    title: noteData.title,
    content: noteData.content,
    createdAt: new Date(),
  };

  await storeNotes(note);
  return redirect('/');
}

export async function loader() {
  const notes = await getStoredNotes();
  if (!notes || notes.length === 0) {
    throw json(
      { message: 'Could not find any notes.' },
      {
        status: 404,
        statusText: 'Not Found',
      }
    );
  }
  return notes;
}
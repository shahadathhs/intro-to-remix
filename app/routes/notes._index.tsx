import { ActionFunction, redirect } from "@remix-run/node";
import { getStoredNotes, storeNotes } from "~/server/data/notes";
import NewNote, { links as newNoteLinks } from "~/client/components/NewNote";
import { Link, useLoaderData } from "@remix-run/react";
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
    return new Response(null, {
      status: 404,
      statusText: 'Could not find any notes.',
    })
  }
  // throw new Error('Could not fetch notes!');
  return notes;
}

export const ErrorBoundary = ({ error }: { readonly error: { readonly status: number; readonly statusText: string; readonly data?: { readonly message?: string } } }) => {
  return (
    <main className='error'>
      <h1>An error occurred!</h1>
      <p>{error.data?.message ?? 'Something went wrong!'}</p>
      <p>
        Back to <Link to='/'>safety</Link>!
      </p>
    </main>
  );
}
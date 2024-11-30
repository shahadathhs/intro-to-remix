import { ActionFunction, MetaFunction, redirect } from "@remix-run/node";
import { getStoredNotes, storeNotes } from "~/server/data/notes";
import NewNote, { links as newNoteLinks } from "~/client/components/NewNote";
import { isRouteErrorResponse, Link, useLoaderData, useRouteError } from "@remix-run/react";
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
    throw new Response('Could not find any notes.', {
      status: 404,
      statusText: 'Notes Not Found',
    });
  }
  // throw new Error('This is an error');
  return notes;
}


export const CatchBoundary = ({ error }: { readonly error: { readonly status: number; readonly statusText: string; readonly data?: { readonly message?: string } } }) => {
  const message = error.statusText ?? 'Something went wrong!';
  return (
    <main>
      <NewNote />
      <p className="info-message">{message}</p>
    </main>
  );
}

export const ErrorBoundary = () => {
  const error = useRouteError();
  const response = isRouteErrorResponse(error);
  if (response) {
    return <CatchBoundary error={error} />;
  }
  return (
    <main className='error'>
      <h1>An error occurred!</h1>
      <p>
        Back to <Link to='/'>safety</Link>!
      </p>
    </main>
  );
}

export const meta: MetaFunction = () => {
  return [
    {
      title: 'Notes',
      description: 'Manage your notes with ease.',
    },
  ];
}
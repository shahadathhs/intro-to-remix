import { LinksFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import { getStoredNotes } from '~/server/data/notes';
import styles from "../client/styles/note-details.css?url";

export default function NoteDetailsPage() {
  const note: { id: string; title: string; content: string } = useLoaderData();

  return (
    <main id='note-details'>
      <header>
        <nav>
          <Link to='/notes'>Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id='note-details-content'>{note.content}</p>
    </main>
  );
}

export async function loader({ params }: { params: { noteId: string } }) {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  const selectedNote = notes.find((note) => note.id === noteId);

  if (!selectedNote) {
    throw new Response(JSON.stringify({ message: 'Could not find note for id ' + noteId }), {
      status: 404,
    });
  }

  return selectedNote;
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
}

export const meta = ({ data }: { data: { title: string } }) => {
  return [
    {
      title: data.title,
      description: 'Manage your notes with ease.',
    },
  ];
}

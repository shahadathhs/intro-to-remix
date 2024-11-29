import { ActionFunction, redirect } from "@remix-run/node";
import { storeNotes } from "~/server/data/notes";
import NewNote, { links as newNoteLinks } from "~/client/components/NewNote";

export const links = () => [...newNoteLinks()];

export default function Notes() {
  return (
    <main>
      <NewNote />
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
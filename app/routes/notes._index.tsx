import NewNote, { links as newNoteLinks } from "~/src/components/NewNote";

export const links = () => [...newNoteLinks()];

export default function Notes() {
  return (
    <main>
      <NewNote />
    </main>
  )
}

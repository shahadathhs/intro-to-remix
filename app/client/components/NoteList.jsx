import { Link } from "@remix-run/react";
import PropTypes from "prop-types";

import styles from "./NoteList.css?url";

export const links = () => [{ rel: "stylesheet", href: styles }];

export default function NoteList({ notes }) {
  return (
    <ul id="note-list">
      {notes?.map((note, index) => (
        <li key={note.id} className="note">
          <Link to={note?.id}>
            <article>
              <header>
                <ul className="note-meta">
                  <li>#{index + 1}</li>
                  <li>
                    <time dateTime={note.id}>
                      {note?.createdAt.toLocaleDateString("en-US")}
                    </time>
                  </li>
                </ul>
                <h2>{note?.title}</h2>
              </header>
              <p>{note?.content}</p>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  );
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
};

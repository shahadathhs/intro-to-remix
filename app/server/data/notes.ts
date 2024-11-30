import clientPromise from "~/server/db/mongo.server";

/**
 * Retrieves all stored notes from the MongoDB collection.
 * 
 * @returns
 * A promise that resolves to an array of note objects, each containing an id, title, and content.
 */
export const getStoredNotes = async () => {
  const client = await clientPromise;
  const db = client.db("remix-notes");
  const notesCollection = db.collection("notes");
  const notes = await notesCollection.find().toArray();
  return notes.map((note) => ({ id: note._id.toString(), ...note }));
};

/**
 * Store a new note in the MongoDB collection.
 *
 * @param {object} note - Note to store, should have a title and content.
 * @returns - The result of the insertion.
 */
export const storeNotes = async (note: object) => {
  const client = await clientPromise;
  const db = client.db("remix-notes");
  const notesCollection = db.collection("notes");
  const result = await notesCollection.insertOne(note);
  return result;
};

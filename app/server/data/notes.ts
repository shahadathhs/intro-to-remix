import clientPromise from "~/server/db/mongo.server";

export const getStoredNotes = async () => {
  const client = await clientPromise;
  const db = client.db(); // Use the database name from your connection string
  const notesCollection = db.collection("notes");
  const notes = await notesCollection.find().toArray();
  return notes.map((note) => ({ id: note._id.toString(), ...note })); // Convert `_id` to string for easier handling
};

export const storeNotes = async (note: object) => {
  const client = await clientPromise;
  const db = client.db('remix-notes'); // Use the database name from your connection string
  const notesCollection = db.collection("notes");
  const result = await notesCollection.insertOne(note);
  return result;
};

import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import homeStyles from "~/client/styles/home.css?url";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Starter" },
    { name: "description", content: "Welcome to Remix Template!" },
  ];
};

export const links: LinksFunction = () =>
  [
    {
      rel: "stylesheet",
      href: homeStyles,
    },
  ];


export default function Index() {
  return (
    <main id="content">
      <h1>A better way of keeping track of your notes</h1>
      <p>Try our early beta and never loose track of your notes again!</p>
      <p id="cta">
        <Link to="/notes">Try Now!</Link>
      </p>
    </main>
  );
}

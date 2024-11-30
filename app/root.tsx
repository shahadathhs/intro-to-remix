import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

// import "./tailwind.css";
import styles from "~/client/styles/main.css?url";
import MainNavigation from '~/client/components/MainNavigation';

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: styles },
];

export function Layout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
export default function App() {
  return <Outlet />;
}

const CatchBoundary = ({ error }: { readonly error: { readonly status: number; readonly statusText: string; readonly data?: { readonly message?: string } } }) => {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
        <title>{error.statusText}</title>
      </head>
      <body>
        <main className='error'>
          <h1>{error.statusText}</h1>
          <p>{error.data?.message ?? 'Something went wrong!'}</p>
          <p>
            Back to <Link to='/'>safety</Link>!
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const ErrorBoundary = () => {
  const error = useRouteError();
  const response = isRouteErrorResponse(error);

  if (response) {
    return <CatchBoundary error={error} />;
  }

  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
        <title>An error occurred!</title>
      </head>
      <body>
        <main className='error'>
          <h1>An error occurred!</h1>
          <p>
            Back to <Link to='/'>safety</Link>!
          </p>
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
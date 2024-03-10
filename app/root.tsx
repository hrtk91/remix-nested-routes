import { cssBundleHref } from '@remix-run/css-bundle'
import type { LinksFunction } from '@remix-run/node'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import styles from './tailwind.css'
import paths from './paths'

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  { rel: 'stylesheet', href: styles },
]

export default function App() {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex h-full w-full">
          <nav className="flex flex w-1/4 flex-col flex-col divide-y-2 divide-slate-200 overflow-y-auto border-r border-slate-400 p-4">
            <Link
              to={paths['/persons']}
              prefetch="viewport"
              className="p-1 text-lg hover:bg-slate-200"
            >
              Persons
            </Link>
            <Link
              to={paths['/page2']}
              prefetch="viewport"
              className="p-1 text-lg hover:bg-slate-200"
            >
              page2
            </Link>
          </nav>
          <main className="grow ps-2">
            <Outlet />
          </main>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

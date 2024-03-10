import { defer } from '@remix-run/node'
import {
  Await,
  Link,
  Outlet,
  useLoaderData,
  useLocation,
} from '@remix-run/react'
import { Suspense } from 'react'
import Loading from '~/components/UI/Loading'
import paths from '~/paths'

export type Person = {
  id: string
  name?: string
  age?: number
  email?: string
}

export const PERSONS: Person[] = [
  {
    id: '1',
    name: 'John doe',
    age: 30,
    email: 'john@example.com',
  },
  {
    id: '2',
    name: 'Jane doe',
    age: 29,
    email: 'jane@example.com',
  },
]

export async function loader() {
  console.log('PERSONS', PERSONS)
  const persons = new Promise<typeof PERSONS>((resolve) => {
    setTimeout(
      () => {
        resolve(PERSONS)
      },
      Math.floor(Math.random() * 5000),
    )
  })

  return defer({ persons })
}

export default function Persons() {
  const { persons } = useLoaderData<typeof loader>()
  const location = useLocation()

  return (
    <div className="flex h-full flex-col gap-2 px-2">
      {location.pathname === paths['/persons'] ? (
        <Link
          to={paths['/persons/self-profile']}
          prefetch="viewport"
          className="text-blue-400"
        >
          Show Self Profile
        </Link>
      ) : (
        <Outlet />
      )}
      <Suspense
        fallback={
          <div className="h-40 w-40">
            <Loading />
          </div>
        }
      >
        <Await resolve={persons} errorElement={'something went wrog'}>
          {(persons) => (
            <div className="flex gap-4">
              {persons.map(({ id, name, age, email }) => (
                <div key={name} className="flex flex-col flex-wrap">
                  <div className="mb-4">
                    <h1 className="mb-2 text-2xl">{name}</h1>
                    <p>{age}</p>
                    <p>{email}</p>
                  </div>
                  <Link
                    className="inline-flex items-center justify-center rounded border bg-indigo-600 px-2 py-1 text-xl text-slate-50 hover:opacity-90 active:bg-indigo-700"
                    to={paths['/persons/$id/edit'].replace(/\$id/, id)}
                    prefetch="viewport"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  )
}

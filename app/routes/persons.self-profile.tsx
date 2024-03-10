import { defer } from '@remix-run/node'
import { Await, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'
import Loading from '~/components/UI/Loading'

export function loader() {
  return defer({
    onload: new Promise((resolve) =>
      setTimeout(() => resolve({}), Math.floor(Math.random() * 5000)),
    ),
  })
}

export default function SelfProfile() {
  const { onload } = useLoaderData<typeof loader>()
  return (
    <Suspense
      fallback={
        <div className="h-40 w-40">
          <Loading />
        </div>
      }
    >
      <Await resolve={onload}>
        {() => (
          <div>
            <h1 className="text-xl">Self Profile</h1>
            <p>Name</p>
            <p>Age</p>
            <p>Email</p>
          </div>
        )}
      </Await>
    </Suspense>
  )
}

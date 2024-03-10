import { ActionFunctionArgs, json, redirect } from '@remix-run/node'
import { Form, Link, useLoaderData, useParams } from '@remix-run/react'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import Button from '~/components/UI/Button'
import Input from '~/components/UI/Input'
import paths from '~/paths'
import { PERSONS } from './persons'

export async function loader() {
  return json(PERSONS)
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request
    .formData()
    .then((data) => Object.fromEntries(data))
  console.log('formData', formData)
  const p = PERSONS.find((p) => p.id === formData.id)
  if (!p) {
    throw new Error('not found person')
  }
  p.name = (formData.name as string) ?? ''
  p.age = Number(formData.age) ?? ''
  p.email = (formData.email as string) ?? ''

  console.log('update person', p)

  return redirect(paths['/persons'])
}

export type Params = {
  id: string
}

export default function Edit() {
  const persons = useLoaderData<typeof loader>()
  const { id } = useParams<Params>()
  const p = persons.find((p) => p.id === id)
  return (
    <div className="w-64 p-2">
      <Link
        to={paths['/persons']}
        className="mb-3 flex h-8 w-8 items-center justify-center rounded-full hover:cursor-pointer hover:border hover:drop-shadow"
      >
        <MdOutlineArrowBackIos />
      </Link>
      <h1 className="text-4xl">Edit</h1>
      <Form method="post" className="flex flex-col gap-y-2 py-2" reloadDocument>
        <Input name="id" type="text" defaultValue={id} hidden />
        <Input name="name" type="text" defaultValue={p?.name} />
        <Input name="age" type="number" defaultValue={p?.age} />
        <Input name="email" type="email" defaultValue={p?.email} />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export function ErrorBoundary() {
  return <div>:( something went wrong :(</div>
}

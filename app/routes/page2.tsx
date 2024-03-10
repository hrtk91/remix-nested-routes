import { json } from '@remix-run/node'

export function loader() {
  return json({})
}

export default function Page2() {
  return <div className="px-2">page2</div>
}

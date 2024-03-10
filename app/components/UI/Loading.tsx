import { CgSpinner } from 'react-icons/cg'

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center backdrop-blur">
      <CgSpinner className="z-10 animate-spin text-indigo-400" size="3rem" />
    </div>
  )
}

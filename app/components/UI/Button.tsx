import { LegacyRef, forwardRef } from 'react'

export default forwardRef(function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
  ref: LegacyRef<HTMLButtonElement> | undefined,
) {
  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className={`inline-flex items-center justify-center rounded border bg-indigo-600 px-2 py-1 text-xl text-slate-50 hover:opacity-90 active:bg-indigo-700 ${props.className}`}
    />
  )
})

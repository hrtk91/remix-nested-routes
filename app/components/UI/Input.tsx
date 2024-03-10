import { forwardRef } from 'react'

export default forwardRef(function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.LegacyRef<HTMLInputElement> | undefined,
) {
  return (
    <input
      ref={ref}
      {...props}
      className={`border-2 border-slate-200 p-2 text-lg focus:border-slate-400 focus:outline-none ${props.className}`}
    />
  )
})

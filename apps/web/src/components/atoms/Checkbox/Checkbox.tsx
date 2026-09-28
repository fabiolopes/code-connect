import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  hasError?: boolean
}

const CHECKED_ICON =
  "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%23171d1f' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3.5 8.5l3 3 6-6'/%3E%3C/svg%3E\")"

export function Checkbox({
  id,
  hasError = false,
  className = '',
  checked,
  defaultChecked,
  onChange,
  ...rest
}: CheckboxProps) {
  const generatedId = useId()
  const checkboxId = id ?? generatedId

  return (
    <input
      id={checkboxId}
      type="checkbox"
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={onChange}
      aria-invalid={hasError || undefined}
      style={{ backgroundImage: checked ? CHECKED_ICON : undefined }}
      className={[
        'size-4 shrink-0 cursor-pointer appearance-none rounded border bg-transparent bg-center bg-no-repeat',
        'transition-colors duration-200 outline-none',
        'checked:border-code-connect-accent',
        'focus-visible:ring-2 focus-visible:ring-code-connect-accent focus-visible:ring-offset-2 focus-visible:ring-offset-code-connect-dark',
        hasError ? 'border-red-400' : 'border-gray-500 hover:border-gray-400',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    />
  )
}
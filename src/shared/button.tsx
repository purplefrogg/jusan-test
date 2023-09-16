import { DetailedHTMLProps } from 'react'
import { cn } from './utils'

export const Button = (
  props: DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => (
  <button
    {...props}
    className={cn('border-2 border-black w-16 rounded', props.className)}>
    {props.children}
  </button>
)

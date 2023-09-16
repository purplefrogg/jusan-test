import { DetailedHTMLProps } from 'react'
import { cn } from './utils'

export const Button = (
  props: DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => (
  <button {...props} className={cn('rounded', props.className)}>
    {props.children}
  </button>
)

import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
export const Input = (
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => <input {...props} className='border-2 border-black' />

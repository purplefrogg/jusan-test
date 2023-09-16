import { useState, useEffect } from 'react'
import { Input } from '../shared/input'

export const AccordionTitle = ({
  onSetTitle,
  placeholder,
}: {
  onSetTitle: (title: string) => void
  placeholder?: string
}) => {
  const [text, setText] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      text && onSetTitle(text)
    }, 400)
    return () => {
      clearTimeout(timer)
    }
  }, [text])
  return (
    <Input
      type='text'
      value={text}
      onChange={e => setText(e.currentTarget.value)}
      placeholder={placeholder ?? 'Название'}
    />
  )
}

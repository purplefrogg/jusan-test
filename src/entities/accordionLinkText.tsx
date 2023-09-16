import { useState, useEffect } from 'react'
import { Input } from '../shared/input'

export const AccordionLinkText = ({
  onSetText,
}: {
  onSetText: (title: string) => void
}) => {
  const [text, setText] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      text && onSetText(text)
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
      placeholder='Ссылка'
    />
  )
}

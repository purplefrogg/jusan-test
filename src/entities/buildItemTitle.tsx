import { useState, useEffect } from 'react'
import { Input } from '../shared/input'

export const BuildItemTitle = ({
  onSetTitle,
  placeholder,
  value,
}: {
  onSetTitle: (title: string) => void
  placeholder?: string
  value?: string
}) => {
  const [text, setText] = useState(value || '')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSetTitle(text)
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

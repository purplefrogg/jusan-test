import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setTitle } from '../linksSlice'
import { Input } from '../shared/input'

export const AccordionTitle = ({
  ids,
  placeholder,
}: {
  ids: number[]
  placeholder?: string
}) => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      text && dispatch(setTitle({ ids, title: text }))
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

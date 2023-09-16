import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLink } from '../linksSlice'
import { Input } from '../shared/input'

export const AccordionLinkText = ({ ids }: { ids: number[] }) => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      text && dispatch(setLink({ ids, text: text }))
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

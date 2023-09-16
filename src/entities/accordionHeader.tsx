import { Dispatch, SetStateAction } from 'react'
import { createLink, hideToggle, deleteLink, LinkType } from '../app/linkSlice'
import { Button } from '../shared/button'
import { cn } from '../shared/utils'
import { AccordionLinkText } from './accordionLinkText'
import { AccordionTitle } from './accordionTitle'
import { useDispatch } from 'react-redux'

export const AccordionHeader = ({
  collapsed,
  link,
  setCollapsed,
}: {
  collapsed: boolean
  link: LinkType
  setCollapsed: Dispatch<SetStateAction<boolean>>
}) => {
  const dispatch = useDispatch()
  return (
    <div className={'flex w-full'}>
      {link.id}
      <div className={`grid flex-1 grid-cols-2 gap-4`}>
        <AccordionTitle
          ids={[...link.parentLinkId, link.id]}
          placeholder='Название категории'
        />
        <AccordionLinkText ids={[...link.parentLinkId, link.id]} />
      </div>
      <Button
        className={cn(collapsed ? 'bg-black text-white' : '')}
        onClick={() => {
          setCollapsed(p => !p)
        }}>
        coll
      </Button>
      <Button
        onClick={() => dispatch(createLink([...link.parentLinkId, link.id]))}>
        add
      </Button>
      <Button
        onClick={() => dispatch(hideToggle([...link.parentLinkId, link.id]))}>
        {link.hidden ? 'show' : 'hide'}
      </Button>

      <Button
        disabled={true}
        onClick={() => dispatch(deleteLink([...link.parentLinkId, link.id]))}>
        del
      </Button>
      <Button>drag</Button>
    </div>
  )
}

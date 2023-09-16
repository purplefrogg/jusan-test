import { useDispatch, useSelector } from 'react-redux'
import {
  LinkType,
  createLink,
  deleteLink,
  hideToggle,
  setEndDrag,
  setStartDrag,
} from '../linksSlice'
import { Button } from '../shared/button'
import { AccordionTitle } from '../entities/accordionTitle'
import { AccordionLinkText } from '../entities/accordionLinkText'
import {
  DragEventHandler,
  DragEvent,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { cn } from '../shared/utils'
import { Accordion } from '../shared/accordion'
import { RootState } from '../app/store'

export const AccordionItem = ({
  link,
  root,
  overed,
  Title,
  LinkText,
}: {
  link: LinkType
  Title: ReactNode
  overed?: boolean
  root?: boolean
  LinkText?: ReactNode
}) => {
  const dispatch = useDispatch()
  const ids = [...link.parentLinkId, link.id]

  return (
    <div>
      <Accordion
        header={(collapsed, setCollapsed) => (
          <div className={'flex w-full '}>
            {link.id}
            <div className={`grid flex-1 grid-cols-${root ? 1 : 2} gap-4`}>
              {Title}
              {LinkText}
            </div>
            <Button
              className={cn(collapsed ? 'bg-black text-white' : '')}
              onClick={() => {
                setCollapsed(p => !p)
              }}>
              coll
            </Button>
            <Button onClick={() => dispatch(createLink(ids))}>add</Button>
            <Button onClick={() => dispatch(hideToggle(ids))}>
              {link.hidden ? 'show' : 'hide'}
            </Button>

            <Button disabled={root} onClick={() => dispatch(deleteLink(ids))}>
              del
            </Button>
            <Button>drag</Button>
          </div>
        )}>
        <AccordionChildren parentOvered={overed} links={link.children} />
      </Accordion>
    </div>
  )
}

const AccordionChildren = ({
  links,
  parentOvered,
}: {
  links: LinkType[]
  parentOvered?: boolean
}) => {
  const [overed, setOvered] = useState<LinkType | null>()
  const startLink = useSelector(
    (state: RootState) => state.linkBuilder.startDrag
  )
  const dispatch = useDispatch()
  const onDragStartHandler = (
    e: DragEvent<HTMLDivElement>,
    link: LinkType,
    index: number
  ) => {
    e.stopPropagation()
    console.log('index start', index)

    dispatch(setStartDrag({ link, index }))
  }
  const onDragHandler = () => {}
  const onDragEndHandler = () => {}
  const onDragLeaveHandler = () => {
    setOvered(null)
  }
  const onDragEnterHandler = (e: DragEvent<HTMLDivElement>, link: LinkType) => {
    e.stopPropagation()
    e.preventDefault()
    if (link.parentLinkId.at(-1) !== startLink?.parentLinkId.at(-1)) return

    setOvered(link)
  }

  const onDragOverHandler = (e: DragEvent<HTMLDivElement>, link: LinkType) => {
    e.stopPropagation()
    e.preventDefault()
  }
  const onDropHandler = (
    e: DragEvent<HTMLDivElement>,
    link: LinkType,
    index: number
  ) => {
    e.preventDefault()
    e.stopPropagation()
    setOvered(null)
    console.log('end', link.id)
    console.log('start', startLink?.id)
    if (link.parentLinkId.at(-1) !== startLink?.parentLinkId.at(-1)) return

    dispatch(setEndDrag({ ids: link.parentLinkId, index }))
  }
  return (
    <div className={cn('pl-4 flex flex-col gap-1')}>
      {links.map((link, index) => {
        return (
          <div
            key={link.id}
            draggable
            className={cn(link.id === overed?.id && 'bg-red-400')}
            onDrag={onDragHandler}
            onDragEnd={onDragEndHandler}
            onDragEnter={e => onDragEnterHandler(e, link)}
            onDragStart={e => onDragStartHandler(e, link, index)}
            onDragLeave={onDragLeaveHandler}
            onDragOver={e => onDragOverHandler(e, link)}
            onDrop={e => onDropHandler(e, link, index)}>
            <AccordionItem
              link={link}
              LinkText={
                <AccordionLinkText ids={[...link.parentLinkId, link.id]} />
              }
              Title={<AccordionTitle ids={[...link.parentLinkId, link.id]} />}
            />
          </div>
        )
      })}
    </div>
  )
}

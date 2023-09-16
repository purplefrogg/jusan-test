import { useDispatch, useSelector } from 'react-redux'
import {
  LinkType,
  createLink,
  deleteLink,
  hideToggle,
  setEndDrag,
  setLink,
  setOverDrag,
  setStartDrag,
  setTitle,
} from '../app/linkSlice'
import { Button } from '../shared/button'
import { AccordionTitle } from '../entities/accordionTitle'
import { AccordionLinkText } from '../entities/accordionLinkText'
import { DragEvent, ReactNode } from 'react'
import { cn } from '../shared/utils'
import { Accordion } from '../shared/accordion'
import { RootState } from '../app/store'
import {
  BsChevronDown,
  BsChevronUp,
  BsFillEyeFill,
  BsFillEyeSlashFill,
  BsFillTrash3Fill,
  BsGripVertical,
  BsPlusLg,
} from 'react-icons/bs'

export const LinkBuildItem = ({
  link,
  root,
  Title,
  LinkText,
  linkParentIndexes,
}: {
  link: LinkType
  Title: ReactNode
  linkParentIndexes: number[]
  root?: boolean
  LinkText?: ReactNode
}) => {
  const dispatch = useDispatch()
  return (
    <>
      <Accordion
        header={(collapsed, setCollapsed) => (
          <div className={cn('flex w-full gap-2')}>
            {link.id}
            <div className={`grid flex-1 grid-cols-${root ? 1 : 2} gap-4`}>
              {Title}
              {LinkText}
            </div>
            <Button
              onClick={() => {
                setCollapsed(p => !p)
              }}>
              {collapsed ? <BsChevronDown /> : <BsChevronUp />}
            </Button>
            <Button onClick={() => dispatch(createLink(linkParentIndexes))}>
              <BsPlusLg />
            </Button>
            <Button onClick={() => dispatch(hideToggle(linkParentIndexes))}>
              {link.hidden ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
            </Button>
            <Button
              disabled={root}
              className='text-red-600 disabled:text-gray-500'
              onClick={() => dispatch(deleteLink(linkParentIndexes))}>
              <BsFillTrash3Fill />
            </Button>
            <Button draggable>
              <BsGripVertical />
            </Button>
          </div>
        )}>
        {collapsed =>
          !collapsed && (
            <LinkBuildItemChildren
              linkParentIndexes={linkParentIndexes}
              links={link.children}
            />
          )
        }
      </Accordion>
    </>
  )
}

const LinkBuildItemChildren = ({
  links,
  linkParentIndexes,
}: {
  links: LinkType[]
  linkParentIndexes: number[]
}) => {
  const overDragParentIndexes = useSelector(
    (state: RootState) => state.linkBuilder.overDragParentIndexes
  )
  const overDragLinkId = useSelector(
    (state: RootState) => state.linkBuilder.overDragLinkId
  )
  const startLink = useSelector(
    (state: RootState) => state.linkBuilder.startDragLink
  )
  const startDragIndexes = useSelector(
    (state: RootState) => state.linkBuilder.startDragIndexes
  )
  const dispatch = useDispatch()

  const onDragStartHandler = (
    e: DragEvent<HTMLDivElement>,
    link: LinkType,
    index: number
  ) => {
    e.stopPropagation()

    dispatch(setStartDrag({ link, index: [...linkParentIndexes, index] }))
  }
  const onDragEnterHandler = (
    e: DragEvent<HTMLDivElement>,
    link: LinkType,
    index: number
  ) => {
    e.stopPropagation()
    e.preventDefault()
    if (link.parentLinkId.at(-1) !== startLink?.parentLinkId.at(-1)) return
    if (link.id === overDragLinkId) return

    dispatch(
      setOverDrag({ parentIds: [...linkParentIndexes, index], id: link.id })
    )
  }

  const onDragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
  }
  const onDropHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (overDragParentIndexes) dispatch(setEndDrag())
  }
  return (
    <div className={cn('pl-4 flex flex-col gap-1')}>
      {links.map((link, index) => {
        return (
          <div
            className={cn(
              'flex flex-col gap-1',
              link.id === overDragLinkId && 'bg-red-400'
            )}
            key={link.id}
            onDragEnter={e => onDragEnterHandler(e, link, index)}
            onDragStart={e => onDragStartHandler(e, link, index)}
            onDragEnd={() => {
              dispatch(setOverDrag())
            }}
            onDragOver={onDragOverHandler}
            onDrop={onDropHandler}>
            <LinkBuildItem
              link={link}
              linkParentIndexes={[...linkParentIndexes, index]}
              LinkText={
                <AccordionLinkText
                  onSetText={text =>
                    dispatch(
                      setLink({ ids: [...linkParentIndexes, index], text })
                    )
                  }
                />
              }
              Title={
                <AccordionTitle
                  onSetTitle={title =>
                    dispatch(
                      setTitle({ ids: [...linkParentIndexes, index], title })
                    )
                  }
                />
              }
            />
          </div>
        )
      })}
    </div>
  )
}

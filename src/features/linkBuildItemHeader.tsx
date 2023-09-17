import { useDispatch, useSelector } from 'react-redux'
import {
  LinkType,
  setEndDrag,
  setOverDrag,
  setStartDrag,
} from '../app/linkSlice'
import { DragEvent, ReactNode } from 'react'
import { cn } from '../shared/utils'
import { RootState } from '../app/store'

export const LinkBuildItemHeader = ({
  link,
  controllers,
  inputs,
  parentIndexes,
}: {
  link: LinkType
  controllers: ReactNode
  inputs: ReactNode
  parentIndexes: number[]
}) => {
  const dispatch = useDispatch()

  const overDragLinkId = useSelector(
    (state: RootState) => state.linkBuilder.overDragLinkId
  )
  const startLink = useSelector(
    (state: RootState) => state.linkBuilder.startDragLink
  )

  const onDragStartHandler = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation()

    dispatch(setStartDrag({ link, parentIndexes }))
  }
  const onDragEnterHandler = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
    if (link.parentLinkId.at(-1) !== startLink?.parentLinkId.at(-1)) return
    if (link.id === overDragLinkId) return

    dispatch(setOverDrag({ parentIndexes, id: link.id }))
  }

  const onDragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
  }
  const onDropHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(setEndDrag())
  }
  return (
    <div
      onDragEnter={onDragEnterHandler}
      onDragStart={onDragStartHandler}
      onDragOver={onDragOverHandler}
      onDrop={onDropHandler}
      style={{ paddingLeft: link.parentLinkId.length * 10 }}
      className={cn(
        'flex w-full gap-2',
        link.id === startLink?.id && 'bg-green-400',
        link.id === overDragLinkId && 'bg-red-400'
      )}>
      <span className='text-right w-10'>
        {link.id} ({parentIndexes.at(-1)! + 1})
      </span>
      {inputs}
      {controllers}
    </div>
  )
}

import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { cn } from './utils'

export const Accordion = ({
  header,
  children,
}: {
  header: (
    collapsed: boolean,
    setCollapsed: Dispatch<SetStateAction<boolean>>
  ) => ReactNode
  children: ReactNode
}) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {header(collapsed, setCollapsed)}
      <div className={cn(collapsed && 'hidden')}>{children}</div>
    </>
  )
}

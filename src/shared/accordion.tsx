import { Dispatch, ReactNode, SetStateAction, useState } from 'react'

export const Accordion = ({
  header,
  children,
}: {
  header: (
    collapsed: boolean,
    setCollapsed: Dispatch<SetStateAction<boolean>>
  ) => ReactNode
  children: (
    collapsed: boolean,
    setCollapsed: Dispatch<SetStateAction<boolean>>
  ) => ReactNode
}) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {header(collapsed, setCollapsed)}
      {children(collapsed, setCollapsed)}
    </>
  )
}

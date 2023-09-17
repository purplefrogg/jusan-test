import { Dispatch, ReactNode, SetStateAction, useState } from 'react'

type RenderPropsChildType = (
  collapsed: boolean,
  setCollapsed: Dispatch<SetStateAction<boolean>>
) => ReactNode

export const Accordion = ({
  header,
  children,
}: {
  header: RenderPropsChildType
  children: RenderPropsChildType
}) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {header(collapsed, setCollapsed)}
      {children(collapsed, setCollapsed)}
    </>
  )
}

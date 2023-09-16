import { useSelector } from 'react-redux'
import { AccordionTitle } from '../entities/accordionTitle'
import { AccordionItem } from '../features/accordionItem'
import { Button } from '../shared/button'
import { RootState } from '../app/store'

export const LinkBuilder = () => {
  const links = useSelector((state: RootState) => state.linkBuilder.links)

  const onSaveHandler = async () => {
    const res = await fetch('http://localhost:3000/save', {
      body: JSON.stringify(links),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  }

  return (
    <div className='flex flex-col gap-1'>
      {links.map(link => (
        <AccordionItem
          link={link}
          key={link.id}
          root
          Title={
            <AccordionTitle
              ids={[...link.parentLinkId, link.id]}
              placeholder='Название категории'
            />
          }
        />
      ))}

      <Button onClick={onSaveHandler}>save</Button>
    </div>
  )
}

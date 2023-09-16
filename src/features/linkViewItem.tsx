import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { LinkType } from '../app/linkSlice'
import { Accordion } from '../shared/accordion'

export const LinkViewItem = (link: LinkType) => {
  return (
    <Accordion
      header={(collapsed, setCollapsed) => (
        <div className='h-6 gap-3 rounded flex border-b'>
          <div
            style={{ paddingLeft: link.parentLinkId.length * 20 }}
            className={'flex-1'}>
            <input type='checkbox' />

            {link.title}
          </div>
          <button onClick={() => setCollapsed(p => !p)}>
            {collapsed ? <BsChevronDown /> : <BsChevronUp />}
          </button>
        </div>
      )}>
      {collapsed =>
        !collapsed &&
        link.children.map(link => <LinkViewItem key={link.id} {...link} />)
      }
    </Accordion>
  )
}

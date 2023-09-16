import { LinkType } from '../linksSlice'
import { Accordion } from '../shared/accordion'
import { cn } from '../shared/utils'

export const LinkViewItem = (link: LinkType) => {
  console.log(link.parentLinkId.length)
  return (
    <Accordion
      header={(collapsed, setCollapsed) => (
        <div className='h-6 gap-3 rounded flex border-b'>
          <span className={cn(`flex-1 pl-${link.parentLinkId.length * 4}`)}>
            <input type='checkbox' />

            {link.title}
          </span>
          <button onClick={() => setCollapsed(p => !p)}>
            {collapsed ? 'uncoll' : 'coll'}
          </button>
        </div>
      )}>
      {link.children.map(link => (
        <LinkViewItem key={link.id} {...link} />
      ))}
    </Accordion>
  )
}

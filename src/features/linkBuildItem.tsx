import { useDispatch } from 'react-redux'
import {
  LinkType,
  createLink,
  deleteLink,
  hideToggle,
  setLink,
  setTitle,
} from '../app/linkSlice'
import { Button } from '../shared/button'
import { BuildItemTitle } from '../entities/buildItemTitle'
import { BuildItemLinkText } from '../entities/buildItemLinkText'
import { ReactNode } from 'react'
import { Accordion } from '../shared/accordion'
import {
  BsChevronDown,
  BsChevronUp,
  BsFillEyeFill,
  BsFillEyeSlashFill,
  BsFillTrash3Fill,
  BsGripVertical,
  BsPlusLg,
} from 'react-icons/bs'
import { LinkBuildItemBody } from './linkBuildItemBody'

export const LinkBuildItem = ({
  link,
  root,
  Title,
  LinkText,
  parentIndexes,
}: {
  link: LinkType
  // parentIndexes это индексы предков со своим индексом в конце
  parentIndexes: number[]
  Title: ReactNode
  root?: boolean
  LinkText?: ReactNode
}) => {
  const dispatch = useDispatch()

  return (
    <>
      <Accordion
        header={(collapsed, setCollapsed) => (
          <LinkBuildItemBody
            inputs={
              <div className={`grid flex-1 grid-cols-${root ? 1 : 2} gap-4`}>
                {Title}
                {LinkText}
              </div>
            }
            controllers={
              <>
                <Button
                  onClick={() => {
                    setCollapsed(p => !p)
                  }}>
                  {collapsed ? <BsChevronDown /> : <BsChevronUp />}
                </Button>
                <Button onClick={() => dispatch(hideToggle(parentIndexes))}>
                  {link.hidden ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                </Button>
                <Button onClick={() => dispatch(createLink(parentIndexes))}>
                  <BsPlusLg />
                </Button>
                <Button
                  disabled={root}
                  className='text-red-600 disabled:text-gray-500'
                  onClick={() => dispatch(deleteLink(parentIndexes))}>
                  <BsFillTrash3Fill />
                </Button>
                <Button draggable>
                  <BsGripVertical />
                </Button>
              </>
            }
            link={link}
            parentIndexes={parentIndexes}
          />
        )}>
        {collapsed =>
          !collapsed &&
          link.children.map((link, index) => {
            const indexes = [...parentIndexes, index]
            return (
              <LinkBuildItem
                key={link.id}
                link={link}
                parentIndexes={indexes}
                LinkText={
                  <BuildItemLinkText
                    onSetText={text =>
                      dispatch(setLink({ indexes: indexes, text }))
                    }
                  />
                }
                Title={
                  <BuildItemTitle
                    value={link.title}
                    onSetTitle={title =>
                      dispatch(
                        setTitle({
                          indexes: indexes,
                          title,
                        })
                      )
                    }
                  />
                }
              />
            )
          })
        }
      </Accordion>
    </>
  )
}

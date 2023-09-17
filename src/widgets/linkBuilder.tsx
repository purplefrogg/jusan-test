import { useSelector } from 'react-redux'
import { BuildItemTitle } from '../entities/buildItemTitle'
import { LinkBuildItem } from '../features/linkBuildItem'
import { Button } from '../shared/button'
import { AppDispatch, RootState } from '../app/store'
import { useDispatch } from 'react-redux'
import { setTitle } from '../app/linkSlice'
import { saveLinks } from '../app/linkThunks'

export const LinkBuilder = () => {
  const links = useSelector(
    (state: RootState) => state.linkBuilder.buildingLinks
  )
  const isSuccessSaved = useSelector(
    (state: RootState) => state.linkBuilder.isSaved
  )
  const dispatch = useDispatch<AppDispatch>()
  const onSaveHandler = async () => {
    dispatch(saveLinks(links))
  }

  return (
    <div className='flex flex-col gap-1'>
      {links.map((link, index) => (
        <LinkBuildItem
          parentIndexes={[index]}
          link={link}
          key={link.id}
          root
          Title={
            <BuildItemTitle
              onSetTitle={(title: string) => {
                dispatch(setTitle({ indexes: [index], title }))
              }}
              placeholder='Название категории'
            />
          }
        />
      ))}
      <div className='flex gap-4'>
        <Button className='w-40 border' onClick={onSaveHandler}>
          save
        </Button>
        {isSuccessSaved && 'success'}
      </div>
    </div>
  )
}

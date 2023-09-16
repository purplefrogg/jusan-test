import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../app/store'
import { LinkViewItem } from '../features/linkViewItem'
import { Button } from '../shared/button'
import { fetchLinks } from '../app/linkThunks'

export const LinkViewer = () => {
  const data = useSelector((state: RootState) => state.linkBuilder.fetchedLinks)
  const loadingState = useSelector(
    (state: RootState) => state.linkBuilder.loading
  )
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div className='flex gap-4 flex-col'>
      <div className='flex gap-4'>
        <Button
          className='px-5 w-40 border'
          onClick={async () => dispatch(fetchLinks())}>
          get data
        </Button>
        {loadingState}
      </div>
      {data.map(item => (
        <LinkViewItem {...item} key={item.id} />
      ))}
    </div>
  )
}

import { useSelector, useDispatch } from 'react-redux'
import { fetchLinks } from '../linksSlice'
import { RootState, AppDispatch } from '../app/store'
import { LinkViewItem } from '../features/linkViewItem'

export const LinkViewer = () => {
  const data = useSelector((state: RootState) => state.linkBuilder.fetchedLinks)
  const dispatch = useDispatch<AppDispatch>()
  return (
    <div>
      <button onClick={async () => dispatch(fetchLinks())}>get data</button>
      {data.map(item => (
        <LinkViewItem {...item} key={item.id} />
      ))}
    </div>
  )
}

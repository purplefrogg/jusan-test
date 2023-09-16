import { Provider } from 'react-redux'
import './index.css'
import { store } from './app/store'

import { LinkBuilder } from './widgets/linkBuilder'
import { LinkViewer } from './widgets/linkViewer'

const App = () => {
  return (
    <Provider store={store}>
      <div className='flex flex-col gap-8 text-gray-700'>
        <LinkBuilder />
        <LinkViewer />
      </div>
    </Provider>
  )
}

export default App

import { Provider } from 'react-redux'
import './index.css'
import { store } from './app/store'

import { LinkBuilder } from './widgets/linkBuilder'
import { LinkViewer } from './widgets/linkViewer'

const App = () => {
  return (
    <Provider store={store}>
      <LinkBuilder />
      <LinkViewer />
    </Provider>
  )
}

export default App

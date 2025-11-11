import "./index.css"
import { Button } from './components/ui/Button'
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"

function App() {
  

  return (
    <>
      <Button variant='secondary' size='sm' startIcon={<PlusIcon size="sm"/>} text='Small' onClick={()=>alert("Clicked")}></Button>
      <Button variant='secondary' size='md' startIcon={<PlusIcon size="md"/>} text='Medium' onClick={()=>alert("Clicked")}></Button>
      <Button variant='primary' size='lg' startIcon={<ShareIcon size="md"/>} text='Large' onClick={()=>alert("Clicked")}></Button>
    </>
  )
}

export default App

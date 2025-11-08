import "./index.css"
import { Button } from './components/ui/Button'
import { PlusIcon } from "./icons/PlusIcon"

function App() {
  

  return (
    <>
      <Button variant='secondary' size='sm' startIcon={<PlusIcon size="md"/>} text='Share' onClick={()=>{}}></Button>
      <Button variant='secondary' size='md' text='medium' onClick={()=>{}}></Button>
      <Button variant='primary' size='lg' text='Add Content' onClick={()=>{}}></Button>
    </>
  )
}

export default App

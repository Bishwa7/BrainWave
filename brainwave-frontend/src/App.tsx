import "./index.css"
import { Button } from './components/ui/Button'
import { PlusIcon } from "./icons/PlusIcon"

function App() {
  

  return (
    <>
      <Button variant='secondary' size='sm' startIcon={<PlusIcon size="sm"/>} text='Small' onClick={()=>{}}></Button>
      <Button variant='secondary' size='md' startIcon={<PlusIcon size="md"/>} text='Medium' onClick={()=>{}}></Button>
      <Button variant='primary' size='lg' startIcon={<PlusIcon size="lg"/>} text='Large' onClick={()=>{}}></Button>
    </>
  )
}

export default App

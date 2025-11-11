import "./index.css"
import { Button } from './components/ui/Button'
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"
import { Card } from "./components/ui/Card"
import { CreateContentModal } from "./components/ui/CreateContentModal"
import { useState } from "react"

function App() {
  
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="p-4">

      <CreateContentModal open={modalOpen} onClose={() => {setModalOpen(false)}} />

      <div className="flex justify-end gap-4">
        <Button variant='secondary' size='lg' startIcon={<PlusIcon size="md"/>} text='Share Brain' onClick={()=>alert("Clicked")}></Button>
        <Button variant='primary' size='lg' startIcon={<ShareIcon size="md"/>} text='Add Content' onClick={()=>{setModalOpen(true)}}></Button>
      </div>
      

      <div className="flex gap-4 p-6">
        <Card title="Fisrt card" type="youtube" link="https://www.youtube.com/watch?v=Uu2FQ2hW4_o" />
        <Card title="Fisrt card" type="youtube" link="https://www.youtube.com/watch?v=wsHt2YReQzA&t=6s" />
        
        <Card title="Second card" type="twitter" link="https://x.com/BishwaP5/status/1811428154327634194?s=20" />
        <Card title="Second card" type="twitter" link="https://x.com/merishabh_singh/status/1987919007903879417?s=20" />
        
      </div>
      
    </div>
  )
}

export default App

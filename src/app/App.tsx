
import {
  RouterProvider,
} from "react-router-dom";
import './styles/App.css'
import { router } from "./routes/router";
import { Toaster } from "@/app/components/ui/toaster"
import { Toaster as ToasterSonner } from "@/app/components/ui/sonner"

function App() {
  

  return (
    <div className="bg-gray">
      <RouterProvider router={router} />
      <Toaster />
      <ToasterSonner />
    </div>
  )
}

export default App

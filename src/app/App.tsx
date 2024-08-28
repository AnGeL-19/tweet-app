
import {
  RouterProvider,
} from "react-router-dom";
import './styles/App.css'
import { router } from "./routes/router";
import { Toaster } from "@/app/components/ui/toaster"


function App() {
  

  return (
    <div className="bg-gray">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  )
}

export default App

import { BrowserRouter , Routes , Route } from "react-router"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import HomePage from "./pages/HomePage"




function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/" element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

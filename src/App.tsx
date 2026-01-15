import NavBar from "./components/NavBar/NavBar.tsx";
import {Container} from "@mui/material";
import {Navigate, Route, Routes} from "react-router-dom";
import Page from "./containers/Page/Page.tsx";
import EditPage from "./containers/EditPage/EditPage.tsx";
import NotFoundPage from "./containers/NotFoundPage/NotFoundPage.tsx";

const App = () => {
  return (
    <>
      <NavBar/>
        <Container sx={{marginTop: '30px'}}>
            <Routes>
                <Route/>
                <Route index element={<Navigate to="/pages/home" replace/>}/>
                <Route path='/pages/admin' element={<EditPage/>}/>
                <Route path='/pages/:pageName' element={<Page/>}/>
                <Route path='/*' element={<NotFoundPage/>}/>
            </Routes>
        </Container>
    </>
  )
}

export default App

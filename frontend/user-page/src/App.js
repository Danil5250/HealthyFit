
import './App.css';
import {Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import { FirstPage } from './pages/FirstPage/FirstPage';
import {Register} from "./pages/Auth/Register/Register"
import {Login} from "./pages/Auth/Login/Login"
import { Main } from './pages/Main/Main';
import { TrainPage } from './pages/Main/TrainPage/TrainPage';
import { Layout } from './pages/Main/Layouts/Layout';
import { FoodPage } from './pages/Main/FoodPage/FoodPage';
import { FTrainPage } from './pages/FirstPage/FTrainPage/FTrainPage';
import { FirstPageLayout } from './pages/FirstPage/Layouts/FirstPageLayout';
import { NewsPage } from './pages/FirstPage/NewsPage/NewsPage';
import { Calculator } from './pages/FirstPage/Calculator/Calculator';
import { ThrowChallenge } from './pages/Main/ThrowChallenge/ThrowChallenge';
import { MainAdmin } from './pages/Admin/MainAdmin';
import { AdminLayout } from './pages/Admin/AdminLayouts/AdminLayout';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { NewPageComponent } from './pages/FirstPage/Components/NewPageComponent/NewPageComponent';
import { TrainsPage } from './pages/Admin/TrainsPageAdmin/TrainsPageAdmin';
import { ExercicePage } from './pages/Admin/ExercicePage/ExercicePage';
import { FoodPageAdmin } from './pages/Admin/FoodPageAdmin/FoodPageAdmin';
import { CommentsPage } from './pages/Admin/CommentsPage/CommentsPage';
import { NewsPageClient } from './pages/Main/NewsPageClient/NewsPageClient';
import { NewPageClientComponent } from './pages/Main/NewPageClientComponent/NewPageClientComponent';


function App() {


  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/'>
      <Route element={<FirstPageLayout />}>
        <Route index element={<FirstPage />}></Route>
        <Route path='/firsttrain' element={<FTrainPage />}></Route>
        <Route path='/news' element={<NewsPage />}></Route>
        <Route path='/calculator' element={<Calculator />}></Route>
        <Route path='/new/:id' element={<NewPageComponent />}/>
      </Route>
      <Route element={<AdminLayout/>}>
        <Route index path='/admin'  element={<MainAdmin />} />
        <Route path='/admin/train' element={<TrainsPage/>} />
        <Route path='/admin/exercice' element={<ExercicePage/>} />
        <Route path='/admin/food' element={<FoodPageAdmin/>} />
        <Route path='/admin/comments' element={<CommentsPage/>} />
      </Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route element={<Layout />}>
        <Route path='/main' element={<Main />} ></Route>
        <Route path='/train' element={<TrainPage />}></Route>
        <Route path='/food' element={<FoodPage />}></Route>
        <Route path='/challenge' element={<ThrowChallenge />}></Route>
        <Route path='/newsClient' element={<NewsPageClient />}></Route>
        <Route path='/newClient/:id' element={<NewPageClientComponent />}></Route>
      </Route>
      <Route path='*' element={<NotFoundPage/>} />
    </Route>
  ))
  
  return (
    <div className="App">

      <RouterProvider router={router} />
      
      {/* <Routes>
        <Route path='/'>
          
        </Route>
      </Routes> */}
      
    </div>
  );
}

export default App;

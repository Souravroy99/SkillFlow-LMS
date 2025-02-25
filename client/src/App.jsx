import './App.css'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import HeroSection from './pages/student/HeroSection'
import MainLayout from './layout/MainLayout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Courses from './pages/student/Courses'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import Sidebar from './pages/admin/Sidebar'
// import Dashboard from './pages/admin/Dashboard'
import AddCourse from './pages/admin/course/AddCourse'
import CourseTable from './pages/admin/course/CourseTable'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        )
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "my-learning",
        element: <MyLearning />
      },
      {
        path: "profile",
        element: <Profile />
      },


      // Admin Routes
      {
        path: "admin",
        element: <Sidebar />,
        children: [
          // {
          //   path: "dashboard",
          //   element: <Dashboard />
          // },
          {
            path: "course",
            element: <CourseTable />
          },
          {
            path: "course/create",
            element: <AddCourse />
          },
        ]
      }
    ],
    
  }
])

function App() {

  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  )
}

export default App

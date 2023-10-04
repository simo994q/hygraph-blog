import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './layout/MainLayout'
import { AllPosts } from './components/AllPosts/AllPosts'
import { TodaysPosts } from './components/TodaysPosts/TodaysPosts'
import { ManagePosts } from './components/ManagePosts/ManagePosts'
import './globals.css'

function App() {

  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<AllPosts />} />
              <Route path='/today' element={<TodaysPosts />} />
              <Route path='/manage' element={<ManagePosts />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App

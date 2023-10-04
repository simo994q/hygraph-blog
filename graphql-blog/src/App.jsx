import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './layout/MainLayout'
import { AllPosts } from './components/AllPosts/AllPosts'
import { TodaysPosts } from './components/TodaysPosts/TodaysPosts'

// import { useQuery } from "@tanstack/react-query"
// import { request } from 'graphql-request'
// import { getAllPosts } from './queries/getAllPosts'
// const { data, isLoading, error } = useQuery({
//   queryKey: ['allPosts'],
//   queryFn: async () => request(`https://swapi-graphql.netlify.app/.netlify/functions/index`, allPosts)
// })

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
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  )
}

export default App

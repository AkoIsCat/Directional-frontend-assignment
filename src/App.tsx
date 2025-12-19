import Posts from './pages/Posts.tsx';
import CreatePost from './pages/CreatePost.tsx';
import EditPost from './pages/EditPost.tsx';
import PostDetail from './pages/PostDetail.tsx';
import Analytics from './pages/Analytics.tsx';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Route, Routes, Navigate } from 'react-router';
import AuthWrapper from './components/AuthWrapper.tsx';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthWrapper>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </AuthWrapper>
    </QueryClientProvider>
  );
}

export default App;

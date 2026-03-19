import { useQuery } from '@tanstack/react-query';
import { apiClient, ApiError } from '../../../services/api/apiClient';

interface Post {
  id: number;
  title: string;
  body: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await apiClient.get<Post[]>('/posts?_limit=10');
  return data;
};

export const usePosts = () => {
  return useQuery<Post[], ApiError>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    retry: 1, // Only retry once before failing
  });
};

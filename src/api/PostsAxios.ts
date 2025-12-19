import PostsInstance from './PostsInstance';
import type { BasePost, UpdatePost } from '../types';

export const getPosts = async () => {
  try {
    const { data } = await PostsInstance.get('');
    console.log('my post', data);
    return data;
  } catch (error) {
    console.error('본인 게시글 목록 로드 에러: ', error);
  }
};

export const createPost = async (data: BasePost) => {
  try {
    const response = await PostsInstance.post('', {
      title: data.title,
      body: data.body,
      category: data.category,
      tags: data.tags,
    });
    return response.data;
  } catch (error) {
    console.error('게시글 생성 오류: ', error);
  }
};

export const updatePost = async (data: UpdatePost) => {
  try {
    const response = await PostsInstance.patch(`/${data.id}`, {
      title: data.title,
      body: data.body,
      category: data.category,
      tags: data.tags,
    });
    return response.data;
  } catch (error) {
    console.error('게시글 수정 오류: ', error);
  }
};

export const deleteAllPosts = async () => {
  try {
    const response = await PostsInstance.delete('');
    return response.data;
  } catch (error) {
    console.error('전체 게시글 삭제 오류: ', error);
  }
};

export const deletePost = async (id: string) => {
  try {
    const response = await PostsInstance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('게시글 삭제 오류: ', error);
  }
};

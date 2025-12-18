import React from 'react';

export interface Children {
  children: React.ReactNode;
}

export type CreatePostType = {
  title: string;
  contents: string;
  category: 'NOTICE' | 'QNA' | 'FREE';
  tags: string;
};

export type UpdatePostType = {
  id: number;
  title: string;
  contents: string;
  category: 'NOTICE' | 'QNA' | 'FREE';
  tags: string[];
};

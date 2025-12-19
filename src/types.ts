import React from 'react';

export interface Children {
  children: React.ReactNode;
}

export type Category = 'NOTICE' | 'QNA' | 'FREE';
// 게시판
export interface BasePost {
  title: string;
  body: string;
  category: Category;
  tags: string[];
}

export interface UpdatePost extends BasePost {
  id: number;
}

export interface Post extends BasePost {
  id: string;
  userId: string;
  createdAt: string;
}

export interface AllPost {
  count: number;
  items: Post[];
}

// 차트
export interface ChartDataInput {
  [key: string]: string | number | undefined;
}

export interface CoffeeBrand extends ChartDataInput {
  brand: string;
  popularity: number;
}

export interface SnackBrand extends ChartDataInput {
  name: string;
  share: number;
}

export interface MoodTrend extends ChartDataInput {
  week: string;
  happy: number;
  stressed: number;
  tired: number;
}

export interface WorkoutTrend extends ChartDataInput {
  week: string;
  running: number;
  cycling: number;
  stretching: number;
}

export interface SeriesData extends ChartDataInput {
  cups?: number;
  snacks?: number;
  bugs?: number;
  meetingsMissed?: number;
  productivity?: number;
  morale?: number;
}

export interface MultiLineData {
  team?: string;
  name?: string;
  series?: SeriesData[];
  metrics?: SeriesData[];
}

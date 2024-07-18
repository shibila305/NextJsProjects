"use client"
import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './Components/Home/features/articleSlice';
import tagsReducer from './Components/Home/features/tagSlice'

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    tags: tagsReducer
  }
});

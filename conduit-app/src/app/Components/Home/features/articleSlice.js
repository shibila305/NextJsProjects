import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  articlesCount: 0,
  currentArticleSlug: 'monkey',
};

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ offset = 0, limit = 10 }) => {
    const articlesApi = `https://api.realworld.io/api/articles?offset=${offset}&limit=${limit}`;

    const response = token
      ? await axios.get(articlesApi, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      : await axios.get(articlesApi);

    return {
      items: response.data.articles,
      articlesCount: response.data.articlesCount,
    };
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items; // Replace items with new fetched items
        state.articlesCount = action.payload.articlesCount;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default articlesSlice.reducer;

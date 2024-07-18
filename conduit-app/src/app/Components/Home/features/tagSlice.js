import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTags = createAsyncThunk(
 'articles/fetchTags',
  async () => {
    const response = await fetch('https://api.realworld.io/api/tags');
    return response.json();
  }
);

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.tags;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default tagsSlice.reducer;

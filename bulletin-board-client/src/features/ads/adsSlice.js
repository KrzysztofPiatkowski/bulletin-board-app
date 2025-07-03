import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_URL } from '../../config'

// 1) Tworzymy thunk do pobrania ogłoszeń
export const fetchAds = createAsyncThunk(
  'ads/fetchAds',
  async (_, thunkAPI) => {
    const response = await fetch(`${API_URL}/api/ads`, {
      method: 'GET',
      credentials: 'include'
    })
    if (!response.ok) {
      throw new Error('Failed to fetch ads')
    }
    return await response.json()
  }
)

const initialState = {
  list: [],       // tablica ogłoszeń
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null     // komunikat błędu, jeśli się pojawi
}

const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    // 1) Wczytanie całej listy ogłoszeń z serwera
    setAds(state, action) {
      state.list = action.payload
    },
    // 2) Dodanie nowego ogłoszenia (po addAd API)
    addAd(state, action) {
      state.list.push(action.payload)
    },
    // 3) Usunięcie ogłoszenia po id
    removeAd(state, action) {
      state.list = state.list.filter(ad => ad.id !== action.payload)
    },
    // 4) Aktualizacja istniejącego ogłoszenia
    updateAd(state, action) {
      const idx = state.list.findIndex(ad => ad.id === action.payload.id)
      if (idx !== -1) state.list[idx] = action.payload
    },
  },
  extraReducers: (builder) => {
  builder
    .addCase(fetchAds.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(fetchAds.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.list = action.payload
    })
    .addCase(fetchAds.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  },
})

export const { setAds, addAd, removeAd, updateAd } = adsSlice.actions
export default adsSlice.reducer

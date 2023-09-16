import { createAsyncThunk } from '@reduxjs/toolkit'
import { LinkType } from './linkSlice'

const baseUrl = 'http://localhost:3000'

export const fetchLinks = createAsyncThunk('getLinks', async () => {
  const response = await fetch(baseUrl)

  return await response.json()
})
export const saveLinks = createAsyncThunk(
  'saveLinks',
  async (links: LinkType[]) => {
    const response = await fetch(`${baseUrl}/save`, {
      body: JSON.stringify(links),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    return response.status
  }
)

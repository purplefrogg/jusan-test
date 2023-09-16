import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { id } from './shared/utils'
const baseUrl = 'http://localhost:3000'
export type LinkType = {
  id: number
  title: string
  link: string
  hidden: boolean
  children: LinkType[]
  parentLinkId: number[]
}

export interface CounterState {
  links: LinkType[]
  startDrag: LinkType | null
  startDragIndex: number | null
  fetchedLinks: LinkType[]
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

export const fetchLinks = createAsyncThunk(
  'users/fetchByIdStatus',
  async () => {
    const response = await fetch(baseUrl)

    return await response.json()
  }
)

const initialState: CounterState = {
  startDrag: null,
  loading: 'idle',
  fetchedLinks: [],
  startDragIndex: null,
  links: [
    {
      id: id(),
      hidden: false,
      link: '',
      title: '',
      children: [],
      parentLinkId: [],
    },
  ],
}

export const linkBuilderSlice = createSlice({
  name: 'linkBuilder',

  initialState,

  reducers: {
    setStartDrag: (
      state,
      action: PayloadAction<{ link: LinkType; index: number }>
    ) => {
      state.startDrag = action.payload.link
      state.startDragIndex = action.payload.index
    },
    setEndDrag: (
      state,
      action: PayloadAction<{ ids: number[]; index: number }>
    ) => {
      let parentLink: LinkType | undefined = {
        children: state.links,
      } as LinkType
      action.payload.ids.forEach(id => {
        parentLink = parentLink?.children.find(link => link.id === id)
      })

      console.log('action payload index', action.payload.index)
      console.log('state.startDragIndex', state.startDragIndex)
      console.log('parentLink', parentLink)
      if (parentLink && state.startDragIndex !== null) {
        const temp = parentLink.children[action.payload.index]

        parentLink.children[action.payload.index] =
          parentLink.children[state.startDragIndex]
        parentLink.children[state.startDragIndex] = temp
      }
    },

    deleteLink: (state, action: PayloadAction<number[]>) => {
      console.log(action.payload)

      let parentLink: LinkType | undefined = {
        children: state.links,
      } as LinkType
      const lastID = action.payload.pop()
      for (const id of action.payload) {
        parentLink = parentLink?.children.find(link => link.id === id)
      }

      if (parentLink?.children)
        parentLink.children = parentLink?.children.filter(
          link => link.id !== lastID
        )
    },
    setLink: (
      state,
      action: PayloadAction<{ ids: number[]; text: string }>
    ) => {
      let parentLink: LinkType | undefined = {
        children: state.links,
      } as LinkType

      action.payload.ids.forEach(id => {
        parentLink = parentLink?.children.find(link => link.id === id)
      })

      if (parentLink) parentLink.link = action.payload.text
    },
    setTitle: (
      state,
      action: PayloadAction<{ ids: number[]; title: string }>
    ) => {
      let parentLink: LinkType | undefined = {
        children: state.links,
      } as LinkType
      action.payload.ids.forEach(id => {
        parentLink = parentLink?.children.find(link => link.id === id)
      })

      if (parentLink) parentLink.title = action.payload.title
    },
    createLink: (state, action: PayloadAction<number[]>) => {
      console.log(action.payload)

      let parentLink: LinkType | undefined = {
        children: state.links,
      } as LinkType
      action.payload.forEach(id => {
        parentLink = parentLink?.children.find(link => link.id === id)
      })

      if (parentLink)
        parentLink.children.push({
          id: id(),
          title: '',
          hidden: false,
          link: '',
          children: [],
          parentLinkId: [...parentLink.parentLinkId, parentLink.id],
        })
    },
    hideToggle: (state, action: PayloadAction<number[]>) => {
      let parentLink: LinkType | undefined = {
        children: state.links,
      } as LinkType
      console.log(action.payload)

      action.payload.forEach(id => {
        parentLink = parentLink?.children.find(link => link.id === id)
      })

      if (parentLink) setHiddenRecursive(parentLink, !parentLink?.hidden)
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLinks.fulfilled, (state, action) => {
      state.fetchedLinks = action.payload
    })
  },
})

// Action creators are generated for each case reducer function
export const {
  createLink,
  hideToggle,
  deleteLink,
  setTitle,
  setLink,
  setEndDrag,
  setStartDrag,
} = linkBuilderSlice.actions

export const linkBuilderReducer = linkBuilderSlice.reducer

function setHiddenRecursive(obj: LinkType, hiddenValue: boolean) {
  // Устанавливаем свойство hidden для текущего элемента
  obj.hidden = hiddenValue

  // Рекурсивно вызываем функцию для всех дочерних элементов
  if (obj.children && obj.children.length > 0) {
    for (const child of obj.children) {
      setHiddenRecursive(child, hiddenValue)
    }
  }
}

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { id } from '../shared/utils'
import { fetchLinks, saveLinks } from './linkThunks'

export type LinkType = {
  id: number
  title: string
  link: string
  hidden: boolean
  children: LinkType[]
  parentLinkId: number[]
}

export interface CounterState {
  buildingLinks: LinkType[]
  startDragLink?: LinkType
  startDragIndexes?: number[]
  overDragLinkId?: number
  overDragParentIndexes?: number[]
  fetchedLinks: LinkType[]
  loading?: 'pending' | 'succeeded' | 'failed'
  isSaved?: boolean
}

const initialState: CounterState = {
  fetchedLinks: [],
  buildingLinks: [
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
      action: PayloadAction<{ link: LinkType; parentIndexes: number[] }>
    ) => {
      state.startDragLink = action.payload.link
      state.startDragIndexes = action.payload.parentIndexes
    },
    setOverDrag: (
      state,
      action: PayloadAction<
        { parentIndexes: number[] | undefined; id: number } | undefined
      >
    ) => {
      state.overDragParentIndexes = action.payload?.parentIndexes
      state.overDragLinkId = action.payload?.id
    },
    setEndDrag: state => {
      let parentLink: LinkType | undefined = {
        children: state.buildingLinks,
      } as LinkType

      const startDragLinkIndex = state.startDragIndexes?.pop()
      state.startDragIndexes?.forEach(id => {
        parentLink = parentLink?.children[id]
      })

      if (!parentLink || startDragLinkIndex === undefined) return

      const temp = parentLink.children[state.overDragParentIndexes?.at(-1)!]

      parentLink.children[state.overDragParentIndexes?.at(-1)!] =
        parentLink.children[startDragLinkIndex]
      parentLink.children[startDragLinkIndex] = temp
    },

    deleteLink: (state, action: PayloadAction<number[]>) => {
      let parentLink: LinkType | undefined = {
        children: state.buildingLinks,
      } as LinkType
      const lastID = action.payload.pop()
      for (const id of action.payload) {
        parentLink = parentLink?.children[id]
      }

      if (parentLink?.children && lastID !== undefined)
        parentLink.children.splice(lastID, 1)
    },
    setLink: (
      state,
      action: PayloadAction<{ indexes: number[]; text: string }>
    ) => {
      let parentLink: LinkType | undefined = {
        children: state.buildingLinks,
      } as LinkType

      action.payload.indexes.forEach(id => {
        parentLink = parentLink?.children[id]
      })

      if (!parentLink) return
      parentLink.link = action.payload.text
    },
    setTitle: (
      state,
      action: PayloadAction<{ indexes: number[]; title: string }>
    ) => {
      let parentLink: LinkType | undefined = {
        children: state.buildingLinks,
      } as LinkType
      action.payload.indexes.forEach(id => {
        parentLink = parentLink?.children[id]
      })

      if (!parentLink) return

      parentLink.title = action.payload.title
    },
    createLink: (state, action: PayloadAction<number[]>) => {
      let parentLink: LinkType | undefined = {
        children: state.buildingLinks,
      } as LinkType

      action.payload.forEach(id => {
        parentLink = parentLink?.children[id]
      })

      if (!parentLink) return

      parentLink.children.push({
        id: id(),
        title: `${parentLink.parentLinkId.length + 1} уровень`,
        hidden: false,
        link: '',
        children: [],
        parentLinkId: [...parentLink.parentLinkId, parentLink.id],
      })
    },
    hideToggle: (state, action: PayloadAction<number[]>) => {
      let parentLink: LinkType | undefined = {
        children: state.buildingLinks,
      } as LinkType
      console.log(action.payload)

      action.payload.forEach(id => {
        parentLink = parentLink?.children[id]
      })

      if (!parentLink) return

      setHiddenRecursive(parentLink, !parentLink?.hidden)
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLinks.fulfilled, (state, action) => {
      state.fetchedLinks = action.payload
      state.loading = 'succeeded'
    })

    builder.addCase(fetchLinks.pending, (state, action) => {
      state.loading = 'pending'
    })

    builder.addCase(fetchLinks.rejected, (state, action) => {
      state.loading = 'failed'
    })
    builder.addCase(saveLinks.fulfilled, (state, _action) => {
      state.isSaved = true
    })
  },
})

// Action creators are generated for each case reducer function
export const {
  createLink,
  hideToggle,
  deleteLink,
  setTitle,
  setOverDrag,
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

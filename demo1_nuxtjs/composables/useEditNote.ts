import { ref } from '@nuxtjs/composition-api'
import { useDrawer } from '@/composables'

export const useEditNote = (value: string | number | null | undefined) => {
  const prevNote = ref(value)
  const note = ref(value)
  const {
    visible: isEditNote,
    open: openEditNote,
    close: closeEditNote,
  } = useDrawer()
  const handleSaveNote = () => {
    prevNote.value = note.value
    closeEditNote()
  }
  const handleCancelEditNote = () => {
    note.value = prevNote.value
    closeEditNote()
  }

  return {
    isEditNote,
    openEditNote,
    closeEditNote,
    prevNote,
    note,
    handleSaveNote,
    handleCancelEditNote,
  }
}

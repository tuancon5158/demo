import { ref, watch, Ref } from '@nuxtjs/composition-api'
import { useOpenCloseToggle } from '~/composables'

export const useEditNote = (value: string | number) => {
  const prevNote = ref<string | number>(value)
  const note = ref<string | number>(value)
  const isAnotherDisabled = ref<boolean>(false)
  const {
    visible: isEditNote,
    open: openEditNote,
    close: closeEditNote
  }: { visible: Ref<boolean>; open: () => void; close: () => void } = useOpenCloseToggle()

  watch(isEditNote, () => {
    if (isEditNote) {
      isAnotherDisabled.value = true
    } else {
      isAnotherDisabled.value = false
    }
  })
  const handleSaveNote = (): void => {
    prevNote.value = note.value
    closeEditNote()
  }
  const handleCancelEditNote = (): void => {
    note.value = prevNote.value
    closeEditNote()
  }

  return {
    note,
    isAnotherDisabled,
    isEditNote,
    openEditNote,
    closeEditNote,
    handleSaveNote,
    handleCancelEditNote
  }
}

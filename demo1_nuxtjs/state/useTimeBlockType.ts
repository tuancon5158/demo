import { IBlockType } from '@/interfaces/timeBlock'

export enum E_BLOCK_TYPE {
  NORMAL = 1,
  OUTSIDE,
  OVERTIME,
  ABSENCE,
  SUPPER_SUNDAY,
  HOLIDAY,
}

export const timeBlockTypes: IBlockType[] = [
  {
    id: 1,
    name: 'Giờ công thông thường',
    color: '#36B37E',
    bg_color: '#E3FCEF',
    description: 'Giờ làm việc 1 ngày < 8 tiếng',
    wage_weight: 1,
  },
  {
    id: 2,
    name: 'Làm ngoài/Công tác',
    color: '#57D9A3',
    bg_color: '#E3FCEF',
    description: 'Làm ngoài/Công tác',
    wage_weight: 1,
  },
  {
    id: 3,
    name: 'Tăng ca',
    color: '#00875A',
    bg_color: '#E3FCEF',
    description: 'Tăng ca',
    wage_weight: 1.2,
  },
  {
    id: 4,
    name: 'Nghỉ phép',
    color: '#C4C4C4',
    bg_color: null,
    description: 'Nghỉ phép',
    wage_weight: 0,
  },
  {
    id: 5,
    name: 'Đi làm ngày nghỉ',
    color: '#00C7E6',
    bg_color: '#E3FCEF',
    description: 'Đi làm ngày nghỉ',
    wage_weight: 1.3,
  },
  {
    id: 6,
    name: 'Đi làm ngày lễ',
    color: '#00C7E6',
    bg_color: '#E3FCEF',
    description: 'Đi làm ngày lễ',
    wage_weight: 1.3,
  },
]

export const findTimeBlockType = (id: number) => {
  return timeBlockTypes.find(item => item.id === id)
}

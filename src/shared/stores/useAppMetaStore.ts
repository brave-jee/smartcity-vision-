import { create } from 'zustand'

type AppMetaState = {
  appName: string
  version: string
}

export const useAppMetaStore = create<AppMetaState>(() => ({
  appName: 'SmartCity Vision',
  version: '0.1.0',
}))

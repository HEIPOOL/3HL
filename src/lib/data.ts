import { TracksData, MomentsData } from '@/types'

export async function getTracksData(): Promise<TracksData> {
  const data = await import('../../public/data/tracks.json')
  return data.default as TracksData
}

export async function getMomentsData(): Promise<MomentsData> {
  const data = await import('../../public/data/moments.json')
  return data.default as MomentsData
}

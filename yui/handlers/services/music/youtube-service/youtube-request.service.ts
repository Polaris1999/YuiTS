import request from 'request'
import { youtube_v3, google } from 'googleapis'
import {
  IYoutubeSearchResult,
  IYoutubeVideosResult,
  IYoutubePlaylistResult,
} from '../music-interfaces/youtube-info.interface'
import { LOG_SCOPE } from '@/constants/constants'
import { Injectable, Inject } from '@/dep-injection-ioc/decorators'
import { GlobalInjectToken } from '@/dep-injection-ioc/constants/di-connstants'
import { YuiLogger } from '@/log/logger.service'

@Injectable()
export class YoutubeRequestService {
  youtube: youtube_v3.Youtube = google.youtube({
    version: 'v3',
    auth: this.apiKey,
  })

  youtubeSearch: youtube_v3.Resource$Search = this.youtube.search
  youtubeVideos: youtube_v3.Resource$Videos = this.youtube.videos
  youtubePlayListItems: youtube_v3.Resource$Playlistitems = this.youtube.playlistItems

  constructor(@Inject(GlobalInjectToken.YOUTUBE_API_KEY) private apiKey: string) { }

  public youtubeApiRequest<T>(url: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      request(`${url}&key=${this.apiKey}`, (err: string, _, body: string | JSON) => {
        if (err) {
          this.handleRequestErrors(err)
          reject('Something went wrong')
        }
        const json = typeof body === 'string' ? JSON.parse(body) : body
        const { error, items } = json
        if (error || !items) {
          this.handleRequestErrors(error)
          resolve(null)
        }
        resolve(json)
      })
    })
  }

  public async googleYoutubeApiSearch(options: youtube_v3.Params$Resource$Search$List): Promise<IYoutubeSearchResult> {
    const { data, status } = await this.youtubeSearch.list(options)
    if (status !== 200 || !data.items) throw new Error('Youtube Request Failed: ' + data)
    return data
  }

  public async googleYoutubeApiVideos(options: youtube_v3.Params$Resource$Videos$List): Promise<IYoutubeVideosResult> {
    const { data, status } = await this.youtubeVideos.list(options)
    if (status !== 200 || !data.items) throw new Error('Youtube Request Failed: ' + data)
    return data
  }

  public async googleYoutubeApiPlaylistItems(
    options: youtube_v3.Params$Resource$Playlistitems$List
  ): Promise<IYoutubePlaylistResult> {
    const { data, status } = await this.youtubePlayListItems.list(options)
    if (status !== 200 || !data.items) throw new Error('Youtube Request Failed: ' + data)
    return data
  }

  handleRequestErrors(error: string): null {
    YuiLogger.error(error, LOG_SCOPE.YOUTUBE_REQUEST_SERVICE)
    return null
  }
}

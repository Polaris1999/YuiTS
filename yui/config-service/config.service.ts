import { config } from 'dotenv'
import { LOG_SCOPE } from '@/constants/constants'
import { existsSync } from 'fs'
import { YuiLogger } from '@/log/logger.service'
;(async () => {
  interface EnvConfig {
    [key: string]: string
  }

  class ConfigService {
    public envConfig: EnvConfig
    constructor() {
      const nodeEnv = process.env.NODE_ENV
      const filePath = `.env${(nodeEnv && `.${nodeEnv}`) || ``}`
      const path = existsSync(filePath) ? filePath : `.env`
      nodeEnv &&
        YuiLogger.info(`Using ${nodeEnv?.toUpperCase() || 'DEVELOPMENT'} environment`, LOG_SCOPE.CONFIG_SERVICE)
      this.envConfig = config({ path }).parsed
      const { error } = this.envConfig
      if (error) {
        throw new Error(`Fatal: CANNOT READ CONFIG ENVIRONMENT: ${error}`)
      }

      YuiLogger.debug(`Created!`, LOG_SCOPE.CONFIG_SERVICE)
    }

    public get token(): string {
      return this.envConfig['TOKEN']
    }

    public get tokenStaging(): string {
      return this.envConfig['TOKEN_STAGING']
    }

    public get youtubeApiKey(): string {
      return this.envConfig['YOUTUBE_API_KEY']
    }

    public get tenorKey(): string {
      return this.envConfig['TENOR_KEY']
    }

    public get tenorAnonymousId(): string {
      return this.envConfig['TENOR_ANONYMOUS_ID']
    }

    public get yuiId(): string {
      return this.envConfig['YUI_ID']
    }

    public get ownerId(): string {
      return this.envConfig['OWNER_ID']
    }

    public get prefix(): string {
      return this.envConfig['PREFIX']
    }

    public get prefixStaging(): string {
      return this.envConfig['PREFIX_STAGING']
    }

    public get youtubeClientId(): string {
      return this.envConfig['YOUTUBE_CLIENT_ID']
    }

    public get youtubeClientSecret(): string {
      return this.envConfig['YOUTUBE_CLIENT_SECRET']
    }

    public get soundcloudUserId(): string {
      return this.envConfig['SOUNDCLOUD_USERNAME']
    }

    public get soundcloudPassword(): string {
      return this.envConfig['SOUNDCLOUD_PASSWORD']
    }

    public get rapidApiKey(): string {
      return this.envConfig['RAPID_API_KEY']
    }

    public get environment(): 'development' | 'build' {
      return this.envConfig['ENVIRONMENT'] as 'development' | 'build'
    }
  }
  global['config'] = new ConfigService()
})()
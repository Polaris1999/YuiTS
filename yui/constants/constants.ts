/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

export enum Constants {
  YUI_COLOR_CODE = 'FFA000',
  NOW_PLAYING_YUI = 'https://media.discordapp.net/attachments/413313406993694728/525196421553455114/Yui_Loading_5.gif',
}

export type TFunction = new (...args: any[]) => {}

export enum CONST_TOKEN {
  BOT_TOKEN = 'bot-token',
  BOT_OPTION = 'bot-option',
  BOT_PREFIX = 'bot-prefix',
  CLIENT = 'client',
}

export enum LOG_SCOPE {
  YUI_MAIN = 'YuiMain',
  YUI_CORE = 'YuiCore',
  MESSAGE_HANDLER = 'MessageHandler',
  VOICE_STATE_HANDLER = 'VoiceStateHandler',
  MUSIC_SERVICE = 'MusicService',
  FEATURE_SERVICE = 'FeatureService',
  ADMIN_SERVICE = 'AdministrationService',
  CONFIG_SERVICE = 'ConfigService',
  REQUEST_SERVIE = 'RequestService',
  DECORATOR = 'Decorator',
  ADMIN_ACTION_COMMAND = 'AdminActionCommand',
  HOLOSTAT_SERVICE = 'HolostatService',
  HOLOSTAT_REQUEST_SERVICE = 'HolostatRequestService',
  YOUTUBE_CHANNEL_SERVICE = 'YoutubeChannelService',
  BILIBILI_CHANNEL_SERVICE = 'BilibiliChannelService',
  YOUTUBE_INFO_SERVICE = 'YoutubeInfoService',
  YOUTUBE_REQUEST_SERVICE = 'YoutubeRequestService',
  SOUNDCLOUD_INFO_SERICE = 'SoundcloudInfoService',
  SOUNDCLOUD_PLAYER_SERICE = 'SoundcloudPlayerService',
  VTUBER_STAT_SERVICE = 'VtuberStatService',
}

export const DISCORD_REACTION = {
  NUMBERS: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'],
  FORWARD: '▶',
  BACKWARD: '◀',
}

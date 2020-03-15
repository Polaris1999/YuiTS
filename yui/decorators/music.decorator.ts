import { TFunction, CONSTANTS } from '@/constants/constants'
import { MusicStream } from '@/handlers/services/music/music-entities/music-stream'
import { Message, TextChannel } from 'discord.js'

class AccessControllerStreams {
  public static streams: Map<string, MusicStream>
  constructor() {}
}

export const MusicServiceInitiator = () => {
  return <T extends TFunction>(superClass: T) => {
    AccessControllerStreams.streams = new Map<string, MusicStream>()
    return class extends superClass {
      _streams = AccessControllerStreams.streams
    }
  }
}

export const AccessController = (
  { join, silent }: { join?: boolean; silent?: boolean } = {
    join: false,
    silent: false
  }
) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value!
    descriptor.value = function(...args: any[]) {
      const streams = AccessControllerStreams.streams
      const [message] = args
      const {
        channel,
        guild,
        member: { voiceChannel }
      } = message as Message

      if (!voiceChannel) {
        message.reply('**please join a `__Voice Channel__`!**')
        return
      }

      if (!streams) return
      const stream = streams.has(guild.id) ? streams.get(guild.id) : null
      console.log(stream, ' <====== FOUND STREAMMMMMMMMM')
      const boundVoiceChannel = stream?.boundVoiceChannel
      args = [...args, stream]
      console.log(args, ' <===== args')
      if (!boundVoiceChannel && join) {
        if (!silent) {
          message.channel.send(
            `**Bound to Text Channel: \`${
              (channel as TextChannel).name
            }\` and Voice Channel: \`${voiceChannel?.name}\`**!`
          )
        }
        return originalMethod.apply(this, args)
      }
      if (boundVoiceChannel) {
        const boundTextChannel = stream.boundTextChannel
        if (
          channel.id !== boundTextChannel.id ||
          voiceChannel.id !== boundVoiceChannel.id
        ) {
          message.reply(
            `**I'm playing at \`${boundTextChannel.name}\` -- \` ${boundVoiceChannel.name}\`**`
          )
        } else {
          // final condition => All pass
          return originalMethod.apply(this, args)
        }
      } else {
        message.reply(`**\`I'm not in any voice channel.\`**`)
        return
      }
      return originalMethod.apply(this, args) // just in case
    }
  }
}

export const configurable = (value: boolean) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.configurable = value
    return descriptor
  }
}

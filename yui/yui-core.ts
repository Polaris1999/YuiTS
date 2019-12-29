import "reflect-metadata";
import "dotenv";
import { Discord, On, Client } from "@typeit/discord";
import {
  Message,
  Client as DiscordClient,
  ClientOptions,
  GuildMember
} from "discord.js";
import { MessageHandler } from "./handlers/message.handler";
import { VoiceStateHandler } from "./handlers/voice-state.handler";
import constants from "./constants/constants";
import { errorLogger } from "./handlers/error.handler";

@Discord
export default class YuiCore {
  private yui: Client;
  private messageHandler: MessageHandler;
  private voiceStateHandler: VoiceStateHandler;
  private prefix = constants.PREFIX;

  constructor() {
    const clientOptions: ClientOptions = {
      disableEveryone: true,
      disabledEvents: [
        "TYPING_START",
        "MESSAGE_REACTION_ADD",
        "RELATIONSHIP_ADD",
        "RELATIONSHIP_REMOVE",
        "MESSAGE_REACTION_REMOVE"
      ]
    };
    this.yui = new Client(clientOptions);
    this.messageHandler = new MessageHandler();
    // console.log(!!this.messageHandler && this.messageHandler);
    this.voiceStateHandler = new VoiceStateHandler(
      this.messageHandler.musicService || null
    );
  }

  public start(): Promise<void> {
    this.yui.login(process.env.TOKEN).catch(this.coreHandleError);
    this.yui.on("ready", () => this.onReady());
    return Promise.resolve();
  }

  @On("ready") // This does not work
  async onReady() {
    if (!this.yui.user) return;
    const ready = this.yui.user
      .setActivity("📻 Radio Happy", {
        url: "https://twitch.tv/onlypolaris",
        type: "STREAMING"
      })
      .catch(this.coreHandleError);
    if (ready) console.log("Yui is ready");
  }

  @On("message")
  async onMessage(message: Message) {
    if (!message.content.startsWith(this.prefix) || message.author.bot) return;
    var args = message.content
      .slice(this.prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();
    return this.messageHandler
      .execute(message, command, args)
      .catch(this.coreHandleError);
  }

  @On("voiceStateUpdate")
  async onVoiceStateUpdate(oldMember: GuildMember, newMember: GuildMember) {
    // TODO: check this
    this.voiceStateHandler.checkOnVoiceStateUpdate(oldMember, newMember);
  }

  private coreHandleError(error: Error | string): null {
    return errorLogger(error, "YUI_CORE");
  }
}

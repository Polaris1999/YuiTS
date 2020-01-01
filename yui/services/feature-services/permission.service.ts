import { Message, PermissionResolvable, GuildMember } from "discord.js";
import constants from "../../constants/constants";

export function memberHasPermission(
  member: GuildMember,
  permissions: PermissionResolvable
): boolean {
  const clientPermission = member.hasPermission(permissions, false, true, true);
  return clientPermission;
}

export function yuiHasPermission(
  yui: GuildMember,
  permissions: PermissionResolvable
): boolean {
  const yuiPermissions = !!yui && yui.hasPermission(permissions);
  return yuiPermissions;
}
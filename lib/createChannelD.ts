export function createChannelID(channelName: string) {
    const randomChars = Math.random().toString(36).substring(2, 10);
    return `${channelName}-${randomChars}`;
}

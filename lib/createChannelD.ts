export function createChannelID(channelName: string) {
    const updated_name = channelName.replaceAll(" ","-")
    const randomChars = Math.random().toString(36).substring(2, 10);
    return `${updated_name}-${randomChars}`;
}

export interface ISendMessage{
    text: string;
    chatId: string;
    senderId: string;
    receiverId: string[];
    isMedia: boolean;
    media?: string;
    mediaType?: 'image' | 'pdf' | 'audio';
    messageUniqueId: string;
    isGroup: boolean;
}

export interface ICreateChat{
    text: string;
    isMedia: boolean;
    media?: string;
    mediaType?: 'image' | 'pdf' | 'audio';
    messageUniqueId: string;
}
export interface ICreateGroup{
    users: string[],
    isGroup: boolean;
    groupName: string;
}
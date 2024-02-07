export interface ISendMessage{
    text: string;
    chatId: string;
    senderId: string;
    receiverId: string;
    isMedia: boolean;
    media?: string;
    mediaType?: 'image' | 'pdf' | 'audio';
    messageUniqueId: string; 
}

export interface ICreateChat{
    text: string;
    isMedia: boolean;
    media?: string;
    mediaType?: 'image' | 'pdf' | 'audio';
    messageUniqueId: string; 
}
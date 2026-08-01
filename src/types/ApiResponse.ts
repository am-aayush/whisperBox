import { Message } from "@/models/User";


export interface ApiResponse {
    todayMessageCount?: number;
    unreadCount?: number;
    totalCount?: number;
    success: boolean,
    message : string,
    isAcceptingMessage?:  boolean,
    messages?: Array<Message>
}
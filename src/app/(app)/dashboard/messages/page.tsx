"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { Message } from "@/models/User";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { Heart, Trash2, Archive, CheckCircle } from "lucide-react";
import { Types } from "mongoose";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread" | "archived">("all");
  const filteredMessages = messages.filter((msg) => {
    if (filter === "unread") return !msg.isRead && !msg.isArchived;
    if (filter === "archived") return msg.isArchived;
    return !msg.isArchived;
  });
  const { data: session } = useSession();
  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        setMessages(response.data.messages || []);
        if (refresh) {
          toast.add({
            type: "success",
            description: "Showing Latest Messages",
          });
        }
        console.log("message from state", messages);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.add({
          type: "error",
          description:
            axiosError.response?.data.message || "Failed to Fetch Messages",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setMessages],
  );

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
  }, [session, fetchMessages]);

  const deleteMessage = async (messageId: Types.ObjectId) => {
    console.log("Deleting message with ID:", messageId);
    try {
      const res = await axios.delete(`/api/delete-message/${messageId}`);
      console.log(res);
      toast.add({
        type: "success",
        description: "Message Deleted Successfully",
      });
      setMessages(messages.filter((message) => message._id !== messageId));
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.add({
        type: "error",
        description:
          axiosError.response?.data.message || "Failed to Fetch Messages",
      });
    }

    // Here you would also make an API call to delete the message from the database
  };

  const toggleArchive = async (messageId: Types.ObjectId) => {
    try {
      const message = messages.find((msg) => msg._id === messageId);
      if (!message) {
        toast.add({
          type: "error",
          description: "Message not found",
        });
        return;
      }
      const action = message.isArchived ? "unarchive" : "archive";
      const res = await axios.put(`/api/accessibility`, {
        messageid: messageId.toString(),
        action: action,
      });
      toast.add({
        type: "success",
        description: `Message ${action === "archive" ? "Archived" : "Unarchived"} Successfully`,
      });
      if (action === "archive") {
        setMessages(messages.filter((msg: any) => msg._id !== messageId));
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.add({
        type: "error",
        description:
          axiosError.response?.data.message || "Failed to Update Message",
      });
    }
  };

  const markAsRead = async (messageId: Types.ObjectId) => {
    try {
      const res = await axios.put(`/api/accessibility`, {
        messageid: messageId.toString(),
        action: "mar",
      });
      console.log(res);
      toast.add({
        type: "success",
        description: "Message Marked as Read Successfully",
      });
      setMessages(
        messages.map((msg: any) =>
          msg._id === messageId ? { ...msg, isRead: true } : msg,
        ),
      );
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.add({
        type: "error",
        description:
          axiosError.response?.data.message || "Failed to Update Message",
      });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Messages</h1>
          <p className="text-muted-foreground">
            Manage your anonymous feedback.
          </p>
        </div>

        <div className="flex bg-card p-1 rounded-lg border border-border shadow-sm">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === "all" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === "unread" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilter("archived")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === "archived" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Archived
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin">            
          </div>
          <p className="mt-4 text-muted-foreground">Loading messages...</p>
        </div>
      ) : filteredMessages.length === 0 ? (
        <>
          <div className="flex flex-col items-center justify-center p-12 text-center bg-card rounded-2xl border border-dashed border-border">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">👻</span>
            </div>
            <h3 className="text-lg font-bold mb-1">No messages here</h3>
            <p className="text-muted-foreground">
              When you receive messages, they'll show up here.
            </p>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredMessages.map((msg) => (
            <Card
              key={msg._id.toString()}
              className={`rounded-2xl border-border/60 transition-all hover:shadow-md ${!msg.isRead ? "bg-card border-primary/20 shadow-primary/5" : "bg-card/50"}`}
            >
              <CardContent className="p-6 relative group">
                {!msg.isRead && (
                  <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary/20 to-accent-500/20 flex items-center justify-center">
                    <span className="text-lg">🕵️</span>
                  </div>
                  <div>
                    <p className="font-medium">Anonymous</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-foreground/90 leading-relaxed mb-6">
                  "{msg.content}"
                </p>

                <div className="flex items-center gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`h-8 w-8 p-0 rounded-full ${msg.isArchived ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/10"} cursor-pointer`}
                    onClick={() => toggleArchive(msg._id)}
                    title={msg.isArchived ? "Unarchive" : "Archive"}
                  >
                    <Archive className="w-4 h-4" />
                  </Button>
                  {!msg.isRead && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10 cursor-pointer"
                      onClick={() => markAsRead(msg._id)}
                      title="Mark as Read"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  )}
                  <div className="flex-1"></div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                    onClick={() => deleteMessage(msg._id)}
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

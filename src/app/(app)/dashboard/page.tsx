"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { Message, User } from "@/models/User";
import { ApiResponse } from "@/types/ApiResponse";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Archive,
  BarChart3,
  CheckCircle,
  Copy,
  Heart,
  Inbox,
  Loader2,
  LogOut,
  MessageSquare,
  RefreshCcw,
  Settings,
  Share,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { Types } from "mongoose";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { Switch } from "@/components/ui/switch";

const DashboardPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState({
    totalCount: 0,
    unReadCount: 0,
    todayCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });
  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessage", false);

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessage", response.data.isAcceptingMessage!);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.add({
        type: "error",
        description:
          axiosError.response?.data.message ||
          "Failed to Fetch message Settings",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(true);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages", {
          params: { fromDashboard: true },
        });
        setMessages(response.data.messages || []);
        setStats({
          totalCount: response.data.totalCount || 0,
          unReadCount: response.data.unreadCount || 0,
          todayCount: response.data.todayMessageCount || 0,
        });
        if (refresh) {
          toast.add({
            type: "success",
            description: "Showing Latest Messages",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.add({
          type: "error",
          description:
            axiosError.response?.data.message || "Failed to Fetch Messages",
        });
      } finally {
        setIsLoading(false);
        setIsSwitchLoading(false);
      }
    },
    [setIsLoading, setMessages],
  );

  const handleDeleteMessage = useCallback(
    async (messageId: Types.ObjectId) => {
      try {
        const res = await axios.delete(`/api/delete-message/${messageId}`);
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
    },
    [messages],
  );

  const toggleArchive = useCallback(
    async (messageId: Types.ObjectId) => {
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
          fetchMessages();
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.add({
          type: "error",
          description:
            axiosError.response?.data.message || "Failed to Update Message",
        });
      }
    },
    [messages],
  );

  const markAsRead = useCallback(
    async (messageId: Types.ObjectId) => {
      try {
        const res = await axios.put(`/api/accessibility`, {
          messageid: messageId.toString(),
          action: "mar",
        });
        toast.add({
          type: "success",
          description: "Message Marked as Read Successfully",
        });
        setMessages(
          messages.map((msg: any) =>
            msg._id === messageId ? { ...msg, isRead: true } : msg,
          ),
        );
        fetchMessages();
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.add({
          type: "error",
          description:
            axiosError.response?.data.message || "Failed to Update Message",
        });
      }
    },
    [messages],
  );

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessage();
  }, [session, setValue, fetchAcceptMessage, fetchMessages]);

  //handel Switch Change here
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });

      setValue("acceptMessage", !acceptMessages);

      toast.add({
        type: "success",
        description: response.data.message,
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.add({
        type: "error",
        description:
          axiosError.response?.data.message ||
          "Failed to Fetch message Settings",
      });
    }
  };

  if (!session || !session.user) {
    return (
      <>
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <div className="flex flex-col items-center justify-center p-12 text-center bg-card rounded-2xl border border-dashed border-border h-full">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">
                <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              </span>
            </div>
            <p className="text-lg font-medium">Please wait...</p>
          </div>
        </main>
      </>
    );
  }

  const { username } = session?.user;
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.add({
      type: "success",
      description: "Url Copied to Clipboard",
    });
  };

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-2 font-bold">
          <MessageSquare className="w-5 h-5 text-primary" />
          WhisperBox
        </div>
        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
          J
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">
              Dashboard
            </h1>
            <p className="text-muted-foreground">Welcome back, {username}.</p>
          </div>

          {/* Public Link Card */}
          <div className="relative rounded-2xl overflow-hidden bg-linear-to-r from-primary to-accent-500 p-1">
            <div className="bg-card rounded-xl p-6 relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Your Public Link
                </h3>
                <div className="flex items-center gap-3 text-lg sm:text-xl font-medium">
                  <span className="truncate">{profileUrl || ""}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Anyone with this link can send you anonymous messages.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="rounded-full shadow-sm cursor-pointer"
                  onClick={copyToClipboard}
                >
                  <Copy className="w-4 h-4 mr-2" /> Copy
                </Button>
                <Button className="rounded-full shadow-sm bg-primary text-primary-foreground cursor-pointer">
                  <Link href="#">
                    <Share className="w-4 h-4 mr-2" /> Share
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="">
            <div className="mb-4">
              <Switch
                {...register("acceptMessage")}
                checked={acceptMessages}
                onCheckedChange={handleSwitchChange}
                disabled={isSwitchLoading}
              />
              <span className="ml-2">
                Accept Messages: {acceptMessages ? "On" : "Off"}
              </span>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="rounded-2xl border-none shadow-sm bg-card">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">
                  {stats.totalCount}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Messages
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-none shadow-sm bg-card">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                    <Inbox className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">
                  {stats.unReadCount}
                </div>
                <div className="text-sm text-muted-foreground">Unread</div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-none shadow-sm bg-card">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                    +12%
                  </span>
                </div>
                <div className="text-3xl font-bold mb-1">
                  {stats.todayCount}
                </div>
                <div className="text-sm text-muted-foreground">
                  Today's Messages
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Messages List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold mb-4">Recent Messages</h2>
              <Button
                className="mt-4 cursor-pointer"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  fetchMessages(true);
                }}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCcw className="h-4 w-4" />
                )}
              </Button>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                <p className="mt-4 text-muted-foreground">
                  Loading messages...
                </p>
              </div>
            ) : messages.length === 0 && !isLoading ? (
              <div className="flex flex-col items-center justify-center p-12 text-center bg-card rounded-2xl border border-dashed border-border">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">👻</span>
                </div>
                <h3 className="text-lg font-bold mb-1">No messages here</h3>
                <p className="text-muted-foreground">
                  When you receive messages, they'll show up here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {messages.map((msg) => (
                  <Card
                    key={msg._id.toString()}
                    className={`rounded-2xl border-border/60 transition-all hover:shadow-md ${!msg.isRead ? "bg-card border-primary/20" : "bg-card/50"}`}
                  >
                    <CardContent className="p-5 relative group">
                      {!msg.isRead && (
                        <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-primary"></div>
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
                          className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer"
                          title={msg.isArchived ? "Unarchive" : "Archive"}
                          onClick={() => toggleArchive(msg._id)}
                        >
                          <Archive className="w-4 h-4" />
                        </Button>
                        {!msg.isRead && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10 cursor-pointer"
                            title="Mark As Read"
                            onClick={() => markAsRead(msg._id)}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <div className="flex-1"></div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                          onClick={() => handleDeleteMessage(msg._id)}
                          title="Delete Message"
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
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;

"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Archive,
  BarChart3,
  CheckCircle,
  Copy,
  Heart,
  Inbox,
  LogOut,
  MessageSquare,
  Settings,
  Share,
  Trash2,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const MOCK_MESSAGES = [
  {
    id: 1,
    text: "You're doing great! Keep up the good work.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    text: "I've always admired your dedication.",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    text: "Can we collaborate on a project soon?",
    time: "1 day ago",
    read: true,
  },
  { id: 4, text: "Just wanted to say hi!", time: "2 days ago", read: true },
];

const DashboardPage = () => {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const publicLink = "https://whisperbox.app/u/john";

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
              <p className="text-muted-foreground">Welcome back, John.</p>
            </div>

            {/* Public Link Card */}
            <div className="relative rounded-2xl overflow-hidden bg-linear-to-r from-primary to-accent-500 p-1">
              <div className="bg-card rounded-xl p-6 relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Your Public Link
                  </h3>
                  <div className="flex items-center gap-3 text-lg sm:text-xl font-medium">
                    <span className="truncate">{publicLink || ""}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Anyone with this link can send you anonymous messages.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="rounded-full shadow-sm">
                    <Copy className="w-4 h-4 mr-2" /> Copy
                  </Button>
                  <Button className="rounded-full shadow-sm bg-primary text-primary-foreground">
                    <Link href="/u/john">
                      <Share className="w-4 h-4 mr-2" /> Share
                    </Link>
                  </Button>
                </div>
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
                  <div className="text-3xl font-bold mb-1">128</div>
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
                  <div className="text-3xl font-bold mb-1">14</div>
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
                  <div className="text-3xl font-bold mb-1">5</div>
                  <div className="text-sm text-muted-foreground">
                    Today's Messages
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Messages List */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Messages</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {messages.map((msg) => (
                  <Card
                    key={msg.id}
                    className={`rounded-2xl border-border/60 transition-all hover:shadow-md ${!msg.read ? "bg-card border-primary/20" : "bg-card/50"}`}
                  >
                    <CardContent className="p-6 relative group">
                      {!msg.read && (
                        <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-primary"></div>
                      )}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary/20 to-accent-500/20 flex items-center justify-center">
                          <span className="text-lg">🕵️</span>
                        </div>
                        <div>
                          <p className="font-medium">Anonymous</p>
                          <p className="text-xs text-muted-foreground">
                            {msg.time}
                          </p>
                        </div>
                      </div>
                      <p className="text-foreground/90 leading-relaxed mb-6">
                        "{msg.text}"
                      </p>

                      <div className="flex items-center gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10"
                        >
                          <Archive className="w-4 h-4" />
                        </Button>
                        {!msg.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <div className="flex-1"></div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
        
      </main>
  );
};

export default DashboardPage;

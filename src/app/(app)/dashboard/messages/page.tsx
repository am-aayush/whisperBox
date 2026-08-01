'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Trash2, Archive, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const ALL_MESSAGES = [
  { id: 1, text: "You're doing great! Keep up the good work.", time: "2 hours ago", read: false, archived: false },
  { id: 2, text: "I've always admired your dedication.", time: "5 hours ago", read: false, archived: false },
  { id: 3, text: "Can we collaborate on a project soon?", time: "1 day ago", read: true, archived: false },
  { id: 4, text: "Just wanted to say hi!", time: "2 days ago", read: true, archived: false },
  { id: 5, text: "Your recent post was very inspiring. Thank you for sharing.", time: "3 days ago", read: true, archived: false },
  { id: 6, text: "Are you attending the conference next week?", time: "4 days ago", read: true, archived: false },
  { id: 7, text: "This is a test message to see if it works.", time: "1 week ago", read: true, archived: true },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState(ALL_MESSAGES);
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');

  const filteredMessages = messages.filter(msg => {
    if (filter === 'unread') return !msg.read && !msg.archived;
    if (filter === 'archived') return msg.archived;
    return !msg.archived;
  });

  const markAsRead = (id: number) => {
    setMessages(msgs => msgs.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const toggleArchive = (id: number) => {
    setMessages(msgs => msgs.map(m => m.id === id ? { ...m, archived: !m.archived } : m));
  };

  const deleteMessage = (id: number) => {
    setMessages(msgs => msgs.filter(m => m.id !== id));
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Messages</h1>
          <p className="text-muted-foreground">Manage your anonymous feedback.</p>
        </div>
        
        <div className="flex bg-card p-1 rounded-lg border border-border shadow-sm">
           <button 
             onClick={() => setFilter('all')}
             className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'all' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
           >
             All
           </button>
           <button 
             onClick={() => setFilter('unread')}
             className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'unread' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
           >
             Unread
           </button>
           <button 
             onClick={() => setFilter('archived')}
             className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === 'archived' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
           >
             Archived
           </button>
        </div>
      </div>

      {filteredMessages.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-card rounded-2xl border border-dashed border-border">
           <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
             <span className="text-3xl">👻</span>
           </div>
           <h3 className="text-lg font-bold mb-1">No messages here</h3>
           <p className="text-muted-foreground">When you receive messages, they'll show up here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredMessages.map((msg) => (
            <Card key={msg.id} className={`rounded-2xl border-border/60 transition-all hover:shadow-md ${!msg.read ? 'bg-card border-primary/20 shadow-primary/5' : 'bg-card/50'}`}>
              <CardContent className="p-6 relative group">
                {!msg.read && <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-primary animate-pulse"></div>}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary/20 to-accent-500/20 flex items-center justify-center">
                    <span className="text-lg">🕵️</span>
                  </div>
                  <div>
                    <p className="font-medium">Anonymous</p>
                    <p className="text-xs text-muted-foreground">{msg.time}</p>
                  </div>
                </div>
                <p className="text-foreground/90 leading-relaxed mb-6">
                  "{msg.text}"
                </p>
                
                <div className="flex items-center gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10" title="Like">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className={`h-8 w-8 p-0 rounded-full ${msg.archived ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-primary hover:bg-primary/10'}`} 
                    onClick={() => toggleArchive(msg.id)}
                    title={msg.archived ? "Unarchive" : "Archive"}
                  >
                    <Archive className="w-4 h-4" />
                  </Button>
                  {!msg.read && (
                     <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-emerald-500 hover:bg-emerald-500/10" onClick={() => markAsRead(msg.id)} title="Mark as Read">
                       <CheckCircle className="w-4 h-4" />
                     </Button>
                  )}
                  <div className="flex-1"></div>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10" onClick={() => deleteMessage(msg.id)} title="Delete">
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

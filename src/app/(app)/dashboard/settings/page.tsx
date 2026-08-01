import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function SettingsPage() {
  return (
    <div className="w-8/10 px-4 py-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and profile.</p>
      </div>

      <div className="space-y-6">
        <Card className="rounded-2xl border-border/60 bg-card/50 shadow-sm">
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>This information will be displayed on your public link.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-primary to-accent-500 p-1">
                 <div className="w-full h-full bg-card rounded-full flex items-center justify-center border-2 border-background">
                   <span className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary to-accent-500">J</span>
                 </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="rounded-lg">Change Avatar</Button>
                <Button variant="ghost" className="rounded-lg text-rose-500 hover:text-rose-600 hover:bg-rose-500/10">Remove</Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Display Name</label>
                <Input defaultValue="John Doe" className="rounded-xl" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Username</label>
                <div className="flex rounded-xl overflow-hidden border border-input focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ring-offset-background transition-all">
                  <div className="bg-muted px-3 py-2 flex items-center border-r border-input text-muted-foreground text-sm">
                    whisperbox.app/u/
                  </div>
                  <input type="text" defaultValue="john" className="flex-1 bg-background px-3 py-2 text-sm outline-none" />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Bio (Optional)</label>
                <Textarea placeholder="Tell them something about yourself..." className="rounded-xl min-h-25" />
              </div>
            </div>
            
            <div className="pt-2 flex justify-end">
              <Button className="rounded-xl shadow-md shadow-primary/20">Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/60 bg-card/50 shadow-sm">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Choose how you want to be notified about new messages.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">Receive an email when you get a new message.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">Marketing Emails</h4>
                <p className="text-sm text-muted-foreground">Receive updates about new features and updates.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-rose-500/20 bg-rose-500/5 shadow-sm">
          <CardHeader>
            <CardTitle className="text-rose-500">Danger Zone</CardTitle>
            <CardDescription>Permanently delete your account and all associated data.</CardDescription>
          </CardHeader>
          <CardContent>
             <Button variant="outline" className="rounded-xl border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white">Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

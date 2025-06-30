'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Copy, Mail, QrCode, Users } from 'lucide-react'
import { toast } from 'sonner'
import type { Form } from '../types'

interface ShareFormDialogProps {
  form: Form
  children: React.ReactNode
}

export function ShareFormDialog({ form, children }: ShareFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const formUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/forms/fill/${form.id}`
  const embedCode = `<iframe src="${formUrl}" width="100%" height="600" frameborder="0"></iframe>`

  const copyToClipboard = async (text: string, message: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(message)
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err)
        toast.error('Failed to copy text')
      })
  }

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Fill out: ${form.title}`)
    const body = encodeURIComponent(`Please fill out this form: ${formUrl}

${form.description}`)
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Share Form</DialogTitle>
          <DialogDescription>{`Share "${form.title}" with others to collect responses`}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="link">Link</TabsTrigger>
            <TabsTrigger value="embed">Embed</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="space-y-4">
            <div className="space-y-2">
              <Label>Form URL</Label>
              <div className="flex gap-2">
                <Input value={formUrl} readOnly />
                <Button variant="outline" onClick={() => copyToClipboard(formUrl, 'Form link copied to clipboard!')}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Badge variant={form.settings.isPublic ? 'default' : 'secondary'}>
                {form.settings.isPublic ? 'Public' : 'Private'}
              </Badge>
              <Badge variant={form.settings.isOpen ? 'default' : 'destructive'}>
                {form.settings.isOpen ? 'Accepting Responses' : 'Closed'}
              </Badge>
              {form.settings.requireLogin && <Badge variant="outline">Login Required</Badge>}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => window.open(formUrl, '_blank')}>
                Preview Form
              </Button>
              <Button variant="outline">
                <QrCode className="w-4 h-4 mr-2" />
                Generate QR Code
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="embed" className="space-y-4">
            <div className="space-y-2">
              <Label>Embed Code</Label>
              <div className="space-y-2">
                <textarea className="w-full h-24 p-2 border rounded-md font-mono text-sm" value={embedCode} readOnly />
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(embedCode, 'Embed code copied to clipboard!')}
                  className="w-full"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Embed Code
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Customization Options</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Show form title</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Show form description</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-resize height</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label>Email Template</Label>
                <div className="mt-2 p-4 border rounded-lg bg-muted/50">
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Subject:</strong> Fill out: {form.title}
                    </div>
                    <div>
                      <strong>Body:</strong>
                    </div>
                    <div className="pl-4 space-y-1">
                      <div>Please fill out this form: {formUrl}</div>
                      <div>{form.description}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button onClick={shareViaEmail}>
                  <Mail className="w-4 h-4 mr-2" />
                  Open Email Client
                </Button>
                <Button variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Bulk Email
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Public Form</Label>
                  <p className="text-sm text-muted-foreground">Allow anyone to find this form</p>
                </div>
                <Switch checked={form.settings.isPublic} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Accept Responses</Label>
                  <p className="text-sm text-muted-foreground">Allow new submissions</p>
                </div>
                <Switch checked={form.settings.isOpen} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Require Login</Label>
                  <p className="text-sm text-muted-foreground">Only logged-in users can submit</p>
                </div>
                <Switch checked={form.settings.requireLogin} />
              </div>

              <div className="space-y-2">
                <Label>Response Limit</Label>
                <Input type="number" placeholder="No limit" />
                <p className="text-sm text-muted-foreground">Automatically close form after this many responses</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

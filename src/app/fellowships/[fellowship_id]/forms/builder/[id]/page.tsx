'use client'

import type React from 'react'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Trash2, GripVertical, Eye, Save, Upload, X, ImageIcon } from 'lucide-react'

import type { FormField, Form } from '../../types'
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd'
import { Share } from 'lucide-react'
import { toast } from 'sonner'
import { ShareFormDialog } from '../../components/share-form-dialog'
import { useParams } from 'next/navigation'

const fieldTypes = [
  { value: 'text', label: 'Text' },
  { value: 'textarea', label: 'Long Text' },
  { value: 'number', label: 'Number' },
  { value: 'email', label: 'Email' },
  { value: 'date', label: 'Date' },
  { value: 'select', label: 'Dropdown' },
  { value: 'multiselect', label: 'Multiple Choice' },
  { value: 'boolean', label: 'Yes/No' },
  { value: 'file', label: 'File Upload' },
]

export default function FormBuilder() {
  const params = useParams<{ id: string; fellowship_id: string }>()
  const [form, setForm] = useState<Form>({
    id: params.id === 'new' ? '' : params.id,
    title: 'Untitled Form',
    description: '',
    fields: [],
    settings: {
      isPublic: true,
      isOpen: true,
      requireLogin: false,
      successMessage: 'Thank you for your submission!',
      successImage: undefined,
      successImageAlt: '',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    createdBy: 'user1',
    coAdmins: [],
    responses: [],
  })

  const [activeTab, setActiveTab] = useState('build')

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type,
      title: `New ${type} field`,
      description: '',
      required: false,
      options: type === 'select' || type === 'multiselect' ? ['Option 1', 'Option 2'] : undefined,
    }
    setForm((prev) => ({
      ...prev,
      fields: [...prev.fields, newField],
    }))
  }

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.map((field) => (field.id === fieldId ? { ...field, ...updates } : field)),
    }))
  }

  const removeField = (fieldId: string) => {
    setForm((prev) => ({
      ...prev,
      fields: prev.fields.filter((field) => field.id !== fieldId),
    }))
  }
  const onDragEnd = (result: DropResult<string>) => {
    if (!result.destination) return

    const items = Array.from(form.fields)
    const [reorderedItem] = items.splice(result.source.index, 1) as [FormField]
    items.splice(result.destination.index, 0, reorderedItem)
    setForm((prev) => ({ ...prev, fields: items }))
  }

  const handleSuccessImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, you'd upload to a server or cloud storage
      // For demo purposes, we'll create a local URL
      const imageUrl = URL.createObjectURL(file)
      setForm((prev) => ({
        ...prev,
        settings: {
          ...prev.settings,
          successImage: imageUrl,
          successImageAlt: file.name,
        },
      }))
      toast.success('Success image uploaded!')
    }
  }

  const removeSuccessImage = () => {
    setForm((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        successImage: undefined,
        successImageAlt: '',
      },
    }))
    toast.success('Success image removed!')
  }

  const openFormInNewTab = () => {
    const formId = params.id
    window.open(`/${params.fellowship_id}/forms/fill/${formId}`, '_blank')
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{params.id === 'new' ? 'Create Form' : 'Edit Form'}</h1>
          <p className="text-muted-foreground">Build your custom form</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={openFormInNewTab}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <ShareFormDialog form={form}>
            <Button variant="outline">
              <Share className="w-4 h-4 mr-2" />
              Share Form
            </Button>
          </ShareFormDialog>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Form
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="build">Build</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="build" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Form Title</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Form Fields</CardTitle>
              </CardHeader>
              <CardContent>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="fields">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                        {form.fields.map((field, index) => (
                          <Draggable key={field.id} draggableId={field.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="border rounded-lg p-4 space-y-4"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div {...provided.dragHandleProps}>
                                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    <Badge variant="outline">{field.type}</Badge>
                                    {field.required && <Badge variant="destructive">Required</Badge>}
                                  </div>
                                  <Button variant="ghost" size="sm" onClick={() => removeField(field.id)}>
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>

                                <div className="grid gap-4">
                                  <div>
                                    <Label>Field Title</Label>
                                    <Input
                                      value={field.title}
                                      onChange={(e) => updateField(field.id, { title: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <Label>Description (optional)</Label>
                                    <Input
                                      value={field.description || ''}
                                      onChange={(e) => updateField(field.id, { description: e.target.value })}
                                    />
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      checked={field.required}
                                      onCheckedChange={(checked) => updateField(field.id, { required: checked })}
                                    />
                                    <Label>Required field</Label>
                                  </div>

                                  {(field.type === 'select' || field.type === 'multiselect') && (
                                    <div>
                                      <Label>Options</Label>
                                      <div className="space-y-2">
                                        {field.options?.map((option, optionIndex) => (
                                          <Input
                                            key={optionIndex}
                                            value={option}
                                            onChange={(e) => {
                                              const newOptions = [...(field.options || [])]
                                              newOptions[optionIndex] = e.target.value
                                              updateField(field.id, { options: newOptions })
                                            }}
                                          />
                                        ))}
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => {
                                            const newOptions = [
                                              ...(field.options || []),
                                              `Option ${(field.options?.length || 0) + 1}`,
                                            ]
                                            updateField(field.id, { options: newOptions })
                                          }}
                                        >
                                          Add Option
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}

                        {/* Add Field Button with Select */}
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                          <div className="flex flex-col sm:flex-row gap-3 items-center">
                            <Select onValueChange={(value) => addField(value as FormField['type'])}>
                              <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="Choose field type" />
                              </SelectTrigger>
                              <SelectContent>
                                {fieldTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <div className="text-sm text-muted-foreground sm:flex-1">
                              Select a field type and it will be added to your form
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Public Form</Label>
                  <p className="text-sm text-muted-foreground">Allow anyone to find and fill this form</p>
                </div>
                <Switch
                  checked={form.settings.isPublic}
                  onCheckedChange={(checked) =>
                    setForm((prev) => ({ ...prev, settings: { ...prev.settings, isPublic: checked } }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Accept Responses</Label>
                  <p className="text-sm text-muted-foreground">Allow new form submissions</p>
                </div>
                <Switch
                  checked={form.settings.isOpen}
                  onCheckedChange={(checked) =>
                    setForm((prev) => ({ ...prev, settings: { ...prev.settings, isOpen: checked } }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Require Login</Label>
                  <p className="text-sm text-muted-foreground">Only logged-in users can submit</p>
                </div>
                <Switch
                  checked={form.settings.requireLogin}
                  onCheckedChange={(checked) =>
                    setForm((prev) => ({ ...prev, settings: { ...prev.settings, requireLogin: checked } }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="successMessage">Success Message</Label>
                <Textarea
                  id="successMessage"
                  value={form.settings.successMessage}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, settings: { ...prev.settings, successMessage: e.target.value } }))
                  }
                />
              </div>

              <div>
                <Label>Success Image (optional)</Label>
                <p className="text-sm text-muted-foreground mb-3">Add an image to display with your success message</p>

                {form.settings.successImage ? (
                  <div className="space-y-3">
                    <div className="relative inline-block">
                      <img
                        src={form.settings.successImage || '/placeholder.svg'}
                        alt={form.settings.successImageAlt || 'Success image'}
                        className="max-w-xs max-h-48 rounded-lg border object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={removeSuccessImage}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <div>
                      <Label htmlFor="successImageAlt">Image Alt Text</Label>
                      <Input
                        id="successImageAlt"
                        value={form.settings.successImageAlt || ''}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            settings: { ...prev.settings, successImageAlt: e.target.value },
                          }))
                        }
                        placeholder="Describe the image for accessibility"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                    <div className="text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Upload an image for your success message</p>
                        <div>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleSuccessImageUpload}
                            className="hidden"
                            id="success-image-upload"
                          />
                          <Label htmlFor="success-image-upload">
                            <Button variant="outline" asChild>
                              <span>
                                <Upload className="w-4 h-4 mr-2" />
                                Choose Image
                              </span>
                            </Button>
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>{form.title}</CardTitle>
              {form.description && <p className="text-muted-foreground">{form.description}</p>}
            </CardHeader>
            <CardContent className="space-y-6">
              {form.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label>
                    {field.title}
                    {field.required && <span className="text-destructive ml-1">*</span>}
                  </Label>
                  {field.description && <p className="text-sm text-muted-foreground">{field.description}</p>}

                  {field.type === 'text' && <Input placeholder="Enter text..." />}
                  {field.type === 'textarea' && <Textarea placeholder="Enter text..." />}
                  {field.type === 'number' && <Input type="number" placeholder="Enter number..." />}
                  {field.type === 'email' && <Input type="email" placeholder="Enter email..." />}
                  {field.type === 'date' && <Input type="date" />}
                  {field.type === 'select' && (
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option, index) => (
                          <SelectItem key={index} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {field.type === 'boolean' && (
                    <div className="flex items-center space-x-2">
                      <Switch />
                      <Label>Yes/No</Label>
                    </div>
                  )}
                  {field.type === 'file' && <Input type="file" />}
                </div>
              ))}

              <Button className="w-full">Submit Form</Button>

              {/* Preview Success Message */}
              <div className="mt-8 p-6 border rounded-lg bg-muted/50">
                <h3 className="font-semibold mb-3">Success Message Preview:</h3>
                <div className="text-center space-y-4">
                  {form.settings.successImage && (
                    <img
                      src={form.settings.successImage || '/placeholder.svg'}
                      alt={form.settings.successImageAlt || 'Success image'}
                      className="max-w-xs max-h-48 mx-auto rounded-lg object-cover"
                    />
                  )}
                  <p className="text-muted-foreground">{form.settings.successMessage}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

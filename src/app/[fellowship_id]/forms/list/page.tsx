'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, FileText } from 'lucide-react'
import Link from 'next/link'
import type { Form } from '../types'

// Mock public forms data
const mockPublicForms: Form[] = [
  {
    id: '1',
    title: 'Customer Feedback Survey',
    description: 'Help us improve our services by sharing your feedback',
    fields: [],
    settings: {
      isPublic: true,
      isOpen: true,
      requireLogin: false,
      successMessage: 'Thank you!',
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    createdBy: 'user1',
    coAdmins: [],
    responses: Array(45)
      .fill(null)
      .map((_, i) => ({
        id: `${i}`,
        formId: '1',
        responses: [{ fieldId: '1', fieldName: 'Feedback', fieldType: 'text', value: 'Great service!' }],
        submittedAt: new Date(),
      })),
  },
  {
    id: '3',
    title: 'Community Event Registration',
    description: 'Register for our upcoming community events and workshops',
    fields: [],
    settings: {
      isPublic: true,
      isOpen: true,
      requireLogin: false,
      successMessage: 'Registration successful!',
    },
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-19'),
    createdBy: 'user2',
    coAdmins: [],
    responses: Array(78)
      .fill(null)
      .map((_, i) => ({
        id: `${i}`,
        formId: '3',
        responses: [
          { fieldId: '1', fieldName: 'Event Name', fieldType: 'text', value: `Event ${i + 1}` },
          { fieldId: '2', fieldName: 'Participant Name', fieldType: 'text', value: `Participant ${i + 1}` },
        ],
        submittedAt: new Date(),
      })),
  },
  {
    id: '4',
    title: 'Product Feature Request',
    description: 'Suggest new features for our products',
    fields: [],
    settings: {
      isPublic: true,
      isOpen: true,
      requireLogin: false,
      successMessage: 'Thank you for your suggestion!',
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    createdBy: 'user3',
    coAdmins: [],
    responses: Array(23)
      .fill(null)
      .map((_, i) => ({
        id: `${i}`,
        formId: '4',
        responses: [
          { fieldId: '1', fieldName: 'Feature Suggestion', fieldType: 'text', value: `Feature ${i + 1}` },
          { fieldId: '2', fieldName: 'Description', fieldType: 'textarea', value: `Description for feature ${i + 1}` },
        ],
        submittedAt: new Date(),
      })),
  },
]

export default function PublicFormsList() {
  const [forms] = useState<Form[]>(mockPublicForms)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredForms = forms.filter(
    (form) =>
      form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Public Forms</h1>
        <p className="text-muted-foreground">Browse and fill out public forms from the community</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search forms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-6">
        {filteredForms.map((form) => (
          <Card key={form.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-2">
                    {form.title}
                    <Badge variant={form.settings.isOpen ? 'default' : 'secondary'}>
                      {form.settings.isOpen ? 'Open' : 'Closed'}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{form.description}</CardDescription>
                </div>
                <Link href={`/forms/fill/${form.id}`}>
                  <Button disabled={!form.settings.isOpen}>Fill Form</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex gap-4">
                  <span>{form.responses.length} responses</span>
                  <span>Created {form.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredForms.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No forms found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'Try adjusting your search terms' : 'No public forms are available at the moment'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

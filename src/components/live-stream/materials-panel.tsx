"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye } from "lucide-react"
import type { EventMaterial } from "@/lib/mock-data"

interface MaterialsPanelProps {
  materials: EventMaterial[]
  onDownload: (material: EventMaterial) => void
  onPreview: (material: EventMaterial) => void
}

export function MaterialsPanel({ materials, onDownload, onPreview }: MaterialsPanelProps) {
  const getFileIcon = (type: EventMaterial["type"]) => {
    switch (type) {
      case "pdf":
        return "📄"
      case "doc":
        return "📝"
      case "image":
        return "🖼️"
      case "video":
        return "🎥"
      default:
        return "📁"
    }
  }

  const getFileColor = (type: EventMaterial["type"]) => {
    switch (type) {
      case "pdf":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "doc":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "image":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "video":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <FileText className="w-5 h-5 mr-2" />
          Event Materials
          <Badge variant="secondary" className="ml-2">
            {materials.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {materials.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No materials available for this event.</p>
          </div>
        ) : (
          materials.map((material) => (
            <Card key={material.id} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="text-2xl">{getFileIcon(material.type)}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">{material.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className={`text-xs ${getFileColor(material.type)}`}>
                          {material.type.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Available for approved members</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-3">
                    {(material.type === "image" || material.type === "pdf") && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPreview(material)}
                        className="bg-transparent"
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => onDownload(material)} className="bg-transparent">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}

        {materials.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Access Information</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Materials are available only to approved and paid members</li>
              <li>• Downloads are tracked for security purposes</li>
              <li>• Please respect copyright and sharing restrictions</li>
              <li>• Contact event organizers if you have access issues</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

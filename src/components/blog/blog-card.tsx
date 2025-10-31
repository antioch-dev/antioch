import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { BlogPost } from "@/lib/types"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card className="h-full card-animated hover:shadow-xl hover:border-primary/20 transition-all duration-300 animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3 mb-3">
          <Avatar className="h-8 w-8 transition-transform duration-200 hover:scale-110">
            <AvatarFallback className="text-xs bg-primary/10 text-primary">
              {post.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">{formatDate(post.publishedAt || post.createdAt)}</p>
          </div>
        </div>
        <Link href={`/blog/${post.slug}`} className="group">
          <h3 className="text-xl font-semibold leading-tight group-hover:text-accent transition-all duration-200 group-hover:translate-x-1">
            {post.title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs hover:border-primary transition-colors duration-200">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

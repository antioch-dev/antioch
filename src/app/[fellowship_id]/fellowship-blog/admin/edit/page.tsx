
"use client";

import { useEffect, useState } from "react";


const useRouter = () => ({
  push: (path: string) => {
    console.log(`Mock Navigation: Redirecting to ${path}`);
   
  },
});

// 1. Mock Type Definition
interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  tags: string[];
  createdAt: number; // timestamp
  updatedAt: number; // timestamp
}

// 2. Mock Storage Functions
const mockPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "Initial Post",
    content: "This is the content of the first post.",
    excerpt: "Content excerpt...",
    author: "User",
    tags: ["tech", "blog"],
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000,
  },
  {
    id: "post-2",
    title: "Second Draft",
    content: "More thoughts here.",
    excerpt: "More thoughts excerpt...",
    author: "User",
    tags: ["news"],
    createdAt: Date.now() - 72000000,
    updatedAt: Date.now() - 72000000,
  },
];

const getAllPosts = (): BlogPost[] => {
  return mockPosts;
};

const savePost = (updatedPost: BlogPost): void => {
  console.log("Mock: Post saved:", updatedPost.id);
  // In a real app, this would update Firestore/localStorage
};

// 3. Mock Components (Simplified UI for a runnable example)

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-gray-50 min-h-screen font-sans">{children}</div>
);

const Header = () => (
  <header className="bg-white shadow-md p-4 sticky top-0 z-10">
    <div className="max-w-7xl mx-auto text-xl font-bold text-gray-800">
      Fellowship Blog Admin
    </div>
  </header>
);

const MarkdownEditor = ({
  post,
  onSave,
  onCancel,
}: {
  post: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}) => {
  const [editedPost, setEditedPost] = useState(post);

  const handleChange = (key: keyof BlogPost, value: string) => {
    setEditedPost((prev) => ({ ...prev, [key]: value }));
  };

  const handleContentChange = (content: string) => {
    setEditedPost((prev) => ({ ...prev, content }));
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
        Editing: {editedPost.title}
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={editedPost.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content (Mock Markdown Area)
          </label>
          <textarea
            value={editedPost.content}
            onChange={(e) => handleContentChange(e.target.value)}
            rows={10}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({ ...editedPost, updatedAt: Date.now() })}
            className="px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-lg"
          >
            Save Post
          </button>
        </div>
      </div>
    </div>
  );
};

interface EditPostPageProps {
  params: {
   
    fellowship_id: string;
    id: string;
  };
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data and filtering by ID
    const posts = getAllPosts();
    const foundPost = posts.find((p) => p.id === params.id);
    
    setPost(foundPost || null);
    setLoading(false);
  }, [params.id, params.fellowship_id]);

  const handleSave = (updatedPost: BlogPost) => {
    savePost(updatedPost);
    router.push("/admin");
  };

  const handleCancel = () => {
    // Use router.push which is now a mock function
    router.push("/admin");
  };

  const LoadingState = (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-500 mx-auto mb-4"></div>
        <p className="text-gray-500">Loading post...</p>
      </div>
    </main>
  );

  const NotFoundState = (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center bg-white p-10 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-2 text-red-600">Post Not Found</h1>
        <p className="text-gray-600">The post with ID: &quot;{params.id}&quot; could not be located.</p>
        <p className="text-sm text-gray-400 mt-2">
            (Context: Fellowship ID - {params.fellowship_id})
        </p>
      </div>
    </main>
  );

  if (loading) {
    return <ProtectedRoute><Header />{LoadingState}</ProtectedRoute>;
  }

  if (!post) {
    return <ProtectedRoute><Header />{NotFoundState}</ProtectedRoute>;
  }

  return (
    <ProtectedRoute>
      <Header />
      <main className="bg-white min-h-[calc(100vh-64px)]">
        <MarkdownEditor post={post} onSave={handleSave} onCancel={handleCancel} />
      </main>
    </ProtectedRoute>
  );
}

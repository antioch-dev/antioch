"use client";

import React, { useEffect, useState } from "react";


const useRouter = () => ({
  push: (path: string) => {
    console.log(`Mock Navigation: Redirecting to ${path}`);
  },
});

const useParams = () => ({
  fellowship_id: "mock-fellowship-alpha",
  id: "post-1", 
});

interface BlogPost {
  id: string;
  title: string;
  content: string; // Markdown content
  excerpt: string;
  author: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Mock Storage Functions
const initialMockPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "Initial Post Draft",
    content: "This is the content of the first post, ready for editing.",
    excerpt: "Content excerpt...",
    author: "User",
    tags: ["tech", "blog"],
    createdAt: String(Date.now() - 86400000),
    updatedAt: String(Date.now() - 86400000),
  },
  {
    id: "post-2",
    title: "Second Draft Idea",
    content: "More thoughts here. Still needs fleshing out.",
    excerpt: "More thoughts excerpt...",
    author: "User",
    tags: ["news"],
    createdAt: String(Date.now() - 72000000),
    updatedAt: String(Date.now() - 72000000),
  },
];

const mockPosts: BlogPost[] = initialMockPosts;

/**
 * Mock data retrieval function.
 * @returns {BlogPost[]}
 */
const getAllPosts = (): BlogPost[] => {
  return mockPosts;
};

/**
 * Mock function to simulate saving data.
 * @param {BlogPost} updatedPost
 */
const savePost = (updatedPost: BlogPost): void => {
  console.log("Mock: Post saved:", updatedPost.id);
  console.log("Updated Post Data:", updatedPost);
};

// --- Custom Components ---

const Header = () => (
  <header className="bg-white shadow-lg p-4 sticky top-0 z-10 border-b border-indigo-100">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="text-2xl font-extrabold text-indigo-700 tracking-tight">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2"><path d="M12 20h9"/><path d="M16.5 3.5l-3 3-1.5 1.5L4 18l5.5-5.5 1.5-1.5 3-3 3-3zM14 8l-6 6"/><path d="M21 15v3h-3"/></svg>
        Edit Blog Post
      </div>
      <span className="text-sm text-gray-500 font-medium">Admin Panel</span>
    </div>
  </header>
);

interface MarkdownEditorProps {
  post: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

const MarkdownEditor = ({ post, onSave, onCancel }: MarkdownEditorProps) => {
  const [editedPost, setEditedPost] = useState<BlogPost>(post);
  const handleChange = (key: keyof BlogPost, value: string | string[]) => {
    setEditedPost((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-10 space-y-6">
        <h2 className="text-3xl font-extrabold text-gray-900 border-b pb-4 mb-4">
          Editing: {editedPost.title}
        </h2>

        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">
            Post Title
          </label>
          <input
            id="title"
            type="text"
            value={editedPost.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full rounded-lg border-2 border-gray-300 shadow-inner focus:border-indigo-500 focus:ring-indigo-500 p-3 transition"
          />
        </div>

        {/* Content Editor Area */}
        <div>
          <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-1">
            Content (Markdown)
          </label>
          <textarea
            id="content"
            value={editedPost.content}
            onChange={(e) => handleChange("content", e.target.value)}
            rows={15}
            className="w-full rounded-lg border-2 border-gray-300 shadow-inner focus:border-indigo-500 focus:ring-indigo-500 p-4 font-mono text-sm transition"
          ></textarea>
        </div>
        
        {/* Tags Input (Simplified) */}
        <div>
          <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 mb-1">
            Tags (Comma Separated)
          </label>
          <input
            id="tags"
            type="text"
            value={editedPost.tags.join(', ')}
            onChange={(e) => handleChange("tags", e.target.value.split(',').map(tag => tag.trim()))}
            className="w-full rounded-lg border-2 border-gray-300 shadow-inner focus:border-indigo-500 focus:ring-indigo-500 p-3 transition"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4 border-t mt-6">
          <button
            onClick={onCancel}
            className="px-6 py-3 rounded-full text-base font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition duration-150 shadow-md"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({ ...editedPost, updatedAt: String(Date.now()) })}
            className="px-6 py-3 rounded-full text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 shadow-lg hover:shadow-xl transform hover:scale-[1.01]"
          >
            Save & Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default function EditPostPage() {
  const params = useParams(); 
  const [post, setPost] = useState<BlogPost | null>(null); 
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Destructure for cleaner useEffect dependency array
  const { id, fellowship_id } = params;

  useEffect(() => {
    const timer = setTimeout(() => {
      const posts = getAllPosts();
      const foundPost = posts.find((p) => p.id === id);
      
      setPost(foundPost || null);
      setLoading(false);
    }, 500); // 500ms mock delay

    return () => clearTimeout(timer);
  }, [id, fellowship_id]); // Use destructured variables as dependencies

  const handleSave = (updatedPost: BlogPost) => {
    savePost(updatedPost);
    router.push(`/app/${fellowship_id}/fellowship-blog/admin`);
  };

  const handleCancel = () => {
    router.push(`/app/${fellowship_id}/fellowship-blog/admin`);
  };

  // Loading State UI
  const LoadingState = (
    <main className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center">
      <div className="text-center p-10">
        <div className="animate-pulse rounded-lg h-2 w-full bg-indigo-200 mx-auto mb-6"></div>
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500 mx-auto"></div>
        <p className="text-lg text-indigo-600 mt-4 font-medium">Fetching post details...</p>
      </div>
    </main>
  );

  // Not Found State UI
  const NotFoundState = (
    <main className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center">
      <div className="text-center bg-white p-12 rounded-2xl shadow-2xl border border-red-200">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 14v-4m0-4h.01"/></svg>
        <h1 className="text-3xl font-extrabold mb-3 text-red-600">404 - Post Not Found</h1>
        <p className="text-gray-600 max-w-sm">The post with the ID <code className="bg-gray-200 p-1 rounded font-mono text-sm">{id}</code> could not be located in the system.</p>
        <p className="text-sm text-gray-400 mt-4 italic">
            Context: Fellowship {fellowship_id}
        </p>
      </div>
    </main>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Header />
      {loading ? LoadingState : null}
      {!loading && !post ? NotFoundState : null}
      
      {!loading && post ? (
        <main className="bg-gray-50">
          <MarkdownEditor post={post} onSave={handleSave} onCancel={handleCancel} />
        </main>
      ) : null}
    </div>
  );
}

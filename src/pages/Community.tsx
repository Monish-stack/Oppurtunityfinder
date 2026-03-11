import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MessageSquare, ThumbsUp, Send } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Community() {
  const [posts, setPosts] = useState<any[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch("/api/community-posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Please login to post");

    await fetch("/api/community-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, title: newTitle, content: newContent }),
    });

    setNewTitle("");
    setNewContent("");
    fetchPosts();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Entrepreneur Community</h1>
          <p className="text-slate-500 text-sm mt-1">Connect, share, and learn from local founders.</p>
        </div>
      </div>

      {/* Create Post */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
      >
        <h3 className="text-lg font-bold mb-4">Start a Discussion</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Post Title"
            required
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            placeholder="What's on your mind?"
            required
            rows={3}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold flex items-center transition-colors"
            >
              <Send className="w-4 h-4 mr-2" /> Post
            </button>
          </div>
        </form>
      </motion.div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                  {post.author_name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{post.author_name}</h4>
                  <p className="text-xs text-slate-500">{new Date(post.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2">{post.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">{post.content}</p>
            
            <div className="flex items-center space-x-6 border-t border-slate-100 dark:border-slate-800 pt-4">
              <button className="flex items-center text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition-colors">
                <ThumbsUp className="w-4 h-4 mr-2" /> Like
              </button>
              <button className="flex items-center text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium transition-colors">
                <MessageSquare className="w-4 h-4 mr-2" /> Comment
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

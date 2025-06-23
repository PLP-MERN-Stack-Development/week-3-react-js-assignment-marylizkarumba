
import React from 'react';
import { Post } from '@/services/jsonPlaceholderApi';
import CustomCard from '@/components/ui/custom-card';

interface PostCardProps {
  post: Post;
  onClick?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  return (
    <CustomCard 
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-2">
            {post.title}
          </h3>
          <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">
            #{post.id}
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 line-clamp-3">
          {post.body}
        </p>
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>User ID: {post.userId}</span>
          <span className="animate-pulse">Click to expand</span>
        </div>
      </div>
    </CustomCard>
  );
};

export default PostCard;

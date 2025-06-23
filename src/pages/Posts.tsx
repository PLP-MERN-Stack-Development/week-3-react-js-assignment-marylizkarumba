
import React, { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';
import { usePagination } from '@/hooks/usePagination';
import { jsonPlaceholderApi, Post } from '@/services/jsonPlaceholderApi';
import Layout from '@/components/Layout';
import CustomCard from '@/components/ui/custom-card';
import CustomButton from '@/components/ui/custom-button';
import { Input } from '@/components/ui/input';
import PostCard from '@/components/PostCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search, AlertCircle, Grid, List } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  
  const pagination = usePagination({ itemsPerPage: 12 });
  const { loading, error, execute: fetchPosts } = useApi(jsonPlaceholderApi.getPosts);

  useEffect(() => {
    loadPosts();
    // Simulate total posts for pagination (JSONPlaceholder has 100 posts)
    pagination.setTotalItems(100);
  }, [pagination.currentPage]);

  const loadPosts = async () => {
    try {
      const fetchedPosts = await fetchPosts(pagination.currentPage, pagination.itemsPerPage);
      setPosts(fetchedPosts);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to load posts. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadPosts();
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const searchResults = await jsonPlaceholderApi.searchPosts(searchQuery);
      setPosts(searchResults);
      pagination.setTotalItems(searchResults.length);
      pagination.reset();
    } catch (err) {
      toast({
        title: 'Search Error',
        description: 'Failed to search posts. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    pagination.setTotalItems(100);
    pagination.reset();
    loadPosts();
  };

  const openPostModal = (post: Post) => {
    setSelectedPost(post);
  };

  const closePostModal = () => {
    setSelectedPost(null);
  };

  if (error) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <CustomCard className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Something went wrong
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Failed to load posts. Please check your connection and try again.
            </p>
            <CustomButton onClick={loadPosts}>
              Try Again
            </CustomButton>
          </CustomCard>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <CustomCard className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Blog Posts
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Browse and search through posts from JSONPlaceholder API
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CustomButton
                variant={viewMode === 'grid' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </CustomButton>
              <CustomButton
                variant={viewMode === 'list' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </CustomButton>
            </div>
          </div>
        </CustomCard>

        {/* Search */}
        <CustomCard className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search posts by title or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="flex gap-2">
              <CustomButton 
                onClick={handleSearch} 
                disabled={isSearching}
                className="flex items-center gap-2"
              >
                {isSearching ? <LoadingSpinner size="sm" /> : <Search className="w-4 h-4" />}
                Search
              </CustomButton>
              {searchQuery && (
                <CustomButton variant="secondary" onClick={clearSearch}>
                  Clear
                </CustomButton>
              )}
            </div>
          </div>
        </CustomCard>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Posts Grid/List */}
        {!loading && posts.length > 0 && (
          <>
            <div className={`mb-8 ${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
            }`}>
              {posts.map((post) => (
                <div 
                  key={post.id}
                  className={viewMode === 'list' ? 'animate-fade-in' : ''}
                >
                  <PostCard post={post} onClick={() => openPostModal(post)} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {!searchQuery && pagination.totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={pagination.prevPage}
                        className={!pagination.hasPrevPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => pagination.goToPage(page)}
                            isActive={page === pagination.currentPage}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={pagination.nextPage}
                        className={!pagination.hasNextPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && posts.length === 0 && (
          <CustomCard className="text-center py-12">
            <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              No posts found
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {searchQuery ? 'Try adjusting your search terms' : 'No posts available'}
            </p>
          </CustomCard>
        )}

        {/* Post Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedPost.title}
                </h2>
                <CustomButton variant="secondary" size="sm" onClick={closePostModal}>
                  ×
                </CustomButton>
              </div>
              <div className="mb-4">
                <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">
                  Post #{selectedPost.id} • User {selectedPost.userId}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {selectedPost.body}
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Posts;

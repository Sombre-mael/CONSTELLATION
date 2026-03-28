import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getArticles, getCategories, getTags } from '../services/api';
import { FaThumbsUp, FaComment, FaSearch, FaTags, FaCalendar, FaUser, FaShareAlt } from 'react-icons/fa';
import BlogHeader from '../components/BlogHeader';

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [totalPages, setTotalPages] = useState(1);

  const currentPage = parseInt(searchParams.get('page') || '1');
  const selectedCategory = searchParams.get('category') || '';
  const selectedTag = searchParams.get('tag') || '';

  useEffect(() => {
    loadData();
  }, [currentPage, selectedCategory, selectedTag, searchParams.get('search')]);

  const loadData = async () => {
    setLoading(true);
    try {
      const params = { page: currentPage };
      if (selectedCategory) params.category = selectedCategory;
      if (selectedTag) params.tag = selectedTag;
      if (searchParams.get('search')) params.search = searchParams.get('search');

      const [articlesRes, categoriesRes, tagsRes] = await Promise.all([
        getArticles(params),
        getCategories(),
        getTags()
      ]);

      setArticles(articlesRes.data.articles);
      setTotalPages(articlesRes.data.pages);
      setCategories(categoriesRes.data);
      setTags(tagsRes.data);
    } catch (error) {
      console.error('Error loading blog data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleCategoryFilter = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  const handleTagFilter = (tag) => {
    const params = new URLSearchParams(searchParams);
    if (tag) {
      params.set('tag', tag);
    } else {
      params.delete('tag');
    }
    params.set('page', '1');
    setSearchParams(params);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <BlogHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog CONSTELLATION</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Restez informé des dernières actualités, projets et conseils de notre équipe
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  data-testid="blog-search-input"
                />
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  data-testid="blog-search-button"
                >
                  Rechercher
                </button>
              </div>
            </form>

            {/* Active Filters */}
            {(selectedCategory || selectedTag || searchParams.get('search')) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategory && (
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    Catégorie: {selectedCategory}
                    <button onClick={() => handleCategoryFilter('')} className="hover:text-gray-200">×</button>
                  </span>
                )}
                {selectedTag && (
                  <span className="bg-accent text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    Tag: {selectedTag}
                    <button onClick={() => handleTagFilter('')} className="hover:text-gray-200">×</button>
                  </span>
                )}
                {searchParams.get('search') && (
                  <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    Recherche: {searchParams.get('search')}
                    <button onClick={() => { setSearchQuery(''); setSearchParams(new URLSearchParams()); }} className="hover:text-gray-200">×</button>
                  </span>
                )}
              </div>
            )}

            {/* Articles Grid */}
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500 text-lg">Aucun article trouvé</p>
                <p className="text-gray-400 mt-2">Revenez bientôt pour découvrir nos actualités!</p>
              </div>
            ) : (
              <div className="grid gap-8" data-testid="articles-grid">
                {articles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    data-testid={`article-card-${article.id}`}
                  >
                    <div className="md:flex">
                      {article.image_url && (
                        <div className="md:w-1/3">
                          <img
                            src={article.image_url}
                            alt={article.title}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                      )}
                      <div className={`p-6 ${article.image_url ? 'md:w-2/3' : 'w-full'}`}>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                            {article.category}
                          </span>
                          <span className="text-gray-400 text-sm flex items-center gap-1">
                            <FaCalendar className="text-xs" />
                            {formatDate(article.created_at)}
                          </span>
                        </div>
                        <Link to={`/blog/${article.id}`}>
                          <h2 className="text-xl font-bold text-gray-800 hover:text-primary transition-colors mb-3">
                            {article.title}
                          </h2>
                        </Link>
                        <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                        
                        {/* Tags */}
                        {article.tags && article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {article.tags.slice(0, 3).map((tag, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleTagFilter(tag)}
                                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-accent hover:text-white transition"
                              >
                                #{tag}
                              </button>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-gray-500 text-sm">
                            <span className="flex items-center gap-1">
                              <FaThumbsUp className="text-primary" />
                              {article.likes_count}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaComment className="text-secondary" />
                              {article.comments_count}
                            </span>
                          </div>
                          <Link
                            to={`/blog/${article.id}`}
                            className="text-primary font-medium hover:text-secondary transition"
                            data-testid={`read-more-${article.id}`}
                          >
                            Lire la suite →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams);
                      params.set('page', page.toString());
                      setSearchParams(params);
                    }}
                    className={`px-4 py-2 rounded-lg transition ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            {/* Categories */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaTags className="text-primary" />
                Catégories
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryFilter('')}
                  className={`block w-full text-left px-3 py-2 rounded transition ${
                    !selectedCategory ? 'bg-primary text-white' : 'hover:bg-gray-100'
                  }`}
                  data-testid="category-all"
                >
                  Toutes les catégories
                </button>
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCategoryFilter(cat.name)}
                    className={`block w-full text-left px-3 py-2 rounded transition ${
                      selectedCategory === cat.name ? 'bg-primary text-white' : 'hover:bg-gray-100'
                    }`}
                    data-testid={`category-${cat.name}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            {tags.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Tags populaires</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTagFilter(tag.name)}
                      className={`px-3 py-1 rounded-full text-sm transition ${
                        selectedTag === tag.name
                          ? 'bg-accent text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-accent hover:text-white'
                      }`}
                    >
                      #{tag.name} ({tag.count})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

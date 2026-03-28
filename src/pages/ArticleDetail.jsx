import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getArticle, likeArticle, addComment } from '../services/api';
import { FaThumbsUp, FaComment, FaCalendar, FaUser, FaArrowLeft, FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaLink, FaTags } from 'react-icons/fa';

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ author_name: '', content: '' });
  const [submitting, setSubmitting] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    loadArticle();
  }, [id]);

  const loadArticle = async () => {
    try {
      const response = await getArticle(id);
      setArticle(response.data);
      setLikesCount(response.data.likes_count);
      setComments(response.data.comments || []);
    } catch (error) {
      console.error('Error loading article:', error);
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      const response = await likeArticle(id);
      setLiked(response.data.liked);
      setLikesCount(response.data.likes_count);
    } catch (error) {
      console.error('Error liking article:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.author_name.trim() || !newComment.content.trim()) return;

    setSubmitting(true);
    try {
      const response = await addComment(id, newComment);
      setComments([response.data, ...comments]);
      setNewComment({ author_name: '', content: '' });
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const shareUrl = window.location.href;
  const shareText = article ? `${article.title} - CONSTELLATION` : '';

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Article non trouvé</p>
          <Link to="/blog" className="text-primary hover:text-secondary">
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      {article.image_url && (
        <div className="w-full h-64 md:h-96 relative">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-primary hover:text-secondary mb-6 transition"
          data-testid="back-to-blog"
        >
          <FaArrowLeft />
          Retour au blog
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <article className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-8">
              {/* Category & Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                  {article.category}
                </span>
                <span className="text-gray-500 flex items-center gap-2">
                  <FaCalendar />
                  {formatDate(article.created_at)}
                </span>
                <span className="text-gray-500 flex items-center gap-2">
                  <FaUser />
                  {article.author_name}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6" data-testid="article-title">
                {article.title}
              </h1>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  <FaTags className="text-gray-400 mt-1" />
                  {article.tags.map((tag, idx) => (
                    <Link
                      key={idx}
                      to={`/blog?tag=${tag}`}
                      className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full hover:bg-accent hover:text-white transition"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}

              {/* Content */}
              <div className="prose prose-lg max-w-none text-gray-700 mb-8" data-testid="article-content">
                {article.content.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>

              {/* Like & Share Actions */}
              <div className="border-t pt-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Like Button */}
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition ${
                      liked
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-primary hover:text-white'
                    }`}
                    data-testid="like-button"
                  >
                    <FaThumbsUp />
                    <span>{likesCount} J'aime{likesCount !== 1 ? 's' : ''}</span>
                  </button>

                  {/* Share Buttons */}
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-sm">Partager:</span>
                    <a
                      href={shareLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
                      data-testid="share-facebook"
                    >
                      <FaFacebook />
                    </a>
                    <a
                      href={shareLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition"
                      data-testid="share-twitter"
                    >
                      <FaTwitter />
                    </a>
                    <a
                      href={shareLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition"
                      data-testid="share-linkedin"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href={shareLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition"
                      data-testid="share-whatsapp"
                    >
                      <FaWhatsapp />
                    </a>
                    <button
                      onClick={copyToClipboard}
                      className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition relative"
                      data-testid="copy-link"
                    >
                      <FaLink />
                      {showCopied && (
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          Copié!
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow-md p-8 mt-8" data-testid="comments-section">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaComment className="text-primary" />
                Commentaires ({comments.length})
              </h2>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-8 bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-4">Laisser un commentaire</h3>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Votre nom"
                    value={newComment.author_name}
                    onChange={(e) => setNewComment({ ...newComment, author_name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    data-testid="comment-name-input"
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    placeholder="Votre commentaire..."
                    value={newComment.content}
                    onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    rows="4"
                    required
                    data-testid="comment-content-input"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                  data-testid="submit-comment-button"
                >
                  {submitting ? 'Envoi...' : 'Publier le commentaire'}
                </button>
              </form>

              {/* Comments List */}
              {comments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Aucun commentaire pour le moment. Soyez le premier à commenter!
                </p>
              ) : (
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="border-b pb-6 last:border-0"
                      data-testid={`comment-${comment.id}`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                          {comment.author_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{comment.author_name}</h4>
                          <span className="text-gray-400 text-sm">{formatDate(comment.created_at)}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 ml-13 pl-13">{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-4">À propos de l'auteur</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {article.author_name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{article.author_name}</p>
                  <p className="text-gray-500 text-sm">Équipe CONSTELLATION</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Expert chez CONSTELLATION, partageant des connaissances et des actualités de notre équipe multiservices.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

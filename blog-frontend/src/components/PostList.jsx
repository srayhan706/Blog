import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts/');
      setPosts(response.data);
      setError('');
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Log in to explore the full feed and interact with posts.');
        return;
      }

      setError('We could not load posts right now. Please try again in a moment.');
    }
  };

  useEffect(() => {
    const loadPosts = async () => {
      await fetchPosts();
    };

    loadPosts();
  }, []);

  const handleVote = async (postId, direction) => {
    try {
      await api.post('/votes/', { post_id: postId, dir: direction });
      fetchPosts();
    } catch (err) {
      alert(err.response?.data?.detail || 'Error voting');
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await api.delete(`/posts/${postId}`);
      fetchPosts();
    } catch (err) {
      alert(err.response?.data?.detail || 'Failed to delete post');
    }
  };

  const totalVotes = posts.reduce((sum, item) => sum + item.votes, 0);
  const token = localStorage.getItem('token');

  return (
    <div className="content-grid">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Fresh stories, better presented</span>
          <h1>Publish ideas that deserve a beautiful stage.</h1>
          <p>
            Browse community writing, spotlight thoughtful posts, and keep your publishing
            workflow feeling polished from the first click to the final draft.
          </p>

          <div className="hero-actions">
            {token ? (
              <Link to="/create" className="button">
                Create a post
              </Link>
            ) : (
              <>
                <Link to="/register" className="button">
                  Join now
                </Link>
                <Link to="/login" className="button-ghost">
                  Sign in
                </Link>
              </>
            )}
          </div>

          <div className="hero-stats">
            <div className="stat-pill">
              <strong>{posts.length}</strong>
              <span>Stories in the feed</span>
            </div>
            <div className="stat-pill">
              <strong>{totalVotes}</strong>
              <span>Total reader votes</span>
            </div>
            <div className="stat-pill">
              <strong>{token ? 'Live' : 'Guest'}</strong>
              <span>Current session mode</span>
            </div>
          </div>
        </div>

        <div className="hero-art">
          <div className="hero-art-card">
            <span className="eyebrow" style={{ background: 'rgba(255,255,255,0.16)', color: '#fff' }}>
              Curated feed
            </span>
            <h3>Thoughtful writing, clear hierarchy, and room to breathe.</h3>
            <p>The interface now frames content like a magazine rather than a raw list.</p>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="section-heading">
          <div>
            <h2>Latest posts</h2>
            <p>Vote on pieces you like and keep the best writing at the top of attention.</p>
          </div>
          <div className="chip">{posts.length} published</div>
        </div>
      </section>

      {error && <div className="status-banner error">{error}</div>}

      {!error && posts.length === 0 && (
        <section className="empty-state">
          <h3>No posts yet</h3>
          <p>Be the first to publish something worth reading.</p>
          {token && (
            <Link to="/create" className="button">
              Write the first post
            </Link>
          )}
        </section>
      )}

      {!error && posts.length > 0 && (
        <section className="feed-grid">
          {posts.map((item) => (
            <article key={item.Post.id} className="post-card">
              <div className="post-card-header">
                <div>
                  <div className="post-meta">
                    <span className="chip">Post #{item.Post.id}</span>
                    <span>{item.Post.published ? 'Published' : 'Draft'}</span>
                  </div>
                  <h3>{item.Post.title}</h3>
                </div>
                <div className="score-chip">{item.votes} votes</div>
              </div>

              <p className="post-card-content">{item.Post.content}</p>

              <div className="post-card-footer">
                <div className="post-actions">
                  <button type="button" className="button" onClick={() => handleVote(item.Post.id, 1)}>
                    Upvote
                  </button>
                  <button
                    type="button"
                    className="button-ghost"
                    onClick={() => handleVote(item.Post.id, 0)}
                  >
                    Remove vote
                  </button>
                </div>

                <button
                  type="button"
                  className="button-danger"
                  onClick={() => handleDelete(item.Post.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
};

export default PostList;

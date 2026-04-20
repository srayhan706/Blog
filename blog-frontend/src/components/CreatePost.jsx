import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/posts/', { title, content, published });
      alert('Post created successfully!');
      navigate('/');
    } catch (error) {
      alert(`Error creating post: ${error.response?.data?.detail || 'Unauthorized'}`);
    }
  };

  return (
    <section className="auth-layout">
      <aside className="auth-aside">
        <div>
          <span className="eyebrow" style={{ background: 'rgba(255,255,255,0.18)', color: '#fff' }}>
            New story
          </span>
          <h2>Compose something worth stopping for.</h2>
          <p>
            The writing screen now feels like a focused studio: clean fields, better spacing, and
            a layout that keeps attention on the content.
          </p>
        </div>

        <ul>
          <li>Lead with a clear, punchy title.</li>
          <li>Draft longer content in a calmer editor space.</li>
          <li>Choose whether to publish immediately or keep it private.</li>
        </ul>
      </aside>

      <div className="form-panel">
        <div className="form-copy">
          <span className="eyebrow">Create post</span>
          <h2>Write your next piece</h2>
          <p>Use this composer to publish a new article to the feed.</p>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="post-title">Title</label>
            <input
              id="post-title"
              type="text"
              placeholder="Give your post a memorable headline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="post-content">Content</label>
            <textarea
              id="post-content"
              placeholder="Write the story, insight, or update you want readers to see..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <label className="checkbox-row" htmlFor="post-published">
            <input
              id="post-published"
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            <span className="checkbox-copy">
              <strong>Publish immediately</strong>
              <span>
                Keep this enabled to make the post visible in the feed as soon as you submit it.
              </span>
            </span>
          </label>

          <button type="submit" className="button">
            Publish post
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;

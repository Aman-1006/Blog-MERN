import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css'

export default function Home() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/posts', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      .then(res => {
        setPosts(Array.isArray(res.data) ? res.data : res.data.posts || []);
      })
      .catch(err => {
        console.error('Failed to fetch posts:', err);
        setPosts([]);
      });
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await axios.delete(`http://localhost:5001/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div style={{ }}>
      <div className="px-4">
        <h2 className="text-center fw-bold mb-5" style={{
          fontSize: '2.5rem',
          textDecoration: 'underline',
          color: '#2f3542',
          textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
        }}>
          {token ? 'My Posts' : 'All Posts'}
        </h2>

        <div className="row">
          {posts.map(post => (
            <div className="col-md-4 mb-4" key={post._id}>
              <div className="card h-100 shadow-sm border-0" style={{ transition: 'transform 0.2s' }}>
                {post.imagePath && (
                  <img
                    src={`http://localhost:5001/uploads/${post.imagePath}`}
                    className="card-img-top"
                    alt={post.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text text-muted" style={{ flexGrow: 1 }}>
                    {post.content.length > 100
                      ? post.content.slice(0, 100) + '…'
                      : post.content}
                  </p>
                  <div className="d-flex justify-content-between mt-3">
                    <Link to={`/post/${post._id}`} className="btn btn-primary btn-sm">
                      Read More
                    </Link>
                    {token && (
                      <div className="d-flex gap-2">
                        <Link to={`/edit/${post._id}`} className="btn btn-secondary btn-sm">
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="btn btn-outline-danger btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {posts.length === 0 && (
            <div className="text-center text-muted mt-5">No posts found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

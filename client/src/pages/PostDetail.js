import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/api/posts`, { 
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      .then(res => {
        const found = res.data.find(p => p._id === id);
        setPost(found);
      })
      .catch(console.error);
  }, [id, token]);

  if (!post) return <p>Loading…</p>;

  return (
    <div className="card mb-4 shadow-sm">
      {post.imagePath && (
        <img
          src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${post.imagePath}`}
          className="card-img-top"
          alt={post.title}
        />
      )}
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p className="text-muted mb-2">Category: {post.category}</p>
        <p className="card-text">{post.content}</p>
        <Link to="/" className="btn btn-secondary">Back to Posts</Link>
      </div>
    </div>
  );
}

type Post = {
    id: string;
    title: string;
    summary: string;
    author?: {
        name: string;
        avatar: string;
    };
  };
  
  type PostCardProps = {
    post: Post;
  };
  
  const PostCard: React.FC<PostCardProps> = ({ post }) => {
    return (
      <div className="post-card">
        <h2>{post.title}</h2>
        <p>{post.summary}</p>
        {/* <span>By {post.author.name}</span> */}
      </div>
    );
  };
  
export default PostCard;
import styled from 'styled-components';

type Post = {
  id: string;
  title: string;
  summary: string;
  publishDate: string;
  author?: {
    name: string;
    avatar: string;
  };
  categories: {
    id: string;
    name: string;
  }[];
};

type PostCardProps = {
  post: Post;
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card>
      <Title>{post.title}</Title>
      <Summary>{post.summary}</Summary>

      <AuthorSection>
        {post.author && (
          <>
            <Avatar src={post.author.avatar} alt={post.author.name} />
            <AuthorName>By {post.author.name}</AuthorName>
          </>
        )}
      </AuthorSection>

      <CategoryContainer>
        {post.categories.map((cat) => (
          <CategoryChip key={cat.id}>{cat.name}</CategoryChip>
        ))}
      </CategoryContainer>
    </Card>
  );
};

export default PostCard;

const Card = styled.div`
  border: 1px solid var(--secondary-color-disabled);
  border-radius: 12px;
  padding: 16px;
  background-color: var(--text-white);
  max-width: 400px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-gray);
  margin-bottom: 0.5rem;
`;

const Summary = styled.p`
  color: var(--text-gray);
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  object-fit: cover;
`;

const AuthorName = styled.span`
  font-size: 0.875rem;
  color: var(--text-gray);
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CategoryChip = styled.span`
  background-color: var(--secondary-color);
  padding: 4px 10px;
  font-size: 0.75rem;
  border-radius: 9999px;
  color: var(--text-gray);
  font-weight: 500;
`;

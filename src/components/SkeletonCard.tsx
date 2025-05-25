import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';

const SkeletonCard = () => {
  return (
    <Card>
      <Skeleton height={24} width="80%" style={{ marginBottom: '8px' }} />
      <Skeleton count={2} width="100%" style={{ marginBottom: '16px' }} />

      <AuthorSection>
        <Skeleton circle height={40} width={40} />
        <Skeleton height={16} width={100} />
      </AuthorSection>

      <CategoryContainer>
        {Array(3).fill(null).map((_, i) => (
          <Skeleton key={i} height={24} width={80} style={{ borderRadius: '9999px' }} />
        ))}
      </CategoryContainer>
    </Card>
  );
};

export default SkeletonCard;

const Card = styled.div`
  border: 1px solid var(--secondary-color-disabled);
  border-radius: 12px;
  padding: 16px;
  background-color: var(--text-white);
  max-width: 400px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 16px 0;
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

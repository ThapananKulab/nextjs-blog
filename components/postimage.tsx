// components/PostImage.tsx
import { Card, Image } from "@mantine/core";

type PostImageProps = {
  imageUrl: string;
  altText: string;
};

const PostImage: React.FC<PostImageProps> = ({ imageUrl, altText }) => (
  <Card shadow="sm">
    <Image src={imageUrl} alt={altText} fit="cover" radius="md" />
  </Card>
);

export default PostImage;

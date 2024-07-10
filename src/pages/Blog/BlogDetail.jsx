
import { useFetchBlogByIdQuery } from "../../redux/api/blogApiSlice";
import { useParams } from "react-router-dom";
import { Typography, Skeleton, Alert } from "antd";

const { Title, Paragraph } = Typography;

const BlogDetail = () => {
  const { id } = useParams();
  const { data: blog, isLoading, isError } = useFetchBlogByIdQuery(id);

  if (isLoading) return <Skeleton active />;
  if (isError) return <Alert message="Error fetching blog details" type="error" />;

  return (
    <div>
    <div className="top-banner">
            <img
              className="top-banner-image"
              src="/src/assets/banner.png"
              alt="banner"
            />
            <div className="w-full bg-white  flex justify-center  pt-2 pb-3">
              <img
                className="logo"
                src="/src/assets/logo-concung.png"
                alt="logo"
              />
            </div>
          </div>
      <div className="mx-20 mt-44 px-4 py-6 ">
      <Title level={1} className="text-2xl font-bold mb-4">{blog.title}</Title>
      <img src={blog.image} alt={blog.title} className="object-cover h-64 w-full mb-4" />
      <Paragraph className="text-gray-500 text-sm mb-4">
        Created at: {new Date(blog.createdAt).toLocaleDateString()} {new Date(blog.createdAt).toLocaleTimeString()}
      </Paragraph>
      <Paragraph>{blog.description}</Paragraph>
    </div>
    </div>
    
  );
};

export default BlogDetail;

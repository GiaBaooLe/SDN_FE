import { useFetchBlogsQuery } from "../../redux/api/blogApiSlice";
import { Link } from "react-router-dom";
import { Card, Typography, Skeleton, Button } from "antd";

const { Title, Paragraph } = Typography;

const Blog = () => {
  const { data: blogs = [], isLoading, isError } = useFetchBlogsQuery();

  if (isLoading) return <Skeleton active />;
  if (isError) return <p>Error fetching blogs</p>;

  return (
    <div>
      <div className="top-banner">
        <img
          className="top-banner-image"
          src="/src/assets/banner.png"
          alt="banner"
        />
        <div className="w-full bg-white  flex justify-center  pt-2 pb-3">
          <img className="logo" src="/src/assets/logo-concung.png" alt="logo" />
        </div>
      </div>
      <div className="mx-16 px-4 py-6 mt-44">
        <div className="flex justify-center">
          <Title level={1} className="text-2xl font-bold mb-4 text-center">
            Blog{" "}
          </Title>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card
              key={blog._id}
              cover={
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="object-cover h-40 w-full"
                />
              }
              actions={[
                <Link
                  to={`/blog/${blog._id}`}
                  key={blog._id}
                 
                >
                  <Button  className="text-white bg-pink-400 font-semibold">Read more</Button>
                </Link>,
              ]}
              className="shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Title level={4} className="text-lg">
                {blog.title}
              </Title>
              <Paragraph>{blog.description.substring(0, 100)}...</Paragraph>
              <Paragraph className="text-gray-500 text-sm">
                Created at: {new Date(blog.createdAt).toLocaleDateString()}{" "}
                {new Date(blog.createdAt).toLocaleTimeString()}
              </Paragraph>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;

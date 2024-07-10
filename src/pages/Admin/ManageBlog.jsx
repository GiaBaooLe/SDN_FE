import React, { useState } from "react";
import { useFetchBlogsQuery, useCreateBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation } from "../../redux/api/blogApiSlice";
import { Button, Form, Input, Modal, Card, message, Typography, Skeleton, Alert } from "antd";

const { TextArea } = Input;
const { Title, Paragraph } = Typography;

const ManageBlog = () => {
  const { data: blogs = [], isLoading, isError } = useFetchBlogsQuery();
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  const [form] = Form.useForm();
  const [editBlogId, setEditBlogId] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("create"); // "create" or "edit"

  const showModal = (type, blog) => {
    setModalType(type);
    if (type === "edit" && blog) {
      setEditBlogId(blog._id);
      form.setFieldsValue({
        title: blog.title,
        image: blog.image,
        description: blog.description,
      });
    } else {
      setEditBlogId(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCreateOrUpdateBlog = async (values) => {
    try {
      if (modalType === "create") {
        await createBlog(values).unwrap();
        message.success("Blog post created successfully");
      } else if (modalType === "edit" && editBlogId) {
        await updateBlog({ blogId: editBlogId, updatedBlog: values }).unwrap();
        message.success("Blog post updated successfully");
      }
      handleCancel();
    } catch (error) {
      message.error("Failed to save blog post");
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await deleteBlog(id).unwrap();
      message.success("Blog post deleted successfully");
    } catch (error) {
      message.error("Failed to delete blog post");
    }
  };

  if (isLoading) return <Skeleton active />;
  if (isError) return <Alert message="Error fetching blogs" type="error" />;

  return (
    <div className="mx-20 px-4 py-6 ">
      <Title level={1} className="text-2xl font-bold mb-4 text-center">Manage Blog Posts</Title>
      <Button
        type="primary"
        onClick={() => showModal("create")}
        className="mb-4 bg-pink-400"
      >
        Create New Blog Post
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <Card
            key={blog._id}
            cover={<img src={blog.image} alt={blog.title} className="object-cover h-40 w-full" />}
            actions={[
              <Button
              className="bg-pink-400 text-white font-semibold"
                type="link"
                onClick={() => showModal("edit", blog)}
              >
                Edit
              </Button>,
              <Button
              className="text-pink-400 font-semibold"
                type="link"
                onClick={() => handleDeleteBlog(blog._id)}
                loading={isDeleting}
              >
                Delete
              </Button>,
            ]}
            className="shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Title level={4} className="text-lg">{blog.title}</Title>
            <Paragraph>{blog.description.substring(0, 100)}...</Paragraph>
            <Paragraph className="text-gray-500 text-sm">
              Created at: {new Date(blog.createdAt).toLocaleDateString()} {new Date(blog.createdAt).toLocaleTimeString()}
            </Paragraph>
          </Card>
        ))}
      </div>

      {/* Modal for Create/Edit Blog Post */}
      <Modal
        title={modalType === "create" ? "Create New Blog Post" : "Edit Blog Post"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleCreateOrUpdateBlog}
          initialValues={{ title: '', image: '', description: '' }}
        >
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please enter the title!' }]}>
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item name="image" label="Image URL" rules={[{ required: true, message: 'Please enter the image URL!' }]}>
            <Input placeholder="Image URL" />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter the description!' }]}>
            <TextArea rows={4} placeholder="Description" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isCreating || isUpdating}
              className="bg-pink-400"
            >
              {modalType === "create" ? "Create Blog" : "Update Blog"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageBlog;

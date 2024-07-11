import { Modal, Form, Input, Button, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useUpdateProductMutation, useUploadProductImageMutation, useGetProductByIdQuery } from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const { TextArea } = Input;

const UpdateProductModal = ({ visible, onClose, product }) => {
  const [image, setImage] = useState(product?.image || "");
  const [imageUrl, setImageUrl] = useState(null);
  const [category, setCategory] = useState([]);
  const [updateProduct] = useUpdateProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();
  // const { data: categories } = useFetchCategoriesQuery();
  const { data: productData, refetch } = useGetProductByIdQuery(product?._id);
  const { data: categories, isLoading, isError } = useFetchCategoriesQuery();

  useEffect(() => {
    if (!isLoading && !isError && categories) {
      setCategory(categories);
    }
  }, [isLoading, isError, categories]);

  useEffect(() => {
    if (productData && productData._id) {
      setImage(productData.image);
    }
  }, [productData]);

 

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("category", values.category);
      formData.append("quantity", values.quantity);
      formData.append("brand", values.brand);
      formData.append("countInStock", values.countInStock);

      const data = await updateProduct({ productId: product._id, formData });

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`Product updated successfully`);
        onClose();
      }
    } catch (err) {
      console.error(err);
      toast.error("Product update failed. Try again.");
    }
  };

  const uploadFileHandler = async ({ file }) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <Modal
      title="Update Product"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleSubmit} initialValues={{ ...product }}>
        <Form.Item label="Upload Image">
          <Upload customRequest={uploadFileHandler} listType="picture" showUploadList={false}>
            <Button icon={<UploadOutlined />}>
              {image ? image.name : "Upload Image"}
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please input the name!" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please input the price!" }]}>
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: "Please input the quantity!" }]}>
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Brand" name="brand" rules={[{ required: true, message: "Please input the brand!" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please input the description!" }]}>
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Count In Stock" name="countInStock" rules={[{ required: true, message: "Please input the stock!" }]}>
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Category" name="category" rules={[{ required: true, message: "Please select a category!" }]}>
          <Select placeholder="Select a category">
            {category?.map((c) => (
              <Select.Option key={c._id} value={c._id}>
                {c.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded-md block w-full">
            Update
          </button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateProductModal;


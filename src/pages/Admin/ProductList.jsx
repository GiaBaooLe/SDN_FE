import { Modal, Form, Input, Button, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useCreateProductMutation, useUploadProductImageMutation } from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const { TextArea } = Input;

const CreateProductModal = ({ visible, onClose }) => {
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [createProduct] = useCreateProductMutation();
  const [uploadProductImage] = useUploadProductImageMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (values) => {
    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", values.name);
      productData.append("description", values.description);
      productData.append("price", values.price);
      productData.append("category", values.category);
      productData.append("quantity", values.quantity);
      productData.append("brand", values.brand);
      productData.append("countInStock", values.stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product creation failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error("Product creation failed. Try Again.");
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
      title="Create Product"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleSubmit} initialValues={{ stock: 0 }}>
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

        <Form.Item label="Count In Stock" name="stock" rules={[{ required: true, message: "Please input the stock!" }]}>
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Category" name="category" rules={[{ required: true, message: "Please select a category!" }]}>
          <Select placeholder="Select a category">
            {categories?.map((c) => (
              <Select.Option key={c._id} value={c._id}>
                {c.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProductModal;

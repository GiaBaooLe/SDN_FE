import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import { Button, Input, Form, Upload, Select, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import AdminMenu from "./AdminMenu";

const { TextArea } = Input;

const ProductList = () => {
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
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
        navigate("/");
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
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <h1 className="text-4xl font-bold">Create Product</h1>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <Form
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{ stock: 0 }}
          >
            <Form.Item label="Upload Image">
              <Upload
                customRequest={uploadFileHandler}
                listType="picture"
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>
                  {image ? image.name : "Upload Image"}
                </Button>
              </Upload>
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: true, message: "Please input the name!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Price"
                  name="price"
                  rules={[{ required: true, message: "Please input the price!" }]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Quantity"
                  name="quantity"
                  rules={[{ required: true, message: "Please input the quantity!" }]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Brand"
                  name="brand"
                  rules={[{ required: true, message: "Please input the brand!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please input the description!" }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Count In Stock"
                  name="stock"
                  rules={[{ required: true, message: "Please input the stock!" }]}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[{ required: true, message: "Please select a category!" }]}
                >
                  <Select placeholder="Select a category">
                    {categories?.map((c) => (
                      <Select.Option key={c._id} value={c._id}>
                        {c.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button className="bg-pink-600 hover:bg-pink-700 text-white" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

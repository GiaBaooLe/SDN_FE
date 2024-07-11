import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import { useState } from "react";
import AdminMenu from "./AdminMenu";
import CreateProductModal from "./ProductList";
import UpdateProductModal from "./ProductUpdate";
import { Modal } from "antd";
import { useDeleteProductMutation } from "../../redux/api/productApiSlice";

const AllProducts = () => {
  const { data: products, isLoading, isError, refetch } = useAllProductsQuery();
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const navigate = useNavigate();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      onOk: async () => {
        await deleteProduct(id);
        refetch();
      },
    });
  };

  const showCreateModal = () => {
    setCreateModalVisible(true);
  };

  const showUpdateModal = (product) => {
    setCurrentProduct(product);
    setUpdateModalVisible(true);
  };

  const handleModalClose = () => {
    setCreateModalVisible(false);
    setUpdateModalVisible(false);
    setCurrentProduct(null);
    refetch();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <div className="container mx-[9rem]">
        <div className="flex flex-col md:flex-row">
          <div className="p-3">
            <div className="ml-[2rem] text-xl font-bold h-12">
              All Products ({products.length})
            </div>
            <button onClick={showCreateModal} className="btn btn-primary">Create Product</button>
            <div className="flex flex-wrap justify-around items-center">
              {products.map((product) => (
                <div key={product._id} className="block mb-4 overflow-hidden">
                  <div className="flex">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-[10rem] object-cover"
                    />
                    <div className="p-4 flex flex-col justify-around">
                      <div className="flex justify-between">
                        <h5 className="text-xl font-semibold mb-2">
                          {product?.name}
                        </h5>

                        <p className="text-gray-400 text-xs">
                          {moment(product.createdAt).format("MMMM Do YYYY")}
                        </p>
                      </div>

                      <p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                        {product?.description?.substring(0, 160)}...
                      </p>

                      <div className="flex justify-between">
                        <button onClick={() => showUpdateModal(product)} className="btn btn-secondary bg-pink-600">Update</button>
                        <button onClick={() => handleDelete(product._id)} className="btn btn-danger">Delete</button>
                        <p>$ {product?.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/4 p-3 mt-2">
            <AdminMenu />
          </div>
        </div>
      </div>

      {isCreateModalVisible && <CreateProductModal visible={isCreateModalVisible} onClose={handleModalClose} />}
      {isUpdateModalVisible && <UpdateProductModal visible={isUpdateModalVisible} onClose={handleModalClose} product={currentProduct} />}
    </>
  );
};

export default AllProducts;

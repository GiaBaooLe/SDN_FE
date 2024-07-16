import { useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Table } from "antd";
import { useGetUsersQuery,  } from "../../redux/api/usersApiSlice";

import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";
import Message from "../../components/Message";



const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  // const [deleteUser] = useDeleteUserMutation();
  // const [updateUser] = useUpdateUserMutation();

  // const [editableUserId, setEditableUserId] = useState(null);
  // const [editableUserName, setEditableUserName] = useState("");
  // const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  // const deleteHandler = async (id) => {
  //   if (window.confirm("Are you sure?")) {
  //     try {
  //       await deleteUser(id);
  //       refetch();
  //     } catch (err) {
  //       toast.error(err?.data?.message || err.error);
  //     }
  //   }
  // };

  // const toggleEdit = (id, username, email) => {
  //   setEditableUserId(id);
  //   setEditableUserName(username);
  //   setEditableUserEmail(email);
  // };

  // const updateHandler = async (id) => {
  //   try {
  //     await updateUser({ userId: id, username: editableUserName, email: editableUserEmail });
  //     setEditableUserId(null);
  //     refetch();
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'NAME',
      dataIndex: 'username',
      key: 'username',
      // render: (text, record) => (
      //   editableUserId === record._id ? (
      //     <Input
      //       value={editableUserName}
      //       onChange={(e) => setEditableUserName(e.target.value)}
      //       onPressEnter={() => updateHandler(record._id)}
      //     />
      //   ) : (
      //     <Space>
      //       <Text>{text}</Text>
      //       <Button
      //         icon={<FaEdit />}
      //         onClick={() => toggleEdit(record._id, record.username, record.email)}
      //       />
      //     </Space>
      //   )
      // ),
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
      // render: (text, record) => (
      //   editableUserId === record._id ? (
      //     <Input
      //       value={editableUserEmail}
      //       onChange={(e) => setEditableUserEmail(e.target.value)}
      //       onPressEnter={() => updateHandler(record._id)}
      //     />
      //   ) : (
      //     <Space>
      //       <Text>{text}</Text>
      //       <Button
      //         icon={<FaEdit />}
      //         onClick={() => toggleEdit(record._id, record.username, record.email)}
      //       />
      //     </Space>
      //   )
      // ),
    },
    {
      title: 'ADMIN',
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      render: (text, record) => (
        record.isAdmin ? <FaCheck style={{ color: "green" }} /> : <FaTimes style={{ color: "red" }} />
      ),
    },
    // {
    //   title: '',
    //   key: 'action',
    //   render: (text, record) => (
    //     !record.isAdmin && (
    //       <Button
    //         danger
    //         icon={<FaTrash />}
    //         onClick={() => deleteHandler(record._id)}
    //       />
    //     )
    //   ),
    // },
  ];

  return (
    <div className="p-16">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          <AdminMenu />
          <Table
            className="w-full md:w-4/5 mx-auto"
            dataSource={users}
            columns={columns}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
          />
        </div>
      )}
    </div>
  );
};

export default UserList;

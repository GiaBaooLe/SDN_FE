import { useState, useEffect } from "react";
import { Card, Col, Row, Statistic } from "antd";
import { DollarCircleOutlined, UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: "Sales Trend",
        align: "left",
      },
      grid: {
        borderColor: "#ccc",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <>
      <AdminMenu />
      <section className="xl:ml-[4rem] md:ml-[0rem] p-5">
        <Row gutter={16} className="mb-5">
          <Col span={8}>
            <Card className="bg-white text-black">
              <Statistic
                title="Sales"
                value={isLoading ? <Loader /> : sales?.totalSales?.toFixed(2)}
                prefix={<DollarCircleOutlined style={{ color: "yellow" }} />}
                valueStyle={{ color: "black" }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="bg-white text-black">
              <Statistic
                title="Customers"
                value={loading ? <Loader /> : customers?.length}
                prefix={<UserOutlined style={{ color: "yellow" }} />}
                valueStyle={{ color: "black" }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="bg-white text-black">
              <Statistic
                title="All Orders"
                value={loadingTwo ? <Loader /> : orders?.totalOrders}
                prefix={<ShoppingCartOutlined style={{ color: "yellow" }} />}
                valueStyle={{ color: "black" }}
              />
            </Card>
          </Col>
        </Row>

        <div className="bg-pink-200 p-12 rounded-lg">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="100%"
          />
        </div>

        <div className="mt-5">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;

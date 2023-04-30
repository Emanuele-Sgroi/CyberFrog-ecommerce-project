import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "./Chart.module.scss";
import { selectOrderHistory } from "../../redux/slice/orderSlice";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

const Chart = () => {
  const orders = useSelector(selectOrderHistory);

  // Create a new array of order status
  const array = [];
  orders.map((item) => {
    const { orderStatus } = item;
    return array.push(orderStatus);
  });

  const getOrderCount = (arr, value) => {
    return arr.filter((n) => n === value).length;
  };

  const [q1, q2, q3, q4] = [
    "Order Placed",
    "Processing",
    "Shipped",
    "Delivered",
  ];

  const placed = getOrderCount(array, q1);
  const processing = getOrderCount(array, q2);
  const shipped = getOrderCount(array, q3);
  const delivered = getOrderCount(array, q4);

  // const data = {
  //   labels: ["Placed Orders", "Processing", "Shipped", "Delivered"],
  //   datasets: [
  //     {
  //       label: ["placed", "Processing", "Shipped", "Delivered"],
  //       data: [placed, processing, shipped, delivered],
  //       backgroundColor: ["rgba(197, 181, 43, 0.95)", "rgba(71, 18, 18, 0.95)" ,"rgba(15, 48, 26, 0.95)" ,"rgba(32, 91, 81, 0.95)"],
  //     },

  //   ],
  // };

  const data = {
    labels: ["Placed Orders", "Processing", "Shipped", "Delivered"],
    datasets: [
      {
        label: "status:",
        data: [placed, processing, shipped, delivered],
        backgroundColor: [
          "rgba(255, 140, 0, 0.6)",
          "rgba(255, 47, 0, 0.6)",
          "rgba(94, 151, 251, 0.6)",
          "rgba(0, 255, 76, 0.6)",
        ],
        borderColor: [
          "rgba(255, 140, 0, 1)",
          "rgba(255, 47, 0, 1)",
          "rgba(94, 151, 251, 1)",
          "rgba(0, 255, 76, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.charts}>
      <div cardClass={styles.container}>
        <Doughnut options={options} data={data} />
      </div>
    </div>
  );
};

export default Chart;

import React, { useEffect, useState } from "react";
import { TbDeviceAnalytics, TbMoneybag } from "react-icons/tb";
import { PiMoney, PiPackage, PiTruck } from "react-icons/pi";
import StockAlertChart from "../Chart/StockAlertChart";
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react"; // Import the spinner component from Flowbite

const Display_Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`/api/transaction/gettransactions`);
        const data = await res.json();
        if (res.ok) {
          setTransactions(data.transactions);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    if (currentUser) {
      fetchTransactions();
    }
  }, [currentUser._id]);

  const getColor = (transactionType) => {
    switch (transactionType) {
      case "Sale":
        return "text-green-400";
      case "Restock":
        return "text-blue-400";
      case "Fuel":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getIcon = (transactionType) => {
    switch (transactionType) {
      case "Sale":
      case "Restock":
        return <PiPackage className="text-lg" />;
      case "Fuel":
        return <PiTruck className="text-lg" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner color="gray" size="xl" />
      </div>
    );
  }

  return (
    <div className="h-full grid grid-cols-9 grid-rows-6 gap-2 p-2">
      <div className="col-span-3 row-span-2 bg-[#22283177] rounded-lg p-5 border-[1.5px] border-[#222831] flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm text-[#eeeeee77] mt-1">
            Total Revenue
          </h3>
          <TbDeviceAnalytics className="text-xl text-green-400" />
        </div>
        <p className="font-medium text-2xl mt-1">Rs 190980</p>
        <p className="mt-auto text-xs text-[#eeeeee77] font-normal">
          <span className="text-green-400">+15% </span>from last month
        </p>
      </div>

      <div className="col-span-3 row-span-2 bg-[#22283177] rounded-lg p-5 border-[1.5px] border-[#222831] flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm text-[#eeeeee77] mt-1">
            Total Expenses
          </h3>
          <PiMoney className="text-xl text-yellow-400" />
        </div>
        <p className="font-medium text-2xl mt-1">Rs 190980</p>
        <p className="mt-auto text-xs text-[#eeeeee77] font-normal">
          <span className="text-green-400">+15% </span>from last month
        </p>
      </div>

      <div className="col-span-3 row-span-2 bg-[#22283177] rounded-lg p-5 border-[1.5px] border-[#222831] flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm text-[#eeeeee77] mt-1">
            Total Profit
          </h3>
          <TbMoneybag className="text-xl text-blue-400" />
        </div>
        <p className="font-medium text-2xl mt-1">Rs 190980</p>
        <p className="mt-auto text-xs text-[#eeeeee77] font-normal">
          <span className="text-green-400">+15% </span>from last month
        </p>
      </div>

      <div className="col-span-6 row-span-4 bg-[#22283177] rounded-lg p-5 border-[1.5px] border-[#222831]">
        <div className="mb-4">
          <h2 className="text-md font-normal">Transaction history</h2>
        </div>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left text-[#eeeeee77] text-sm font-medium">
                Transaction
              </th>
              <th className="text-left text-[#eeeeee77] text-sm font-medium">
                Type
              </th>
              <th className="text-left text-[#eeeeee77] text-sm font-medium">
                Amount
              </th>
              <th className="text-left text-[#eeeeee77] text-sm font-medium">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className={getColor(transaction.transactionType)}>
                <td className="py-2 flex items-center gap-2">
                  {getIcon(transaction.transactionType)}
                  <span className="text-sm">{transaction.entityName}</span>
                </td>
                <td className="py-2 text-sm">{transaction.transactionType}</td>
                <td className="py-2 text-sm">Rs {transaction.amount}</td>
                <td className="py-2 text-sm">
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="col-span-3 row-span-4 bg-[#22283177] rounded-lg p-5 border-[1.5px] border-[#222831]">
        <div>
          <h2 className="text-md font-normal">Stock Alert</h2>
        </div>
        <StockAlertChart />
      </div>
    </div>
  );
};

export default Display_Dashboard;

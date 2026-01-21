import { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import ReactApexChart from "react-apexcharts";

function App() {
  const [users, setUsers] = useState({
    amountName: '',
    amountPrice: '',
    price: ''
  })

  const [modelopen, setModelopen] = useState(false)

  const [submittedData, setSubmittedData] = useState({
    APrice: 0,
    EPrice: 0,
  })

  const handleChange = (e) => {
    setUsers({
      ...users,
      [e.target.name]: e.target.value
    })
  }

  const handleAddTransaction = () => {
    setModelopen(true)
  }

  const handleAddNewAmount = (e) => {
    e.preventDefault()

    setSubmittedData((prev) => {
      if (users.price === 'amount') {
        return { ...prev, APrice: Number(users.amountPrice) }
      }
      if (users.price === 'expense') {
        return { ...prev, EPrice: Number(users.amountPrice) }
      }
      return prev
    })

    setUsers({ amountName: '', amountPrice: '', price: '' })
    setModelopen(false)
  }

  const chartData = {
    series: [submittedData.APrice || 100, submittedData.EPrice || 0],
    options: {
      chart: { type: "pie" },
      labels: ["Amount", "Expense"],
      colors: ["#00E396", "#FF4560"],
      legend: { show: false },
    },
  }

  return (
    <>
      {/* NAVBAR */}
      <div className="w-full flex justify-between items-center px-5 py-4">
        <h2 className="text-2xl">Expense Tracker</h2>
        <button
          onClick={handleAddTransaction}
          className="bg-blue-700 text-white rounded px-4 py-2"
        >
          Add Transaction
        </button>
      </div>

      {/* MODAL */}
      {modelopen && (
        <div className="fixed inset-0 z-9999 bg-black/40 flex justify-center items-start pt-10">

          <div className="md:w-[40%] w-[90%] bg-white border border-cyan-700 shadow-2xl rounded relative">

            <form className="px-5 py-5" onSubmit={handleAddNewAmount}>
              <RxCross2
                size={25}
                onClick={() => setModelopen(false)}
                className="absolute right-3 top-3 cursor-pointer"
              />

              <div className="flex flex-col gap-1">
                <label>Amount Name</label>
                <input
                  className="px-3 py-2 bg-gray-100 rounded outline-none"
                  type="text"
                  name="amountName"
                  value={users.amountName}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-1 mt-3">
                <label>Amount</label>
                <input
                  className="px-3 py-2 bg-gray-100 rounded outline-none"
                  type="number"
                  name="amountPrice"
                  value={users.amountPrice}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-4 flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="price"
                    value="amount"
                    checked={users.price === "amount"}
                    onChange={handleChange}
                  />
                  Amount
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="price"
                    value="expense"
                    checked={users.price === "expense"}
                    onChange={handleChange}
                  />
                  Expense
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => setModelopen(false)}
                  className="bg-red-600 text-white px-4 py-1.5 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-cyan-700 text-white px-4 py-1.5 rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RESULT AREA */}
      <div className="px-5 md:px-16 md:w-[70%] md:mt-60 mt-30 mx-auto flex md:flex-row md:justify-between flex-col gap-10 items-center">

        <div>
          <h2><b>Amount:</b> {submittedData.APrice || 100}</h2>
          <h2><b>Expense:</b> {submittedData.EPrice || 0}</h2>
        </div>

        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          width={300}
        />
      </div>
    </>
  )
}

export default App

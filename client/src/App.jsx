import axios from "axios";
import React from "react";

const App = () => {
  let data = {
    name: "Kaushal",
    amount: 100,
    number: "1234567890",
    MID: "MID" + Date.now(),
    transactionId: "transactionId" + Date.now(),
  };

  const handleClick = async (e) => {
    e.preventDefault();

    let res = await axios
      .post("http://localhost:8000/payment", { ...data })
      .then((res) => {
        console.log(res);
        if (res.data && res.data.data.instrumentResponse.redirectInfo.url) {
          window.location.href =
            res.data.data.instrumentResponse.redirectInfo.url;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <section class="text-gray-600 body-font overflow-hidden">
      <button
        className="flex items-center mt-auto text-white bg-blue-700 border-0 py-2 px-4  focus:outline-none hover:bg-gray-500 rounded"
        onClick={handleClick}>
        Pay now
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-4 h-4 ml-auto"
          viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </button>
      <p class="text-xs text-gray-500 mt-3">
        Literally you probably haven't heard of them jean shorts.
      </p>
    </section>
  );
};

export default App;

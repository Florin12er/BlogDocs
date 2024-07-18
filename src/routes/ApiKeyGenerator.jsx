import { useState } from "react";
import axios from "axios";

const ApiKeyGenerator = () => {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const generateApiKey = async () => {
    setError(""); // Clear previous errors
    try {
      const response = await axios.post(
        "https://blogapi-production-fb2f.up.railway.app/user/generate-api-key",
        {}, // empty body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApiKey(response.data.apiKey);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setError("Too many requests. Please try again later.");
      } else {
        setError("API key generation failed. Please try again.");
      }
      console.error("API key generation failed", error);
    }
  };

  return (
    <div>
      <div className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Generate API Key</h2>
        <button
          onClick={generateApiKey}
          className="w-full p-2 bg-green-500 text-white rounded"
        >
          Generate API Key
        </button>
        {apiKey && (
          <div className="mt-4">
            <label className="block mb-2">Your API Key:</label>
            <input
              type="text"
              value={apiKey}
              readOnly
              className="p-2 border border-gray-300 rounded"
            />
          </div>
        )}
        {error && (
          <div className="mt-4 text-red-500">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiKeyGenerator;


import React, { useState, useEffect } from "react";
import axios from "axios";

const BatchManagement = () => {
  const [batches, setBatches] = useState([]);
  const [batchName, setBatchName] = useState("");
  const [batchId, setBatchId] = useState("");
  const [batchFee, setBatchFee] = useState("");

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const response = await axios.get("http://localhost:5000/batches");
      setBatches(response.data);
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  const addBatch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/batches", {
        batchName,
        batchId,
        batchFee,
      });
      setBatches([...batches, response.data]);
      setBatchName("");
      setBatchId("");
      setBatchFee("");
    } catch (error) {
      console.error("Error adding batch:", error);
    }
  };

  const deleteBatch = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/batches/${id}`);
      setBatches(batches.filter((batch) => batch._id !== id));
    } catch (error) {
      console.error("Error deleting batch:", error);
    }
  };

  return (
    <div>
      <h2>Batch Management</h2>
      <ul>
        {batches.map((batch) => (
          <li key={batch._id}>
            {batch.batchName} - {batch.batchId} - Fee: {batch.batchFee}
            <button onClick={() => deleteBatch(batch._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Add New Batch</h3>
      <form onSubmit={addBatch}>
        <input
          type="text"
          placeholder="Batch Name"
          value={batchName}
          onChange={(e) => setBatchName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Batch ID"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Batch Fee"
          value={batchFee}
          onChange={(e) => setBatchFee(e.target.value)}
          required
        />
        <button type="submit">Create Batch</button>
      </form>
    </div>
  );
};

export default BatchManagement;

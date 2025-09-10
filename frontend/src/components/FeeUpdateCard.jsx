import React, { useEffect, useState } from "react";
import axios from "axios";

const FeeUpdateCard = ({ student, batchFee, onClose }) => {
  const [fees, setFees] = useState([]);
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    // Fetch fee history when component mounts or student changes
    axios.get(`https://trackmyclass-d6yn.onrender.com/api/batches/student/${student._id}/fees`)
      .then(res => setFees(Array.isArray(res.data) ? res.data : []))
      .catch(() => setFees([]));
  }, [student]);

  const totalPaid = fees.reduce((sum, fee) => sum + (fee.amount || 0), 0);
  const leftToPay = batchFee - totalPaid;

  const handleAddFee = async (e) => {
    e.preventDefault();
    if (!amount) return;
    try {
      await axios.post(`https://trackmyclass-d6yn.onrender.com/api/batches/student/${student._id}/fees`, { amount: Number(amount), remarks });
      setMsg("Fee updated!");
      setAmount("");
      setRemarks("");
      // Refresh fee history
      const res = await axios.get(`https://trackmyclass-d6yn.onrender.com/api/batches/student/${student._id}/fees`);
      setFees(Array.isArray(res.data) ? res.data : []);
    } catch {
      setMsg("Error updating fee.");
    }
  };

  return (
    <div className="fee-card">
      <h4>{student.name}</h4>
      <p>Total Fee: ₹{batchFee}</p>
      <p>
        Paid: <span style={{ color: totalPaid >= batchFee ? "green" : "#333" }}>₹{totalPaid}</span>
      </p>
      <p>
        Left to Pay: <span style={{ color: leftToPay <= 0 ? "green" : "red" }}>₹{leftToPay > 0 ? leftToPay : 0}</span>
      </p>
      <form onSubmit={handleAddFee}>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" />
        <input type="text" value={remarks} onChange={e => setRemarks(e.target.value)} placeholder="Remarks (optional)" />
        <button type="submit">Update Fee</button>
      </form>
      {msg && <p>{msg}</p>}
      <h5>Fee History</h5>
      <ul>
        {fees.length === 0 ? (
          <li>No fee payments yet.</li>
        ) : (
          fees.map((fee, idx) => (
            <li key={idx}>
              ₹{fee.amount} on {new Date(fee.date).toLocaleString()} {fee.remarks && `(${fee.remarks})`}
            </li>
          ))
        )}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default FeeUpdateCard;
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api";

export default function Fizetes() {
  const location = useLocation();
  const navigate = useNavigate();

  const { konyveles_ids, amount } = location.state || {};

  const [method, setMethod] = useState("credit_card");
  const [paid, setPaid] = useState(false);

  const handlePayment = async () => {
    try {
      const res = await api.post("/fizetes", {
        konyveles_ids,
        amount,
        method
      });

      console.log(res.data);

      setPaid(true);
      alert("Fizetés sikeres!");
      navigate("/profil");

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || "Hiba fizetésnél");
    }
  };

  const handleCancel = async () => {
    if (konyveles_ids?.length > 0) {
      await api.delete("/foglalas/cancel", {
        data: { konyveles_ids }
      });
    }

    navigate("/");
  };
  useEffect(() => {
    const handleLeave = () => {
      if (!paid && konyveles_ids?.length > 0) {
        navigator.sendBeacon(
          "http://localhost:3001/foglalas/cancel",
          JSON.stringify({ konyveles_ids })
        );
      }
    };

    window.addEventListener("beforeunload", handleLeave);

    return () => {
      window.removeEventListener("beforeunload", handleLeave);
    };
  }, [paid, konyveles_ids]);

  return (
    <div className="container py-5">
  
      <div className="row justify-content-center">
        <div className="col-md-6">
  
          <div className="card shadow-lg p-4">
  
            <h3 className="mb-4 text-center"> Fizetés</h3>
  
            <div className="mb-3 text-center">
              <span className="text-muted">Fizetendő összeg</span>
              <h2 className="fw-bold">{amount} Ft</h2>
            </div>
  
            <div className="mb-4">
              <label className="form-label">Fizetési mód</label>
              <select
                className="form-select"
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="credit_card"> Bankkártya</option>
                <option value="debit_card">Debit kártya</option>
                <option value="cash">Készpénz</option>
                <option value="online_bank">Online bank</option>
              </select>
            </div>
            {method.includes("card") && (
              <div className="card p-3 mb-4" style={{
                background: "linear-gradient(135deg, #1e293b, #334155)",
                color: "white",
                borderRadius: "15px"
              }}>
                <p className="mb-2">Kártyaszám</p>
                <input className="form-control mb-2" placeholder="1234 5678 9012 3456" />
  
                <div className="d-flex gap-2">
                  <input className="form-control" placeholder="MM/YY" />
                  <input className="form-control" placeholder="CVC" />
                </div>
              </div>
            )}
  
            <div className="d-flex gap-2">
              <button
                className="btn btn-success w-100"
                onClick={handlePayment}
              >
                Fizetés
              </button>
  
              <button
                className="btn btn-outline-secondary w-100"
                onClick={handleCancel}
              >
                Mégse
              </button>
            </div>
  
          </div>
  
        </div>
      </div>
  
    </div>
  );
}
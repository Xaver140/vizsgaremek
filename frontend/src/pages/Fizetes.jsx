import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api";

export default function Fizetes(){
    const location = useLocation();
    const navigate = useNavigate();

    const { konyveles_ids, amount } = location.state || {};

    const [method, setMethod] = useState("credit_card");
    const [paid, setPaid] = useState(false);

    const handlePayment = async () => {
    try {
        await api.post("/fizetes", {
        konyveles_ids,
        amount,
        method
        });

        setPaid(true);

        alert("Fizetés sikeres!");
        navigate("/profil");

        } catch (err) {
            console.log(err);
            alert(err.response?.data?.error || "Hiba fizetésnél");
        }
    };
    useEffect(() => {
  return () => {
    if (!paid && konyveles_ids?.length > 0) {
      api.delete("/foglalas/cancel", {
        data: { konyveles_ids }
        });
        }
    };
    }, [paid]);
    return (
        <div>
            <div className="container">
                <h2>Fizetés</h2>

                <p><strong>Összeg:</strong>{amount} Ft</p>

                <select onChange={e => setMethod(e.target.value)}>
                    <option value="credit_card">Bankkártya</option>
                    <option value="debit_card">Debit kártya</option>
                    <option value="cash">Készpénz</option>
                    <option value="online_bank">Online bank</option>
                </select>

                <button onClick={handlePayment}>Fizetés</button>
            </div>
        </div>
    );
}
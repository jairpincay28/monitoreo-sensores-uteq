import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { Navigate } from "react-router-dom";
import { db } from "../services/firebase";

export default function RandomSensorRedirect() {
  const [sensorId, setSensorId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    get(ref(db, "ubicacionesSensores"))
      .then((snapshot) => {
        if (!activo) return;

        const sensores = Object.keys(snapshot.val() ?? {});
        if (sensores.length === 0) {
          setError("No hay sensores disponibles.");
          return;
        }

        const indiceAleatorio = Math.floor(Math.random() * sensores.length);
        setSensorId(sensores[indiceAleatorio]);
      })
      .catch((firebaseError) => {
        if (activo) setError(firebaseError.message);
      });

    return () => {
      activo = false;
    };
  }, []);

  if (error) {
    return (
      <main className="container centered">
        <p className="error">Error: {error}</p>
      </main>
    );
  }

  if (!sensorId) {
    return (
      <main className="container centered">
        <p>Seleccionando un sensor aleatorio…</p>
      </main>
    );
  }

  return <Navigate to={`/sensor/${sensorId}`} replace />;
}

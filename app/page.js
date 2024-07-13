"use client";
import { useEffect, useState } from "react";

const Home = () => {
  const [notificationSent, setNotificationSent] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      try {
        const registration =
          navigator.serviceWorker.register("/service-worker.js");
        console.log("Service Worker registrado com sucesso:", registration);
      } catch (error) {
        console.error("Erro ao registrar o Service Worker:", error);
      }
    }
  }, []);

  

  function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
}

const registerSubscription = async () => {
    try {
        const responsePublicKey = await fetch(process.env.NEXT_PUBLIC_API_URL + '/key');
        const dataKey = await responsePublicKey.json();
        
        const registration = await navigator.serviceWorker.ready;
        const pushSubscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(dataKey.publicKey),
        });
        console.log('Push Subscription criada:', pushSubscription);
        return pushSubscription;
    } catch (error) {
        console.error('Erro ao registrar a subscription:', error);
        throw error; // Para ser tratado na função chamadora
    }
};

  const sendNotification = async () => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const permission = await Notification.requestPermission();
      if (permission == "granted") {
        const subscription = await registerSubscription();
        try {
          const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL + "/sendNotification",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ subscription }),
            }
          );

          if (response.ok) {
            setTimeout(() => {
              setNotificationSent(true);
            }, 9000);
            console.log("resposta sim do servidor");
          } else {
            console.error("Erro ao enviar notificação:", response);
          }
        } catch (error) {
          console.error("Erro ao enviar notificação:", error);
        }
      } else {
        alert("Você negou as notificações");
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <button
        onClick={sendNotification}
        className="p-4 bg-blue-500 text-white rounded mb-4"
      >
        Clique para aceitar as notificações e espere 10 segundos
      </button>
      {notificationSent && <p>Sucesso</p>}
    </div>
  );
};

export default Home;

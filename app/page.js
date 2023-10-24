'use client'
import { useState } from 'react';

const Home = () => {
  const [notificationSent, setNotificationSent] = useState(false);
  const [subscription, setSubscription] = useState(null);

  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(async (serviceWorker) => {
        let currentSubscription = await serviceWorker.pushManager.getSubscription();

        if (!currentSubscription) {
          const response = await fetch('https://your-backend.com/key');
          const data = await response.json();
          currentSubscription = await serviceWorker.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: data.publicKey
          });

          await fetch('https://your-backend.com/registerFCMToken', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subscription: currentSubscription }),
          });

          setSubscription(currentSubscription);
        }

        console.log('Service Worker registrado com sucesso:', serviceWorker);
      })
      .catch((error) => {
        console.error('Erro ao registrar Service Worker:', error);
      });
  }

  const sendNotification = async () => {
    try {
      const response = await fetch('https://your-backend.com/sendNotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscription }),
      });

      if (response.ok) {
        setNotificationSent(true);
      } else {
        console.error('Erro ao enviar notificação:', response);
      }
    } catch (error) {
      console.error('Erro ao enviar notificação:', error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center flex-col">
      {subscription && (
        <button onClick={sendNotification} className="p-4 bg-blue-500 text-white rounded mb-4">
          Enviar Notificação em 10s
        </button>
      )}
      {notificationSent && <p>Notificação enviada com sucesso!</p>}
    </div>
  );
};

export default Home;
'use client'
import { useState } from 'react';

const Home = () => {
  const [notificationSent, setNotificationSent] = useState(false);
  const [subscription, setSubscription] = useState(null);

  const registerServiceWorker = async () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(async (serviceWorker) => {
        let currentSubscription = await serviceWorker.pushManager.getSubscription();

        if (!currentSubscription) {
          const response = await fetch('https://insecureconsiderateadvance.a32fred.repl.co/key');
          const data = await response.json();
          currentSubscription = await serviceWorker.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: data.publicKey
          });

          await fetch('https://insecureconsiderateadvance.a32fred.repl.co/registerFCMToken', {
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

    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {

      const permission = await Notification.requestPermission()
      if (permission == 'granted') {

        registerServiceWorker();


        try {
          const response = await fetch('https://insecureconsiderateadvance.a32fred.repl.co/sendNotification', {
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

    } else {
      alert("vc negou as notificação")
    }

  }


  return (
    <div className="flex h-screen items-center justify-center flex-col">

      <button onClick={sendNotification} className="p-4 bg-blue-500 text-white rounded mb-4">
        click para e aceite as notificações e espere 10 segundos
      </button>

      {notificationSent && <p>Notificação enviada com sucesso!</p>}
    </div>
  );
};

export default Home;
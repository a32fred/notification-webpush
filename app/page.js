'use client'
import { useEffect, useState } from 'react';

const Home = () => {
  const [notificationSent, setNotificationSent] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      try {
        const registration = navigator.serviceWorker.register('/service-worker.js');
        console.log('Service Worker registrado com sucesso:', registration);
      } catch (error) {
        console.error('Erro ao registrar o Service Worker:', error);
      }
    }
  }, [])

  const registerSubscription = async () => {
    try {
      const responsePublicKey = await fetch('https://insecureconsiderateadvance.a32fred.repl.co/key');
      const dataKey = await responsePublicKey.json();

      const registration = await navigator.serviceWorker.ready;
      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: dataKey.publicKey,
      })
      return pushSubscription;
    } catch (err) {
      console.error(err)
    }

  }

  const sendNotification = async () => {

    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {

      const permission = await Notification.requestPermission()
      if (permission == 'granted') {
        const subscription = await registerSubscription();
        try {
          const response = await fetch('https://insecureconsiderateadvance.a32fred.repl.co/sendNotification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subscription }),
          });

          if (response.ok) {

            setTimeout(() => {
              setNotificationSent(true);
            }, 9000);

            console.log("resposta sim do servidor")
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

      {notificationSent && <p>sucess</p>}
    </div>
  );
};

export default Home;
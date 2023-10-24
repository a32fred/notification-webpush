import { useEffect } from 'react';
const Home = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(async (serviceWorker) => {

          let subscription  = await serviceWorker.pushManager.getSubscription()

          if (!subscription) {
            const response = await fetch('https://socketio.a32fred.repl.co/key');
            const data = await response.json();
            console.log(data.publicKey);
            subscription = await serviceWorker.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: data.publicKey
            })

            console.log(subscription)
          }


          console.log('Service Worker registrado com sucesso:', serviceWorker);
        })
        .catch((error) => {
          console.error('Erro ao registrar Service Worker:', error);
        });
    }
  }, []);

  // const handleSubscribe = () => {
  //   if ('PushManager' in window) {
  //     navigator.serviceWorker.ready.then((serviceWorker) => {
  //       serviceWorker.pushManager.subscribe({
  //         userVisibleOnly: true,
  //         applicationServerKey: urlBase64ToUint8Array('BCM9uLyX4xMfDk_GUFcSKQNP4qliB9__xRvIEaJUIdNEl99ntVpA4j3-FKDHxwN63z9Dh-ZWOdc3GD7tuzJRrDk') // Substitua pela sua Public Key
  //       })
  //       .then((subscription) => {
  //         console.log('Inscrição para notificações realizada com sucesso:', subscription);
  //       })
  //       .catch((error) => {
  //         console.error('Erro ao se inscrever para notificações:', error);
  //       });
  //     });
  //   } else {
  //     console.warn('O navegador não suporta notificações push.');
  //   }
  // };

  // const urlBase64ToUint8Array = (base64String) => {
  //   const padding = '='.repeat((4 - base64String.length % 4) % 4);
  //   const base64 = (base64String + padding)
  //     .replace(/\-/g, '+')
  //     .replace(/_/g, '/');

  //   const rawData = window.atob(base64);
  //   const outputArray = new Uint8Array(rawData.length);

  //   for (let i = 0; i < rawData.length; ++i) {
  //     outputArray[i] = rawData.charCodeAt(i);
  //   }

  //   return outputArray;
  // };

  const viewkey = async () => {
    try {
      const response = await fetch('https://socketio.a32fred.repl.co/key');
      const data = await response.json();
    } catch (error) {
      console.error('Erro ao obter a publicKey:', error);
    }
  }
  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <button onClick={viewkey} className="p-4 bg-blue-500 text-white rounded mb-4">
        Inscrever-se para Notificações
      </button>
      <div className="text-gray-600">
        Abra o console para ver os logs.
      </div>
    </div>
  );
};

export default Home;

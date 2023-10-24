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
            subscription = await serviceWorker.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: data.publicKey
            })

            console.log(subscription)
          }


          console.log('Service Worker registrado com sucesso:');
        })
        .catch((error) => {
          console.error('Erro ao registrar Service Worker:', error);
        });
    }
  }, []);


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

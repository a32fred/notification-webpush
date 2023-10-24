
const Home = () => {

  if (typeof window !== 'undefined') {

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(async (serviceWorker) => {

          let subscription = await serviceWorker.pushManager.getSubscription()

          if (!subscription) {
            const response = await fetch('https://socketio.a32fred.repl.co/key');
            const data = await response.json();
            subscription = await serviceWorker.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: data.publicKey
            })

            await fetch('https://socketio.a32fred.repl.co/registerFCMToken', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ subscription }),
            });

            await fetch('https://socketio.a32fred.repl.co/sendNotification', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ subscription }),
            });

          }


          console.log('Service Worker registrado com sucesso:');
        })
        .catch((error) => {
          console.error('Erro ao registrar Service Worker:', error);
        });
    }
  }



  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <div className="text-gray-600">
        Abra o console para ver os logs.
      </div>
    </div>
  );
};

export default Home;

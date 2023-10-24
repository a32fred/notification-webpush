self.addEventListener('push', function(event) {
    const options = {
      body: "testando"
    };
  
    event.waitUntil(
      self.registration.showNotification('OLHAAAAA', options)
    );
  });
  
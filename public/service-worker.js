self.addEventListener('push', function(event) {

    const body = event.data?.text() ?? 'nova notificação'

    event.waitUntil(
      self.registration.showNotification('CHAT PRIVADINHO', {
        body: body
      })
    );
  });
  
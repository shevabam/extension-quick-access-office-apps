document.addEventListener('DOMContentLoaded', () => {
  const isEdge = navigator.userAgent.includes('Edg/');
  const id = chrome.runtime.id;
  document.getElementById('review-link').href = isEdge
    ? `https://microsoftedge.microsoft.com/addons/detail/${id}`
    : `https://chromewebstore.google.com/detail/${id}/reviews`;

  fetch('../apps.json')
    .then(response => response.json())
    .then(apps => {
      const container = document.getElementById('app-container');

      chrome.storage.sync.get('userApps', (data) => {
        const userApps = data.userApps || {};

        apps.forEach(app => {
          if (userApps[app.name] !== false) {
            const item = document.createElement('div');
            item.className = 'app-item';

            const button = document.createElement('button');
            button.className = 'app-button';
            button.innerHTML = `<img src="../static/icons/apps/${app.icon}" alt="${app.name}"><span>${app.name}</span>`;
            button.addEventListener('click', () => {
              chrome.tabs.create({ url: app.url });
            });

            item.appendChild(button);
            container.appendChild(item);
          }
        });

      });
    });
    
});

document.querySelector('.quick-access-office-apps__popup-settings-btn').addEventListener('click', () => {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('pages/options.html'));
  }
});
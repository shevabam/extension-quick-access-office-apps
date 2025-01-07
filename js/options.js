document.addEventListener('DOMContentLoaded', () => {
  fetch('../apps.json')
    .then(response => response.json())
    .then(apps => {
      const container = document.getElementById('quick-access-office-apps__options-container');

      chrome.storage.sync.get('userApps', (data) => {
        const userApps = data.userApps || {};

        apps.forEach(app => {
          const option = document.createElement('div');
          option.className = 'option';

          const label = document.createElement('label');
          label.textContent = app.name;
          label.htmlFor = app.name;

          label.innerHTML = `<img src="../static/icons/apps/${app.icon}" alt="${app.name}"><span>${app.name}</span>`;

          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.id = app.name;
          checkbox.checked = userApps[app.name] !== false;

          checkbox.addEventListener('change', () => {
            userApps[app.name] = checkbox.checked;
            chrome.storage.sync.set({ userApps },
              () => {
                const status = document.querySelector('.quick-access-office-apps__options-status');
                status.innerHTML = '<span style="color: #0f865f; background: #99eed2;">Settings saved 👍</span>';
                setTimeout(() => {
                  status.innerHTML = '';
                }, 2500);
              });
          });

          option.appendChild(label);
          option.appendChild(checkbox);
          container.appendChild(option);
        });
      });
    });
});
// Confirmation dialog implementation
async function showConfirmDialog(cardData) {
  const dialog = document.createElement('div');
  dialog.className = 'confirm-dialog';
  dialog.innerHTML = `
    <h3>Release Pogemon</h3>
    <p>Are you sure you want to release ${cardData.name}?</p>
    <div class="confirm-dialog-buttons">
      <button class="cancel">Cancel</button>
      <button class="confirm">Release</button>
    </div>
  `;

  document.body.appendChild(dialog);

  const result = await new Promise((resolve) => {
    dialog.querySelector('.cancel').addEventListener('click', () => {
      dialog.remove();
      resolve(false);
    });

    dialog.querySelector('.confirm').addEventListener('click', async () => {
      dialog.remove();
      resolve(true);
    });
  });

  return result;
}
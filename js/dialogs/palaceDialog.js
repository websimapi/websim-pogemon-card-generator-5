// Palace dialog implementation
async function showPalaceDialog(cardData) {
  const dialog = document.createElement('div');
  dialog.className = 'confirm-dialog palace-dialog';
  dialog.innerHTML = `
    <h3>Send to PoGePalace</h3>
    <p>Would you like to add ${cardData.name} to the PoGePalace?</p>
    <div class="confirm-dialog-buttons">
      <button class="cancel">Cancel</button>
      <button class="confirm">
        Send to Palace
        <span class="loading-spinner hidden"></span>
      </button>
    </div>
  `;

  document.body.appendChild(dialog);

  try {
    const result = await new Promise((resolve) => {
      const cancelBtn = dialog.querySelector('.cancel');
      const confirmBtn = dialog.querySelector('.confirm');
      const spinner = dialog.querySelector('.loading-spinner');

      cancelBtn.addEventListener('click', () => {
        dialog.remove();
        resolve(false);
      });

      confirmBtn.addEventListener('click', async () => {
        // Show loading state
        confirmBtn.disabled = true;
        spinner.classList.remove('hidden');

        try {
          const result = await sendToPoGePalace(cardData);
          dialog.remove();
          showToast(`${cardData.name} was successfully added to PoGePalace!`);
          resolve(true);
        } catch (error) {
          console.error('Failed to send to PoGePalace:', error);
          showToast('Failed to send to PoGePalace', true);
          // Re-enable button and hide spinner on error
          confirmBtn.disabled = false;
          spinner.classList.add('hidden');
        }
      });
    });

    return result;
  } catch (error) {
    dialog.remove();
    throw error;
  }
}
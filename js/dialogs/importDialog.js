// Import dialog implementation
async function showImportDialog(totalCards) {
  return new Promise((resolve) => {
    const dialog = document.createElement('div');
    dialog.className = 'import-dialog';
    dialog.innerHTML = `
      <h3>Import Collection</h3>
      <p>About to import ${totalCards} cards.</p>
      <p>How would you like to handle potential duplicates?</p>
      <div class="import-options">
        <label>
          <input type="radio" name="duplicate-handling" value="skip" checked>
          Skip exact duplicates
        </label>
        <label>
          <input type="radio" name="duplicate-handling" value="allow">
          Allow all duplicates
        </label>
      </div>
      <div class="import-dialog-buttons">
        <button class="cancel">Cancel</button>
        <button class="confirm">Import</button>
      </div>
    `;

    document.body.appendChild(dialog);

    dialog.querySelector('.cancel').addEventListener('click', () => {
      dialog.remove();
      resolve(null);
    });

    dialog.querySelector('.confirm').addEventListener('click', () => {
      const selectedOption = dialog.querySelector('input[name="duplicate-handling"]:checked').value;
      dialog.remove();
      resolve(selectedOption);
    });
  });
}
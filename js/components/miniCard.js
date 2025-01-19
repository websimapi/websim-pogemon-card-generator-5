// Mini card creation and manipulation functions

function createMiniCard(cardData) {
  const miniCard = document.createElement('div');
  miniCard.className = 'mini-card';
  miniCard.dataset.cardId = cardData.id;
  miniCard.cardData = cardData;

  const types = cardData.type.split('/');
  const primaryType = types[0].toLowerCase().trim();
  const secondaryType = types[1] ? types[1].toLowerCase().trim() : primaryType;
  const primaryColor = getTypeColor(primaryType);
  const secondaryColor = getTypeColor(secondaryType);

  miniCard.innerHTML = `
    <div class="mini-card-inner" style="background: linear-gradient(135deg, ${primaryColor}26, ${secondaryColor}26 70%)">
      <div class="delete-overlay">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12z"/>
        </svg>
      </div>
      <div class="palace-button" title="Send to PoGePalace">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3zm3 13v3h-2v-3h2z"/>
        </svg>
      </div>
      <h3 class="mini-card-name">${cardData.name}</h3>
      <div class="mini-card-stats">
        <div class="mini-card-type">
          ${types.map(type => `
            <div class="type-icon ${type.toLowerCase().trim()}" title="${type.trim()}">
              ${getTypeIcon(type.trim())}
            </div>
          `).join('')}
        </div>
        <span class="mini-card-stats-text">${cardData.height} | ${cardData.weight}</span>
      </div>
      <div class="mini-card-image" style="background-image: url('${cardData.imageUrl}')"></div>
      <div class="mini-card-description">${cardData.description}</div>
    </div>
  `;

  miniCard.addEventListener('click', async (e) => {
    const palaceButton = e.target.closest('.palace-button');

    if (palaceButton) {
      e.stopPropagation(); // Prevent card load
      try {
        await showPalaceDialog(miniCard.cardData);
      } catch (error) {
        console.error('Failed to send to PoGePalace:', error);
      }
      return;
    }

    // Regular card click behavior
    if (!e.target.closest('.delete-overlay')) {
      loadCardToMain(miniCard.cardData);
      const viewer = document.querySelector('.collection-viewer');
      if (viewer) {
        viewer.classList.add('hidden');
      }
    }
  });

  return miniCard;
}
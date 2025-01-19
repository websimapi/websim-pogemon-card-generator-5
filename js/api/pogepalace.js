// Initialize the shared database connection
const pogepalace = new WebsimSocket();

async function sendToPoGePalace(cardData) {
  try {
    // First fetch the image and convert it to a File object
    const response = await fetch(cardData.imageUrl);
    const blob = await response.blob();
    const file = new File([blob], `${cardData.name}.png`, { type: 'image/png' });
    
    // Upload image to websim storage
    const backupImageUrl = await websim.upload(file);
    
    // Update local IndexDB record with backup URL
    if (cardData.id) {
      const transaction = db.transaction(['cards'], 'readwrite');
      const store = transaction.objectStore('cards');
      const request = store.get(cardData.id);
      
      request.onsuccess = () => {
        const record = request.result;
        if (record) {
          record.backupImageUrl = backupImageUrl;
          store.put(record);
        }
      };
    }
    
    // Create a new record in the PoGePalace collection with both URLs
    const pogeRecord = await pogepalace.collection('pogemon').create({
      name: cardData.name,
      description: cardData.description,
      pogetype: cardData.type, 
      height: cardData.height, 
      weight: cardData.weight,
      imageUrl: cardData.imageUrl,
      backupImageUrl: backupImageUrl,
      origin_trainer: pogepalace.party.client.username
    });

    // Verify the record was stored by attempting to retrieve it
    try {
      const verifyRecords = await pogepalace.collection('pogemon')
        .filter({ 
          name: cardData.name,
          description: cardData.description,
          origin_trainer: pogepalace.party.client.username
        })
        .getList();
      
      if (verifyRecords && verifyRecords.length > 0) {
        console.log('Successfully verified PoGePalace storage:', {
          stored: verifyRecords[0],
          original: pogeRecord
        });
      } else {
        console.warn('Record created but not found in verification check');
      }
    } catch (verifyError) {
      console.warn('Error verifying stored record:', verifyError);
    }
    
    return pogeRecord;
  } catch (error) {
    console.error('Error sending to PoGePalace:', error);
    throw error;
  }
}
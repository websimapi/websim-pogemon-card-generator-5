function getTypeColor(type) {
  const colors = {
    'air': '#B4D4E4',
    'sound': '#9B6B9E', 
    'nature': '#5A9E54',
    'fire': '#FF4422',
    'water': '#3399FF',
    'grass': '#77CC55',
    'electric': '#FFCC33',
    'ice': '#66CCFF',
    'fighting': '#BB5544',
    'poison': '#AA5599',
    'ground': '#DDBB55',
    'flying': '#8899FF',
    'psychic': '#FF5599',
    'bug': '#AABB22',
    'rock': '#BBAA66',
    'ghost': '#6666BB',
    'dragon': '#7766EE',
    'dark': '#775544',
    'steel': '#AAAABB',
    'fairy': '#EE99EE',
    'plant': '#4CAF50',
  };
  
  return colors[type] || '#999999';
}
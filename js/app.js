document.addEventListener('DOMContentLoaded', (event) => {
  window.borrowItem = function(button, itemName) {
    // Mark the item as not available
    button.classList.add('not-available');
    button.innerText = 'Ej Tillgängligt';
    button.disabled = true;
    const cartItems = document.querySelector('.cart-items');
    const itemDiv = document.createElement('div');
    itemDiv.textContent = `${itemName} `;
    itemDiv.dataset.item = itemName;

    const returnButton = document.createElement('button');
    returnButton.className = 'return-button';
    returnButton.textContent = 'Återlämna';
    returnButton.onclick = function() { returnItem(itemName, itemDiv); }; 

    itemDiv.appendChild(returnButton);
    cartItems.appendChild(itemDiv);
    updateCartCount();
  };
  window.returnItem = function(itemName, itemDiv) {
    const buttons = document.querySelectorAll('.borrow-button');
    buttons.forEach(button => {
      if (button.dataset.item === itemName) { 
        button.classList.remove('not-available');
        button.innerText = 'Låna';
        button.disabled = false;
      }
    });
    itemDiv.remove();

    updateCartCount();
  };
  function updateCartCount() {
    const cartCount = document.querySelector('.cart-items').children.length;
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = `Cart (${cartCount})`;
  }
  const cartElement = document.querySelector('.cart');
  const cartItems = document.querySelector('.cart-items');
  cartElement.addEventListener('click', function() {
    cartItems.classList.toggle('visible');
  });
  updateCartCount();
});

document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.querySelector('.cart-items-container');
  const cartItemsList = document.querySelector('.cart-items-list');
  const cartIcon = document.querySelector('.fa-shopping-cart');
  const confirmBtn = document.getElementById('confirm-btn');
  let cart = new Set(); 


  window.borrowItem = function(button, itemName) {
    cart.add(itemName);
    updateCart(); 
    button.classList.add('not-available');
    button.innerText = 'Ej Tillgängligt';
    button.disabled = true; 
  };
  function updateCart() {
    cartItemsList.innerHTML = ''; 

    cart.forEach(itemName => {
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.textContent = itemName;

      const returnButton = document.createElement('button');
      returnButton.textContent = 'Tabort';
      returnButton.className = 'return-button';
      returnButton.onclick = () => returnItem(itemName, itemElement);

      itemElement.appendChild(returnButton);
      cartItemsList.appendChild(itemElement);
    });
    cartItemsContainer.style.display = cart.size > 0 ? 'block' : 'none';
  }

  
  function returnItem(itemName, itemElement) {
    cart.delete(itemName); 
    itemElement.remove(); 
    document.querySelectorAll('.borrow-button').forEach(button => {
      if (button.dataset.item === itemName) {
        button.classList.remove('not-available');
        button.innerText = 'Låna';
        button.disabled = false;
      }
    });
    cartItemsContainer.style.display = cart.size > 0 ? 'block' : 'none';
  }
  confirmBtn.addEventListener('click', () => {
    if (cart.size > 0) {
      alert('Tack för att du välja Verktyghylla !  Ordernr: 2989');
      cart.clear();
      updateCart(); 
    } else {
      alert('din kundvagn är tomt!');
    }
  });
  cartIcon.addEventListener('click', () => {
    const isVisible = cartItemsContainer.style.display === 'block';
    cartItemsContainer.style.display = isVisible ? 'none' : 'block';
  });
  updateCart();
});

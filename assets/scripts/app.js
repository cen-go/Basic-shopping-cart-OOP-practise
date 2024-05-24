class Product {
  constructor(title, image, price, description) {
    this.title = title;
    this.imageUrl = image;
    this.description = description;
    this.price = price;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
  }

  createRootElement(tag, cssClass, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClass) {
      rootElement.classList.add(cssClass)
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];
  totalOutput;
  constructor(renderHookId) {
    super(renderHookId);
  }

  get totalPrice() {
    return this.items.reduce((result, curItem) => result += curItem.price, 0);   
  }

  addProduct(product) {
    this.items.push(product);
    this.totalOutput.textContent = `Total: \$ ${this.totalPrice.toFixed(2)}`;
  }

  render() {
    const cartEl= this.createRootElement("section", "cart");    
    cartEl.innerHTML = `
      <section>
        <h2>Total: \$ ${0}</h2>
        <button type="button">Order Now</button>
      </section>
    `;
    this.totalOutput = cartEl.querySelector("h2");    
  }
}

class ProductItem extends Component{
  constructor(renderHookId, product) {
    super(renderHookId);
    this.product = product;
  }
  addToCart() {
    App.addProductToCart(this.product);
    console.log("adding product...");
    console.log(this.product);
  }
  render() {
    const prodEl = this.createRootElement("li", "product-item");    
    prodEl.innerHTML = `
      <div>
        <img src="${this.product.imageUrl}" alt="${this.product.title}">
        <div class="product-item__content">
          <h2>${this.product.title}</h2>
          <h3>\$${this.product.price}</h3>
          <p>${this.product.description}</p>
          <button type="button">Add to Cart</button>
        </div>
      </div>
    `;
    const addToCartButton = prodEl.querySelector("button");
    addToCartButton.addEventListener("click", this.addToCart.bind(this));    
  }
}

class ProductList extends Component {
  products = [
    new Product("A Pillow", "assets/images/pillow-1.webp", 19.99, "A soft pillow."),
    new Product("A carpet", "assets/images/carpet-1.webp", 89.99, "High quality Iran carpet.")    
  ];
  constructor(renderHookId) {
    super(renderHookId);
  }
  render() {
    this.createRootElement("ul", "product-list", [new ElementAttribute("id", "prod-list")]);   
    for (const prod of this.products) {
      const productItem = new ProductItem("prod-list",prod);
      productItem.render();      
    }       
  }
}

class Shop {

  render() {   
    this.cart = new ShoppingCart("app");
    this.cart.render();
    const productList = new ProductList("app");
    productList.render();    
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();



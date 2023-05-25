# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

# Folder structure:

Sections:  
-Cart (Cart in figma)  
-ProductDetails (PDP in figma)  
-ProductList (Category in figma)  
-Navbar  
Components:  
(Components)  
HOC:  
-Higher order components used to make queries  
Styles:  
-scss styles for components  
apolloState:  
-client entity for apollo

# Styling

Styles structure:

-global style:  
.AttrBtnText{  
...previousStyles,  
width: 63px;  
height: 45px;  
}  
-style modified for component:  
.CartOverlay .AdjustButtons .AttrBtnText{  
width: 24px;  
height: 24px;  
}

# State management

State is kept in Apollo cache. In reactive variables and in client only fields.

cart - cart items,  
selected currency,  
currently modified - attributes of product being modified not yet put into the cart

There are two client only fields:

Product{

setAttrs - selected attributes of product (default or chosen by user), used to maintain consistency in adjust button component, besides this value takes part in order process.

isInCart- true if product is in cart (variable used when displaying inCart icon on ProductCard component)

}

Currency{

selected- returns true or false if currency is selected One (used in order to display one currency everywhere)

}

# There are three main queries:

getCategories - fetching categories list (without products), used to display navbar buttons  
getProdFromCat - gets product list from specific category  
getProduct - gets specific product

rest is in apollosState/queries.js

# Use Case:

Entry point is ProductList Section

1. After clicking on product user is redirected to productDetails,
2. In product Details user can add/remove product to/from cart with selected attributes  
   a) In order to get back to the productList, user must click on green logo at navigation,  
   otherwise the cart products will reset.  
   b) User can click on cartIcon to display cartOverlay(MyBag) and:  
   modify attributes of items in cart,  
   click viewBag which will redirect user to cart from where he will be able to finish the shopping

# notes:

! Cart component was used twice, once it represents cart component, and secondly it represents MyBag,  
there is boolean pushed depending where it renders. e.g  
Navbar component => myBag = true. But when it is accessed from App level myBag = false

There is console.log left at Cart section in order to check if user can buy a product.  
I tried to use as much of apollo as I could, propably bcs its new to me, if I've known its caveats, I would rethink some parts of the app.

I did not use the scandiweb PWA alias system here as it was not included in the requirements to do so, as far as I understand them.

Feel free to contact me if You have any questions. My email emce.dev@gmail.com.
Happy hacking!

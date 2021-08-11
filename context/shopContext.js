import React, { Component } from 'react'
import Client from 'shopify-buy/index.unoptimized.umd';
const ShopContext = React.createContext()

const client = Client.buildClient({
domain: process.env.NEXT_PUBLIC_REACT_APP_SHOPIFY_DOMAIN,
storefrontAccessToken: process.env.NEXT_PUBLIC_REACT_APP_SHOPIFY_API
});


// const STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_REACT_APP_SHOPIFY_API
// const GRAPHQL_URL = 'https://eightyfood.myshopify.com/api/2020-07/graphql.json'


class ShopProvider extends Component {
  state = {
    product : {},
    products: [],
    collections: [],
    checkout: {},
    isLoading: false
  }

  

  componentDidMount() {
    this.fetchAllProducts();

    if (localStorage.checkout_id) {
      this.fetchCheckout(localStorage.checkout_id)
    }else {
      this.createCheckout();
    }
   
  }



  createCheckout = async () => {
   await client.checkout.create().then((checkout) => {
      // Do something with the checkout
      localStorage.setItem('checkout_id',checkout.id);
      // Cookies.set('checkout_id', checkout.id, { expires: 3 });
      this.setState({ checkout})
   
    });
  }

  fetchCheckout = async (checkoutId) => {
    await client.checkout.fetch(checkoutId).then((checkout) => {
  
      if (checkout === null || checkout.completedAt != null) { 
         this.createCheckout();
      }else {
        this.setState({ checkout });
      }
    });
    
  }

  addItemToCheckout = async (variantId, quantity) => {
    this.setState({isLoading: true})
    const lineItemsToAdd = [{
      variantId: variantId,
      quantity: parseInt(quantity,10)
    }];
    await client.checkout.addLineItems(this.state.checkout.id, lineItemsToAdd).then((checkout) => {
       this.setState({checkout: checkout })
          this.setState({isLoading: false})

    }).catch((err) => {
      
      this.setState({isLoading: false})
        throw 'err!'
      
    })
   
  }


  removeLineItem = async (lineItemIdsToRemove) => {
     this.setState({isLoading: true})
// Remove an item from the checkout
   await client.checkout.removeLineItems(this.state.checkout.id, lineItemIdsToRemove).then((checkout) => {
        this.setState({checkout: checkout })
      this.setState({isLoading: false})
    }).catch((err) => {
          this.setState({isLoading: false})
          throw 'err!'
        })
  }




  fetchAllProducts = async () => {
    this.setState({
      isLoadingProducts: true
    })
   
    const productsQuery = client.graphQLClient.query((root) => {
    root.addConnection('products', {args: {first: 10}}, (product) => {
           product.addConnection('metafields', {args: {first: 10}}, (metafield) => {
            metafield.add('namespace')
            metafield.add('key')
            metafield.add('value')
          });   
        product.add('id')
        product.add('title');
        product.add("tags");
        product.addConnection('images', { args: { first: 10 } }, (images) => {
        images.add('src');
        images.add('id');
        images.add('altText');
    })
     product.addConnection('variants', {args: {first: 10}}, (variant) => {
        variant.add('price');
         variant.add('id');
      });
    
  });
  
});
// Call the send method with the custom products query
client.graphQLClient.send(productsQuery).then(({model, data}) => {
  // Do something with the products
  
   this.setState({
       products: model.products
   })
    this.setState({
      isLoadingProducts: false
    })
    return model.products
}).catch(err => {
   this.setState({
     isLoadingProducts: false
   })
})



}






    

  render() {
    return (
      <ShopContext.Provider 
      value={{
        ...this.state,
          createCheckout: this.createCheckout,
          fetchCheckout: this.fetchCheckout,
          fetchAllProducts: this.fetchAllProducts,
          addItemToCheckout: this.addItemToCheckout, 
          removeLineItem: this.removeLineItem,
          updateShippingAddress: this.updateShippingAddress,
          checkoutEmailUpdate: this.checkoutEmailUpdate, 
      }}>
        {this.props.children}
      </ShopContext.Provider>
    )
  }
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext}

export default ShopProvider
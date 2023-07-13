import cartItemsModel from "../database/models/cart-items-model.js";

export default {
    addToCart({ userid, productid }) {
        cartItemsModel.getAmount({ userid, productid })
        .then(resp => { 
            const updatedamount = resp.amount + 1;
            console.log(updatedamount);
            if(resp.amount == 0)  return cartItemsModel.addProduct({ userid, productid, amount: updatedamount})
            else return cartItemsModel.updateAmount({ userid, productid, amount: updatedamount})
            }
        )
    }
}
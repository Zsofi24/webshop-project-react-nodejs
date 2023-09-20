import cartItemsModel from "../database/models/cart-items-model.js";

export default {
   async addToCart({ userid, productid }) {
        if(!userid || !productid) {
            return new Promise((reject) => reject({error: "nincs felhasználó vagy termék"})) 
        } 
            
        const resp = await cartItemsModel.getAmount({userid, productid})
        const updatedamount = resp.amount + 1
        let datapromise;
        if(resp.amount == 0) {
            datapromise = await cartItemsModel.addProduct({ userid, productid, amount: updatedamount})
        } else {
            datapromise = await cartItemsModel.updateAmount({ userid, productid, amount: updatedamount})
        }
        return datapromise
    },

    getCartItems({ userid }) {
        return cartItemsModel.getCartItems({ userid })
    },

    getCartTotal({ userid }) {
        return cartItemsModel.getCartTotal({ userid })
    },

    deletCart({ userId }) {
        return cartItemsModel.deleteCart({ userId })
    },

    deleteItem({ userid, productid }) {
        return cartItemsModel.deleteItem({ userid, productid })
    },

    updateCart({ userid, productid, amount }) {
        return cartItemsModel.updateAmount({ userid, productid, amount})
    }
}

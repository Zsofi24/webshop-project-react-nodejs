import cartItemsModel from "../database/models/cart-items-model.js";

export default {
   async addToCart({ userid, productid }) {
        // cartItemsModel.getAmount({ userid, productid })
        //     .then(resp => { 
        //         const updatedamount = resp.amount + 1;
        //         console.log(updatedamount);
        //         if(resp.amount == 0) return  cartItemsModel.addProduct({ userid, productid, amount: updatedamount})
        //         else return cartItemsModel.updateAmount({ userid, productid, amount: updatedamount})
        //         }
        //     )   
        
        if(!userid || !productid) {
            return new Promise((reject) => reject({error: "nincs felhasználó vagy termék"})) 
        } 
            
        const resp = await cartItemsModel.getAmount({userid, productid})
        const updatedamount = resp.amount + 1
        console.log(updatedamount, "amount");
        let datapromise;
        if(resp.amount == 0) {
            console.log(datapromise, "datapromise 1");

            datapromise = await cartItemsModel.addProduct({ userid, productid, amount: updatedamount})
        } else {
            console.log(datapromise, "datapromise 2");

            datapromise = await cartItemsModel.updateAmount({ userid, productid, amount: updatedamount})
        }
        console.log(datapromise, "datapromise 3");
        return datapromise
    },

    getCartItems({ userid }) {
        return cartItemsModel.getCartItems({ userid })
    },

    deletCart({ userid }) {
        return cartItemsModel.deleteCart({ userid })
    }
}

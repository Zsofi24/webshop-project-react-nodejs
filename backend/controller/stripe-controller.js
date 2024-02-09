import { CLIENT_URL, stripe } from "../constants.js";

// const storeItems = new Map([
//     [1, { price: 10000, name: "Learn React Today" }],
//     [2, { price: 20000, name: "Learn CSS Today" }],
//   ])

export default {
    async createCheckout(req, res, next) {
        const { items } = req.body;
        console.log(items);
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: req.body.items.map(item => {
                    const storeItem = storeItems.get(item.id)
                    return {
                        price_data: {
                            currency: 'huf',
                            product_data: {
                                name: storeItem.name
                            },
                            unit_amount: storeItem.price
                        },
                        quantity: item.quantity
                    }
                }) ,
                success_url: `${CLIENT_URL}/sikeres-rendeles`,
                cancel_url: `${CLIENT_URL}/hiba-rendeles`
            })
            res.json({url: session.url})
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    },

    async createIntent(req, res, next) {
        const { amount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: "huf",
            payment_method_types: ['card'],
          });
        
          res.send({
            clientSecret: paymentIntent.client_secret,
          });
    },
}

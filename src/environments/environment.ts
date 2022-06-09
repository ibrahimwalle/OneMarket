// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'onemarket-2022',
    appId: '1:834940583211:web:cac00f0b336a552d16d96e',
    databaseURL: 'https://onemarket-2022-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'onemarket-2022.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyDcxjbW1KuuUOuq8kBsJh5dfBT5Mb6BKmU',
    authDomain: 'onemarket-2022.firebaseapp.com',
    messagingSenderId: '834940583211',
  },
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDcxjbW1KuuUOuq8kBsJh5dfBT5Mb6BKmU",
    authDomain: "onemarket-2022.firebaseapp.com",
    databaseURL: "https://onemarket-2022-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "onemarket-2022",
    storageBucket: "onemarket-2022.appspot.com",
    messagingSenderId: "834940583211",
    appId: "1:834940583211:web:cac00f0b336a552d16d96e"
  },
  aliConfig: {
    'X-RapidAPI-Host': 'magic-aliexpress1.p.rapidapi.com',
    'X-RapidAPI-Key': '10b7c99da9msh2986224a5664299p1c3824jsn55e312146d3d'
  },
  amazonConfig: {
    'X-RapidAPI-Host': 'amazon24.p.rapidapi.com',
    'X-RapidAPI-Key': '10b7c99da9msh2986224a5664299p1c3824jsn55e312146d3d'
  },
  emailApirConfig:{
    'content-type': 'application/json',
    'X-RapidAPI-Key': '10b7c99da9msh2986224a5664299p1c3824jsn55e312146d3d',
    'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com'
  },
  ebayConfig: {
    'clientID': 'IbrahimA-Shopping-PRD-629325b3d-dfdc3cca',
    'clientSecret': 'PRD-29325b3d5242-e7b0-4f1e-b85f-e473',
    'scope': 'https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/commerce.identity.readonly https://api.ebay.com/oauth/api_scope/commerce.notification.subscription https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly',
    'redirectUri': 'Ibrahim_Al_Wali-IbrahimA-Shoppi-ewefa',

    'clientIDSandbox': 'IbrahimA-Shopping-SBX-594f71727-1e751b51',
    'clientSecretSandbox': 'SBX-94f71727d5fa-555d-4a5f-a661-ac5b',
    'scopeSandbox': 'https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/buy.order.readonly https://api.ebay.com/oauth/api_scope/buy.guest.order https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.marketplace.insights.readonly https://api.ebay.com/oauth/api_scope/commerce.catalog.readonly https://api.ebay.com/oauth/api_scope/buy.shopping.cart https://api.ebay.com/oauth/api_scope/buy.offer.auction https://api.ebay.com/oauth/api_scope/commerce.identity.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.email.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.phone.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.address.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.name.readonly https://api.ebay.com/oauth/api_scope/commerce.identity.status.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.item.draft https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/sell.item https://api.ebay.com/oauth/api_scope/sell.reputation https://api.ebay.com/oauth/api_scope/sell.reputation.readonly https://api.ebay.com/oauth/api_scope/commerce.notification.subscription https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly',
    'redirectUriSandbox': 'Ibrahim_Al_Wali-IbrahimA-Shoppi-mfjiid',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

export interface Listing {
    id : string,
    title : string,
    url : string,
    imgUrl : string,
    price : PriceDetails,
    category : string[],
    marketPlace : string
}

interface PriceDetails {
    value : string,
    currency : string
}

export interface Item {
    itemId: string[]
    title: string[]
    globalId: string[]
    primaryCategory: PrimaryCategory[]
    galleryURL: string[]
    viewItemURL: string[]
    autoPay: string[]
    postalCode: string[]
    location: string[]
    country: string[]
    shippingInfo: any[] //ShippingInfo[]
    sellingStatus: SellingStatu[]
    listingInfo: any[] //ListingInfo[]
    returnsAccepted: string[]
    condition: any[] //Condition[]
    isMultiVariationListing: string[]
    discountPriceInfo?: any[] //DiscountPriceInfo[]
    topRatedListing: string[]
    subtitle?: string[]
}

export interface SellingStatu {
    currentPrice: CurrentPrice[]
    convertedCurrentPrice: any[] //ConvertedCurrentPrice[]
    sellingState: string[]
    timeLeft: string[]
  }

  export interface CurrentPrice {
    "@currencyId": string
    __value__: string
  }

  export interface PrimaryCategory {
    categoryId: string[]
    categoryName: string[]
}

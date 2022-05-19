import { CurrentPrice } from "./current-price"

export interface SellingStatu {
    currentPrice: CurrentPrice[]
    convertedCurrentPrice: any[] //ConvertedCurrentPrice[]
    sellingState: string[]
    timeLeft: string[]
  }
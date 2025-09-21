import {BikeModel} from "@/types/home";

export const BIKE_CATEGORIES: BikeModel[] = [
  {
    id: "1",
    name: "RBX Subscription",
    imageUrl:
      "https://d3vp2rl7047vsp.cloudfront.net/bike_models/images/000/000/151/medium/HONDA_HORNET_160.png",
  },
  {
    id: "2",
    name: "Low Prices",
    imageUrl:
      "https://d3vp2rl7047vsp.cloudfront.net/bike_models/images/000/000/247/medium/Bajaj_Pulsar_150_neon.png",
  },
  {
    id: "3",
    name: "Adventures by RB",
    imageUrl:
      "https://d3vp2rl7047vsp.cloudfront.net/bike_models/images/000/000/299/medium/ROYAL_ENFIELD_HIMALAYAN_GRAVEL_GREY.png?1660730284",
  },
] as const;

export const TOP_PICKS: BikeModel[] = [
  {
    id: "1",
    name: "Honda Activa 6G",
    imageUrl:
      "https://d3vp2rl7047vsp.cloudfront.net/bike_models/images/000/000/272/medium/Activa-6G.png?1666077785",
  },
  {
    id: "2",
    name: "Royal Enfield Himalayan",
    imageUrl:
      "https://d3vp2rl7047vsp.cloudfront.net/bike_models/images/000/000/299/medium/ROYAL_ENFIELD_HIMALAYAN_GRAVEL_GREY.png?1660730284",
  },
  {
    id: "3",
    name: "TVS Ntorq 125",
    imageUrl:
      "https://d3vp2rl7047vsp.cloudfront.net/bike_models/images/000/000/257/medium/TVS_NTORQ_125.png?1660732837",
  },
] as const;

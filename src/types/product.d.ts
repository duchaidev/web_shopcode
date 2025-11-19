type ClassifyDataType = {
  name: string
  price: number
  url_download: string
}

type ProductDataType = {
  user_id: number
  name: string
  url_demo: string
  categories: string[]
  description: string
  technologies: string[]
  images: string[]
  id: number
}

type ProductType = {
  productData: ProductDataType
  classifyData: ClassifyDataType[]
}

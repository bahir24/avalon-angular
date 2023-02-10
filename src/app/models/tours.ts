export interface ITour {
  description: string,
  img: string,
  name: string,
  price: string,
  tourOperator: string,
  type: string,
  locationId: string
  _id: string
}

export interface ITourTypeSelect {
  label: string,
  value: string
}

export interface INearestTour extends ITour {
  location: string
}

export interface ITourLocation {
  name: string,
  id: string
}

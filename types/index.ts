export interface IItem {
    _id?: String,
    name: String,
    imageURL: String,
    description: String,
    price: Number,
    category: String,
    ingredients: String[],
    addedBy: String
}

export interface IUser {
    _id?: String,
    email: String,
    password: String,
    role: String,
    fullName: Number,
    imageUrl: String,
    authToken: String
}
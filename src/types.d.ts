export interface IRoomPhotoPhoto {
    pk: string;
    file: string;
    description: string;
}

export interface IRoomList {
    pk: number;
    name: string;
    country: string;
    address: string;
    city: string;
    price: number;
    rating: number;
    is_owner: boolean;
    photos: IRoomPhotoPhoto[];
}

export interface IRoomOwner {
    name: string;
    profile_photo: string;
    username: string;
}

export interface IAmenity {
    name: string;
    description: string;
}

export interface IRoomDetail extends IRoomList {
    created_at: string;
    updated_at: string;
    rooms: number;
    toilets: number;
    description: string;
    address: string;
    pet_friendly: true;
    kind: string;
    is_owner: boolean;
    is_liked: boolean;
    category: {
        name: string;
        kind: string;
    };
    owner: IRoomOwner;
    amenities: IAmenity[];
}

export interface IRoomReview {
    payload: string;
    rating: number;
    user: IRoomOwner;
}

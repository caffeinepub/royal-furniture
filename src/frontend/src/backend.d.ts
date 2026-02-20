import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Review {
    userId: Principal;
    createdAt: Time;
    comment: string;
    rating: bigint;
}
export interface Product {
    id: string;
    reviews: Array<Review>;
    name: string;
    createdAt: Time;
    description: string;
    updatedAt: Time;
    stock: bigint;
    discount?: bigint;
    category: ProductCategory;
    price: bigint;
    images: Array<ExternalBlob>;
}
export interface Address {
    zip: string;
    street: string;
    country: string;
    city: string;
    state: string;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Time = bigint;
export interface WishlistItem {
    productId: string;
    addedAt: Time;
}
export interface Coupon {
    code: string;
    createdAt: Time;
    discountPercentage: bigint;
    validUntil: Time;
}
export interface Order {
    id: string;
    status: OrderStatus;
    userId: Principal;
    createdAt: Time;
    updatedAt: Time;
    totalAmount: bigint;
    paymentId?: string;
    shippingAddress: Address;
    items: Array<CartItem>;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface CartItem {
    productId: string;
    quantity: bigint;
}
export interface UserProfile {
    name: string;
    email: string;
    phone?: string;
    defaultAddress?: Address;
}
export enum OrderStatus {
    shipped = "shipped",
    pending = "pending",
    delivered = "delivered"
}
export enum ProductCategory {
    familySofa = "familySofa",
    beds = "beds",
    sofa = "sofa",
    officeChair = "officeChair",
    tables = "tables",
    diningSets = "diningSets"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCoupon(coupon: Coupon): Promise<void>;
    addProduct(product: Product): Promise<void>;
    addReview(productId: string, rating: bigint, comment: string): Promise<void>;
    addToCart(productId: string, quantity: bigint): Promise<void>;
    addToWishlist(productId: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    deleteProduct(id: string): Promise<void>;
    getAllCoupons(): Promise<Array<Coupon>>;
    getAllOrders(): Promise<Array<Order>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCart(): Promise<Array<CartItem>>;
    getCategories(): Promise<Array<ProductCategory>>;
    getCoupon(code: string): Promise<Coupon>;
    getOrder(orderId: string): Promise<Order>;
    getProduct(id: string): Promise<Product>;
    getProducts(): Promise<Array<Product>>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getUserOrders(): Promise<Array<Order>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWishlist(): Promise<Array<WishlistItem>>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    placeOrder(cart: Array<CartItem>, address: Address, paymentId: string): Promise<string>;
    removeCoupon(code: string): Promise<void>;
    removeFromCart(productId: string): Promise<void>;
    removeFromWishlist(productId: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setStripeConfiguration(config: StripeConfiguration): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    updateCartItem(productId: string, quantity: bigint): Promise<void>;
    updateOrderStatus(orderId: string, status: OrderStatus): Promise<void>;
    updateProduct(id: string, updatedProduct: Product): Promise<void>;
}

import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import OutCall "http-outcalls/outcall";
import Stripe "stripe/stripe";

actor {
  // System Initialization and Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // Type Definitions
  public type ProductCategory = {
    #sofa;
    #familySofa;
    #officeChair;
    #tables;
    #beds;
    #diningSets;
  };

  public type Product = {
    id : Text;
    name : Text;
    description : Text;
    price : Nat;
    discount : ?Nat;
    stock : Nat;
    category : ProductCategory;
    images : [Storage.ExternalBlob];
    reviews : [Review];
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  public type Review = {
    userId : Principal;
    rating : Nat;
    comment : Text;
    createdAt : Time.Time;
  };

  public type CartItem = {
    productId : Text;
    quantity : Nat;
  };

  public type WishlistItem = {
    productId : Text;
    addedAt : Time.Time;
  };

  public type Address = {
    street : Text;
    city : Text;
    state : Text;
    zip : Text;
    country : Text;
  };

  public type Order = {
    id : Text;
    userId : Principal;
    items : [CartItem];
    shippingAddress : Address;
    status : OrderStatus;
    createdAt : Time.Time;
    updatedAt : Time.Time;
    totalAmount : Nat;
    paymentId : ?Text;
  };

  public type OrderStatus = {
    #pending;
    #shipped;
    #delivered;
  };

  public type Coupon = {
    code : Text;
    discountPercentage : Nat;
    validUntil : Time.Time;
    createdAt : Time.Time;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    phone : ?Text;
    defaultAddress : ?Address;
  };

  // State Management
  let products = Map.empty<Text, Product>();
  let orders = Map.empty<Text, Order>();
  let coupons = Map.empty<Text, Coupon>();
  let carts = Map.empty<Principal, [CartItem]>();
  let wishlists = Map.empty<Principal, [WishlistItem]>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product Management
  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProduct(id : Text) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public shared ({ caller }) func addProduct(product : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };

    let newProduct : Product = {
      product with
      createdAt = Time.now();
      updatedAt = Time.now();
      reviews = [];
    };
    products.add(product.id, newProduct);
  };

  public shared ({ caller }) func updateProduct(id : Text, updatedProduct : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };

    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?existingProduct) {
        let product : Product = {
          updatedProduct with
          createdAt = existingProduct.createdAt;
          updatedAt = Time.now();
        };
        products.add(id, product);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };

    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) {
        products.remove(id);
      };
    };
  };

  // Cart Management
  public shared ({ caller }) func addToCart(productId : Text, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage cart");
    };

    let currentCart = switch (carts.get(caller)) {
      case (null) { [] };
      case (?items) { items };
    };

    let newItem = { productId; quantity };
    let updatedCart = currentCart.concat([newItem]);
    carts.add(caller, updatedCart);
  };

  public shared ({ caller }) func removeFromCart(productId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage cart");
    };

    let currentCart = switch (carts.get(caller)) {
      case (null) { [] };
      case (?items) { items };
    };

    let updatedCart = currentCart.filter(func(item) { item.productId != productId });
    carts.add(caller, updatedCart);
  };

  public shared ({ caller }) func updateCartItem(productId : Text, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage cart");
    };

    let currentCart = switch (carts.get(caller)) {
      case (null) { [] };
      case (?items) { items };
    };

    let updatedCart = currentCart.map(func(item) { if (item.productId == productId) { { productId; quantity } } else { item } });
    carts.add(caller, updatedCart);
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view cart");
    };

    switch (carts.get(caller)) {
      case (null) { [] };
      case (?items) { items };
    };
  };

  // Wishlist Management
  public shared ({ caller }) func addToWishlist(productId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage wishlist");
    };

    let currentWishlist = switch (wishlists.get(caller)) {
      case (null) { [] };
      case (?items) { items };
    };

    let newItem = { productId; addedAt = Time.now() };
    let updatedWishlist = currentWishlist.concat([newItem]);
    wishlists.add(caller, updatedWishlist);
  };

  public shared ({ caller }) func removeFromWishlist(productId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage wishlist");
    };

    let currentWishlist = switch (wishlists.get(caller)) {
      case (null) { [] };
      case (?items) { items };
    };

    let updatedWishlist = currentWishlist.filter(func(item) { item.productId != productId });
    wishlists.add(caller, updatedWishlist);
  };

  public query ({ caller }) func getWishlist() : async [WishlistItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view wishlist");
    };

    switch (wishlists.get(caller)) {
      case (null) { [] };
      case (?items) { items };
    };
  };

  // Orders Management
  public shared ({ caller }) func placeOrder(cart : [CartItem], address : Address, paymentId : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can place orders");
    };

    let orderId = "order_" # Time.now().toText();

    let newOrder : Order = {
      id = orderId;
      userId = caller;
      items = cart;
      shippingAddress = address;
      status = #pending;
      createdAt = Time.now();
      updatedAt = Time.now();
      totalAmount = 0;
      paymentId = ?paymentId;
    };
    orders.add(orderId, newOrder);
    orderId;
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Text, status : OrderStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };

    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        let updatedOrder = { 
          order with 
          status = status;
          updatedAt = Time.now();
        };
        orders.add(orderId, updatedOrder);
      };
    };
  };

  public query ({ caller }) func getOrder(orderId : Text) : async Order {
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        if (order.userId != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own orders");
        };
        order;
      };
    };
  };

  public query ({ caller }) func getUserOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view orders");
    };

    orders.values().toArray().filter(func(order) { order.userId == caller });
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };

    orders.values().toArray();
  };

  // Stripe Integration
  public query ({ caller }) func isStripeConfigured() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can validate Stripe configuration");
    };
    stripeConfiguration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can set Stripe configuration");
    };
    stripeConfiguration := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (stripeConfiguration) {
        case (null) { Runtime.trap("Stripe needs to be first configured") };
        case (?value) { value };
    };
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
      await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
      await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  public query ({ caller }) func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // Coupons Management
  public shared ({ caller }) func addCoupon(coupon : Coupon) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add coupons");
    };
    coupons.add(coupon.code, coupon);
  };

  public shared ({ caller }) func removeCoupon(code : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can remove coupons");
    };
    coupons.remove(code);
  };

  public query ({ caller }) func getCoupon(code : Text) : async Coupon {
    switch (coupons.get(code)) {
      case (null) { Runtime.trap("Coupon not found") };
      case (?coupon) { coupon };
    };
  };

  public query ({ caller }) func getAllCoupons() : async [Coupon] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all coupons");
    };

    coupons.values().toArray();
  };

  // Reviews Management
  public shared ({ caller }) func addReview(productId : Text, rating : Nat, comment : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add reviews");
    };

    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        let review : Review = {
          userId = caller;
          rating = rating;
          comment = comment;
          createdAt = Time.now();
        };
        let updatedReviews = product.reviews.concat([review]);
        let updatedProduct = { 
          product with 
          reviews = updatedReviews;
          updatedAt = Time.now();
        };
        products.add(productId, updatedProduct);
      };
    };
  };

  // Helper Functions
  public query ({ caller }) func getCategories() : async [ProductCategory] {
    [#sofa, #familySofa, #officeChair, #tables, #beds, #diningSets];
  };
};

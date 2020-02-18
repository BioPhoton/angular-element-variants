# AngularElementVariants

# Setup

**Development**

1. Checkout project
2. Install dependencies viar npm `npm install`
3. bootstrap all packages `npm run lerna bootstrap`
4. Build core first `npm run build-core`
5. "Uplink" the core: `npm run uplink-core`
6. Link core into packages: `npm run lerna run link-core`
7. Build all packages `npm run build`
8. Optional build single package: `lerna run --scope @angular-element-variants/core build`

**Bump Version and tag**

1. Publish changed packages `npm run version`
   This will commit and tag!

**Publish (and bump version)**

1. Publish changed packages `npm run publish`

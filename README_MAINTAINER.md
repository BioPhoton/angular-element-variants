# AngularElementVariants

# Setup

**Development**

1. Checkout project
2. Install dependencies via npm `npm install`
3. Build core first `npm run build-core`
4. "Up-link" the core: `npm run uplink-core`
5. Link core into packages: `npm run lerna run link-core`
6. Build all packages `npm run build`
7. Optional build single package: `lerna run --scope @angular-element-variants/core build`

**Bump Version and tag**

1. Publish changed packages `npm run version`
   This will commit and tag!

**Publish (and bump version)**

1. Publish changed packages `npm run publish`

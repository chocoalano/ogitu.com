import { BaseSeeder } from '@adonisjs/lucid/seeders'
import ProductVariant from '#models/product_variant'
import Product from '#models/product'
import logger from '@adonisjs/core/services/logger'

export default class extends BaseSeeder {
  async run() {
    const products = await Product.all()
    const productMap = new Map(products.map((p) => [p.slug, p]))

    const variants = [
      // SMOK Nord 5 - Colors
      {
        productSlug: 'smok-nord-5-pod-kit-80w',
        name: 'Color',
        value: 'Black',
        sku: 'SMOK-NORD5-BLK',
        priceAdjustment: 0,
        stock: 15,
      },
      {
        productSlug: 'smok-nord-5-pod-kit-80w',
        name: 'Color',
        value: 'Silver',
        sku: 'SMOK-NORD5-SLV',
        priceAdjustment: 0,
        stock: 12,
      },
      {
        productSlug: 'smok-nord-5-pod-kit-80w',
        name: 'Color',
        value: 'Red',
        sku: 'SMOK-NORD5-RED',
        priceAdjustment: 0,
        stock: 10,
      },
      {
        productSlug: 'smok-nord-5-pod-kit-80w',
        name: 'Color',
        value: 'Blue',
        sku: 'SMOK-NORD5-BLU',
        priceAdjustment: 0,
        stock: 8,
      },
      {
        productSlug: 'smok-nord-5-pod-kit-80w',
        name: 'Color',
        value: 'Rainbow',
        sku: 'SMOK-NORD5-RNB',
        priceAdjustment: 15000,
        stock: 5,
      },

      // Voopoo Argus P1 - Colors
      {
        productSlug: 'voopoo-argus-p1-pod-kit',
        name: 'Color',
        value: 'Black',
        sku: 'VOOP-P1-BLK',
        priceAdjustment: 0,
        stock: 20,
      },
      {
        productSlug: 'voopoo-argus-p1-pod-kit',
        name: 'Color',
        value: 'White',
        sku: 'VOOP-P1-WHT',
        priceAdjustment: 0,
        stock: 18,
      },
      {
        productSlug: 'voopoo-argus-p1-pod-kit',
        name: 'Color',
        value: 'Green',
        sku: 'VOOP-P1-GRN',
        priceAdjustment: 0,
        stock: 15,
      },
      {
        productSlug: 'voopoo-argus-p1-pod-kit',
        name: 'Color',
        value: 'Pink',
        sku: 'VOOP-P1-PNK',
        priceAdjustment: 0,
        stock: 12,
      },
      {
        productSlug: 'voopoo-argus-p1-pod-kit',
        name: 'Color',
        value: 'Blue',
        sku: 'VOOP-P1-BLU',
        priceAdjustment: 0,
        stock: 10,
      },

      // RELX Infinity Plus - Colors
      {
        productSlug: 'relx-infinity-plus-device',
        name: 'Color',
        value: 'Obsidian Black',
        sku: 'RELX-INF-BLK',
        priceAdjustment: 0,
        stock: 30,
      },
      {
        productSlug: 'relx-infinity-plus-device',
        name: 'Color',
        value: 'Silver',
        sku: 'RELX-INF-SLV',
        priceAdjustment: 0,
        stock: 25,
      },
      {
        productSlug: 'relx-infinity-plus-device',
        name: 'Color',
        value: 'Gold',
        sku: 'RELX-INF-GLD',
        priceAdjustment: 10000,
        stock: 20,
      },
      {
        productSlug: 'relx-infinity-plus-device',
        name: 'Color',
        value: 'Rose Gold',
        sku: 'RELX-INF-RSG',
        priceAdjustment: 10000,
        stock: 15,
      },
      {
        productSlug: 'relx-infinity-plus-device',
        name: 'Color',
        value: 'Navy Blue',
        sku: 'RELX-INF-NVY',
        priceAdjustment: 0,
        stock: 10,
      },

      // Vaporesso XROS 3 Mini - Colors
      {
        productSlug: 'vaporesso-xros-3-mini',
        name: 'Color',
        value: 'Black',
        sku: 'VAPO-X3M-BLK',
        priceAdjustment: 0,
        stock: 20,
      },
      {
        productSlug: 'vaporesso-xros-3-mini',
        name: 'Color',
        value: 'Space Grey',
        sku: 'VAPO-X3M-SGY',
        priceAdjustment: 0,
        stock: 15,
      },
      {
        productSlug: 'vaporesso-xros-3-mini',
        name: 'Color',
        value: 'Sky Blue',
        sku: 'VAPO-X3M-SBL',
        priceAdjustment: 0,
        stock: 12,
      },
      {
        productSlug: 'vaporesso-xros-3-mini',
        name: 'Color',
        value: 'Rose Pink',
        sku: 'VAPO-X3M-RPK',
        priceAdjustment: 0,
        stock: 8,
      },

      // GeekVape Aegis Legend 2 Kit - Colors
      {
        productSlug: 'geekvape-aegis-legend-2-kit',
        name: 'Color',
        value: 'Classic Black',
        sku: 'GEEK-AGL2-BLK',
        priceAdjustment: 0,
        stock: 8,
      },
      {
        productSlug: 'geekvape-aegis-legend-2-kit',
        name: 'Color',
        value: 'Rainbow',
        sku: 'GEEK-AGL2-RNB',
        priceAdjustment: 25000,
        stock: 5,
      },
      {
        productSlug: 'geekvape-aegis-legend-2-kit',
        name: 'Color',
        value: 'Red',
        sku: 'GEEK-AGL2-RED',
        priceAdjustment: 0,
        stock: 6,
      },
      {
        productSlug: 'geekvape-aegis-legend-2-kit',
        name: 'Color',
        value: 'Blue',
        sku: 'GEEK-AGL2-BLU',
        priceAdjustment: 0,
        stock: 6,
      },

      // Voopoo Drag 4 Mod - Colors
      {
        productSlug: 'voopoo-drag-4-mod',
        name: 'Color',
        value: 'Gun Metal',
        sku: 'VOOP-D4-GNM',
        priceAdjustment: 0,
        stock: 10,
      },
      {
        productSlug: 'voopoo-drag-4-mod',
        name: 'Color',
        value: 'Black',
        sku: 'VOOP-D4-BLK',
        priceAdjustment: 0,
        stock: 8,
      },
      {
        productSlug: 'voopoo-drag-4-mod',
        name: 'Color',
        value: 'Tropical Orange',
        sku: 'VOOP-D4-ORG',
        priceAdjustment: 0,
        stock: 6,
      },
      {
        productSlug: 'voopoo-drag-4-mod',
        name: 'Color',
        value: 'Ocean Blue',
        sku: 'VOOP-D4-OBL',
        priceAdjustment: 0,
        stock: 6,
      },

      // Hellvape Dead Rabbit 3 RDA - Colors
      {
        productSlug: 'hellvape-dead-rabbit-3-rda',
        name: 'Color',
        value: 'Matte Black',
        sku: 'HELL-DR3-BLK',
        priceAdjustment: 0,
        stock: 12,
      },
      {
        productSlug: 'hellvape-dead-rabbit-3-rda',
        name: 'Color',
        value: 'SS',
        sku: 'HELL-DR3-SS',
        priceAdjustment: 0,
        stock: 10,
      },
      {
        productSlug: 'hellvape-dead-rabbit-3-rda',
        name: 'Color',
        value: 'Rainbow',
        sku: 'HELL-DR3-RNB',
        priceAdjustment: 15000,
        stock: 8,
      },
      {
        productSlug: 'hellvape-dead-rabbit-3-rda',
        name: 'Color',
        value: 'Gunmetal',
        sku: 'HELL-DR3-GNM',
        priceAdjustment: 0,
        stock: 5,
      },

      // Emkay Brew Mango Smoothie - Nicotine
      {
        productSlug: 'emkay-brew-mango-smoothie-60ml',
        name: 'Nicotine',
        value: '3mg',
        sku: 'EMKAY-MANGO-3MG',
        priceAdjustment: 0,
        stock: 50,
      },
      {
        productSlug: 'emkay-brew-mango-smoothie-60ml',
        name: 'Nicotine',
        value: '6mg',
        sku: 'EMKAY-MANGO-6MG',
        priceAdjustment: 0,
        stock: 50,
      },

      // Nasty Juice Cush Man - Nicotine
      {
        productSlug: 'nasty-juice-cush-man-60ml',
        name: 'Nicotine',
        value: '3mg',
        sku: 'NASTY-CUSH-3MG',
        priceAdjustment: 0,
        stock: 40,
      },
      {
        productSlug: 'nasty-juice-cush-man-60ml',
        name: 'Nicotine',
        value: '6mg',
        sku: 'NASTY-CUSH-6MG',
        priceAdjustment: 0,
        stock: 40,
      },

      // Indonesian Juice Kopi Susu - Nicotine
      {
        productSlug: 'indonesian-juice-kopi-susu-60ml',
        name: 'Nicotine',
        value: '3mg',
        sku: 'INDJ-KOPI-3MG',
        priceAdjustment: 0,
        stock: 60,
      },
      {
        productSlug: 'indonesian-juice-kopi-susu-60ml',
        name: 'Nicotine',
        value: '6mg',
        sku: 'INDJ-KOPI-6MG',
        priceAdjustment: 0,
        stock: 60,
      },

      // Black Note Virginia - Nicotine
      {
        productSlug: 'black-note-virginia-30ml',
        name: 'Nicotine',
        value: '3mg',
        sku: 'BLKN-VIRG-3MG',
        priceAdjustment: 0,
        stock: 12,
      },
      {
        productSlug: 'black-note-virginia-30ml',
        name: 'Nicotine',
        value: '6mg',
        sku: 'BLKN-VIRG-6MG',
        priceAdjustment: 0,
        stock: 13,
      },

      // RELX Pod Pro Grape - Nicotine (Salt Nic)
      {
        productSlug: 'relx-pod-pro-grape-30ml',
        name: 'Nicotine',
        value: '30mg',
        sku: 'RELX-GRAPE-30MG',
        priceAdjustment: 0,
        stock: 75,
      },
      {
        productSlug: 'relx-pod-pro-grape-30ml',
        name: 'Nicotine',
        value: '50mg',
        sku: 'RELX-GRAPE-50MG',
        priceAdjustment: 10000,
        stock: 75,
      },

      // Saltnic Labs Vanilla Custard - Nicotine
      {
        productSlug: 'saltnic-labs-vanilla-custard-30ml',
        name: 'Nicotine',
        value: '25mg',
        sku: 'SLAB-VANI-25MG',
        priceAdjustment: 0,
        stock: 40,
      },
      {
        productSlug: 'saltnic-labs-vanilla-custard-30ml',
        name: 'Nicotine',
        value: '35mg',
        sku: 'SLAB-VANI-35MG',
        priceAdjustment: 0,
        stock: 40,
      },

      // Naked 100 Salt Polar Breeze - Nicotine
      {
        productSlug: 'naked-100-salt-polar-breeze-30ml',
        name: 'Nicotine',
        value: '35mg',
        sku: 'NKD-POLAR-35MG',
        priceAdjustment: 0,
        stock: 32,
      },
      {
        productSlug: 'naked-100-salt-polar-breeze-30ml',
        name: 'Nicotine',
        value: '50mg',
        sku: 'NKD-POLAR-50MG',
        priceAdjustment: 10000,
        stock: 33,
      },

      // IGET Bar Plus - Flavors
      {
        productSlug: 'iget-bar-plus-6000-puffs',
        name: 'Flavor',
        value: 'Grape Ice',
        sku: 'IGET-6000-GRAPE',
        priceAdjustment: 0,
        stock: 25,
      },
      {
        productSlug: 'iget-bar-plus-6000-puffs',
        name: 'Flavor',
        value: 'Watermelon Ice',
        sku: 'IGET-6000-WTMLN',
        priceAdjustment: 0,
        stock: 25,
      },
      {
        productSlug: 'iget-bar-plus-6000-puffs',
        name: 'Flavor',
        value: 'Mango Ice',
        sku: 'IGET-6000-MANGO',
        priceAdjustment: 0,
        stock: 20,
      },
      {
        productSlug: 'iget-bar-plus-6000-puffs',
        name: 'Flavor',
        value: 'Lush Ice',
        sku: 'IGET-6000-LUSH',
        priceAdjustment: 0,
        stock: 15,
      },
      {
        productSlug: 'iget-bar-plus-6000-puffs',
        name: 'Flavor',
        value: 'Strawberry Kiwi',
        sku: 'IGET-6000-STKW',
        priceAdjustment: 0,
        stock: 15,
      },

      // Elf Bar 600 - Flavors
      {
        productSlug: 'elf-bar-600-puffs',
        name: 'Flavor',
        value: 'Blue Razz Lemonade',
        sku: 'ELFBAR-600-BRL',
        priceAdjustment: 0,
        stock: 30,
      },
      {
        productSlug: 'elf-bar-600-puffs',
        name: 'Flavor',
        value: 'Strawberry Ice',
        sku: 'ELFBAR-600-STR',
        priceAdjustment: 0,
        stock: 30,
      },
      {
        productSlug: 'elf-bar-600-puffs',
        name: 'Flavor',
        value: 'Watermelon',
        sku: 'ELFBAR-600-WTM',
        priceAdjustment: 0,
        stock: 30,
      },
      {
        productSlug: 'elf-bar-600-puffs',
        name: 'Flavor',
        value: 'Mango',
        sku: 'ELFBAR-600-MNG',
        priceAdjustment: 0,
        stock: 30,
      },
      {
        productSlug: 'elf-bar-600-puffs',
        name: 'Flavor',
        value: 'Cola',
        sku: 'ELFBAR-600-COLA',
        priceAdjustment: 0,
        stock: 30,
      },
    ]

    for (const variant of variants) {
      const product = productMap.get(variant.productSlug)
      if (product) {
        await ProductVariant.updateOrCreate(
          { sku: variant.sku },
          {
            productId: product.id,
            name: variant.name,
            value: variant.value,
            sku: variant.sku,
            priceAdjustment: variant.priceAdjustment,
            stock: variant.stock,
            isActive: true,
          }
        )
      }
    }

    logger.info('✅ Product Variants seeded:')
    logger.info(`   ${variants.length} variants created`)
  }
}

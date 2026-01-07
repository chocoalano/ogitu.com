import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Product from '#models/product';
import Category from '#models/category';
import logger from '@adonisjs/core/services/logger';
export default class extends BaseSeeder {
    async run() {
        const categories = await Category.all();
        const categoryMap = new Map(categories.map((c) => [c.slug, c]));
        const products = [
            {
                categorySlug: 'open-pod',
                name: 'SMOK Nord 5 Pod Kit 80W',
                slug: 'smok-nord-5-pod-kit-80w',
                sku: 'SMOK-NORD5-001',
                description: `SMOK Nord 5 adalah pod system terbaru dari SMOK dengan fitur-fitur canggih:

• Daya maksimal 80W dengan chip IQ-M
• Baterai built-in 2000mAh
• Layar OLED 0.96 inch
• Kompatibel dengan coil RPM 3 dan RPM series
• Sistem airflow adjustable
• Kapasitas pod 5ml

Paket termasuk:
- 1x SMOK Nord 5 Device
- 1x RPM 3 Mesh Coil 0.23ohm
- 1x RPM 3 Mesh Coil 0.15ohm
- 1x Nord 5 Pod 5ml
- 1x USB Type-C Cable
- User Manual`,
                specifications: JSON.stringify({
                    brand: 'SMOK',
                    power: '5-80W',
                    battery: '2000mAh Built-in',
                    display: '0.96" OLED',
                    pod_capacity: '5ml',
                    resistance: '0.15-3.0ohm',
                    charging: 'Type-C 2A',
                    dimensions: '104.9 x 26.1 x 25.6mm',
                }),
                price: 485000,
                discountPrice: 425000,
                stock: 50,
                weight: 150,
                brand: 'SMOK',
                condition: 'new',
                status: 'active',
                isFeatured: true,
                rating: 4.8,
                totalReviews: 45,
                totalSold: 128,
            },
            {
                categorySlug: 'open-pod',
                name: 'Voopoo Argus P1 Pod Kit',
                slug: 'voopoo-argus-p1-pod-kit',
                sku: 'VOOP-ARGUSP1-001',
                description: `Voopoo Argus P1 adalah pod system super compact dengan performa luar biasa:

• Ukuran super kecil dan ringan
• Baterai 800mAh
• Kompatibel dengan coil ITO series
• Gene AI Chip untuk output optimal
• Side filling system
• 5 level power adjustment

Cocok untuk daily use dan travelling!`,
                specifications: JSON.stringify({
                    brand: 'Voopoo',
                    power: '5-25W',
                    battery: '800mAh Built-in',
                    pod_capacity: '2ml',
                    resistance: '0.7-3.0ohm',
                    charging: 'Type-C',
                    dimensions: '91.3 x 24.3 x 14.8mm',
                }),
                price: 275000,
                discountPrice: 245000,
                stock: 75,
                weight: 80,
                brand: 'Voopoo',
                condition: 'new',
                status: 'active',
                isFeatured: true,
                rating: 4.7,
                totalReviews: 62,
                totalSold: 205,
            },
            {
                categorySlug: 'closed-pod',
                name: 'RELX Infinity Plus Device',
                slug: 'relx-infinity-plus-device',
                sku: 'RELX-INFPLUS-001',
                description: `RELX Infinity Plus dengan teknologi Super Smooth:

• Teknologi Super Smooth untuk sensasi halus
• Baterai 380mAh dengan charging 45 menit
• Smart Pace Vibration
• Leak-resistant maze structure
• Magnetic pod connection
• Premium metallic finish

Device only, pod dijual terpisah.`,
                specifications: JSON.stringify({
                    brand: 'RELX',
                    battery: '380mAh Built-in',
                    charging: 'Type-C Fast Charge',
                    pod_type: 'Closed System',
                    dimensions: '117 x 22 x 10.6mm',
                    weight: '25g',
                }),
                price: 199000,
                discountPrice: null,
                stock: 100,
                weight: 50,
                brand: 'RELX',
                condition: 'new',
                status: 'active',
                isFeatured: true,
                rating: 4.9,
                totalReviews: 156,
                totalSold: 520,
            },
            {
                categorySlug: 'aio-pod',
                name: 'Vaporesso XROS 3 Mini',
                slug: 'vaporesso-xros-3-mini',
                sku: 'VAPO-XROS3M-001',
                description: `Vaporesso XROS 3 Mini - Perfect for MTL vaping:

• SSS Leak-resistant Technology
• AXON Chip untuk rasa optimal
• Baterai 1000mAh
• Adjustable airflow
• Kapasitas pod 2ml
• Top filling system
• Draw & Button activated

Paket termasuk 2 pod cartridge dengan coil berbeda.`,
                specifications: JSON.stringify({
                    brand: 'Vaporesso',
                    power: '11-16W',
                    battery: '1000mAh Built-in',
                    pod_capacity: '2ml',
                    coil: 'XROS Series',
                    charging: 'Type-C 1A',
                    dimensions: '99.2 x 24.2 x 13.8mm',
                }),
                price: 325000,
                discountPrice: 295000,
                stock: 60,
                weight: 95,
                brand: 'Vaporesso',
                condition: 'new',
                status: 'active',
                isFeatured: true,
                rating: 4.8,
                totalReviews: 89,
                totalSold: 312,
            },
            {
                categorySlug: 'open-pod',
                name: 'GeekVape Wenax K1',
                slug: 'geekvape-wenax-k1',
                sku: 'GEEK-WENAXK1-001',
                description: `GeekVape Wenax K1 - Sleek & Powerful:

• Desain ultra slim pen-style
• Baterai 600mAh
• Kompatibel dengan G Series Coil
• Top airflow anti-leak
• Kapasitas 2ml
• Auto-draw activation

Perfect everyday pod!`,
                specifications: JSON.stringify({
                    brand: 'GeekVape',
                    power: '16W Max',
                    battery: '600mAh Built-in',
                    pod_capacity: '2ml',
                    coil: 'G Series Coil',
                    resistance: '0.8-1.2ohm',
                    charging: 'Type-C',
                    dimensions: '113 x 18.5mm',
                }),
                price: 185000,
                discountPrice: 165000,
                stock: 45,
                weight: 60,
                brand: 'GeekVape',
                condition: 'new',
                status: 'active',
                isFeatured: false,
                rating: 4.5,
                totalReviews: 34,
                totalSold: 98,
            },
            {
                categorySlug: 'starter-kit',
                name: 'GeekVape Aegis Legend 2 Kit',
                slug: 'geekvape-aegis-legend-2-kit',
                sku: 'GEEK-AGL2-KIT-001',
                description: `GeekVape Aegis Legend 2 Kit - The Ultimate Durable Mod:

• IP68 Water, Dust & Shock Resistant
• Dual 18650 Battery (not included)
• Power hingga 200W
• AS Chip 3.0
• Zeus Sub Ohm Tank 5.5ml
• Layar TFT Color 1.08"
• Tri-proof protection

Paket termasuk:
- Aegis Legend 2 Mod
- Zeus Sub Ohm Tank
- Z Series Mesh Coil 0.2ohm
- Z Series Mesh Coil 0.25ohm
- Extra glass tube
- USB Type-C Cable
- User Manual`,
                specifications: JSON.stringify({
                    brand: 'GeekVape',
                    power: '5-200W',
                    battery: 'Dual 18650 (Not included)',
                    display: '1.08" TFT Color',
                    tank_capacity: '5.5ml',
                    resistance: '0.1-3.0ohm',
                    protection: 'IP68 Tri-proof',
                    dimensions: '140.45 x 53.5 x 30.6mm',
                }),
                price: 1250000,
                discountPrice: 1150000,
                stock: 25,
                weight: 350,
                brand: 'GeekVape',
                condition: 'new',
                status: 'active',
                isFeatured: true,
                rating: 4.9,
                totalReviews: 78,
                totalSold: 156,
            },
            {
                categorySlug: 'box-mod',
                name: 'Voopoo Drag 4 Mod',
                slug: 'voopoo-drag-4-mod',
                sku: 'VOOP-DRAG4-MOD-001',
                description: `Voopoo Drag 4 - Next Level Performance:

• Gene Fan 3.0 Chip
• Dual 18650 Battery
• Output hingga 177W
• Layar TFT 0.96"
• 8 Mode Vaping
• Smart Mode dengan AI adjustment
• Leather grip premium

Mod only, tank dijual terpisah.`,
                specifications: JSON.stringify({
                    brand: 'Voopoo',
                    power: '5-177W',
                    battery: 'Dual 18650 (Not included)',
                    display: '0.96" TFT',
                    resistance: '0.1-3.0ohm',
                    modes: 'Smart/RBA/TC/Turbo',
                    dimensions: '148.8 x 54 x 28mm',
                }),
                price: 895000,
                discountPrice: 825000,
                stock: 30,
                weight: 180,
                brand: 'Voopoo',
                condition: 'new',
                status: 'active',
                isFeatured: true,
                rating: 4.8,
                totalReviews: 45,
                totalSold: 89,
            },
            {
                categorySlug: 'squonk-mod',
                name: 'Dovpo Topside Dual Squonk',
                slug: 'dovpo-topside-dual-squonk',
                sku: 'DOVP-TOPSIDE-DUAL-001',
                description: `Dovpo Topside Dual - Top Fill Squonk Innovation:

• Revolutionary top fill squonk system
• Dual 18650 battery
• Output 200W
• 10ml squonk bottle
• YIHI Chip
• Ergonomic design
• Leak-proof construction

The most convenient squonk mod!`,
                specifications: JSON.stringify({
                    brand: 'Dovpo',
                    power: '5-200W',
                    battery: 'Dual 18650 (Not included)',
                    bottle_capacity: '10ml',
                    resistance: '0.08-3.5ohm',
                    modes: 'VW/Bypass/TC',
                    dimensions: '92.5 x 59 x 30mm',
                }),
                price: 1650000,
                discountPrice: 1495000,
                stock: 15,
                weight: 220,
                brand: 'Dovpo',
                condition: 'new',
                status: 'active',
                isFeatured: false,
                rating: 4.7,
                totalReviews: 23,
                totalSold: 45,
            },
            {
                categorySlug: 'liquid-fruity',
                name: 'Emkay Brew Mango Smoothie 60ml',
                slug: 'emkay-brew-mango-smoothie-60ml',
                sku: 'EMKAY-MANGO-60-001',
                description: `Emkay Brew Mango Smoothie - Local Premium Liquid:

• Rasa: Mango smoothie dengan hint yogurt
• VG/PG: 70/30
• Nikotin: Tersedia 3mg dan 6mg
• Ukuran: 60ml
• Made in Indonesia

Sensasi mango segar dengan creamy yogurt yang smooth!`,
                specifications: JSON.stringify({
                    brand: 'Emkay',
                    flavor: 'Mango Yogurt Smoothie',
                    vg_pg: '70/30',
                    size: '60ml',
                    nicotine: '3mg / 6mg',
                    origin: 'Indonesia',
                }),
                price: 125000,
                discountPrice: 110000,
                stock: 100,
                weight: 120,
                brand: 'Emkay',
                condition: 'new',
                status: 'active',
                isFeatured: true,
                rating: 4.6,
                totalReviews: 89,
                totalSold: 425,
            },
            {
                categorySlug: 'liquid-dessert',
                name: 'Nasty Juice Cush Man 60ml',
                slug: 'nasty-juice-cush-man-60ml',
                sku: 'NASTY-CUSHMAN-60-001',
                description: `Nasty Juice Cush Man - International Bestseller:

• Rasa: Low Mint Mango
• VG/PG: 70/30
• Nikotin: 3mg
• Ukuran: 60ml
• Made in Malaysia

Mango ripe yang manis dengan subtle mint finish!`,
                specifications: JSON.stringify({
                    brand: 'Nasty Juice',
                    flavor: 'Low Mint Mango',
                    vg_pg: '70/30',
                    size: '60ml',
                    nicotine: '3mg',
                    origin: 'Malaysia',
                }),
                price: 175000,
                discountPrice: 155000,
                stock: 80,
                weight: 120,
                brand: 'Nasty Juice',
                condition: 'new',
                status: 'active',
                isFeatured: true,
                rating: 4.8,
                totalReviews: 156,
                totalSold: 680,
            },
            {
                categorySlug: 'liquid-menthol',
                name: 'Dinner Lady Lemon Tart Ice 60ml',
                slug: 'dinner-lady-lemon-tart-ice-60ml',
                sku: 'DNRL-LEMONTART-ICE-001',
                description: `Dinner Lady Lemon Tart Ice - Award Winning Liquid:

• Rasa: Lemon custard tart dengan mint ice
• VG/PG: 70/30
• Nikotin: 3mg
• Ukuran: 60ml
• Made in UK

Dessert citrus yang perfect dengan cooling sensation!`,
                specifications: JSON.stringify({
                    brand: 'Dinner Lady',
                    flavor: 'Lemon Tart Ice',
                    vg_pg: '70/30',
                    size: '60ml',
                    nicotine: '3mg',
                    origin: 'UK',
                }),
                price: 185000,
                discountPrice: null,
                stock: 60,
                weight: 120,
                brand: 'Dinner Lady',
                condition: 'new',
                status: 'active',
                isFeatured: false,
                rating: 4.7,
                totalReviews: 67,
                totalSold: 289,
            },
            {
                categorySlug: 'liquid-beverage',
                name: 'Indonesian Juice Kopi Susu 60ml',
                slug: 'indonesian-juice-kopi-susu-60ml',
                sku: 'INDJ-KOPISUSU-60-001',
                description: `Indonesian Juice Kopi Susu - Authentic Indonesian Coffee:

• Rasa: Es kopi susu ala coffee shop
• VG/PG: 70/30
• Nikotin: 3mg dan 6mg
• Ukuran: 60ml
• Made in Indonesia

Sensasi ngopi yang familiar dengan creamy milk!`,
                specifications: JSON.stringify({
                    brand: 'Indonesian Juice',
                    flavor: 'Kopi Susu (Coffee Milk)',
                    vg_pg: '70/30',
                    size: '60ml',
                    nicotine: '3mg / 6mg',
                    origin: 'Indonesia',
                }),
                price: 95000,
                discountPrice: 85000,
                stock: 120,
                weight: 120,
                brand: 'Indonesian Juice',
                condition: 'new',
                status: 'active',
                isFeatured: true,
                rating: 4.5,
                totalReviews: 234,
                totalSold: 890,
            },
            {
                categorySlug: 'liquid-tobacco',
                name: 'Black Note Virginia 30ml',
                slug: 'black-note-virginia-30ml',
                sku: 'BLKN-VIRGINIA-30-001',
                description: `Black Note Virginia - Natural Tobacco Extract:

• Rasa: Authentic Virginia tobacco
• VG/PG: 50/50
• Nikotin: 3mg dan 6mg
• Ukuran: 30ml
• Made in USA

Real tobacco flavor untuk ex-smoker yang mencari rasa autentik!`,
                specifications: JSON.stringify({
                    brand: 'Black Note',
                    flavor: 'Virginia Tobacco',
                    vg_pg: '50/50',
                    size: '30ml',
                    nicotine: '3mg / 6mg',
                    origin: 'USA',
                }),
                price: 295000,
                discountPrice: 265000,
                stock: 25,
                weight: 80,
                brand: 'Black Note',
                condition: 'new',
                status: 'active',
                isFeatured: false,
                rating: 4.6,
                totalReviews: 45,
                totalSold: 120,
            },
            {
                categorySlug: 'saltnic-fruity',
                name: 'RELX Pod Pro Grape 30ml',
                slug: 'relx-pod-pro-grape-30ml',
                sku: 'RELX-POD-GRAPE-30-001',
                description: `RELX Pod Pro Grape - Smooth Salt Nic:

• Rasa: Fresh grape dengan subtle mint
• VG/PG: 50/50
• Nikotin: 30mg Salt Nic
• Ukuran: 30ml
• Compatible dengan RELX Infinity & Essential

Sensasi anggur segar yang refreshing!`,
                specifications: JSON.stringify({
                    brand: 'RELX',
                    flavor: 'Fresh Grape',
                    vg_pg: '50/50',
                    size: '30ml',
                    nicotine: '30mg Salt Nic',
                    compatibility: 'RELX Infinity/Essential',
                }),
                price: 145000,
                discountPrice: 130000,
                stock: 150,
                weight: 60,
                brand: 'RELX',
                condition: 'new',
                status: 'active',
                isFeatured: true,
                rating: 4.8,
                totalReviews: 289,
                totalSold: 1250,
            },
            {
                categorySlug: 'saltnic-dessert',
                name: 'Saltnic Labs Vanilla Custard 30ml',
                slug: 'saltnic-labs-vanilla-custard-30ml',
                sku: 'SLAB-VANILLACUST-30-001',
                description: `Saltnic Labs Vanilla Custard - Creamy Delight:

• Rasa: Rich vanilla custard
• VG/PG: 50/50
• Nikotin: 25mg dan 35mg
• Ukuran: 30ml
• Made in USA

Creamy custard yang lembut tanpa throat hit kasar!`,
                specifications: JSON.stringify({
                    brand: 'Saltnic Labs',
                    flavor: 'Vanilla Custard',
                    vg_pg: '50/50',
                    size: '30ml',
                    nicotine: '25mg / 35mg Salt Nic',
                    origin: 'USA',
                }),
                price: 135000,
                discountPrice: null,
                stock: 80,
                weight: 60,
                brand: 'Saltnic Labs',
                condition: 'new',
                status: 'active',
                isFeatured: false,
                rating: 4.6,
                totalReviews: 78,
                totalSold: 340,
            },
            {
                categorySlug: 'saltnic-menthol',
                name: 'Naked 100 Salt Polar Breeze 30ml',
                slug: 'naked-100-salt-polar-breeze-30ml',
                sku: 'NKD100-POLARBR-SALT-001',
                description: `Naked 100 Salt Polar Breeze - Icy Refreshment:

• Rasa: Honeydew melon dengan ice blast
• VG/PG: 50/50
• Nikotin: 35mg dan 50mg
• Ukuran: 30ml
• Made in USA

Extremely refreshing dengan intense cooling!`,
                specifications: JSON.stringify({
                    brand: 'Naked 100',
                    flavor: 'Honeydew Ice',
                    vg_pg: '50/50',
                    size: '30ml',
                    nicotine: '35mg / 50mg Salt Nic',
                    origin: 'USA',
                }),
                price: 165000,
                discountPrice: 150000,
                stock: 65,
                weight: 60,
                brand: 'Naked 100',
                condition: 'new',
                status: 'active',
                isFeatured: true,
                rating: 4.7,
                totalReviews: 112,
                totalSold: 478,
            },
            {
                categorySlug: 'rda',
                name: 'Hellvape Dead Rabbit 3 RDA',
                slug: 'hellvape-dead-rabbit-3-rda',
                sku: 'HELL-DR3-RDA-001',
                description: `Hellvape Dead Rabbit 3 RDA - Flagship Dripper:

• Dual post build deck
• Adjustable side airflow
• 810 & 510 drip tip included
• 24mm diameter
• Deep juice well
• Gold-plated 510 pin
• BF pin included

Best in class flavor dan cloud production!`,
                specifications: JSON.stringify({
                    brand: 'Hellvape',
                    type: 'Dual Coil RDA',
                    diameter: '24mm',
                    deck: 'Dual Post',
                    airflow: 'Side Adjustable',
                    drip_tip: '810 & 510',
                    bf_pin: 'Included',
                }),
                price: 485000,
                discountPrice: 445000,
                stock: 35,
                weight: 80,
                brand: 'Hellvape',
                condition: 'new',
                status: 'active',
                isFeatured: true,
                rating: 4.9,
                totalReviews: 67,
                totalSold: 145,
            },
            {
                categorySlug: 'rta',
                name: 'QP Design Juggerknot V2 RTA',
                slug: 'qp-design-juggerknot-v2-rta',
                sku: 'QPD-JUGGV2-RTA-001',
                description: `QP Design Juggerknot V2 RTA - High End RTA:

• Single coil build deck
• Top airflow leak-proof
• 4ml bubble glass
• 26mm diameter
• Postless deck design
• Premium machining
• Made in Philippines

Flavor beast dengan zero leaking!`,
                specifications: JSON.stringify({
                    brand: 'QP Design',
                    type: 'Single Coil RTA',
                    diameter: '26mm',
                    capacity: '4ml',
                    deck: 'Postless Single',
                    airflow: 'Top',
                    origin: 'Philippines',
                }),
                price: 1250000,
                discountPrice: 1150000,
                stock: 12,
                weight: 120,
                brand: 'QP Design',
                condition: 'new',
                status: 'active',
                isFeatured: false,
                rating: 4.8,
                totalReviews: 28,
                totalSold: 56,
            },
            {
                categorySlug: 'coil-replacement',
                name: 'SMOK RPM 3 Mesh Coil 0.23ohm (5pcs)',
                slug: 'smok-rpm3-mesh-coil-023ohm-5pcs',
                sku: 'SMOK-RPM3-COIL-023-001',
                description: `SMOK RPM 3 Mesh Coil 0.23ohm:

• Resistance: 0.23ohm
• Wattage: 25-30W
• Pack of 5 coils
• Compatible: RPM 3, Nord 5, RPM 5 series
• Mesh structure untuk flavor optimal
• Long lasting

Coil replacement untuk RPM 3 series pod.`,
                specifications: JSON.stringify({
                    brand: 'SMOK',
                    type: 'Mesh Coil',
                    resistance: '0.23ohm',
                    wattage: '25-30W',
                    quantity: '5 pcs',
                    compatibility: 'RPM 3/Nord 5/RPM 5 Series',
                }),
                price: 125000,
                discountPrice: 110000,
                stock: 200,
                weight: 50,
                brand: 'SMOK',
                condition: 'new',
                status: 'active',
                isFeatured: false,
                rating: 4.5,
                totalReviews: 156,
                totalSold: 890,
            },
            {
                categorySlug: 'coil-wire',
                name: 'Coilology Alien Clapton Wire SS316L',
                slug: 'coilology-alien-clapton-wire-ss316l',
                sku: 'COIL-ALIEN-SS316L-001',
                description: `Coilology Alien Clapton Wire SS316L:

• Material: SS316L (Stainless Steel)
• Type: Alien Clapton
• Core: 3x28ga
• Wrap: 36ga
• Length: 10 feet
• TC compatible

Premium pre-built wire untuk rebuilder!`,
                specifications: JSON.stringify({
                    brand: 'Coilology',
                    material: 'SS316L',
                    type: 'Alien Clapton',
                    core: '3x28ga',
                    wrap: '36ga',
                    length: '10 feet',
                    tc_compatible: 'Yes',
                }),
                price: 75000,
                discountPrice: 68000,
                stock: 80,
                weight: 30,
                brand: 'Coilology',
                condition: 'new',
                status: 'active',
                isFeatured: false,
                rating: 4.6,
                totalReviews: 45,
                totalSold: 234,
            },
            {
                categorySlug: 'battery-charger',
                name: 'Sony VTC6 18650 3000mAh 30A',
                slug: 'sony-vtc6-18650-3000mah-30a',
                sku: 'SONY-VTC6-18650-001',
                description: `Sony/Murata VTC6 18650 Battery:

• Capacity: 3000mAh
• Max Continuous: 30A
• Nominal Voltage: 3.6V
• Flat Top
• Authentic dengan QR code verification

Baterai favorit untuk high drain vaping!`,
                specifications: JSON.stringify({
                    brand: 'Sony/Murata',
                    model: 'VTC6',
                    capacity: '3000mAh',
                    continuous_discharge: '30A',
                    voltage: '3.6V',
                    type: 'Flat Top',
                    chemistry: 'Li-ion',
                }),
                price: 145000,
                discountPrice: 130000,
                stock: 150,
                weight: 50,
                brand: 'Sony',
                condition: 'new',
                status: 'active',
                isFeatured: true,
                rating: 4.9,
                totalReviews: 289,
                totalSold: 1560,
            },
            {
                categorySlug: 'battery-charger',
                name: 'Nitecore i4 Intellicharger',
                slug: 'nitecore-i4-intellicharger',
                sku: 'NITC-I4-CHARGER-001',
                description: `Nitecore i4 Intellicharger - Universal Charger:

• 4 bay universal charger
• Compatible: 18650, 21700, 26650, AA, AAA
• Auto detection chemistry
• LED indicators
• Over-charge protection
• Short circuit protection
• IMR compatible

Charger terbaik untuk semua jenis baterai!`,
                specifications: JSON.stringify({
                    brand: 'Nitecore',
                    model: 'i4',
                    slots: '4',
                    input: 'AC 100-240V',
                    compatible: '18650/21700/26650/AA/AAA',
                    features: 'Auto detect, LED indicator',
                    protection: 'Overcharge/Short circuit',
                }),
                price: 395000,
                discountPrice: 365000,
                stock: 45,
                weight: 250,
                brand: 'Nitecore',
                condition: 'new',
                status: 'active',
                isFeatured: false,
                rating: 4.8,
                totalReviews: 112,
                totalSold: 345,
            },
            {
                categorySlug: 'cotton',
                name: 'Cotton Bacon Prime',
                slug: 'cotton-bacon-prime',
                sku: 'CTNBCN-PRIME-001',
                description: `Cotton Bacon Prime - Premium Wicking Cotton:

• 100% USA grown cotton
• Organic & unbleached
• Zero break-in time
• Superior wicking
• Clean flavor
• Pack: 10 strips

Kapas terbaik untuk wicking atomizer!`,
                specifications: JSON.stringify({
                    brand: 'Wick n Vape',
                    type: 'Organic Cotton',
                    quantity: '10 strips',
                    origin: 'USA',
                    features: 'Zero break-in, Superior wicking',
                }),
                price: 65000,
                discountPrice: 58000,
                stock: 200,
                weight: 20,
                brand: 'Wick n Vape',
                condition: 'new',
                status: 'active',
                isFeatured: true,
                rating: 4.7,
                totalReviews: 345,
                totalSold: 2150,
            },
            {
                categorySlug: 'tool-kit',
                name: 'Coil Master DIY Kit V3',
                slug: 'coil-master-diy-kit-v3',
                sku: 'COILM-DIYKITV3-001',
                description: `Coil Master DIY Kit V3 - Complete Building Set:

• Coil jig dengan 6 diameter
• Ceramic tweezers
• Diagonal pliers
• Needle nose pliers
• Scissors
• Screwdrivers set
• Ohm meter
• Premium carrying case

Semua yang dibutuhkan untuk building!`,
                specifications: JSON.stringify({
                    brand: 'Coil Master',
                    contents: 'Coil jig, Tweezers, Pliers, Scissors, Screwdrivers, Ohm meter',
                    case: 'Premium carrying case',
                    coil_sizes: '2.0-4.0mm',
                }),
                price: 485000,
                discountPrice: 445000,
                stock: 25,
                weight: 500,
                brand: 'Coil Master',
                condition: 'new',
                status: 'active',
                isFeatured: false,
                rating: 4.8,
                totalReviews: 67,
                totalSold: 189,
            },
            {
                categorySlug: 'pod-cartridge',
                name: 'Voopoo ITO Cartridge 2ml (2pcs)',
                slug: 'voopoo-ito-cartridge-2ml-2pcs',
                sku: 'VOOP-ITO-CART-2ML-001',
                description: `Voopoo ITO Cartridge Replacement:

• Capacity: 2ml
• Pack of 2 cartridges
• Compatible: Argus P1, Drag Q, Doric E
• Side filling
• Coil included: ITO-M2 1.0ohm

Cartridge pengganti untuk pod Voopoo series!`,
                specifications: JSON.stringify({
                    brand: 'Voopoo',
                    capacity: '2ml',
                    quantity: '2 pcs',
                    coil: 'ITO-M2 1.0ohm included',
                    compatibility: 'Argus P1/Drag Q/Doric E',
                    filling: 'Side fill',
                }),
                price: 85000,
                discountPrice: 78000,
                stock: 120,
                weight: 40,
                brand: 'Voopoo',
                condition: 'new',
                status: 'active',
                isFeatured: false,
                rating: 4.5,
                totalReviews: 89,
                totalSold: 456,
            },
            {
                categorySlug: 'disposable-1500',
                name: 'IGET Bar Plus 6000 Puffs',
                slug: 'iget-bar-plus-6000-puffs',
                sku: 'IGET-BARPLUS-6000-001',
                description: `IGET Bar Plus 6000 Puffs Disposable:

• 6000 Puffs
• Rechargeable via Type-C
• 16ml pre-filled e-liquid
• Nikotin: 5%
• 600mAh battery
• Multiple flavors available

Long lasting disposable dengan rasa premium!`,
                specifications: JSON.stringify({
                    brand: 'IGET',
                    puffs: '6000',
                    capacity: '16ml',
                    nicotine: '5%',
                    battery: '600mAh',
                    rechargeable: 'Yes (Type-C)',
                    type: 'Disposable',
                }),
                price: 165000,
                discountPrice: 149000,
                stock: 100,
                weight: 80,
                brand: 'IGET',
                condition: 'new',
                status: 'active',
                isFeatured: true,
                rating: 4.6,
                totalReviews: 234,
                totalSold: 890,
            },
            {
                categorySlug: 'disposable-600',
                name: 'Elf Bar 600 Puffs',
                slug: 'elf-bar-600-puffs',
                sku: 'ELFBAR-600-001',
                description: `Elf Bar 600 Puffs Disposable:

• 600 Puffs
• 2ml pre-filled e-liquid
• Nikotin: 2%
• 550mAh battery
• Compact design
• Draw activated

Simple & tasty disposable!`,
                specifications: JSON.stringify({
                    brand: 'Elf Bar',
                    puffs: '600',
                    capacity: '2ml',
                    nicotine: '2%',
                    battery: '550mAh',
                    rechargeable: 'No',
                    type: 'Disposable',
                }),
                price: 75000,
                discountPrice: 68000,
                stock: 150,
                weight: 40,
                brand: 'Elf Bar',
                condition: 'new',
                status: 'active',
                isFeatured: false,
                rating: 4.4,
                totalReviews: 178,
                totalSold: 720,
            },
        ];
        for (const product of products) {
            const category = categoryMap.get(product.categorySlug);
            await Product.updateOrCreate({ slug: product.slug }, {
                categoryId: category?.id || null,
                name: product.name,
                slug: product.slug,
                sku: product.sku,
                description: product.description,
                specifications: product.specifications,
                price: product.price,
                discountPrice: product.discountPrice,
                stock: product.stock,
                weight: product.weight,
                brand: product.brand,
                condition: product.condition,
                status: product.status,
                isFeatured: product.isFeatured,
                rating: product.rating,
                totalReviews: product.totalReviews,
                totalSold: product.totalSold,
            });
        }
        logger.info('✅ Products seeded:');
        logger.info(`   ${products.length} products created`);
    }
}
//# sourceMappingURL=product_seeder.js.map
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Category from '#models/category';
import logger from '@adonisjs/core/services/logger';
export default class extends BaseSeeder {
    async run() {
        const mainCategories = [
            {
                name: 'Pod System',
                slug: 'pod-system',
                description: 'Perangkat vape portabel dengan sistem pod yang mudah digunakan, cocok untuk pemula dan pengguna yang menginginkan kepraktisan.',
                image: '/images/categories/pod-system.jpg',
                sortOrder: 1,
            },
            {
                name: 'Mod & Kit',
                slug: 'mod-kit',
                description: 'Box mod dan starter kit lengkap untuk pengalaman vaping yang lebih advanced dengan fitur pengaturan power dan temperature control.',
                image: '/images/categories/mod-kit.jpg',
                sortOrder: 2,
            },
            {
                name: 'Liquid Premium',
                slug: 'liquid-premium',
                description: 'E-liquid premium freebase dengan berbagai pilihan rasa dan level nikotin untuk mod dan RDA/RTA.',
                image: '/images/categories/liquid-premium.jpg',
                sortOrder: 3,
            },
            {
                name: 'Salt Nicotine',
                slug: 'salt-nicotine',
                description: 'E-liquid salt nicotine dengan tingkat nikotin tinggi, sensasi throat hit yang halus, ideal untuk pod system.',
                image: '/images/categories/salt-nicotine.jpg',
                sortOrder: 4,
            },
            {
                name: 'Atomizer & Coil',
                slug: 'atomizer-coil',
                description: 'RDA, RTA, RDTA, dan berbagai jenis coil/kawat untuk kebutuhan rebuildable atomizer.',
                image: '/images/categories/atomizer-coil.jpg',
                sortOrder: 5,
            },
            {
                name: 'Accessories',
                slug: 'accessories',
                description: 'Aksesoris vape termasuk baterai, charger, cotton, tool kit, dan perlengkapan lainnya.',
                image: '/images/categories/accessories.jpg',
                sortOrder: 6,
            },
            {
                name: 'Disposable',
                slug: 'disposable',
                description: 'Vape sekali pakai dengan berbagai rasa, praktis tanpa perlu isi ulang atau charging.',
                image: '/images/categories/disposable.jpg',
                sortOrder: 7,
            },
        ];
        const createdMainCategories = {};
        for (const category of mainCategories) {
            const created = await Category.updateOrCreate({ slug: category.slug }, {
                name: category.name,
                slug: category.slug,
                description: category.description,
                image: category.image,
                sortOrder: category.sortOrder,
                isActive: true,
            });
            createdMainCategories[category.slug] = created;
        }
        const subCategories = [
            {
                name: 'Closed Pod',
                slug: 'closed-pod',
                description: 'Pod dengan cartridge tertutup, tidak bisa diisi ulang',
                parentSlug: 'pod-system',
                sortOrder: 1,
            },
            {
                name: 'Open Pod',
                slug: 'open-pod',
                description: 'Pod dengan cartridge terbuka yang bisa diisi ulang liquid',
                parentSlug: 'pod-system',
                sortOrder: 2,
            },
            {
                name: 'AIO Pod',
                slug: 'aio-pod',
                description: 'All-in-one pod system dengan fitur lengkap',
                parentSlug: 'pod-system',
                sortOrder: 3,
            },
            {
                name: 'Box Mod',
                slug: 'box-mod',
                description: 'Mod dengan baterai internal atau external dalam bentuk box',
                parentSlug: 'mod-kit',
                sortOrder: 1,
            },
            {
                name: 'Tube Mod',
                slug: 'tube-mod',
                description: 'Mechanical mod atau regulated mod dalam bentuk tabung',
                parentSlug: 'mod-kit',
                sortOrder: 2,
            },
            {
                name: 'Starter Kit',
                slug: 'starter-kit',
                description: 'Paket lengkap mod dengan tank untuk pemula',
                parentSlug: 'mod-kit',
                sortOrder: 3,
            },
            {
                name: 'Squonk Mod',
                slug: 'squonk-mod',
                description: 'Bottom feeder mod dengan botol liquid internal',
                parentSlug: 'mod-kit',
                sortOrder: 4,
            },
            {
                name: 'Fruity',
                slug: 'liquid-fruity',
                description: 'E-liquid dengan rasa buah-buahan segar',
                parentSlug: 'liquid-premium',
                sortOrder: 1,
            },
            {
                name: 'Dessert',
                slug: 'liquid-dessert',
                description: 'E-liquid dengan rasa dessert dan bakery',
                parentSlug: 'liquid-premium',
                sortOrder: 2,
            },
            {
                name: 'Tobacco',
                slug: 'liquid-tobacco',
                description: 'E-liquid dengan rasa tembakau klasik',
                parentSlug: 'liquid-premium',
                sortOrder: 3,
            },
            {
                name: 'Menthol & Mint',
                slug: 'liquid-menthol',
                description: 'E-liquid dengan sensasi dingin dan mint',
                parentSlug: 'liquid-premium',
                sortOrder: 4,
            },
            {
                name: 'Beverage',
                slug: 'liquid-beverage',
                description: 'E-liquid dengan rasa minuman seperti kopi, milkshake',
                parentSlug: 'liquid-premium',
                sortOrder: 5,
            },
            {
                name: 'Salt Nic Fruity',
                slug: 'saltnic-fruity',
                description: 'Salt nicotine rasa buah-buahan',
                parentSlug: 'salt-nicotine',
                sortOrder: 1,
            },
            {
                name: 'Salt Nic Dessert',
                slug: 'saltnic-dessert',
                description: 'Salt nicotine rasa dessert',
                parentSlug: 'salt-nicotine',
                sortOrder: 2,
            },
            {
                name: 'Salt Nic Tobacco',
                slug: 'saltnic-tobacco',
                description: 'Salt nicotine rasa tembakau',
                parentSlug: 'salt-nicotine',
                sortOrder: 3,
            },
            {
                name: 'Salt Nic Menthol',
                slug: 'saltnic-menthol',
                description: 'Salt nicotine dengan sensasi dingin',
                parentSlug: 'salt-nicotine',
                sortOrder: 4,
            },
            {
                name: 'RDA',
                slug: 'rda',
                description: 'Rebuildable Dripping Atomizer untuk dripping',
                parentSlug: 'atomizer-coil',
                sortOrder: 1,
            },
            {
                name: 'RTA',
                slug: 'rta',
                description: 'Rebuildable Tank Atomizer dengan tank',
                parentSlug: 'atomizer-coil',
                sortOrder: 2,
            },
            {
                name: 'RDTA',
                slug: 'rdta',
                description: 'Rebuildable Dripping Tank Atomizer',
                parentSlug: 'atomizer-coil',
                sortOrder: 3,
            },
            {
                name: 'Sub Ohm Tank',
                slug: 'sub-ohm-tank',
                description: 'Tank dengan coil replacement untuk sub ohm vaping',
                parentSlug: 'atomizer-coil',
                sortOrder: 4,
            },
            {
                name: 'Coil Replacement',
                slug: 'coil-replacement',
                description: 'Coil pengganti untuk berbagai jenis tank',
                parentSlug: 'atomizer-coil',
                sortOrder: 5,
            },
            {
                name: 'Coil Wire',
                slug: 'coil-wire',
                description: 'Kawat untuk building coil (Kanthal, NiChrome, SS)',
                parentSlug: 'atomizer-coil',
                sortOrder: 6,
            },
            {
                name: 'Battery & Charger',
                slug: 'battery-charger',
                description: 'Baterai 18650, 21700 dan charger',
                parentSlug: 'accessories',
                sortOrder: 1,
            },
            {
                name: 'Cotton',
                slug: 'cotton',
                description: 'Kapas untuk wicking atomizer',
                parentSlug: 'accessories',
                sortOrder: 2,
            },
            {
                name: 'Tool Kit',
                slug: 'tool-kit',
                description: 'Peralatan untuk building dan maintenance',
                parentSlug: 'accessories',
                sortOrder: 3,
            },
            {
                name: 'Drip Tip',
                slug: 'drip-tip',
                description: 'Mouthpiece pengganti dengan berbagai material',
                parentSlug: 'accessories',
                sortOrder: 4,
            },
            {
                name: 'Case & Bag',
                slug: 'case-bag',
                description: 'Tas dan case untuk menyimpan vape',
                parentSlug: 'accessories',
                sortOrder: 5,
            },
            {
                name: 'Pod Cartridge',
                slug: 'pod-cartridge',
                description: 'Cartridge pengganti untuk pod system',
                parentSlug: 'accessories',
                sortOrder: 6,
            },
            {
                name: 'Disposable 600 Puffs',
                slug: 'disposable-600',
                description: 'Disposable vape 600 puffs',
                parentSlug: 'disposable',
                sortOrder: 1,
            },
            {
                name: 'Disposable 1500+ Puffs',
                slug: 'disposable-1500',
                description: 'Disposable vape 1500 puffs atau lebih',
                parentSlug: 'disposable',
                sortOrder: 2,
            },
            {
                name: 'Disposable Rechargeable',
                slug: 'disposable-rechargeable',
                description: 'Disposable yang bisa di-charge',
                parentSlug: 'disposable',
                sortOrder: 3,
            },
        ];
        for (const subCategory of subCategories) {
            const parent = createdMainCategories[subCategory.parentSlug];
            await Category.updateOrCreate({ slug: subCategory.slug }, {
                name: subCategory.name,
                slug: subCategory.slug,
                description: subCategory.description,
                parentId: parent?.id,
                sortOrder: subCategory.sortOrder,
                isActive: true,
            });
        }
        logger.info('✅ Categories seeded:');
        logger.info(`   ${mainCategories.length} main categories`);
        logger.info(`   ${subCategories.length} sub categories`);
    }
}
//# sourceMappingURL=category_seeder.js.map
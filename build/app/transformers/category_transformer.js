const CATEGORY_ICONS = {
    'pod-system': 'i-lucide-cpu',
    'mod-kit': 'i-lucide-zap',
    'liquid-premium': 'i-lucide-flask-conical',
    'salt-nicotine': 'i-lucide-droplets',
    'atomizer-coil': 'i-lucide-circle-dot',
    'accessories': 'i-lucide-package',
    'disposable': 'i-lucide-battery',
};
const CATEGORY_NAV_ICONS = {
    'pod-system': 'i-heroicons-device-phone-mobile',
    'mod-kit': 'i-heroicons-cpu-chip',
    'liquid-premium': 'i-heroicons-beaker',
    'salt-nicotine': 'i-heroicons-sparkles',
    'atomizer-coil': 'i-heroicons-cog-6-tooth',
    'accessories': 'i-heroicons-puzzle-piece',
    'disposable': 'i-heroicons-battery-50',
};
const CATEGORY_COLORS = {
    'pod-system': 'purple',
    'mod-kit': 'pink',
    'liquid-premium': 'blue',
    'salt-nicotine': 'cyan',
    'atomizer-coil': 'violet',
    'accessories': 'fuchsia',
    'disposable': 'orange',
};
export default class CategoryTransformer {
    static toListDTO(category) {
        return {
            id: category.id,
            name: category.name,
            slug: category.slug,
            description: category.description,
            image: category.image,
            icon: CATEGORY_ICONS[category.slug] || 'i-lucide-box',
            href: `/collections/${category.slug}`,
            color: CATEGORY_COLORS[category.slug] || 'primary',
        };
    }
    static toListDTOs(categories) {
        return categories.map((category) => this.toListDTO(category));
    }
    static toNavDTO(category) {
        return {
            label: category.name,
            to: `/collections/${category.slug}`,
            icon: CATEGORY_NAV_ICONS[category.slug] || 'i-heroicons-cube',
        };
    }
    static toNavDTOs(categories) {
        return categories.map((category) => this.toNavDTO(category));
    }
}
//# sourceMappingURL=category_transformer.js.map
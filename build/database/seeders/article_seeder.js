import { BaseSeeder } from '@adonisjs/lucid/seeders';
import Article from '#models/article';
import User from '#models/user';
import { DateTime } from 'luxon';
import logger from '@adonisjs/core/services/logger';
import { generateBlockId } from '#types/article_blocks';
function createBlock(type, data) {
    return {
        id: generateBlockId(),
        type,
        data,
    };
}
export default class ArticleSeeder extends BaseSeeder {
    async run() {
        const admin = await User.query().where('role', 'admin').first();
        const authorId = admin?.id || 1;
        const articles = [
            {
                title: 'Cara Memilih Pod System yang Tepat untuk Pemula',
                slug: 'cara-memilih-pod-system-untuk-pemula',
                excerpt: 'Panduan lengkap memilih pod system pertama Anda. Dari kapasitas baterai hingga jenis coil yang cocok untuk pemula.',
                blocks: [
                    createBlock('heading', { text: 'Memilih Pod System Pertama Anda', level: 2 }),
                    createBlock('paragraph', {
                        text: 'Bagi Anda yang baru memulai perjalanan vaping, memilih pod system yang tepat bisa menjadi tantangan tersendiri. Dengan begitu banyak pilihan di pasaran, artikel ini akan membantu Anda membuat keputusan yang tepat.',
                    }),
                    createBlock('toc', { title: 'Daftar Isi', maxDepth: 3 }),
                    createBlock('image', {
                        src: '/images/articles/pod-system-guide.jpg',
                        alt: 'Berbagai jenis pod system untuk pemula',
                        caption: 'Pod system populer di tahun 2024',
                        alignment: 'center',
                    }),
                    createBlock('heading', {
                        text: '1. Kapasitas Baterai',
                        level: 3,
                        anchor: 'kapasitas-baterai',
                    }),
                    createBlock('paragraph', {
                        text: 'Untuk pemula, kami merekomendasikan pod system dengan baterai minimal <strong>500mAh</strong>. Ini akan memberikan daya tahan yang cukup untuk sehari penuh penggunaan moderate.',
                    }),
                    createBlock('alert', {
                        type: 'tip',
                        title: 'Rekomendasi Baterai',
                        text: 'VOOPOO Drag Nano 2 (800mAh) atau Vaporesso XROS 3 (1000mAh) menawarkan kapasitas yang sangat baik untuk pemula.',
                    }),
                    createBlock('heading', { text: '2. Jenis Coil', level: 3, anchor: 'jenis-coil' }),
                    createBlock('paragraph', { text: 'Ada dua jenis coil utama yang perlu Anda ketahui:' }),
                    createBlock('list', {
                        style: 'unordered',
                        items: [
                            {
                                text: '<strong>Mesh Coil</strong> - Memberikan rasa yang lebih kaya dan produksi vapor yang lebih baik',
                            },
                            {
                                text: '<strong>Regular Coil</strong> - Lebih hemat liquid dan cocok untuk MTL (Mouth-to-Lung)',
                            },
                        ],
                    }),
                    createBlock('heading', { text: '3. Kapasitas Pod', level: 3, anchor: 'kapasitas-pod' }),
                    createBlock('paragraph', {
                        text: 'Pod dengan kapasitas <strong>2ml</strong> adalah standar yang baik untuk pemula. Cukup untuk sehari penggunaan tanpa perlu sering-sering refill.',
                    }),
                    createBlock('heading', { text: '4. Fitur Keamanan', level: 3, anchor: 'fitur-keamanan' }),
                    createBlock('paragraph', {
                        text: 'Pastikan pod system Anda memiliki fitur keamanan seperti:',
                    }),
                    createBlock('list', {
                        style: 'checklist',
                        items: [
                            { text: 'Short circuit protection', checked: true },
                            { text: 'Over-discharge protection', checked: true },
                            { text: 'Low voltage protection', checked: true },
                        ],
                    }),
                    createBlock('divider', { style: 'gradient', spacing: 'lg' }),
                    createBlock('heading', {
                        text: 'Rekomendasi Pod System untuk Pemula',
                        level: 3,
                        anchor: 'rekomendasi',
                    }),
                    createBlock('comparison-table', {
                        title: 'Perbandingan Pod System Populer',
                        headers: ['Vaporesso XROS 3', 'VOOPOO Drag Nano 2', 'Caliburn G2'],
                        features: [
                            { label: 'Kapasitas Baterai', values: ['1000mAh', '800mAh', '750mAh'] },
                            { label: 'Kapasitas Pod', values: ['2ml', '2ml', '2ml'] },
                            { label: 'Mesh Coil', values: [true, true, true] },
                            { label: 'Adjustable Airflow', values: [true, true, false] },
                            { label: 'Harga', values: ['Rp 250.000', 'Rp 220.000', 'Rp 200.000'] },
                        ],
                        highlightColumn: 0,
                    }),
                    createBlock('cta-box', {
                        title: 'Butuh Bantuan Memilih?',
                        description: 'Tim kami siap membantu Anda menemukan pod system yang tepat sesuai kebutuhan.',
                        buttonText: 'Konsultasi Gratis',
                        buttonUrl: '/contact',
                        style: 'gradient',
                    }),
                ],
                thumbnail: '/images/articles/pod-system-guide.jpg',
                category: 'tips',
                tags: ['pod system', 'pemula', 'vape guide', 'tips vaping'],
                status: 'published',
                isFeatured: true,
                isPinned: true,
                viewCount: 1250,
                likeCount: 89,
                shareCount: 45,
                authorId,
                publishedAt: DateTime.now().minus({ days: 2 }),
            },
            {
                title: 'Review Lengkap: Vaporesso XROS 3 - Pod System Terbaik 2024',
                slug: 'review-vaporesso-xros-3',
                excerpt: 'Review mendalam Vaporesso XROS 3 dengan fitur adjustable airflow dan baterai 1000mAh. Apakah layak dibeli?',
                blocks: [
                    createBlock('heading', { text: 'Vaporesso XROS 3 - Review Lengkap', level: 2 }),
                    createBlock('paragraph', {
                        text: 'Vaporesso XROS 3 adalah iterasi terbaru dari seri XROS yang sangat populer. Dengan peningkatan signifikan dari versi sebelumnya, apakah pod system ini layak menjadi pilihan Anda? Mari kita bahas.',
                        dropCap: true,
                    }),
                    createBlock('image', {
                        src: '/images/articles/xros-3-review.jpg',
                        alt: 'Vaporesso XROS 3 dalam berbagai warna',
                        caption: 'Vaporesso XROS 3 hadir dalam 8 pilihan warna menarik',
                        alignment: 'full',
                    }),
                    createBlock('heading', { text: 'Spesifikasi', level: 3 }),
                    createBlock('table', {
                        headers: ['Spesifikasi', 'Detail'],
                        rows: [
                            ['Kapasitas Baterai', '1000mAh'],
                            ['Kapasitas Pod', '2ml'],
                            ['Coil Resistance', '0.6Ω & 1.0Ω'],
                            ['Output', '11-16W (Auto)'],
                            ['Charging', 'Type-C 1A'],
                            ['Material', 'Zinc Alloy + Leather'],
                        ],
                        striped: true,
                        bordered: true,
                    }),
                    createBlock('heading', { text: 'Penilaian Kami', level: 3 }),
                    createBlock('rating-box', {
                        title: 'Score Keseluruhan',
                        overallRating: 4.5,
                        maxRating: 5,
                        criteria: [
                            { label: 'Build Quality', rating: 4.8 },
                            { label: 'Flavor Production', rating: 4.5 },
                            { label: 'Battery Life', rating: 4.6 },
                            { label: 'Ease of Use', rating: 4.7 },
                            { label: 'Value for Money', rating: 4.2 },
                        ],
                        verdict: 'Vaporesso XROS 3 adalah pilihan excellent untuk pemula maupun veteran. Adjustable airflow dan baterai besar menjadi nilai plus.',
                        style: 'detailed',
                    }),
                    createBlock('heading', { text: 'Kelebihan & Kekurangan', level: 3 }),
                    createBlock('pros-cons', {
                        style: 'side-by-side',
                        pros: [
                            'Baterai 1000mAh sangat awet',
                            'Adjustable airflow untuk customisasi',
                            'Build quality premium dengan leather texture',
                            'Dual activation (button + auto-draw)',
                            'Flavor excellent dengan mesh coil',
                        ],
                        cons: [
                            'Harga lebih mahal dari kompetitor',
                            'Pod tidak compatible dengan XROS versi lama',
                            'Tidak ada wattage display',
                        ],
                    }),
                    createBlock('heading', { text: 'Video Review', level: 3 }),
                    createBlock('embed', {
                        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                        provider: 'youtube',
                        caption: 'Video review lengkap Vaporesso XROS 3',
                        aspectRatio: '16:9',
                    }),
                    createBlock('heading', { text: 'Kesimpulan', level: 3 }),
                    createBlock('paragraph', {
                        text: 'Vaporesso XROS 3 adalah <strong>pod system terbaik di kelasnya</strong> saat ini. Dengan kombinasi fitur premium, build quality excellent, dan performa flavor yang outstanding, pod ini sangat layak untuk investasi jangka panjang.',
                    }),
                    createBlock('button', {
                        text: 'Beli Vaporesso XROS 3',
                        url: '/produk/vaporesso-xros-3',
                        style: 'primary',
                        size: 'lg',
                        icon: 'i-lucide-shopping-cart',
                        iconPosition: 'left',
                        alignment: 'center',
                    }),
                ],
                thumbnail: '/images/articles/xros-3-review.jpg',
                category: 'review',
                tags: ['review', 'vaporesso', 'xros 3', 'pod system'],
                status: 'published',
                isFeatured: true,
                isPinned: false,
                viewCount: 2150,
                likeCount: 156,
                shareCount: 78,
                authorId,
                publishedAt: DateTime.now().minus({ days: 5 }),
            },
            {
                title: 'Regulasi Vape Indonesia 2024: Apa yang Perlu Anda Ketahui',
                slug: 'regulasi-vape-indonesia-2024',
                excerpt: 'Update terbaru mengenai regulasi vape di Indonesia. Cukai, batasan usia, dan aturan penjualan online.',
                blocks: [
                    createBlock('heading', { text: 'Update Regulasi Vape 2024', level: 2 }),
                    createBlock('alert', {
                        type: 'warning',
                        title: 'Informasi Penting',
                        text: 'Artikel ini berisi rangkuman regulasi. Untuk informasi resmi, silakan cek website Kementerian Keuangan dan BPOM.',
                    }),
                    createBlock('paragraph', {
                        text: 'Pemerintah Indonesia telah mengeluarkan beberapa kebijakan baru terkait produk vape pada tahun 2024. Berikut rangkuman lengkap yang perlu Anda ketahui sebagai konsumen maupun pelaku usaha.',
                    }),
                    createBlock('heading', { text: 'Tarif Cukai Terbaru', level: 3 }),
                    createBlock('paragraph', {
                        text: 'Per 1 Januari 2024, tarif cukai hasil pengolahan tembakau lainnya (HPTL) termasuk liquid vape mengalami penyesuaian:',
                    }),
                    createBlock('table', {
                        headers: ['Jenis Produk', 'Tarif Cukai', 'Keterangan'],
                        rows: [
                            ['Liquid Closed System', 'Rp 6.838/ml', 'Cartridge pre-filled'],
                            ['Liquid Open System', 'Rp 1.198/ml', 'Refillable'],
                            ['Disposable Vape', 'Rp 6.838/ml', 'Sekali pakai'],
                        ],
                        bordered: true,
                    }),
                    createBlock('heading', { text: 'Batasan Usia', level: 3 }),
                    createBlock('paragraph', {
                        text: 'Sesuai UU No. 39 Tahun 2007 tentang Cukai, penjualan produk vape hanya diperbolehkan untuk konsumen berusia <strong>minimal 18 tahun</strong>. Retailer wajib melakukan verifikasi usia.',
                    }),
                    createBlock('heading', { text: 'Aturan Penjualan Online', level: 3 }),
                    createBlock('list', {
                        style: 'ordered',
                        items: [
                            { text: 'Wajib memiliki NPPBKC (Nomor Pokok Pengusaha Barang Kena Cukai)' },
                            { text: 'Produk harus memiliki pita cukai yang sah' },
                            { text: 'Verifikasi usia pembeli melalui KTP' },
                            { text: 'Larangan iklan produk vape di platform digital' },
                        ],
                    }),
                    createBlock('accordion', {
                        items: [
                            {
                                title: 'Apakah vape legal di Indonesia?',
                                content: 'Ya, vape legal di Indonesia dengan syarat produk memiliki pita cukai yang sah dan dijual kepada konsumen berusia minimal 18 tahun.',
                            },
                            {
                                title: 'Bagaimana cara mengecek keaslian pita cukai?',
                                content: 'Anda bisa mengecek keaslian pita cukai melalui aplikasi resmi Bea Cukai atau website cukai.kemenkeu.go.id dengan memasukkan kode yang tertera pada pita.',
                            },
                            {
                                title: 'Apakah bisa membawa vape ke luar negeri?',
                                content: 'Peraturan berbeda di setiap negara. Beberapa negara seperti Singapura dan Thailand melarang total kepemilikan vape. Selalu cek regulasi negara tujuan sebelum bepergian.',
                            },
                        ],
                        allowMultiple: true,
                        style: 'bordered',
                    }),
                    createBlock('newsletter', {
                        title: 'Dapatkan Update Regulasi Terbaru',
                        description: 'Subscribe newsletter kami untuk mendapatkan informasi regulasi dan berita vape terkini.',
                        buttonText: 'Subscribe',
                        style: 'card',
                    }),
                ],
                thumbnail: '/images/articles/regulasi-vape.jpg',
                category: 'news',
                tags: ['regulasi', 'cukai', 'berita vape', 'indonesia'],
                status: 'published',
                isFeatured: false,
                isPinned: false,
                viewCount: 3420,
                likeCount: 89,
                shareCount: 234,
                authorId,
                publishedAt: DateTime.now().minus({ days: 1 }),
            },
            {
                title: 'Panduan Lengkap Coil Building untuk Pemula',
                slug: 'panduan-coil-building-pemula',
                excerpt: 'Pelajari dasar-dasar coil building dari nol. Termasuk tools yang dibutuhkan, jenis wire, dan step-by-step tutorial.',
                blocks: [
                    createBlock('heading', { text: 'Panduan Coil Building untuk Pemula', level: 2 }),
                    createBlock('paragraph', {
                        text: 'Coil building adalah seni membuat coil sendiri untuk atomizer rebuildable. Selain lebih hemat, coil building memungkinkan Anda customize vaping experience sesuai preferensi.',
                        dropCap: true,
                    }),
                    createBlock('alert', {
                        type: 'warning',
                        title: 'Peringatan Keamanan',
                        text: "Coil building memerlukan pengetahuan dasar tentang Ohm's Law dan keamanan baterai. Pastikan Anda memahami konsep ini sebelum memulai.",
                    }),
                    createBlock('heading', { text: 'Tools yang Dibutuhkan', level: 3 }),
                    createBlock('gallery', {
                        images: [
                            { src: '/images/articles/coil-jig.jpg', alt: 'Coil jig', caption: 'Coil Jig' },
                            {
                                src: '/images/articles/wire-cutter.jpg',
                                alt: 'Wire cutter',
                                caption: 'Wire Cutter',
                            },
                            {
                                src: '/images/articles/ceramic-tweezer.jpg',
                                alt: 'Ceramic tweezer',
                                caption: 'Ceramic Tweezer',
                            },
                            { src: '/images/articles/ohm-meter.jpg', alt: 'Ohm meter', caption: 'Ohm Meter' },
                        ],
                        columns: 4,
                        gap: 'md',
                    }),
                    createBlock('list', {
                        style: 'checklist',
                        items: [
                            { text: 'Coil Jig (diameter 2.5mm - 3mm)', checked: true },
                            { text: 'Wire Cutter', checked: true },
                            { text: 'Ceramic Tweezer', checked: true },
                            { text: 'Ohm Meter atau Mod dengan fitur ohm reading', checked: true },
                            { text: 'Cotton (organic cotton atau vape cotton)', checked: true },
                            { text: 'Wire (Kanthal, Nichrome, atau SS)', checked: false },
                        ],
                    }),
                    createBlock('heading', { text: 'Jenis-Jenis Wire', level: 3 }),
                    createBlock('table', {
                        headers: ['Material', 'Resistivitas', 'TCR Support', 'Best For'],
                        rows: [
                            ['Kanthal A1', 'Tinggi', 'Tidak', 'Wattage Mode'],
                            ['Nichrome N80', 'Sedang', 'Tidak', 'Ramp-up Cepat'],
                            ['SS 316L', 'Rendah', 'Ya', 'TC Mode'],
                            ['Ni200', 'Sangat Rendah', 'Ya', 'TC Mode Only'],
                        ],
                        striped: true,
                        bordered: true,
                    }),
                    createBlock('heading', { text: 'Step-by-Step Tutorial', level: 3 }),
                    createBlock('heading', { text: 'Step 1: Persiapan Wire', level: 4 }),
                    createBlock('paragraph', {
                        text: 'Potong wire sekitar 10-15cm. Untuk single coil dengan 6 wraps dan diameter 3mm, Anda membutuhkan sekitar 10cm wire.',
                    }),
                    createBlock('heading', { text: 'Step 2: Wrapping', level: 4 }),
                    createBlock('paragraph', {
                        text: 'Masukkan coil jig ke wire, kemudian wrap dengan rapat. Pastikan tidak ada gap antar wrap untuk coil reguler.',
                    }),
                    createBlock('code', {
                        language: 'text',
                        filename: "Rumus Ohm's Law",
                        code: `V = I × R
P = V × I
P = I² × R
P = V² / R

Keterangan:
V = Voltage (Volt)
I = Current (Ampere)
R = Resistance (Ohm)
P = Power (Watt)`,
                    }),
                    createBlock('cta-box', {
                        title: 'Butuh Supplies Coil Building?',
                        description: 'Kami menyediakan berbagai wire, cotton, dan tools untuk coil building dengan harga terbaik.',
                        buttonText: 'Lihat Produk',
                        buttonUrl: '/kategori/diy-supplies',
                        style: 'default',
                    }),
                ],
                thumbnail: '/images/articles/coil-building.jpg',
                banner: '/images/articles/coil-building-banner.jpg',
                category: 'guide',
                tags: ['coil building', 'diy', 'panduan', 'rebuildable'],
                status: 'published',
                isFeatured: true,
                isPinned: false,
                viewCount: 4520,
                likeCount: 312,
                shareCount: 156,
                authorId,
                publishedAt: DateTime.now().minus({ days: 7 }),
            },
            {
                title: 'Flash Sale Ramadhan 2024 - Diskon Hingga 50%!',
                slug: 'flash-sale-ramadhan-2024',
                excerpt: 'Promo spesial Ramadhan! Dapatkan diskon hingga 50% untuk berbagai produk vape pilihan. Periode terbatas!',
                blocks: [
                    createBlock('heading', {
                        text: 'Flash Sale Ramadhan 2024 🌙',
                        level: 2,
                        alignment: 'center',
                    }),
                    createBlock('paragraph', {
                        text: 'Marhaban ya Ramadhan! Ogitu.com menghadirkan promo spesial selama bulan suci Ramadhan. Dapatkan diskon hingga 50% untuk produk-produk pilihan!',
                        alignment: 'center',
                    }),
                    createBlock('image', {
                        src: '/images/articles/ramadhan-sale.jpg',
                        alt: 'Flash Sale Ramadhan 2024',
                        alignment: 'full',
                    }),
                    createBlock('alert', {
                        type: 'info',
                        title: 'Periode Promo',
                        text: 'Promo berlaku selama bulan Ramadhan, mulai 11 Maret - 10 April 2024. Stok terbatas!',
                    }),
                    createBlock('heading', { text: 'Produk Promo Pilihan', level: 3 }),
                    createBlock('product-list', {
                        title: 'Best Deals',
                        category: 'flash-sale',
                        limit: 4,
                        columns: 4,
                        style: 'grid',
                    }),
                    createBlock('divider', { style: 'gradient', spacing: 'lg' }),
                    createBlock('heading', { text: 'Syarat & Ketentuan', level: 3 }),
                    createBlock('list', {
                        style: 'ordered',
                        items: [
                            { text: 'Promo berlaku untuk semua metode pembayaran' },
                            { text: 'Tidak dapat digabung dengan voucher lain' },
                            { text: 'Maksimal pembelian 3 unit per produk per akun' },
                            { text: 'Promo dapat berakhir sewaktu-waktu jika stok habis' },
                            { text: 'Keputusan Ogitu.com bersifat final' },
                        ],
                    }),
                    createBlock('cta-box', {
                        title: 'Belanja Sekarang!',
                        description: 'Jangan lewatkan kesempatan ini. Stock terbatas, siapa cepat dia dapat!',
                        buttonText: 'Lihat Semua Promo',
                        buttonUrl: '/promo',
                        style: 'gradient',
                    }),
                ],
                thumbnail: '/images/articles/ramadhan-sale.jpg',
                category: 'promo',
                tags: ['promo', 'diskon', 'ramadhan', 'flash sale'],
                status: 'published',
                isFeatured: true,
                isPinned: true,
                viewCount: 8750,
                likeCount: 423,
                shareCount: 567,
                authorId,
                publishedAt: DateTime.now().minus({ hours: 6 }),
            },
            {
                title: 'Cara Merawat Pod System Agar Awet dan Tahan Lama',
                slug: 'cara-merawat-pod-system',
                excerpt: 'Tips perawatan pod system yang benar untuk memperpanjang umur perangkat dan menjaga performa optimal.',
                blocks: [
                    createBlock('heading', { text: 'Panduan Perawatan Pod System', level: 2 }),
                    createBlock('paragraph', {
                        text: 'Pod system yang terawat dengan baik bisa bertahan bertahun-tahun. Ikuti tips berikut untuk menjaga perangkat Anda tetap prima.',
                    }),
                    createBlock('heading', { text: '1. Bersihkan Secara Rutin', level: 3 }),
                    createBlock('paragraph', {
                        text: 'Bersihkan koneksi pod dan device minimal seminggu sekali menggunakan cotton bud kering. Sisa liquid yang mengering bisa menyebabkan poor connection.',
                    }),
                    createBlock('heading', { text: '2. Jangan Biarkan Pod Kering', level: 3 }),
                    createBlock('paragraph', {
                        text: 'Selalu isi ulang liquid sebelum habis total. Dry hit tidak hanya tidak enak, tapi juga bisa merusak coil secara permanen.',
                    }),
                    createBlock('heading', { text: '3. Simpan dengan Benar', level: 3 }),
                    createBlock('list', {
                        style: 'unordered',
                        items: [
                            { text: 'Hindari paparan sinar matahari langsung' },
                            { text: 'Jangan simpan di tempat lembab' },
                            { text: 'Jauhkan dari air dan cairan lain' },
                            { text: 'Simpan dalam posisi tegak' },
                        ],
                    }),
                    createBlock('heading', { text: '4. Charging dengan Benar', level: 3 }),
                    createBlock('alert', {
                        type: 'warning',
                        title: 'Tips Charging',
                        text: 'Gunakan charger dan kabel original atau yang memiliki spesifikasi sama. Hindari fast charger dengan output >2A untuk pod system.',
                    }),
                    createBlock('heading', { text: '5. Ganti Coil/Pod Tepat Waktu', level: 3 }),
                    createBlock('paragraph', {
                        text: 'Ganti coil setiap 1-2 minggu tergantung penggunaan. Tanda coil perlu diganti: rasa gosong, produksi vapor berkurang, atau warna liquid di pod berubah gelap.',
                    }),
                ],
                thumbnail: '/images/articles/pod-maintenance.jpg',
                category: 'tips',
                tags: ['maintenance', 'tips', 'pod system', 'perawatan'],
                status: 'published',
                isFeatured: false,
                isPinned: false,
                viewCount: 1890,
                likeCount: 145,
                shareCount: 67,
                authorId,
                publishedAt: DateTime.now().minus({ days: 10 }),
            },
            {
                title: 'Apa Itu Nicotine Salt? Perbedaan dengan Freebase Nicotine',
                slug: 'nicotine-salt-vs-freebase',
                excerpt: 'Penjelasan lengkap tentang nicotine salt, perbedaannya dengan freebase, dan mana yang cocok untuk Anda.',
                blocks: [
                    createBlock('heading', { text: 'Nicotine Salt vs Freebase: Panduan Lengkap', level: 2 }),
                    createBlock('paragraph', {
                        text: 'Bingung memilih antara nicotine salt dan freebase? Artikel ini akan menjelaskan perbedaan keduanya secara detail.',
                    }),
                    createBlock('heading', { text: 'Apa Itu Freebase Nicotine?', level: 3 }),
                    createBlock('paragraph', {
                        text: 'Freebase nicotine adalah bentuk murni nicotine yang digunakan dalam rokok konvensional dan liquid vape tradisional. Memiliki pH tinggi yang menyebabkan throat hit lebih kuat.',
                    }),
                    createBlock('heading', { text: 'Apa Itu Nicotine Salt?', level: 3 }),
                    createBlock('paragraph', {
                        text: 'Nicotine salt adalah nicotine yang dikombinasikan dengan asam organik (benzoic acid). Hasilnya: absorpsi lebih cepat, throat hit lebih smooth, dan bisa menggunakan konsentrasi lebih tinggi.',
                    }),
                    createBlock('comparison-table', {
                        title: 'Perbandingan Nic Salt vs Freebase',
                        headers: ['Nicotine Salt', 'Freebase Nicotine'],
                        features: [
                            { label: 'Throat Hit', values: ['Smooth', 'Harsh (kadar tinggi)'] },
                            { label: 'Konsentrasi Umum', values: ['20-50mg', '3-12mg'] },
                            { label: 'Absorpsi', values: ['Cepat', 'Lambat'] },
                            { label: 'Device', values: ['Pod System, MTL', 'Sub-ohm, DTL'] },
                            { label: 'Satisfying', values: ['Sangat', 'Moderate'] },
                        ],
                        highlightColumn: 0,
                    }),
                    createBlock('heading', { text: 'Mana yang Cocok untuk Anda?', level: 3 }),
                    createBlock('columns', {
                        columns: [
                            {
                                width: '1/2',
                                blocks: [
                                    createBlock('heading', { text: 'Pilih Nic Salt Jika:', level: 4 }),
                                    createBlock('list', {
                                        style: 'unordered',
                                        items: [
                                            { text: 'Baru berhenti merokok' },
                                            { text: 'Menginginkan nicotine hit cepat' },
                                            { text: 'Menggunakan pod system' },
                                            { text: 'Tidak suka throat hit harsh' },
                                        ],
                                    }),
                                ],
                            },
                            {
                                width: '1/2',
                                blocks: [
                                    createBlock('heading', { text: 'Pilih Freebase Jika:', level: 4 }),
                                    createBlock('list', {
                                        style: 'unordered',
                                        items: [
                                            { text: 'Sudah terbiasa vaping' },
                                            { text: 'Menggunakan sub-ohm device' },
                                            { text: 'Menginginkan cloud besar' },
                                            { text: 'Ingin konsumsi nicotine lebih rendah' },
                                        ],
                                    }),
                                ],
                            },
                        ],
                        gap: 'lg',
                    }),
                ],
                thumbnail: '/images/articles/nic-salt-guide.jpg',
                category: 'guide',
                tags: ['nicotine salt', 'freebase', 'panduan', 'liquid'],
                status: 'published',
                isFeatured: false,
                isPinned: false,
                viewCount: 5670,
                likeCount: 287,
                shareCount: 198,
                authorId,
                publishedAt: DateTime.now().minus({ days: 21 }),
            },
            {
                title: 'Coming Soon: Review SMOK RPM 5 Pro',
                slug: 'review-smok-rpm-5-pro',
                excerpt: 'Review lengkap SMOK RPM 5 Pro akan segera hadir!',
                blocks: [
                    createBlock('heading', { text: 'Review SMOK RPM 5 Pro - Coming Soon', level: 2 }),
                    createBlock('paragraph', {
                        text: 'Artikel ini masih dalam proses penulisan. Stay tuned!',
                    }),
                ],
                thumbnail: '/images/articles/smok-rpm5-pro.jpg',
                category: 'review',
                tags: ['review', 'smok', 'rpm 5 pro'],
                status: 'draft',
                isFeatured: false,
                isPinned: false,
                viewCount: 0,
                likeCount: 0,
                shareCount: 0,
                authorId,
                publishedAt: null,
            },
        ];
        for (const articleData of articles) {
            try {
                await Article.updateOrCreate({ slug: articleData.slug }, articleData);
                logger.info(`Article created/updated: ${articleData.title}`);
            }
            catch (error) {
                logger.error(`Error creating article: ${articleData.title}`, error);
            }
        }
        logger.info(`Total ${articles.length} articles seeded successfully`);
    }
}
//# sourceMappingURL=article_seeder.js.map
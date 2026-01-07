export default class PagesController {
    async help({ inertia }) {
        const faqs = [
            {
                category: 'Pemesanan',
                icon: 'i-heroicons-shopping-cart',
                questions: [
                    {
                        question: 'Bagaimana cara memesan produk?',
                        answer: 'Pilih produk yang diinginkan, tambahkan ke keranjang, lalu lanjutkan ke checkout. Isi alamat pengiriman dan pilih metode pembayaran.',
                    },
                    {
                        question: 'Apakah bisa membatalkan pesanan?',
                        answer: 'Pesanan dapat dibatalkan selama status masih "Menunggu Pembayaran". Setelah pembayaran dikonfirmasi, pesanan tidak dapat dibatalkan.',
                    },
                    {
                        question: 'Berapa minimal pembelian?',
                        answer: 'Tidak ada minimal pembelian. Anda bisa membeli 1 item saja. Namun, beberapa produk mungkin memiliki minimal order tertentu.',
                    },
                ],
            },
            {
                category: 'Pembayaran',
                icon: 'i-heroicons-credit-card',
                questions: [
                    {
                        question: 'Metode pembayaran apa saja yang tersedia?',
                        answer: 'Kami menerima pembayaran via Bank Transfer (BCA, Mandiri, BNI, BRI), E-Wallet (GoPay, OVO, DANA), dan QRIS.',
                    },
                    {
                        question: 'Berapa lama batas waktu pembayaran?',
                        answer: 'Batas waktu pembayaran adalah 24 jam setelah pesanan dibuat. Pesanan akan otomatis dibatalkan jika tidak dibayar dalam waktu tersebut.',
                    },
                    {
                        question: 'Apakah pembayaran aman?',
                        answer: 'Ya, semua transaksi diproses melalui payment gateway Midtrans yang sudah tersertifikasi PCI-DSS untuk keamanan maksimal.',
                    },
                ],
            },
            {
                category: 'Pengiriman',
                icon: 'i-heroicons-truck',
                questions: [
                    {
                        question: 'Ekspedisi apa yang digunakan?',
                        answer: 'Kami bekerja sama dengan JNE, J&T, SiCepat, dan Anteraja untuk pengiriman ke seluruh Indonesia.',
                    },
                    {
                        question: 'Berapa lama estimasi pengiriman?',
                        answer: 'Estimasi pengiriman tergantung lokasi dan ekspedisi yang dipilih. Umumnya 1-3 hari untuk Jabodetabek dan 3-7 hari untuk luar Jawa.',
                    },
                    {
                        question: 'Bagaimana cara melacak pesanan?',
                        answer: 'Gunakan halaman "Track Order" dengan memasukkan nomor pesanan. Anda juga akan mendapat notifikasi setiap ada update status.',
                    },
                    {
                        question: 'Apakah ada gratis ongkir?',
                        answer: 'Ya! Kami sering mengadakan promo gratis ongkir. Cek halaman promo atau ikuti social media kami untuk info terbaru.',
                    },
                ],
            },
            {
                category: 'Produk & Garansi',
                icon: 'i-heroicons-shield-check',
                questions: [
                    {
                        question: 'Apakah produk original?',
                        answer: '100% produk yang kami jual adalah original dan bergaransi resmi. Kami hanya bekerja sama dengan distributor resmi.',
                    },
                    {
                        question: 'Bagaimana jika produk rusak/cacat?',
                        answer: 'Hubungi customer service dalam 1x24 jam setelah barang diterima dengan menyertakan foto/video. Kami akan proses pengembalian atau penggantian.',
                    },
                    {
                        question: 'Berapa lama garansi produk?',
                        answer: 'Garansi berbeda-beda tergantung produk. Device umumnya 3-6 bulan, sedangkan liquid tidak ada garansi karena sifatnya consumable.',
                    },
                ],
            },
            {
                category: 'Akun & Membership',
                icon: 'i-heroicons-user-circle',
                questions: [
                    {
                        question: 'Apa keuntungan membuat akun?',
                        answer: 'Dengan akun, Anda bisa menyimpan alamat, melihat riwayat pesanan, mengumpulkan poin, dan mendapat akses promo eksklusif.',
                    },
                    {
                        question: 'Bagaimana sistem ranking member?',
                        answer: 'Ranking member ditentukan dari total belanja dan jumlah transaksi. Semakin tinggi rank, semakin besar diskon dan benefit yang didapat.',
                    },
                    {
                        question: 'Bagaimana cara jadi affiliate?',
                        answer: 'Setelah membuat akun, Anda otomatis mendapat kode referral. Bagikan kode tersebut dan dapatkan komisi dari setiap pembelian.',
                    },
                ],
            },
        ];
        const contactInfo = {
            whatsapp: '+6281234567890',
            email: 'support@ogitu.com',
            instagram: '@ogitu.id',
            workingHours: 'Senin - Sabtu, 09:00 - 21:00 WIB',
        };
        return inertia.render('help/index', {
            faqs,
            contactInfo,
        });
    }
    async shipping({ inertia }) {
        const shippingInfo = {
            couriers: [
                {
                    name: 'JNE',
                    logo: '/images/couriers/jne.png',
                    services: ['REG', 'YES', 'OKE'],
                    description: 'Jalur Nugraha Ekakurir - Partner terpercaya sejak 1990',
                },
                {
                    name: 'J&T Express',
                    logo: '/images/couriers/jnt.png',
                    services: ['EZ', 'Express'],
                    description: 'Pengiriman cepat dengan jangkauan luas',
                },
                {
                    name: 'SiCepat',
                    logo: '/images/couriers/sicepat.png',
                    services: ['REG', 'BEST', 'GOKIL'],
                    description: 'Ekspedisi modern dengan tracking real-time',
                },
                {
                    name: 'AnterAja',
                    logo: '/images/couriers/anteraja.png',
                    services: ['Regular', 'Next Day', 'Same Day'],
                    description: 'Layanan pengiriman fleksibel dan terjangkau',
                },
            ],
            estimations: [
                { area: 'Jabodetabek', regular: '1-2 hari', express: '1 hari' },
                { area: 'Jawa Barat, Jawa Tengah, Jawa Timur', regular: '2-3 hari', express: '1-2 hari' },
                { area: 'Bali, Lombok', regular: '3-4 hari', express: '2-3 hari' },
                { area: 'Sumatera', regular: '3-5 hari', express: '2-3 hari' },
                { area: 'Kalimantan', regular: '4-6 hari', express: '3-4 hari' },
                { area: 'Sulawesi', regular: '4-6 hari', express: '3-4 hari' },
                { area: 'Papua, Maluku, NTT', regular: '5-7 hari', express: '4-5 hari' },
            ],
            steps: [
                {
                    title: 'Pilih Produk',
                    description: 'Browse dan pilih produk vape favorit Anda',
                    icon: 'i-heroicons-shopping-bag',
                },
                {
                    title: 'Checkout',
                    description: 'Masukkan alamat pengiriman lengkap',
                    icon: 'i-heroicons-map-pin',
                },
                {
                    title: 'Pilih Kurir',
                    description: 'Pilih ekspedisi sesuai kebutuhan Anda',
                    icon: 'i-heroicons-truck',
                },
                {
                    title: 'Bayar',
                    description: 'Lakukan pembayaran dengan metode pilihan',
                    icon: 'i-heroicons-credit-card',
                },
                {
                    title: 'Tunggu Paket',
                    description: 'Lacak pesanan sampai tiba di tangan Anda',
                    icon: 'i-heroicons-cube',
                },
            ],
        };
        return inertia.render('pages/shipping', { shippingInfo });
    }
    async payment({ inertia }) {
        const paymentMethods = {
            banks: [
                {
                    name: 'BCA',
                    type: 'Virtual Account',
                    logo: '/images/payments/bca.png',
                    fee: 'Gratis',
                    processing: 'Otomatis (Instan)',
                },
                {
                    name: 'Mandiri',
                    type: 'Virtual Account',
                    logo: '/images/payments/mandiri.png',
                    fee: 'Gratis',
                    processing: 'Otomatis (Instan)',
                },
                {
                    name: 'BNI',
                    type: 'Virtual Account',
                    logo: '/images/payments/bni.png',
                    fee: 'Gratis',
                    processing: 'Otomatis (Instan)',
                },
                {
                    name: 'BRI',
                    type: 'Virtual Account',
                    logo: '/images/payments/bri.png',
                    fee: 'Gratis',
                    processing: 'Otomatis (Instan)',
                },
                {
                    name: 'Permata',
                    type: 'Virtual Account',
                    logo: '/images/payments/permata.png',
                    fee: 'Gratis',
                    processing: 'Otomatis (Instan)',
                },
            ],
            ewallets: [
                {
                    name: 'GoPay',
                    logo: '/images/payments/gopay.png',
                    fee: 'Gratis',
                    processing: 'Otomatis (Instan)',
                },
                {
                    name: 'OVO',
                    logo: '/images/payments/ovo.png',
                    fee: 'Gratis',
                    processing: 'Otomatis (Instan)',
                },
                {
                    name: 'DANA',
                    logo: '/images/payments/dana.png',
                    fee: 'Gratis',
                    processing: 'Otomatis (Instan)',
                },
                {
                    name: 'ShopeePay',
                    logo: '/images/payments/shopeepay.png',
                    fee: 'Gratis',
                    processing: 'Otomatis (Instan)',
                },
            ],
            others: [
                {
                    name: 'QRIS',
                    logo: '/images/payments/qris.png',
                    fee: 'Gratis',
                    processing: 'Otomatis (Instan)',
                    description: 'Scan QR untuk bayar dari aplikasi apapun',
                },
                {
                    name: 'Alfamart',
                    logo: '/images/payments/alfamart.png',
                    fee: 'Rp 2.500',
                    processing: 'Maksimal 1 jam',
                    description: 'Bayar tunai di gerai Alfamart terdekat',
                },
                {
                    name: 'Indomaret',
                    logo: '/images/payments/indomaret.png',
                    fee: 'Rp 2.500',
                    processing: 'Maksimal 1 jam',
                    description: 'Bayar tunai di gerai Indomaret terdekat',
                },
            ],
            securityFeatures: [
                {
                    title: 'PCI-DSS Certified',
                    description: 'Standar keamanan pembayaran internasional',
                    icon: 'i-heroicons-shield-check',
                },
                {
                    title: 'SSL Encryption',
                    description: 'Data Anda terenkripsi dengan aman',
                    icon: 'i-heroicons-lock-closed',
                },
                {
                    title: '3D Secure',
                    description: 'Verifikasi tambahan untuk kartu kredit',
                    icon: 'i-heroicons-credit-card',
                },
                {
                    title: 'Fraud Detection',
                    description: 'Sistem deteksi transaksi mencurigakan',
                    icon: 'i-heroicons-eye',
                },
            ],
        };
        return inertia.render('pages/payment', { paymentMethods });
    }
    async returns({ inertia }) {
        const returnsPolicy = {
            conditions: [
                {
                    title: 'Produk Cacat/Rusak',
                    description: 'Produk yang diterima dalam keadaan cacat atau rusak dari pabrik',
                    eligible: true,
                    icon: 'i-heroicons-exclamation-triangle',
                },
                {
                    title: 'Produk Tidak Sesuai',
                    description: 'Produk yang dikirim tidak sesuai dengan pesanan',
                    eligible: true,
                    icon: 'i-heroicons-arrow-path',
                },
                {
                    title: 'Kesalahan Pengiriman',
                    description: 'Jumlah produk kurang atau salah kirim',
                    eligible: true,
                    icon: 'i-heroicons-cube',
                },
                {
                    title: 'Berubah Pikiran',
                    description: 'Pembatalan karena berubah pikiran setelah barang dikirim',
                    eligible: false,
                    icon: 'i-heroicons-x-circle',
                },
                {
                    title: 'Liquid Sudah Dibuka',
                    description: 'Produk liquid yang sudah dibuka segelnya',
                    eligible: false,
                    icon: 'i-heroicons-beaker',
                },
                {
                    title: 'Kerusakan Pengguna',
                    description: 'Kerusakan yang disebabkan oleh penggunaan',
                    eligible: false,
                    icon: 'i-heroicons-wrench',
                },
            ],
            process: [
                {
                    step: 1,
                    title: 'Hubungi CS',
                    description: 'Laporkan masalah dalam 1x24 jam setelah barang diterima via WhatsApp',
                    icon: 'i-heroicons-chat-bubble-left-right',
                },
                {
                    step: 2,
                    title: 'Kirim Bukti',
                    description: 'Sertakan foto/video produk yang bermasalah dan foto resi pengiriman',
                    icon: 'i-heroicons-camera',
                },
                {
                    step: 3,
                    title: 'Verifikasi',
                    description: 'Tim kami akan verifikasi dan konfirmasi dalam 1-2 hari kerja',
                    icon: 'i-heroicons-clipboard-document-check',
                },
                {
                    step: 4,
                    title: 'Kirim Balik',
                    description: 'Kirim produk ke alamat kami (ongkir ditanggung kami jika terbukti cacat)',
                    icon: 'i-heroicons-truck',
                },
                {
                    step: 5,
                    title: 'Refund/Replace',
                    description: 'Pilih pengembalian dana atau penggantian produk baru',
                    icon: 'i-heroicons-check-circle',
                },
            ],
            timeline: {
                report: '1x24 jam setelah barang diterima',
                verification: '1-2 hari kerja',
                refund: '3-5 hari kerja setelah barang kami terima',
            },
        };
        return inertia.render('pages/returns', { returnsPolicy });
    }
    async contact({ inertia }) {
        const contactInfo = {
            channels: [
                {
                    name: 'WhatsApp',
                    value: '+62 812-3456-7890',
                    link: 'https://wa.me/6281234567890',
                    icon: 'i-simple-icons-whatsapp',
                    color: 'bg-green-500',
                    description: 'Respon tercepat, tersedia 24/7',
                },
                {
                    name: 'Email',
                    value: 'support@ogitu.com',
                    link: 'mailto:support@ogitu.com',
                    icon: 'i-heroicons-envelope',
                    color: 'bg-blue-500',
                    description: 'Untuk pertanyaan detail & komplain',
                },
                {
                    name: 'Instagram',
                    value: '@ogitu.id',
                    link: 'https://instagram.com/ogitu.id',
                    icon: 'i-simple-icons-instagram',
                    color: 'bg-pink-500',
                    description: 'Update produk & promo terbaru',
                },
                {
                    name: 'Telegram',
                    value: '@ogitustore',
                    link: 'https://t.me/ogitustore',
                    icon: 'i-simple-icons-telegram',
                    color: 'bg-sky-500',
                    description: 'Grup komunitas vapers',
                },
            ],
            office: {
                name: 'Ogitu Store',
                address: 'Jl. Vape Center No. 123',
                city: 'Jakarta Selatan',
                province: 'DKI Jakarta',
                postalCode: '12345',
                country: 'Indonesia',
                mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.8!3d-6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMDAuMCJTIDEwNsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890',
            },
            workingHours: {
                weekday: 'Senin - Jumat: 09:00 - 21:00 WIB',
                weekend: 'Sabtu - Minggu: 10:00 - 18:00 WIB',
                holiday: 'Hari Libur Nasional: Tutup',
            },
        };
        return inertia.render('pages/contact', { contactInfo });
    }
    async about({ inertia }) {
        const aboutData = {
            company: {
                name: 'Ogitu',
                tagline: 'Your Premium Vape Destination',
                founded: '2020',
                description: 'Ogitu adalah toko vape online terpercaya di Indonesia yang menyediakan berbagai produk vape original dengan kualitas premium. Kami berkomitmen untuk memberikan pengalaman berbelanja terbaik dengan produk 100% original dan layanan pelanggan yang responsif.',
            },
            stats: [
                { label: 'Produk Original', value: '10,000+', icon: 'i-heroicons-cube' },
                { label: 'Happy Customers', value: '50,000+', icon: 'i-heroicons-users' },
                { label: 'Brand Partner', value: '100+', icon: 'i-heroicons-building-storefront' },
                { label: 'Rating', value: '4.9/5', icon: 'i-heroicons-star' },
            ],
            values: [
                {
                    title: 'Original 100%',
                    description: 'Semua produk kami dijamin original dari distributor resmi',
                    icon: 'i-heroicons-shield-check',
                },
                {
                    title: 'Harga Kompetitif',
                    description: 'Harga terbaik di pasaran dengan promo menarik setiap hari',
                    icon: 'i-heroicons-tag',
                },
                {
                    title: 'Pengiriman Cepat',
                    description: 'Pesanan diproses dan dikirim di hari yang sama',
                    icon: 'i-heroicons-truck',
                },
                {
                    title: 'Support 24/7',
                    description: 'Tim customer service siap membantu kapan saja',
                    icon: 'i-heroicons-chat-bubble-left-right',
                },
            ],
            milestones: [
                { year: '2020', event: 'Ogitu didirikan di Jakarta' },
                { year: '2021', event: 'Mencapai 10,000 pelanggan pertama' },
                { year: '2022', event: 'Ekspansi ke seluruh Indonesia' },
                { year: '2023', event: 'Meluncurkan program Affiliate & Membership' },
                { year: '2024', event: 'Partnership dengan 100+ brand internasional' },
            ],
            team: [
                {
                    name: 'John Doe',
                    role: 'Founder & CEO',
                    image: '/images/team/ceo.jpg',
                },
                {
                    name: 'Jane Smith',
                    role: 'Head of Operations',
                    image: '/images/team/ops.jpg',
                },
                {
                    name: 'Mike Johnson',
                    role: 'Product Manager',
                    image: '/images/team/pm.jpg',
                },
            ],
        };
        return inertia.render('pages/about', { aboutData });
    }
    async blog({ inertia }) {
        const blogData = {
            featured: {
                id: 1,
                title: 'Panduan Lengkap Memilih Pod System untuk Pemula',
                excerpt: 'Bingung memilih pod system pertama? Simak panduan lengkap ini untuk menemukan device yang tepat sesuai kebutuhan Anda.',
                image: '/images/blog/featured.jpg',
                category: 'Guide',
                author: 'Ogitu Team',
                date: '10 Des 2024',
                readTime: '5 min',
                slug: 'panduan-memilih-pod-system',
            },
            posts: [
                {
                    id: 2,
                    title: 'Top 10 Liquid Lokal Terbaik 2024',
                    excerpt: 'Rekomendasi liquid lokal dengan rasa premium yang wajib dicoba.',
                    image: '/images/blog/liquid-lokal.jpg',
                    category: 'Review',
                    author: 'Ogitu Team',
                    date: '8 Des 2024',
                    readTime: '4 min',
                    slug: 'top-liquid-lokal-2024',
                },
                {
                    id: 3,
                    title: 'Cara Merawat Coil Agar Awet',
                    excerpt: 'Tips dan trik merawat coil supaya lebih tahan lama dan hemat budget.',
                    image: '/images/blog/coil-care.jpg',
                    category: 'Tips',
                    author: 'Ogitu Team',
                    date: '5 Des 2024',
                    readTime: '3 min',
                    slug: 'cara-merawat-coil',
                },
                {
                    id: 4,
                    title: 'Perbedaan Salt Nic vs Freebase',
                    excerpt: 'Memahami perbedaan mendasar antara salt nicotine dan freebase nicotine.',
                    image: '/images/blog/salt-vs-freebase.jpg',
                    category: 'Education',
                    author: 'Ogitu Team',
                    date: '1 Des 2024',
                    readTime: '6 min',
                    slug: 'salt-nic-vs-freebase',
                },
                {
                    id: 5,
                    title: 'Review: OXVA Xlim Pro 2024',
                    excerpt: 'Review mendalam device pod terpopuler tahun ini dengan segala plus minusnya.',
                    image: '/images/blog/xlim-review.jpg',
                    category: 'Review',
                    author: 'Ogitu Team',
                    date: '28 Nov 2024',
                    readTime: '7 min',
                    slug: 'review-oxva-xlim-pro',
                },
                {
                    id: 6,
                    title: 'Panduan Lengkap RDA untuk Pemula',
                    excerpt: 'Tertarik dengan RDA? Pelajari dasar-dasar rebuilding dengan panduan ini.',
                    image: '/images/blog/rda-guide.jpg',
                    category: 'Guide',
                    author: 'Ogitu Team',
                    date: '25 Nov 2024',
                    readTime: '8 min',
                    slug: 'panduan-rda-pemula',
                },
            ],
            categories: ['All', 'Guide', 'Review', 'Tips', 'Education', 'News'],
        };
        return inertia.render('pages/blog', { blogData });
    }
    async careers({ inertia }) {
        const careersData = {
            intro: {
                title: 'Bergabung dengan Tim Ogitu',
                description: 'Kami selalu mencari talenta terbaik untuk bergabung dalam misi kami menyediakan produk vape berkualitas untuk seluruh Indonesia. Jika Anda passionate dengan dunia vape dan e-commerce, mari bergabung!',
            },
            benefits: [
                { title: 'Gaji Kompetitif', icon: 'i-heroicons-banknotes' },
                { title: 'BPJS Kesehatan & TK', icon: 'i-heroicons-heart' },
                { title: 'WFH Flexible', icon: 'i-heroicons-home' },
                { title: 'Bonus Performa', icon: 'i-heroicons-gift' },
                { title: 'Training & Development', icon: 'i-heroicons-academic-cap' },
                { title: 'Diskon Produk', icon: 'i-heroicons-tag' },
            ],
            openings: [
                {
                    id: 1,
                    title: 'Frontend Developer',
                    department: 'Engineering',
                    location: 'Jakarta / Remote',
                    type: 'Full-time',
                    description: 'Membangun user interface yang menarik dengan Vue.js dan Nuxt',
                },
                {
                    id: 2,
                    title: 'Customer Service',
                    department: 'Operations',
                    location: 'Jakarta',
                    type: 'Full-time',
                    description: 'Membantu pelanggan dengan pertanyaan dan keluhan',
                },
                {
                    id: 3,
                    title: 'Content Creator',
                    department: 'Marketing',
                    location: 'Jakarta / Remote',
                    type: 'Full-time',
                    description: 'Membuat konten menarik untuk social media dan blog',
                },
                {
                    id: 4,
                    title: 'Warehouse Staff',
                    department: 'Operations',
                    location: 'Jakarta',
                    type: 'Full-time',
                    description: 'Mengelola inventory dan packing pesanan',
                },
            ],
        };
        return inertia.render('pages/careers', { careersData });
    }
    async press({ inertia }) {
        const pressData = {
            intro: {
                title: 'Press & Media',
                description: 'Temukan berita terbaru, press release, dan media kit Ogitu. Untuk pertanyaan media, silakan hubungi tim PR kami.',
                contact: {
                    email: 'press@ogitu.com',
                    phone: '+62 21 1234 5678',
                },
            },
            releases: [
                {
                    id: 1,
                    title: 'Ogitu Raih Penghargaan Best Vape Store 2024',
                    date: '1 Des 2024',
                    excerpt: 'Ogitu dinobatkan sebagai Best Vape Store oleh Indonesian Vape Association dalam ajang tahunan IVA Awards 2024.',
                    image: '/images/press/award-2024.jpg',
                },
                {
                    id: 2,
                    title: 'Partnership Strategis dengan SMOK International',
                    date: '15 Nov 2024',
                    excerpt: 'Ogitu resmi menjadi authorized distributor SMOK untuk Indonesia, memperluas akses produk premium.',
                    image: '/images/press/smok-partnership.jpg',
                },
                {
                    id: 3,
                    title: 'Ogitu Ekspansi ke 10 Kota Besar',
                    date: '1 Okt 2024',
                    excerpt: 'Dengan ekspansi gudang ke 10 kota besar, Ogitu kini mampu melayani pengiriman lebih cepat.',
                    image: '/images/press/expansion.jpg',
                },
            ],
            mediaKit: {
                description: 'Download asset brand kami untuk keperluan media',
                files: [
                    { name: 'Logo Pack', size: '2.5 MB', format: 'ZIP' },
                    { name: 'Brand Guidelines', size: '5 MB', format: 'PDF' },
                    { name: 'Press Photos', size: '15 MB', format: 'ZIP' },
                ],
            },
            coverage: [
                { outlet: 'Tech in Asia', title: 'How Ogitu Disrupts Vape Industry', logo: '/images/press/tia.png' },
                { outlet: 'Kompas', title: 'E-commerce Vape Tumbuh Pesat', logo: '/images/press/kompas.png' },
                { outlet: 'Detik', title: 'Ogitu: Dari Garasi ke Market Leader', logo: '/images/press/detik.png' },
            ],
        };
        return inertia.render('pages/press', { pressData });
    }
    async affiliate({ inertia }) {
        const affiliateData = {
            hero: {
                title: 'Program Afiliasi Ogitu',
                subtitle: 'Dapatkan komisi hingga 10% dari setiap pembelian menggunakan kode referral Anda',
            },
            commissions: [
                { tier: 'Bronze', minSales: '0', maxSales: '5 juta', commission: '5%' },
                { tier: 'Silver', minSales: '5 juta', maxSales: '15 juta', commission: '7%' },
                { tier: 'Gold', minSales: '15 juta', maxSales: '50 juta', commission: '8%' },
                { tier: 'Platinum', minSales: '50 juta', maxSales: '∞', commission: '10%' },
            ],
            howItWorks: [
                {
                    step: 1,
                    title: 'Daftar & Dapatkan Kode',
                    description: 'Buat akun dan dapatkan kode referral unik Anda',
                    icon: 'i-heroicons-user-plus',
                },
                {
                    step: 2,
                    title: 'Share ke Followers',
                    description: 'Bagikan kode atau link referral ke social media Anda',
                    icon: 'i-heroicons-share',
                },
                {
                    step: 3,
                    title: 'Kumpulkan Komisi',
                    description: 'Dapatkan komisi setiap ada pembelian menggunakan kode Anda',
                    icon: 'i-heroicons-currency-dollar',
                },
                {
                    step: 4,
                    title: 'Cairkan Dana',
                    description: 'Cairkan komisi ke rekening bank kapan saja',
                    icon: 'i-heroicons-banknotes',
                },
            ],
            benefits: [
                'Komisi hingga 10% per transaksi',
                'Cookie tracking 30 hari',
                'Real-time dashboard & reporting',
                'Pencairan minimum Rp 50.000',
                'Material promosi gratis',
                'Dedicated affiliate support',
            ],
            faq: [
                {
                    question: 'Siapa yang bisa ikut program afiliasi?',
                    answer: 'Semua member yang sudah terdaftar bisa langsung ikut program afiliasi. Tidak ada syarat khusus.',
                },
                {
                    question: 'Berapa lama cookie tracking berlaku?',
                    answer: 'Cookie tracking berlaku 30 hari. Artinya jika seseorang klik link Anda hari ini dan beli dalam 30 hari, Anda tetap dapat komisi.',
                },
                {
                    question: 'Kapan komisi bisa dicairkan?',
                    answer: 'Komisi masuk ke wallet setelah pesanan selesai (delivered). Bisa dicairkan kapan saja dengan minimum Rp 50.000.',
                },
                {
                    question: 'Apakah ada batasan penghasilan?',
                    answer: 'Tidak ada batasan! Semakin banyak referral yang membeli, semakin besar penghasilan Anda.',
                },
            ],
            testimonials: [
                {
                    name: 'Budi Santoso',
                    role: 'Content Creator',
                    image: '/images/affiliates/budi.jpg',
                    quote: 'Dalam 3 bulan sudah dapat Rp 15 juta dari program afiliasi Ogitu!',
                    earnings: 'Rp 15 juta/bulan',
                },
                {
                    name: 'Dewi Lestari',
                    role: 'Vape Reviewer',
                    image: '/images/affiliates/dewi.jpg',
                    quote: 'Dashboard-nya lengkap, tracking akurat, dan pencairan cepat.',
                    earnings: 'Rp 8 juta/bulan',
                },
            ],
        };
        return inertia.render('pages/affiliate', { affiliateData });
    }
}
//# sourceMappingURL=pages_controller.js.map
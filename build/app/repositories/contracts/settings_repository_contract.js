export const AVAILABLE_COURIERS = [
    {
        code: 'jne',
        name: 'JNE Express',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/9/99/JNE_logo.png',
        services: [
            { code: 'REG', name: 'JNE Reguler' },
            { code: 'YES', name: 'JNE YES (Yakin Esok Sampai)' },
            { code: 'OKE', name: 'JNE OKE (Ongkos Kirim Ekonomis)' },
        ],
    },
    {
        code: 'jnt',
        name: 'J&T Express',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/J%26T_Express_logo.png',
        services: [
            { code: 'EZ', name: 'J&T EZ (Ekonomis)' },
            { code: 'JSD', name: 'J&T JSD (Same Day)' },
        ],
    },
    {
        code: 'sicepat',
        name: 'SiCepat',
        logo: 'https://www.sicepat.com/img/logo.png',
        services: [
            { code: 'REG', name: 'SiCepat REG (Reguler)' },
            { code: 'BEST', name: 'SiCepat BEST (Besok Sampai Tujuan)' },
            { code: 'CARGO', name: 'SiCepat Cargo' },
        ],
    },
    {
        code: 'anteraja',
        name: 'AnterAja',
        logo: 'https://anteraja.id/images/logo.png',
        services: [
            { code: 'REG', name: 'AnterAja Reguler' },
            { code: 'ND', name: 'AnterAja Next Day' },
            { code: 'SD', name: 'AnterAja Same Day' },
        ],
    },
    {
        code: 'ninja',
        name: 'Ninja Xpress',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Ninja_Van_logo.svg/320px-Ninja_Van_logo.svg.png',
        services: [
            { code: 'REG', name: 'Ninja Standard' },
            { code: 'ND', name: 'Ninja Next Day' },
        ],
    },
    {
        code: 'pos',
        name: 'POS Indonesia',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Pos_Indonesia_logo.png',
        services: [
            { code: 'REG', name: 'Pos Reguler' },
            { code: 'EXPRESS', name: 'Pos Express' },
        ],
    },
    {
        code: 'tiki',
        name: 'TIKI',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Logo_TIKI.png',
        services: [
            { code: 'REG', name: 'TIKI Reguler' },
            { code: 'ONS', name: 'TIKI ONS (Over Night Service)' },
            { code: 'ECO', name: 'TIKI Ekonomi' },
        ],
    },
];
export const DEFAULT_NOTIFICATION_EVENTS = [
    {
        eventKey: 'order_placed',
        eventName: 'Pesanan Baru',
        eventGroup: 'orders',
        description: 'Notifikasi ketika ada pesanan baru masuk',
    },
    {
        eventKey: 'order_paid',
        eventName: 'Pembayaran Diterima',
        eventGroup: 'orders',
        description: 'Notifikasi ketika pembayaran pesanan berhasil',
    },
    {
        eventKey: 'order_processing',
        eventName: 'Pesanan Diproses',
        eventGroup: 'orders',
        description: 'Notifikasi ketika pesanan mulai diproses',
    },
    {
        eventKey: 'order_shipped',
        eventName: 'Pesanan Dikirim',
        eventGroup: 'orders',
        description: 'Notifikasi ketika pesanan sudah dikirim',
    },
    {
        eventKey: 'order_delivered',
        eventName: 'Pesanan Sampai',
        eventGroup: 'orders',
        description: 'Notifikasi ketika pesanan sudah sampai tujuan',
    },
    {
        eventKey: 'order_cancelled',
        eventName: 'Pesanan Dibatalkan',
        eventGroup: 'orders',
        description: 'Notifikasi ketika pesanan dibatalkan',
    },
    {
        eventKey: 'payment_pending',
        eventName: 'Menunggu Pembayaran',
        eventGroup: 'payments',
        description: 'Notifikasi reminder pembayaran',
    },
    {
        eventKey: 'payment_expired',
        eventName: 'Pembayaran Kadaluarsa',
        eventGroup: 'payments',
        description: 'Notifikasi ketika pembayaran sudah expired',
    },
    {
        eventKey: 'refund_processed',
        eventName: 'Refund Diproses',
        eventGroup: 'payments',
        description: 'Notifikasi ketika refund sedang diproses',
    },
    {
        eventKey: 'withdrawal_approved',
        eventName: 'Withdraw Disetujui',
        eventGroup: 'payments',
        description: 'Notifikasi ketika permintaan withdraw disetujui',
    },
    {
        eventKey: 'withdrawal_rejected',
        eventName: 'Withdraw Ditolak',
        eventGroup: 'payments',
        description: 'Notifikasi ketika permintaan withdraw ditolak',
    },
    {
        eventKey: 'flash_sale_start',
        eventName: 'Flash Sale Dimulai',
        eventGroup: 'promotions',
        description: 'Notifikasi ketika flash sale dimulai',
    },
    {
        eventKey: 'voucher_received',
        eventName: 'Voucher Diterima',
        eventGroup: 'promotions',
        description: 'Notifikasi ketika customer menerima voucher',
    },
    {
        eventKey: 'low_stock',
        eventName: 'Stok Menipis',
        eventGroup: 'system',
        description: 'Notifikasi ketika stok produk hampir habis',
    },
    {
        eventKey: 'new_review',
        eventName: 'Review Baru',
        eventGroup: 'system',
        description: 'Notifikasi ketika ada review produk baru',
    },
    {
        eventKey: 'bug_report',
        eventName: 'Laporan Bug',
        eventGroup: 'system',
        description: 'Notifikasi ketika ada laporan bug dari user',
    },
];
//# sourceMappingURL=settings_repository_contract.js.map
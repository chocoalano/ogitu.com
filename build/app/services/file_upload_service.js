import drive from '@adonisjs/drive/services/main';
import env from '#start/env';
export default class FileUploadService {
    static getBasePath() {
        const directory = env.get('SPACES_DIRECTORY', '');
        const nodeEnv = env.get('NODE_ENV', 'development');
        return directory ? `${directory}/${nodeEnv}` : nodeEnv;
    }
    static generateDatePrefix() {
        const now = new Date();
        return (now.getFullYear().toString() +
            String(now.getMonth() + 1).padStart(2, '0') +
            String(now.getDate()).padStart(2, '0') +
            String(now.getHours()).padStart(2, '0') +
            String(now.getMinutes()).padStart(2, '0') +
            String(now.getSeconds()).padStart(2, '0'));
    }
    static generateSeoFilename(slug, extension, index = 0) {
        const datePrefix = this.generateDatePrefix();
        const cleanSlug = slug
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .substring(0, 50);
        const indexSuffix = index > 0 ? `-${index}` : '';
        return `${datePrefix}-${cleanSlug}${indexSuffix}.${extension}`;
    }
    static async upload(file, options = 'uploads') {
        if (!file.tmpPath) {
            return null;
        }
        const opts = typeof options === 'string' ? { folder: options } : options;
        const folder = opts.folder || 'uploads';
        const basePath = this.getBasePath();
        try {
            const disk = drive.use('spaces');
            const extension = file.extname || file.clientName.split('.').pop() || 'bin';
            let filename;
            if (opts.slug) {
                filename = this.generateSeoFilename(opts.slug, extension, opts.index || 0);
            }
            else {
                const datePrefix = this.generateDatePrefix();
                const random = Math.random().toString(36).substring(2, 8);
                filename = `${datePrefix}-${random}.${extension}`;
            }
            const fullKey = `${basePath}/${folder}/${filename}`;
            const relativeKey = `/${folder}/${filename}`;
            await disk.put(fullKey, await this.readFile(file.tmpPath), {
                contentType: file.type ? `${file.type}/${file.subtype}` : 'application/octet-stream',
            });
            const url = await disk.getUrl(fullKey);
            return {
                url,
                key: relativeKey,
                size: file.size,
                mimeType: file.type ? `${file.type}/${file.subtype}` : 'application/octet-stream',
            };
        }
        catch (error) {
            console.error('File upload error:', error);
            return null;
        }
    }
    static async uploadMany(files, options = 'uploads') {
        const results = [];
        const opts = typeof options === 'string' ? { folder: options } : options;
        let index = 0;
        for (const file of files) {
            const result = await this.upload(file, {
                ...opts,
                index,
            });
            if (result) {
                results.push(result);
            }
            index++;
        }
        return results;
    }
    static async delete(key) {
        try {
            const disk = drive.use('spaces');
            const basePath = this.getBasePath();
            const cleanKey = key.startsWith('/') ? key.substring(1) : key;
            const fullKey = `${basePath}/${cleanKey}`;
            await disk.delete(fullKey);
            return true;
        }
        catch (error) {
            console.error('File delete error:', error);
            return false;
        }
    }
    static async deleteMany(keys) {
        let deleted = 0;
        for (const key of keys) {
            if (await this.delete(key)) {
                deleted++;
            }
        }
        return deleted;
    }
    static getKeyFromUrl(url) {
        try {
            const urlObj = new URL(url);
            let path = urlObj.pathname;
            if (path.startsWith('/')) {
                path = path.substring(1);
            }
            const bucketPattern = /^[^/]+\/(.*)/;
            const match = path.match(bucketPattern);
            return match ? match[1] : path;
        }
        catch {
            return url.startsWith('/') ? url.substring(1) : url;
        }
    }
    static async readFile(filePath) {
        const fs = await import('node:fs/promises');
        return fs.readFile(filePath);
    }
    static async exists(key) {
        try {
            const disk = drive.use('spaces');
            return await disk.exists(key);
        }
        catch {
            return false;
        }
    }
    static async getUrl(key) {
        const disk = drive.use('spaces');
        return disk.getUrl(key);
    }
}
//# sourceMappingURL=file_upload_service.js.map
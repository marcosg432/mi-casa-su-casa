module.exports = {
  apps: [{
    name: 'mi-casa-su-casa',
    script: 'node_modules/.bin/vite',
    args: 'preview --port 3000 --host 0.0.0.0',
    cwd: '/root/mi-casa-su-casa',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    time: true
  }]
}


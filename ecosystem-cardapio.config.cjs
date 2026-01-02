module.exports = {
  apps: [{
    name: 'cardapio',
    script: 'node_modules/.bin/next',
    args: 'start -p 3006',
    cwd: '/root/mi-casa-su-casa/cardapio',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3006
    },
    error_file: './logs/cardapio-err.log',
    out_file: './logs/cardapio-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    time: true
  }]
}


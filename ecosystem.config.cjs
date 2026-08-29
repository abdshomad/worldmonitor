module.exports = {
  apps: [
    {
      name: 'worldmonitor',
      script: 'npm',
      args: 'run dev -- --host 0.0.0.0 --port 2023',
      cwd: __dirname,
      env_file: '.env',
      env: {
        NODE_ENV: 'development',
        PORT: '2023',
        DEV_PORT: '2023',
        HOST: '0.0.0.0',
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
};

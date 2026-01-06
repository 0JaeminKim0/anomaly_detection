module.exports = {
  apps: [
    {
      name: 'hana-demo',
      script: 'npx',
      args: 'serve dist -l 3000',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}

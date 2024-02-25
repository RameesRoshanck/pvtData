module.exports = {
    apps: [
      {
        name: 'task',
        script: 'src/server.js', 
        instances: 'max', 
        autorestart: true, 
        watch: false, 
        max_memory_restart: '1G', 
        env: {
          NODE_ENV: 'production' 
        },
        error_file: 'logs/error.log', 
        out_file: 'logs/output.log',
        log_file: 'logs/combined.log',
        merge_logs: true, 
      }
    ]
  };
  
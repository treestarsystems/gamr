
module.exports = {
 apps : [
  {
   name        : "gamr",
   script      : "server/index.js",
   watch       : true,
   cwd         : "/opt/gamr",
   instances   : "1",
   exec_mode   : "cluster",
   watch       : ["./server","./system_confs"],
   ignore_watch        : ["./log_storage","./db_storage","system_confs/system_conf.json","server/view"],
   out_file    : "./log_storage/gamr_out.log",
   error_file  : "./log_storage/gamr_err.log",
   pid_file    : "./log_storage/pid/gamr_id.pid",
   log_date_format     : "YYYY-MM-DD HH:mm Z",
   kill_timeout : 60000,
   env: {
     "INSTANCE_TYPE": "primary",
     "NODE_ENV": "prod",
     "PORT": "3000",
     "HOST": "0.0.0.0"
   },
   env_dev : {
     "INSTANCE_TYPE": "primary",
     "NODE_ENV": "dev",
     "PORT": "3001",
     "HOST": "0.0.0.0"
   }
  },
  {
   name        : "gamr",
   script      : "server/index.js",
   watch       : true,
   cwd         : "/opt/gamr",
   instances   : "-1",
   exec_mode   : "cluster",
   watch       : ["./server","./system_confs"],
   ignore_watch        : ["./log_storage","./db_storage","system_confs/system_conf.json","server/view"],
   out_file    : "./log_storage/gamr_out.log",
   error_file  : "./log_storage/gamr_err.log",
   pid_file    : "./log_storage/pid/gamr_id.pid",
   log_date_format     : "YYYY-MM-DD HH:mm Z",
   kill_timeout : 60000,
   env: {
     "INSTANCE_TYPE": "clone",
     "NODE_ENV": "prod",
     "PORT": "3000",
     "HOST": "0.0.0.0"
   },
   env_dev : {
     "INSTANCE_TYPE": "clone",
     "NODE_ENV": "dev",
     "PORT": "3001",
     "HOST": "0.0.0.0"
   }
  }
 ]
}

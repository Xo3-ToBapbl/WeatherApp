1. Bash commands:
"npm run build -- --env prod" - run webpack build with 'prod' env cfg, if not specified 'dev' uses as default
"npm run clean" - clean dist/* directory
"npm run rebuild -- --env prod" - clean dist/* directory and run webpack build with 'prod' env cfg, if not specified 'dev' uses as default
"npm run watch" - run real time changes watching for webpack build
"npm run start_server" - starts webpack dev server for real time development
Changes:
  - Added /features GET
  - Changed port mumber

To generate redoc:
(while in this folder)
npx redoc-cli bundle openapi.yaml

To generate backend:
(while in this folder)
npx openapi-generator generate -i openapi.yaml -g nodejs-express-server -o /tmp/backendMar10

To generate frontend:
(while in this folder)
npx openapi-generator generate -i openapi.yaml -g javascript -o /tmp/frontend123/
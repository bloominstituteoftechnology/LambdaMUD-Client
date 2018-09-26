rmdir /S /Q docs
rmdir /S /Q build
cd cs-frontend
npm run build && move build ../ && cd ../ && rename build docs && git add . && git commit -a -m "$*" && git push
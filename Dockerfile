
# Sử dụng image gốc có Node.js để build ứng dụng React
FROM node:18 AS build

# Thiết lập thư mục làm việc
WORKDIR /app

# ARG BUILD_ENV=test
# ARG NGINX_PORT

# # Hiển thị giá trị của các biến môi trường
# RUN echo "BUILD_ENV: $BUILD_ENV"
# RUN echo "NGINX_PORT: $NGINX_PORT"

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép tất cả các tệp và thư mục còn lại vào thư mục làm việc
COPY . .

# Build ứng dụng React
# ARG BUILD_ENV=test
RUN npm run build:dev

# Sử dụng một image nhẹ có Node.js để chạy ứng dụng đã build
FROM node:18-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Cài đặt serve để phục vụ các tệp tĩnh
RUN npm install -g serve

# Sao chép các tệp đã build từ bước trước vào thư mục làm việc
COPY --from=build /app/dist /app


# Chạy ứng dụng với serve
# CMD ["sh", "-c", "serve -s build -l $NGINX_PORT"]
# CMD ["sh", "-c", "serve -s /app -l $NGINX_PORT"]
# Debug lệnh serve với giá trị của biến môi trường
CMD ["sh", "-c", "serve -s . -l 5172"]

EXPOSE 5172
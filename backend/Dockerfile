FROM php:8.2-apache

# Install system dependencies
RUN apt-get update && \
    apt-get install -y libpng-dev libonig-dev libxml2-dev zip unzip curl && \
    docker-php-ext-install pdo_mysql

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy source code
COPY . .

# Expose port 80
EXPOSE 80

CMD php migrate.php && php init_db.php && apache2-foreground

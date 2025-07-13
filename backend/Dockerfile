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

# Add wait-for-it script to ensure DB is ready before running migrations
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Expose port 80
EXPOSE 80

CMD ["sh", "-c", "/usr/local/bin/wait-for-it.sh db:3306 --timeout=60 --strict -- php migrate.php && php init_db.php && php fetch_rates.php && apache2-foreground"]

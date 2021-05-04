# Reload apache

systemctl reload apache2

# Active one available site

sudo a2ensite 001-example.conf

# Get ssl with certbot

sudo certbot --apache

# Added proxy for websocket

sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod proxy_wstunnel

# Node js socket adress

wss://your_domain.com

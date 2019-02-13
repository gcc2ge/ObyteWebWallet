yarn build
rm ./dist.zip
zip -r ./dist.zip ./dist
scp -i /Users/shouhewu/Downloads/webwallet_byteball.pem ./dist.zip root@47.75.122.109:/var/www/
ssh -i /Users/shouhewu/Downloads/webwallet_byteball.pem root@47.75.122.109 "unzip /var/www/dist.zip -d /var/www/ ; rm -rf /var/www/html; mv /var/www/dist /var/www/html ; rm -rf /var/www/dist.zip ;  systemctl restart nginx"


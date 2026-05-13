# Qiantian Network Technology - Deployment Guide

## Quick Summary

You now have a complete, production-ready corporate website with:
- **7 HTML Pages** (5 main pages + 2 legal pages)
- **Professional CSS** with animations
- **JavaScript interactivity** 
- **SVG Icons** and Logo
- **Complete Privacy Policy** with multi-jurisdiction compliance
- **Complete Terms of Service** with app store requirements
- **SEO Optimization** for Google Search
- **Mobile Responsive** design
- **All company information** integrated

## File Structure Verification

```
qiantiannet/
鈹溾攢鈹€ index.html                      鉁?Homepage
鈹溾攢鈹€ services.html                   鉁?Services
鈹溾攢鈹€ culture.html                    鉁?About Us
鈹溾攢鈹€ news.html                       鉁?News & Blog
鈹溾攢鈹€ contact.html                    鉁?Contact Us
鈹溾攢鈹€ privacy-policy.html             鉁?Privacy Policy (17 sections)
鈹溾攢鈹€ terms-of-service.html           鉁?Terms of Service (21 sections)
鈹溾攢鈹€ app-ads.txt                     鉁?App store compliance file
鈹溾攢鈹€ sitemap.xml                     鉁?SEO sitemap
鈹溾攢鈹€ robots.txt                      鉁?Search engine robots
鈹溾攢鈹€ .htaccess                       鉁?Apache configuration
鈹溾攢鈹€ nginx.conf                      鉁?Nginx configuration
鈹溾攢鈹€ README.md                       鉁?Complete documentation
鈹溾攢鈹€ DEPLOYMENT.md                   鉁?This file
鈹溾攢鈹€ css/
鈹?  鈹斺攢鈹€ style.css                   鉁?All styling (50+ animations)
鈹溾攢鈹€ js/
鈹?  鈹斺攢鈹€ script.js                   鉁?Interactivity & features
鈹斺攢鈹€ images/
    鈹溾攢鈹€ favicon.svg                 鉁?Browser favicon
    鈹斺攢鈹€ logo.svg                    鉁?Company logo
```

## Deployment Steps

### Step 1: Local Testing (Before Upload)

1. Extract all files to a local folder
2. Test in different browsers:
   - Chrome/Chromium
   - Firefox
   - Safari
   - Edge
3. Test on mobile devices
4. Test on different screen sizes

```bash
# Using Python
python -m http.server 8000
# Visit: http://localhost:8000

# Or using Node.js
npx http-server
# Visit: http://localhost:8080
```

### Step 2: Domain Setup

1. Register domain: **qiantiannet.com**
2. Configure DNS:
   - A Record: Point to your web server IP
   - AAAA Record: Point to IPv6 (if available)
   - MX Records: For email (if needed)

Example DNS Records:
```
A       qiantiannet.com      鈫?123.45.67.89
AAAA    qiantiannet.com      鈫?2001:db8::1
CNAME   www.qiantiannet.com  鈫?qiantiannet.com
TXT     qiantiannet.com      鈫?"v=spf1 include:_spf.google.com ~all" (if using Gmail)
```

### Step 3: SSL/HTTPS Setup

#### Option A: Let's Encrypt (Free, Recommended)

**Using Certbot:**
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-apache
# or for nginx
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --apache -d qiantiannet.com -d www.qiantiannet.com
# or for nginx
sudo certbot certonly --nginx -d qiantiannet.com -d www.qiantiannet.com

# Auto-renewal
sudo certbot renew --dry-run
```

#### Option B: Commercial SSL Certificate
- Purchase from GoDaddy, DigiCert, GlobalSign, etc.
- Install according to provider instructions
- Configure in web server

### Step 4: Web Server Configuration

#### Apache Configuration

1. Copy `.htaccess` to website root
2. Verify mod_rewrite is enabled:
```bash
sudo a2enmod rewrite
sudo systemctl restart apache2
```

3. Create virtual host (if needed):
```bash
sudo nano /etc/apache2/sites-available/qiantiannet.com.conf
```

Add:
```apache
<VirtualHost *:443>
    ServerName qiantiannet.com
    ServerAlias www.qiantiannet.com
    DocumentRoot /var/www/qiantiannet.com/html
    
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/qiantiannet.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/qiantiannet.com/privkey.pem
    
    <Directory /var/www/qiantiannet.com/html>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

4. Enable site and restart:
```bash
sudo a2ensite qiantiannet.com.conf
sudo systemctl restart apache2
```

#### Nginx Configuration

1. Copy `nginx.conf` content to:
```bash
sudo nano /etc/nginx/sites-available/qiantiannet.com
```

2. Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/qiantiannet.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: File Permissions

Set proper permissions:
```bash
# Navigate to website root
cd /var/www/qiantiannet.com/html

# Set directory permissions
chmod 755 .
chmod 755 css js images

# Set file permissions
chmod 644 *.html
chmod 644 *.css
chmod 644 *.js
chmod 644 *.svg
chmod 644 *.xml
chmod 644 *.txt
```

### Step 6: Upload Files

**Using FTP/SFTP:**
1. Connect to server with FTP client (FileZilla, WinSCP)
2. Upload all files maintaining directory structure
3. Verify all files are uploaded

**Using SCP:**
```bash
scp -r qiantiannet/* user@server:/var/www/qiantiannet.com/html/
```

**Using Git:**
```bash
cd /var/www/qiantiannet.com/html
git clone https://repository-url.git .
```

### Step 7: SEO Setup

#### Google Search Console
1. Go to: https://search.google.com/search-console/
2. Add property: `https://qiantiannet.com`
3. Verify ownership (HTML file, DNS, or HTML tag)
4. Submit sitemap: `https://qiantiannet.com/sitemap.xml`
5. Request indexing for all pages

#### Google Analytics
1. Create account at: https://analytics.google.com
2. Create property for qiantiannet.com
3. Add tracking code to `<head>` of all pages:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### Bing Webmaster Tools
1. Go to: https://www.bing.com/webmasters/
2. Add site
3. Verify and submit sitemap

### Step 8: Email Configuration

If hosting email:

**Gmail Setup:**
1. Use Google Workspace for professional email
2. Add MX records in DNS
3. Configure DKIM and SPF

**Alternative - Email Forwarding:**
```
support@qiantiannet.com 鈫?your-email@gmail.com
mahui1@qiantiannet.com 鈫?mahui1@gmail.com
```

### Step 9: Testing Checklist

- [ ] All pages load correctly
- [ ] Navigation links work
- [ ] Contact form validates
- [ ] Mobile layout is responsive
- [ ] HTTPS/SSL is working
- [ ] Images load correctly
- [ ] Animations are smooth
- [ ] No 404 errors
- [ ] No mixed content warnings
- [ ] All external links work

### Step 10: Monitoring & Maintenance

#### Regular Checks
1. Check Google Search Console for errors
2. Monitor website performance (Google PageSpeed Insights)
3. Check uptime (UptimeRobot, Pingdom)
4. Review analytics

#### Updates
1. Update contact information as needed
2. Add new news articles regularly
3. Update services if changed
4. Monitor SSL certificate expiration

## Performance Optimization

### Current Score Targets
- Lighthouse Performance: 90+
- Lighthouse Accessibility: 95+
- Lighthouse Best Practices: 95+
- Lighthouse SEO: 100

### Further Optimization

1. **Image Compression:**
```bash
# Install ImageMagick
sudo apt-get install imagemagick

# Compress images
convert input.png -quality 85 output.png
```

2. **CSS/JS Minification:**
```bash
# Using Node.js
npm install -g uglify-js uglifycss

uglifyjs style.css -o style.min.css
uglifyjs script.js -o script.min.js
```

3. **Enable HTTP/2:**
```bash
# Apache
sudo a2enmod http2
sudo systemctl restart apache2
```

4. **CDN Integration:**
- Use CloudFlare (free tier available)
- Point DNS to CloudFlare nameservers
- Enable caching and optimization

## Security Best Practices

### Server Security
1. Update server software regularly
2. Configure firewall
3. Disable unnecessary services
4. Use SSH keys (not password)
5. Configure fail2ban

### Application Security
1. Validate all form inputs
2. Keep dependencies updated
3. Regular security audits
4. Monitor access logs
5. Configure security headers (included in config files)

### Backup & Disaster Recovery
1. Automated daily backups
2. Store backups off-site
3. Test restore procedures
4. Document recovery process
5. Redundancy for critical data

```bash
# Simple backup script
#!/bin/bash
BACKUP_DIR="/backups/qiantiannet-$(date +%Y%m%d).tar.gz"
tar -czf $BACKUP_DIR /var/www/qiantiannet.com/
```

## Analytics & Tracking

### Recommended Tools
1. **Google Analytics 4** - Website analytics
2. **Google Search Console** - Search performance
3. **Bing Webmaster Tools** - Alternative search
4. **UptimeRobot** - Uptime monitoring
5. **Pingdom** - Performance monitoring

### Add GA4 to All Pages

Add before `</head>`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA_ID', {
    'page_path': window.location.pathname
  });
</script>
```

## Troubleshooting

### Issue: HTTPS Not Working
**Solution:**
1. Verify SSL certificate is installed
2. Check certificate expiration
3. Restart web server
4. Clear browser cache

### Issue: 404 Errors
**Solution:**
1. Check file paths in navigation
2. Verify .htaccess is in root
3. Check document root setting
4. Verify file permissions

### Issue: Slow Loading
**Solution:**
1. Enable gzip compression
2. Enable caching
3. Optimize images
4. Use CDN
5. Check server resources

### Issue: Form Not Submitting
**Solution:**
1. Check browser console for errors
2. Verify form method and action
3. Check email configuration
4. Test with simple form first

## Update & Maintenance

### Version Control (Recommended)

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit"

# Set remote
git remote add origin https://your-repo.git
git push -u origin main

# Later updates
git pull origin main
git add .
git commit -m "Update description"
git push origin main
```

### Content Updates

1. **News Articles:**
   - Edit news.html
   - Add new cards to news-grid

2. **Services:**
   - Edit services.html
   - Update service descriptions

3. **Contact Info:**
   - Update email addresses
   - Update address if needed
   - Update phone numbers

## Support Contacts

- **Technical Support:** support@qiantiannet.com
- **Sales:** mahui1@qiantiannet.com
- **Website:** qiantiannet.com

## Success Indicators

鉁?Website is live at qiantiannet.com
鉁?HTTPS/SSL working (green lock icon)
鉁?All pages load correctly
鉁?Mobile responsive
鉁?Indexed in Google Search
鉁?Analytics tracking working
鉁?Contact form working
鉁?Performance score 90+
鉁?No security warnings
鉁?Backups configured

## Next Steps

1. Deploy website
2. Test thoroughly
3. Set up monitoring
4. Submit to search engines
5. Monitor analytics
6. Plan content updates
7. Consider analytics enhancements

## Support

For deployment assistance or customization needs:
- Email: support@qiantiannet.com
- Website: qiantiannet.com

---

**Complete Website Package Ready for Production**  
**Created: January 2024**  
**Status: Ready for Deployment**

